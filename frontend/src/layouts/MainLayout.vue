<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: white; height: 90px">
      <!-- burger menu -->
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          color="primary"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="absolute-left"
          v-if="store.state.isLoggedIn && $q.screen.lt.md"
        />

        <q-toolbar-title class="q-pl-lg">
          <!-- mobile logo-->
          <img
            v-if="$q.screen.lt.md"
            src="~assets/logo.png"
            alt="Logo Zero Defects"
            style="padding-top: 20px; padding-left: 10px; width: 120px"
            class="logoMobile"
            :class="{ 'cursor-pointer': store.state.isLoggedIn }"
            @click="store.state.isLoggedIn && $router.push({ path: '/' })"
          />

          <!-- Desktop logo-->

          <img
            v-else
            src="~assets/logo.png"
            alt="Logo Zero Defects"
            style="margin-top: 20px; width: 120px"
            class="absolute-center"
            :class="{ 'cursor-pointer': store.state.isLoggedIn }"
            @click="store.state.isLoggedIn && $router.push({ path: '/' })"
          />

          <div
            class="q-pt-sm absolute-right"
            style="margin-right: 30px; margin-top: 16px; color: black"
            v-if="store.state.isLoggedIn"
          >
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <!-- dropdown -->
            <q-btn-dropdown
              class="q-pa-xs text-grey-14"
              flat
              :label="`${$t('hello')} ${store.state.auth.user.firstName}`"
            >
              <q-list style="min-width: 200px">
                <q-item clickable>
                  <q-item-section @click="$router.push({ path: '/profile' })">
                    {{ $t("profile") }}
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-item clickable>
                  <q-item-section @click="$router.push({ path: '/settings' })">
                    {{ $t("settings") }}
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-separator />
                <q-item clickable>
                  <q-item-section @click="store.logout()">
                    {{ $t("logout") }}
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      v-if="store.state.isLoggedIn"
      :width="250"
      :breakpoint="1024"
      style="margin-top: 90px"
    >
      <q-scroll-area
        style="height: calc(100% - 100px); margin-left: 10px; color: #707070"
      >
        <q-list>
          <!-- <q-item-label header> Essential Links </q-item-label> -->

          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!--session expiration modal-->
    <template>
      <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="persistent" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="red" text-color="white" />
              <span class="q-ml-sm">{{ $t("your_session") }}</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                :label="$t('go_to_login')"
                @click="$router.push('/login')"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </template>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Dashboard",
    caption: "dashboard_caption",
    icon: "dashboard",
    to: "/",
  },
  {
    title: "Tasks",
    caption: "tasks_caption",
    icon: "groups",
    to: "/tasks",
  },

  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev',
  // },
];

import { defineComponent, ref, inject, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { feathersClient } from "../plugins/feathers-client";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const store = inject("store");
    const { locale } = useI18n({ useScope: "global" });
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const { t } = useI18n();
    const $q = useQuasar();
    //to call it when reload on any page
    store.toExpireSession();

    const persistent = computed(() => {
      if (!store.state.isLoggedIn && router.currentRoute.value.meta.isProtected) {
        return true;
      }
      return false;
    });

    watch(locale, (locale, prevLocale) => {
      localStorage.setItem("lang", locale);
      location.reload();
    });
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      locale,
      persistent,
      localeOptions: [
        { value: "en-gb", label: "EN" },
        { value: "de", label: "DE" },
      ],
      store,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style scoped>
.logoMobile {
  padding-top: 20px;
  padding-left: 10px;
  width: 120px;
}

.q-drawer .q-link {
  font-size: 1.125rem;
  color: #858f91;
}

.q-drawer .q-link:hover,
.q-drawer .q-link:focus,
.q-drawer .q-link:active,
.q-drawer .q-link:hover .q-item__label,
.q-drawer .q-link:focus .q-item__label,
.q-drawer .q-link:active .q-item__label,
.q-drawer .q-router-link--exact-active,
.q-drawer .q-router-link--exact-active .q-item__label {
  background: #fff;
  color: #1976d2;
  transition: 0.22s cubic-bezier(0, 0, 0.2, 1);
}

.q-drawer .q-link .q-icon {
  margin-right: 17px;
}
</style>
