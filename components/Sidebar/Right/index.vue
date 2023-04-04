<template>
  <div class="flex flex-col">
    
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappeningItems">
        <div class="">
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappening.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
         <div class="flex flex-row justify-between items-center p-2">
           <div class="flex flex-row">
            <img :src="whoToFollow.image" alt="profile" class="w-10 h-10 rounded-full">
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h1>
              <p class="text-xs text-grqy-400">
                {{ whoToFollow.handle }}
              </p>
            </div>
           </div>
           <div class="flex h-full">
            <button class="px-4 py-2 font-bold text-xs text-white
            bg-black drak:text-black dark:bg-white rounded-full">
              Follow
            </button>
           </div>
         </div>
      </SidebarRightPreviewCardItem> 
    </SidebarRightPreviewCard>  

  </div>
</template>

<script setup>
  const whatsHappeningItems = ref([
    { title: 'SpaceX', count: '18.8k Tweets' },
    { title: '#Coding', count: '10.8k Tweets' },
    { title: '#art4all', count: '31.8k Tweets' },
  ]);
  
  const whoToFollowItems = ref([
    { name: 'John Snow', handle: '@johnsnow', image: 'https:/picsum.photos/200/200' },
    { name: 'Mario Bros', handle: '@mariobros', image: 'https:/picsum.photos/200/200' },
    { name: 'Yoshi', handle: '@yoshi', image: 'https:/picsum.photos/200/200' },
  ])

</script>

<style lang="scss" scoped>

</style>