<template>
  <div class="window-width row justify-center q-mt-xl">
    <q-card style="width: 80vw; max-width: 700px; border-radius: 10px">
      <q-card-section class="bg-grey-2">
        <div class="text-h6">{{ $t('create_new_password') }}</div>
      </q-card-section>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input type="password" v-model="password" :label="$t('your_password')" lazy-rules />
        </q-card-section>
        <q-card-section> </q-card-section>
        <q-card-section>
          <q-btn :label="$t('submit')" type="submit" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script>
  import { defineComponent, inject, ref, onMounted } from 'vue';
  // import { useQuasar } from 'quasar';

  import { useRoute, useRouter } from 'vue-router';
  import { feathersClient } from 'src/plugins/feathers-client';

  //16 hours

  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();

      const token = route.query.token;
      console.log('token', token);

      const store = inject('store');

      const password = ref(null);

      onMounted(async () => {
        // Perfom logout
        // @ts-ignore
        //store.logout(); to be fixed!!!
      });

      async function onSubmit() {
        try {
          await feathersClient.service('auth-management').create({
            action: 'resetPwdLong',
            value: {
              token: token,
              password: password.value.trim(),
            },
          });
          router.push('/auth/password-confirm-message');
        } catch (err) {
          router.push('/auth/link-expired');
        }
      }

      return {
        store,
        password,
        onSubmit,
      };
    },
    name: 'PageLogin',
  });
</script>
