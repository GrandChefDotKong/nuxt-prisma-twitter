<template>
  <div class="h-screen flex flex-col">
    <div class="p-2 my-2 rounded-full hover:bg-blue-50 
    dark:hover:bg-white/20 w-min" :class="transition">
      <nuxt-link to="/">
        <div class="w-8 h-8 flex items-center justify-center">
          <img src="~/assets/logo.svg" alt="logo">
        </div>
      </nuxt-link>
    </div>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <HomeIcon />
      </template>
      <template v-slot:name>
        Home
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <HashtagIcon />
      </template>
      <template v-slot:name>
        Explore
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <InboxIcon />
      </template>
      <template v-slot:name>
        Messages
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <BookmarkIcon />
      </template>
      <template v-slot:name>
        Bookmarks
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <DocumentTextIcon />
      </template>
      <template v-slot:name>
        Lists
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <BellIcon />
      </template>
      <template v-slot:name>
        Notifications
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <UserIcon />
      </template>
      <template v-slot:name>
        User
      </template>
    </SidebarLeftTab>
    <SidebarLeftTab active>
      <template v-slot:icon>
        <EllipsisHorizontalCircleIcon />
      </template>
      <template v-slot:name>
        More
      </template>
    </SidebarLeftTab>
    <div class="hidden xl:block">
      <UIButton size="lg" liquid>
        <strong class="font-bold">Tweet</strong>
        </UIButton>
    </div>
    <div class="block xl:hidden">
      <UIButton>
        <div class="w-6 h-6 fot-bold">
          <PencilIcon />  
        </div>
      </UIButton>
    </div>
  </div>
</template>

<script setup>
  import { 
    HomeIcon, HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, 
    DocumentTextIcon, UserIcon, EllipsisHorizontalCircleIcon,
    PencilIcon
  } from "@heroicons/vue/24/outline";
  
  const { defaultTransition } = useTailwindConfig();

</script>
