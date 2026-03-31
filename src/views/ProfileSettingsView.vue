<template>
  <div class="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 flex items-center justify-between">
      <button class="p-1" @click="$emit('back')">
        <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="close" />
      </button>
      <h1 class="text-lg font-bold text-[#1A1A1A]">贵妃书斋</h1>
      <button class="p-1">
        <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
      </button>
    </header>

    <div class="px-4 py-6 flex flex-col gap-4">
      <!-- Avatar & Nickname Card -->
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer">
          <span class="text-base text-[#1A1A1A]">头像</span>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
              <img src="https://picsum.photos/seed/user_avatar/200/200" alt="Avatar" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <img src="/input_file_18.png" class="w-5 h-5 object-contain opacity-30" alt="arrow" />
          </div>
        </div>
        <div class="flex items-center justify-between px-5 py-4 active:bg-gray-50 cursor-pointer">
          <span class="text-base text-[#1A1A1A]">昵称</span>
          <div class="flex items-center gap-2">
            <span class="text-base text-gray-400">用户·笔趣阁</span>
            <img src="/input_file_18.png" class="w-5 h-5 object-contain opacity-30" alt="arrow" />
          </div>
        </div>
      </div>

      <!-- Settings Card -->
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer">
          <span class="text-base text-[#1A1A1A]">修改密码</span>
          <img src="/input_file_18.png" class="w-5 h-5 object-contain opacity-30" alt="arrow" />
        </div>
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer">
          <span class="text-base text-[#1A1A1A]">手机号</span>
          <div class="flex items-center gap-2">
            <span class="text-base text-gray-400">128 6037 1954</span>
            <img src="/input_file_18.png" class="w-5 h-5 object-contain opacity-30" alt="arrow" />
          </div>
        </div>
        <div class="flex items-center justify-between px-5 py-4 active:bg-gray-50 cursor-pointer">
          <span class="text-base text-[#1A1A1A]">退出登录</span>
          <img src="/input_file_18.png" class="w-5 h-5 object-contain opacity-30" alt="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['back']);
</script>
