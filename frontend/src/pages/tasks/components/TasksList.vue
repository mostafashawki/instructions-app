<template>
    <!--The Table -->
    <q-table
      title=""
      :rows="rows"
      :columns="columns"
      row-key="_id"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
      selection="single"
      v-model:selected="selected"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" :placeholder="$t('search_name')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

</template>

<script>
  import { defineComponent } from 'vue';
  import { useQuasar } from 'quasar';
  import { ref, onMounted, inject, watch } from 'vue';
  import { tasks } from 'src/plugins/feathers-client';
  import { useI18n } from 'vue-i18n';
  import { formatDate } from 'src/utils';
  // import i18n from '../boot/i18n';

  export default defineComponent({
    setup(props, context) {
      const $q = useQuasar();
      const store = inject('store');
      const title = ref(null);
      const selected = ref([]);
      const rowsPerPage = 5;
      const prompt = ref(false);
      const { t } = useI18n();

      let user = {};

      watch(selected, () => {
      context.emit('sendSelected', selected.value);
    });

      const columns = [
        {
          name: 'title',
          required: true,
          label: t('title'),
          align: 'center',
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        // { name: 'name', align: 'center', label: 'name', field: 'name', sortable: true },
        {
          name: 'createdAt',
          label: t('created_at'),
          field: (row) => formatDate(row.createdAt),
          sortable: true,
        },
      ];

      const rows = ref([]);
      const filter = ref('');
      const loading = ref(false);
      const pagination = ref({
        sortBy: 'createdAt',
        descending: true,
        page: 1,
        rowsPerPage,
        rowsNumber: 0,
      });

      async function fetchFromServer(startRow, fetchCount, filter, sortBy, descending) {
        const sort = '$sort[' + sortBy + ']';

        console.log('user Id before fetch but from store >>>>>>>>>>>>>> ', store.state.auth.user._id);

        const query = {
          $skip: startRow,
          [sort]: descending ? '-1' : '1',
          $limit: fetchCount,
          
        };
        if (filter) query.title = filter;

        try {
          const result = await tasks.find({ query });
          // update rowsCount with appropriate value
          pagination.value.rowsNumber = result.total;
          const returnedData = result.data;

          return result.data;
        } catch (err) {
          $q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'error_outline',
            message: err.message,
          });
          return [];
        }
      }

      async function onRequest(props) {
        const { page, rowsPerPage, sortBy, descending } = props.pagination;
        const filter = props.filter;

        console.log('onRequest ', props.pagination);

        loading.value = true;

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;
        console.log('count fetchCount ', fetchCount);

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        console.log('startRow ', startRow);
        ////////////

        /////////////
        // fetch data from "server"
        const returnedData = await fetchFromServer(startRow, fetchCount, filter, sortBy, descending);
        console.log('this is returnedData ', returnedData);
        console.log('pagination.value.rowsNumber ', pagination.value.rowsNumber);
        //rows.value = returnedData
        rows.value.splice(0, rows.value.length, ...returnedData);

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;

        // ...and turn of loading indicator
        loading.value = false;

        // }, 1500)
      }



      onMounted(async () => {
        user = store.state.auth.user;
        console.log('hey STORE state FROM workspace 🙌🙌🙌🙌🙌🙌 ', store.state.auth);

        // get initial data from server (1st page)
        onRequest({
          pagination: pagination.value,
          filter: undefined,
        });
      });

      return {
        title,
        filter,
        loading,
        pagination,
        columns,
        rows,
        onRequest,
        prompt,
        selected,
      };
    },
    name: 'PageTasks',
  });
</script>
