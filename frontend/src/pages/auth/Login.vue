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
          {{ $t('login') }}
        </p>
      </div>
      <q-card
        flat
        class="q-pa-lg"
        :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 640px '"
      >
        <q-form @submit="onSubmit">
          <q-card-section class="q-pa-none q-pb-sm">
            <p class="sub-title">
              {{ $t('welcome') }}
            </p>
          </q-card-section>
          <q-card-section class="q-pa-none q-pb-lg">
            <q-input
              v-model="email"
              :label="$t('email_m')"
              :hint="$t('email_address')"
              lazy-rules
              :rules="[isEmailValid]"
            />
          </q-card-section>

          <q-card-section class="q-pa-none q-pb-lg">
            <q-input
              type="password"
              v-model="password"
              :label="$t('your_password')"
              lazy-rules
              :rules="[(val) => validateLength(val, 5, 'Please enter your password!')]"
            />
          </q-card-section>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="dms-forgot-password">
                <router-link style="white-space: nowrap" clickable to="/forgot-password">{{
                  $t('forgot_password')
                }}</router-link>
              </div>
              <!-- /.forgot-password -->
            </div>
          </div>
          <div class="col-12 col-md-6">
            <q-card-section align="right" class="q-pa-none">
              <q-btn
                class="dms-btn-lg"
                :label="$t('submit')"
                type="submit"
                color="primary"
              />
            </q-card-section>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, inject } from 'vue';
  import { useQuasar } from 'quasar';
  //reference https://next.router.vuejs.org/guide/advanced/composition-api.html
  import { useRouter, useRoute } from 'vue-router';
  import { addMinutes, addSeconds } from 'date-fns';
  import { feathersClient } from '../../plugins/feathers-client';
  import { validateLength } from '../../../src/utils';

  //16 hours
  const sessionPeriodByMinutes = 60 * 16;

  export default defineComponent({
    setup() {
      const router = useRouter();

      const store = inject('store');

      const email = ref(null);
      const password = ref(null);

      async function onSubmit() {
        console.log('submittted!!!!');
        try {
          const res = await feathersClient.authenticate({
            email: email.value.trim(),
            password: password.value.trim(),
            strategy: 'local',
          });
          console.log(res);
          store.state.auth = { ...res };
          store.state.isLoggedIn = true;

          //add expiration in localStorage for navigation guard
          if (typeof Storage !== 'undefined') {
            //calculate expiration
            const expiresIn = addMinutes(new Date(), sessionPeriodByMinutes).getTime();
            localStorage.setItem('expiresIn', expiresIn);
            store.toExpireSession();
          }
          router.push('/');
        } catch (err) {
          console.error(err);
        }
      }

      function isEmailValid() {
        const isvalid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        console.log('is valid????? ', isvalid);
        return isvalid;
      }
      return {
        store,
        email,
        password,
        isEmailValid,
        onSubmit,
        validateLength,
      };
    },
    name: 'PageLogin',
  });
</script>
<style scoped>
  .dms-forgot-password a {
    font-size: 0.75rem;
    color: #434b4d;
  }
</style>
