<template>
  <div :class="$q.screen.lt.md ? 'container-mobile' : 'container-desktop'">
    <div class="container-title">
      <p class="text-h5 q-mb-none">
        {{ $t("tasks") }}
      </p>
    </div>

    <q-card flat class="q-pa-md">
      <q-btn
        round
        color="primary"
        icon="add"
        @click="prompt = true"
        v-if="!selected.length "
      >
        <q-tooltip>
          {{ $t("create") }}
        </q-tooltip>
      </q-btn>
      <q-btn
        round
        color="red"
        icon="delete"
        @click="confirm = true"
        v-if="selected.length && store.state.auth.user.roles[0] === 'q-m'"
      >
        <q-tooltip>
          {{ $t("delete") }}
        </q-tooltip>
      </q-btn>
      
       <q-btn
        round
        color="primary"
        icon="list"
       @click="$router.push({ path: `/tasks/details/${selected[0]._id}` })" v-if="selected.length && store.state.auth.user.roles[0] === 'w'">
        <q-tooltip>
          {{ $t("delete") }}
        </q-tooltip>
      </q-btn>

      <TasksList @sendSelected="(val) => (selected = val)" selectionProp="single" />

    </q-card>
  </div>

  <q-dialog v-model="prompt" persistent >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-form @submit="onSubmit" @reset="reset" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6">{{ $t("create_task") }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="task.title"
            :label="$t('task')"
            :hint="$t('task_title')"
            lazy-rules
            :rules="[(val) => validateLength(val, 0, $t('type_something'))]"
          />
        </q-card-section>

        <q-card-section>
              <div class="row">
                <div class="col-11">
                  <q-input
                    v-model="instruction"
                    :label="$t('instruction')"
                    :hint="$t('add_new_instruction')"
                    
                  />
                </div>
                <div class="col-1" align="right">
                  <q-btn
                  
                    round
                    color="primary"
                    size="sm"
                    icon="add"
                    @click="addInstruction"
                  >
                    <q-tooltip> {{ $t('add_new_instruction') }} </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label="$t('cancel')" v-close-popup />
          <q-btn :label="$t('submit')" type="submit" color="primary" />
        </q-card-actions>
      </q-form>

      <q-separator />

      <div class="q-pa-lg">
        <div class="row" v-for="(item, index) in task.instructions" :key="index">
          <div class="col-10">
            <p>{{item}}</p>
          </div>
          <div class="col-2" align="right">
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              color="negative"
              icon="delete"
              @click="removeInstruction"
            >
              <q-tooltip> {{ $t('delete_tag') }} </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="red" text-color="white" />
        <span class="q-ml-sm">{{ $t("delete_ws_msg") }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
        <q-btn
          flat
          :label="$t('yes_delete')"
          color="primary"
          @click="onDelete"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { ref, onBeforeMount, inject } from "vue";
import { useRouter } from "vue-router";
import { tasks } from "src/plugins/feathers-client";
import { useI18n } from "vue-i18n";
import { formatDate, validateLength } from "src/utils";
import TasksList from "./components/TasksList.vue";
// import i18n from '../boot/i18n';

export default defineComponent({
  components: {
    TasksList,
  },
  setup() {
    const $q = useQuasar();
    const store = inject("store");
    const router = useRouter();
    const task = ref({
      title: '',
      instructions: []
    })
    // const title = ref(null);
    const instruction = ref(null);
    // const selected = ref([]);
    // const rowsPerPage = 5;
    const prompt = ref(false);
    const selected = ref([]);
    const { t } = useI18n();

    let user = {roles: ['']};

    function addInstruction(){

      task.value.instructions.push(instruction.value);
      instruction.value = '';
      console.log("hahahahab ",task.value)
      
    }

    
    async function onSubmit() {
      

      task.value.createdBy = user._id;
      task.value.lastEditBy = user._id;

      console.log("task before create ................. ", task);
      await tasks.create(task.value);

      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Saved",
      });

      setTimeout(() => {
        router.go();
      }, 500);
    }

    async function onDelete() {
      try {
        console.log("to send to delete ===== ", selected.value[0]._id);
        await tasks.remove(selected.value[0]._id);

        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: t("deleted"),
        });
        setTimeout(() => {
          router.go();
        }, 500);
      } catch (err) {
        $q.notify({
          color: "red",
          textColor: "white",
          icon: "error_outline",
          message: t("went_wrong"),
        });
      }
    }

    onBeforeMount(async () => {
      user = store.state.auth.user;
      console.log("hey STORE state FROM task 🙌🙌🙌🙌🙌🙌 ", store.state.auth);

      // get initial data from server (1st page)
      // onRequest({
      //   pagination: pagination.value,
      //   filter: undefined,
      // });
    });

    return {
      // title,
      store,
      selected,
      task,
      instruction,
      addInstruction,
      // filter,
      // loading,
      // pagination,
      // columns,
      // rows,
      onSubmit,
      onDelete,
      // onRequest,
      prompt,
      confirm: ref(false),
      validateLength,
    };
  },
  name: "PageTasks",
});
</script>
