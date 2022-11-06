<template>
  <div :class="$q.screen.lt.md ? 'container-mobile' : 'container-desktop'">
    <div class="container-title">
      <p class="text-h5 q-mb-none">
        {{ $t('settings') }}
      </p>
    </div>

    <q-card flat>
      <div class="row justify-center">
        <q-form class="q-gutter-md" :style="$q.screen.lt.md ? 'width: 100%' : 'width: 60%'">
          <!-- <q-card-section>
            <q-toggle
              color="grey-3"
              :label="`Dark mode is ${isdarkMode ? 'ON' : 'OFF'} `"
              v-model="isdarkMode"
            />
          </q-card-section> -->
          <q-card-section>
            <div class="row">
              <div class="col-6 col-md-6 col-xl-2 text-right q-pr-md q-pt-xs">{{ $t('language') }}:</div>
              <div class="col-12 col-md-6 col-xl-4">
                <q-select
                  v-model="locale"
                  :options="localeOptions"
                  label=""
                  dense
                  borderless
                  emit-value
                  map-options
                  options-dense
                >
                  <template v-slot:prepend>
                    <q-avatar v-if="locale === 'de'">
                      <img src="~assets/de-flag-round-icon-16.png" />
                    </q-avatar>
                    <q-avatar v-if="locale === 'en-gb'">
                      <img src="~assets/uk-flag-round-icon-16.png" />
                    </q-avatar>
                  </template>
                </q-select>
              </div>
            </div>
          </q-card-section>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script>
  import { defineComponent, inject, ref, watch, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    setup() {
      const $q = useQuasar();
      const { locale } = useI18n({ useScope: 'global' });

      const store = inject('store');
      const isdarkMode = ref(false);

      watch(isdarkMode, () => {
        $q.dark.set(isdarkMode.value);
        localStorage.setItem('isdarkMode', isdarkMode.value);
      });

      watch(locale, () => {
        localStorage.setItem('lang', locale.value);
        window.location.reload();
      });

      onMounted(() => {
        isdarkMode.value = localStorage.getItem('isdarkMode') == 'true' || false;
      });

      return {
        store,
        locale,
        localeOptions: [
          { value: 'en-gb', label: 'English (United Kingdom)' },
          { value: 'de', label: 'Deutsch (Deutschland)' },
        ],
        isdarkMode,
      };
    },
    name: 'PageSettings',
  });
</script>
