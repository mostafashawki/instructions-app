<template>
  <div :class="$q.screen.lt.md ? 'container-mobile' : 'container-desktop'">
    <div class="container-title row">
      <div class="col-8">
        <p class="text-h5 q-mb-none">
          {{ $t('task_details') }}
        </p>
        
      </div>
    </div>

    <q-card flat class="q-pa-md">
      <div class="q-pa-md" style="width: 700px; max-width: 80vw;">
    <q-list bordered separator v-for="(item, index) in task.instructions" :key="index">
      <q-item v-ripple :key="index">
        <q-item-section>{{item}}</q-item-section>
      </q-item>

     
    </q-list>
  </div>
    </q-card>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';
  import { ref, onMounted, onBeforeMount, inject, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { tasks } from '../../plugins/feathers-client';



  export default defineComponent({

    setup() {
      const $q = useQuasar();
      const router = useRouter();
      const store = inject('store');
      const task = ref({});
      const mode = ref(null)
      const { t } = useI18n();

      let user = {};

      onBeforeMount(async () => {
        
          try {
           
          //find to be able to populate
            task.value = await tasks.get(router.currentRoute.value.params.id);
           

            console.log('task.value =========== ', task.value)
          }
         catch (error) {
          $q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'error_outline',
            message: error.message,
          });
        }
          
    
      });

    //   onMounted(async () => {
    //     user = store.state.auth.user;
        
    //   });

      return {
        task
      };
    },
    name: 'PageTaskDetails',
  });
</script>
