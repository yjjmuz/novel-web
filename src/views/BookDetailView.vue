<template>
  <div class="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-[#333]">
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

    <!-- Book Info Header -->
    <div class="relative px-4 pt-6 pb-10 overflow-hidden">
      <!-- Background Gradient/Image -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#E0E7FF] to-[#F8F9FA] opacity-60"></div>
      
      <div class="relative flex justify-between items-start">
        <div class="flex-1 pr-4 pt-2">
          <h2 class="text-2xl font-bold text-[#1A1A1A] mb-2">尽欢颂</h2>
          <p class="text-sm text-gray-600 mb-1">细颈</p>
          <p class="text-xs text-gray-400">完结·183万字</p>
        </div>
        <div class="w-28 aspect-[3/4] rounded-lg overflow-hidden shadow-xl border border-white/50">
          <img src="https://picsum.photos/seed/book_detail_cover/300/400" alt="Cover" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>

    <!-- Introduction Section -->
    <div class="px-4 -mt-4">
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-[#1A1A1A]">简介</h3>
        </div>
        <div class="relative">
          <p class="text-sm text-gray-600 leading-relaxed line-clamp-4">
            城破那天，冯蕴被父亲当成战利品献给了敌军将领。
            人人都惋惜她即将为俘，堕入火坑。
            她却将出城的小驴车遮得严严实实，不敢让人看出心中窃喜....
          </p>
          <button class="absolute bottom-0 right-0 p-1 bg-white">
            <img src="/input_file_1.png" class="w-4 h-4 object-contain" alt="expand" />
          </button>
        </div>
      </div>
    </div>

    <!-- Catalog Section -->
    <div class="px-4 mt-4">
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-baseline gap-2">
            <h3 class="text-xl font-bold text-[#1A1A1A]">目录</h3>
            <span class="text-sm text-gray-400">(1233章)</span>
          </div>
          <button class="flex items-center gap-0.5 text-sm text-gray-400">
            更多
            <img src="/input_file_0.png" class="w-4 h-4 object-contain" alt="arrow" />
          </button>
        </div>

        <div class="flex flex-col gap-6">
          <div v-for="(chapter, index) in chapters" :key="index" class="text-sm text-gray-600 active:text-[#7C3AED]">
            {{ chapter }}
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Action Bar -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between z-20">
      <div class="flex items-center gap-6">
        <button class="flex flex-col items-center gap-1">
          <img src="/input_file_54.png" class="w-6 h-6 object-contain" alt="listen" />
          <span class="text-[10px] text-[#1A1A1A]">听书</span>
        </button>
        <button class="flex flex-col items-center gap-1" @click="toggleShelf">
          <img :src="isInShelf ? '/input_file_20.png' : '/input_file_38.png'" class="w-6 h-6 object-contain" alt="shelf" />
          <span class="text-[10px] text-[#1A1A1A]">{{ isInShelf ? '已在书架' : '加入书架' }}</span>
        </button>
      </div>
      <button 
        class="bg-[#7C3AED] text-white font-bold py-3 px-12 rounded-xl text-base shadow-lg shadow-[#7C3AED]/20 active:opacity-90 transition-opacity"
        @click="$emit('read')"
      >
        立即阅读
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const isInShelf = ref(false);

const toggleShelf = () => {
  isInShelf.value = !isInShelf.value;
  if (isInShelf.value) {
    ElMessage({
      type: 'success',
      message: '已加入书架',
    });
  } else {
    ElMessage({
      message: '已从书架移除',
    });
  }
};

const chapters = [
  '第一章 重生反馈开始前',
  '第二章 游戏里的双休道侣',
  '第三章 异常的排行榜',
  '第四章 修为排行榜第一',
  '第五章 游戏里的双休道侣'
];

defineEmits(['back', 'read']);
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
