<template>
  <div
    :class="
      $q.screen.lt.sm
        ? 'container-mobile row items-center justify-center'
        : 'container-desktop row items-center justify-center'
    "
  >
    <div>
      <div class="container-title" :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 640px'">
        <p class="text-h5 text-primary q-mb-none">
          {{ $t('reset_password_title') }}
        </p>
      </div>
      <q-card
        flat
        :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 640px'"
        class="q-pa-lg"
      >
        <q-form @submit="onSubmit">
          <q-card-section class="q-pa-none q-pb-sm">
            <p class="sub-title">
              {{ $t('reset_password') }}
            </p>
          </q-card-section>

          <q-card-section class="q-pa-none q-pb-lg">
            <q-input v-model="email" :label="$t('email_m')" :hint="$t('email_address')" lazy-rules />
          </q-card-section>

          <div class="row">
            <div class="col-12">
              <q-card-section align="right" class="q-pa-none">
                <div class="row justify-end" :style="$q.screen.lt.sm ? '' : 'width: 550px;  '">
                  <q-btn
                    :label="$t('submit')"
                    type="submit"
                    color="primary"
                  />
                </div>
              </q-card-section>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
  import { defineComponent, inject, ref } from 'vue';

  import { useRouter } from 'vue-router';
  import { feathersClient } from '../../plugins/feathers-client';
  import { validateLength } from '../../../src/utils';

  export default defineComponent({
    setup() {
      const router = useRouter();

      const store = inject('store');

      const email = ref(null);

      async function onSubmit() {
        console.log('sendResetPassword has been called', email.value);
        try {
          const result = await feathersClient.service('auth-management').create({
            action: 'sendResetPwd',
            value: {
              email: email.value,
            },
          });

          console.log('result =' + result);

          router.push('/auth/verification-email-been-sent');
        } catch (err) {
          //router.push('/auth/verification-email-been-sent');
          console.log(err);
        }
      }

      return {
        store,
        email,

        onSubmit,
        validateLength,
      };
    },
    name: 'ForgotPassword',
  });
</script>
