<template>
  <div class="min-h-screen bg-[#F8F9FA] pb-20 font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 flex items-center justify-between">
      <button class="p-1">
        <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="close" />
      </button>
      <h1 class="text-lg font-bold text-[#1A1A1A]">贵妃书斋</h1>
      <button class="p-1">
        <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
      </button>
    </header>

    <!-- User Info Section -->
    <div class="bg-white px-4 pt-6 pb-8 relative">
      <button v-if="isLoggedIn" class="absolute top-2 right-4 p-1" @click="$emit('navigate', 'profileSettings')">
        <img src="/input_file_17.png" class="w-6 h-6 object-contain" alt="settings" />
      </button>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 cursor-pointer active:opacity-70" @click="isLoggedIn ? $emit('navigate', 'profileSettings') : $emit('navigate', 'login')">
          <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-50 flex items-center justify-center">
            <img v-if="isLoggedIn" src="https://picsum.photos/seed/user_avatar/200/200" alt="Avatar" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <img v-else src="/input_file_56.png" alt="Avatar" class="w-8 h-8 object-contain opacity-20" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-[#1A1A1A]">{{ isLoggedIn ? (userData?.name || userData?.uname || '用户·笔趣阁') : '未登录' }}</h2>
            <p class="text-sm text-gray-400 mt-0.5">{{ isLoggedIn ? `ID: ${userData?.uid || '91283192'}` : '点击登录/注册' }}</p>
          </div>
        </div>
        <button v-if="isLoggedIn" class="flex items-center gap-1 text-sm text-gray-400" @click="$emit('navigate', 'profileSettings')">
          个人主页
          <img src="/input_file_0.png" class="w-4 h-4 object-contain" alt="arrow" />
        </button>
      </div>
    </div>

    <!-- Membership Card -->
    <div class="px-4 -mt-4">
      <div class="bg-[#F3EFFF] rounded-2xl p-5 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-[#D1C4E9] rounded-xl flex items-center justify-center shadow-inner">
            <img src="/input_file_33.png" class="w-7 h-7 object-contain" alt="crown" />
          </div>
          <div>
            <h3 class="font-bold text-[#5E35B1] text-lg">开通贵妃会员卡</h3>
            <p class="text-xs text-[#7E57C2] mt-1">开通后平台所有书籍免费阅读</p>
          </div>
        </div>
        <button class="flex items-center gap-0.5 text-[#5E35B1] font-bold text-sm">
          立即开通
          <img src="/input_file_3.png" class="w-4 h-4 object-contain" alt="arrow" />
        </button>
      </div>
    </div>

    <!-- Guess You Like Section -->
    <div class="px-4 mt-6">
      <div class="bg-white rounded-[24px] p-5 shadow-sm">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-xl font-bold text-[#1A1A1A]">猜你喜欢</h2>
          <button class="flex items-center gap-0.5 text-sm text-gray-400">
            更多
            <img src="/input_file_0.png" class="w-4 h-4 object-contain" alt="arrow" />
          </button>
        </div>

        <div class="grid grid-cols-4 gap-x-3 gap-y-6">
          <div v-for="book in recommendedBooks" :key="book.id" class="flex flex-col gap-2 cursor-pointer active:opacity-70" @click="$emit('navigate', 'bookDetail')">
            <div class="aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-gray-50">
              <img :src="book.cover" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h3 class="text-[11px] font-medium text-[#1A1A1A] line-clamp-2 leading-tight h-7">
              {{ book.title }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  userData: {
    type: Object,
    default: null
  }
});

defineEmits(['navigate']);

const recommendedBooks = [
  { id: 1, title: '师兄说得对我没道理', cover: 'https://picsum.photos/seed/rec1/200/300' },
  { id: 2, title: '剑道天穹阁', cover: 'https://picsum.photos/seed/rec2/200/300' },
  { id: 3, title: '师兄说得对', cover: 'https://picsum.photos/seed/rec3/200/300' },
  { id: 4, title: '蓝日', cover: 'https://picsum.photos/seed/rec4/200/300' },
  { id: 5, title: '浮生六记', cover: 'https://picsum.photos/seed/rec5/200/300' },
  { id: 6, title: '深空彼岸之逆仙伐圣', cover: 'https://picsum.photos/seed/rec6/200/300' },
  { id: 7, title: '窗外往事', cover: 'https://picsum.photos/seed/rec7/200/300' },
  { id: 8, title: '农家小娇妻·宠你', cover: 'https://picsum.photos/seed/rec8/200/300' },
];
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
