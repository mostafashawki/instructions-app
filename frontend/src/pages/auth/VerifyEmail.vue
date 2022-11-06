<template>
  <div class="window-width row justify-center q-mt-xl">
    <q-card style="width: 80vw; max-width: 700px">
      <q-card-section class="bg-grey-2">
        <div class="text-h6">
          {{ $t('create_new_password') }}
        </div>
      </q-card-section>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            type="password"
            v-model="password"
            :label="$t('your_password')"
            lazy-rules
            :rules="[(val) => validateLength(val, 5, 'Please enter your password!')]"
          />
        </q-card-section>
        <q-card-section>
          <q-btn :label="$t('submit')" type="submit" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script>
  import { defineComponent, inject, ref } from 'vue';

  import { useRoute, useRouter } from 'vue-router';
  import { feathersClient } from 'src/plugins/feathers-client';

  import { validateLength } from 'src/utils';

  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const token = route.query.token;
      const store = inject('store');

      const password = ref(null);

      async function onSubmit() {
        try {
          await feathersClient.service('auth-management').create({
            action: 'verifySignupSetPasswordLong',
            value: {
              token: token,
              password: password.value.trim(),
            },
            //notifierOptions: {}, // optional - an object passed to notifier function
          });

          router.push('/auth/password-confirm-message');
        } catch (err) {
          console.log(err);
          router.push('/auth/link-expired');
        }
      }

      return {
        store,
        password,

        onSubmit,
        validateLength,
      };
    },
    name: 'VerifyEmail',
  });
</script>
