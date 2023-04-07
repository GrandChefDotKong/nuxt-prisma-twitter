<template>
  <div :class="{ 'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div v-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6
        lg:max-w-7xl lg:gap-5 lg:px-8">
          <aside class="xs:hidden sm:block xs-col-span-1
          xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </aside>
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>
          <aside class="sm:block xl:col-span4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </aside>
        </div>
      </div>
      <AuthPage v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
  const darkMode = ref(false);
  const { useAuthUser } = useAuth();
  const user = useAuthUser();
</script>
