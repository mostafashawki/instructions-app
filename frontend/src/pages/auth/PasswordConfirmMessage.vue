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
          {{ $t('password_saved_message') }}
        </p>
      </div>
      <q-card flat :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 640px'" class="q-pa-lg">
        <q-form @submit="onSubmit">
          <q-card-section class="q-pa-none q-pb-sm">
            <p class="sub-title">
              {{ $t('please_login') }}
            </p>
          </q-card-section>

          <div class="row">
            <div class="col-12">
              <q-card-section align="right" class="q-pa-none">
                <q-btn
                  :label="$t('go_to_login')"
                  to="/login"
                  color="primary"
                />
              </q-card-section>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
  import { defineComponent, inject } from 'vue';

  export default defineComponent({
    setup() {
      const store = inject('store');

      return {
        store,
      };
    },
    name: 'PasswordConfirmMessage',
  });
</script>
