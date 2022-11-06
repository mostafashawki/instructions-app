<template>
  <div :class="$q.screen.lt.md ? 'container-mobile' : 'container-desktop'">
    <div class="container-title">
      <p class="text-h5 q-mb-none">
        {{ $t('profile') }}
      </p>
    </div>
    <q-card flat>
      <div class="row">
        <q-form @submit="onSubmit" class="q-gutter-md" :style="$q.screen.lt.md ? 'width: 100%' : 'width: 60%'">
          <q-card-section>
            <q-input v-model="firstName" :label="$t('f_name')" :hint="$t('f_name')" />
          </q-card-section>
          <q-card-section>
            <q-input v-model="lastName" :label="$t('l_name')" :hint="$t('l_name')" />
          </q-card-section>
          <q-card-section>
            <q-input v-model="email" :label="$t('email_m')" :hint="$t('email_address')" disable readonly />
          </q-card-section>

          <q-card-section align="left">
            <q-btn
              v-if="isLinkSent === false"
              class="oycd-btn-sm dark"
              :label="$t('change_password')"
              @click="sendResetPassword"
            />
            <h3 v-else>{{ $t('check_mail_message') }}</h3>
          </q-card-section>

          <q-card-section align="right">
            <q-btn :label="$t('submit')" type="submit" color="primary" />
          </q-card-section>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script>
  import { defineComponent, inject, ref, onMounted } from 'vue';

  import { feathersClient } from 'src/plugins/feathers-client';

  export default defineComponent({
    setup() {
      const store = inject('store');
      const firstName = ref('');
      const lastName = ref('');
      const isLinkSent = ref(false);

      const email = ref(null);
      const password = ref(null);
      onMounted(() => {
        updateData();
      });

      async function onSubmit() {
        try {
          const res = await feathersClient.service('users').patch(store.state.auth.user._id, {
            firstName: firstName.value,
            lastName: lastName.value,
          });
          console.log(res);
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      }
      async function sendResetPassword() {
        try {
          const result = await feathersClient.service('auth-management').create({
            action: 'sendResetPwd',
            value: {
              email: email.value,
            },
          });

          console.log('result =' + result);

          isLinkSent.value = true;
        } catch (err) {
          isLinkSent.value = true;
        }
      }

      function updateData() {
        firstName.value = store.state.auth.user.firstName;
        lastName.value = store.state.auth.user.lastName;
        email.value = store.state.auth.user.email;
      }

      return {
        isLinkSent,
        store,
        email,
        password,
        firstName,
        lastName,
        onSubmit,
        updateData,
        sendResetPassword,
      };
    },
    name: 'PageProfile',
  });
</script>
