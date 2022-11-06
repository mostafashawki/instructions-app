<template>
  <div class="window-width row justify-center q-mt-xl">
    <q-card style="width: 80vw; max-width: 700px">
      <q-card-section class="bg-grey-2">
        <div class="text-h6">{{ $t('error_message') }}</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          :label="$t('go_to_login')"
          to="/login"
          color="primary"
        />
      </q-card-section>
    </q-card>
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
  name: 'ErrorPage',
});
</script>
