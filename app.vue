<template>
  <div :class="{ 'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6
        lg:max-w-7xl lg:gap-5 lg:px-8">
          <aside class="sm:block xs-col-span-1
          xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const darkMode = ref(true);
</script>
