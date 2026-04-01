<template>
  <div class="min-h-screen bg-white font-sans text-[#333] flex flex-col">
    <!-- Header -->
    <header class="px-4 py-3 flex items-center justify-between border-b border-gray-50">
      <button @click="$emit('back')" class="p-1">
        <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="close" />
      </button>
      <h1 class="text-lg font-bold text-[#1A1A1A]">贵妃书斋</h1>
      <button class="p-1">
        <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
      </button>
    </header>

    <!-- Content with Dimmed Background Effect -->
    <main class="flex-1 relative flex flex-col">
      <!-- Simulated Background (Dimmed Reading Content) -->
      <div class="absolute inset-0 bg-gray-400/80 flex flex-col items-center pt-12 px-10 text-center pointer-events-none">
        <h2 class="text-xl font-bold text-[#1A1A1A] mb-8">苟在妖武乱世修仙</h2>
        <p class="text-lg text-[#1A1A1A] opacity-80">“ 拒绝了？ ”</p>
      </div>

      <!-- Catalog Sheet -->
      <div class="mt-auto bg-white rounded-t-[32px] shadow-2xl relative z-10 flex flex-col max-h-[85vh]">
        <!-- Book Info Header -->
        <div class="px-6 pt-8 pb-6 flex items-center gap-4">
          <div class="w-16 h-20 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
            <img src="https://picsum.photos/seed/reader_cover/200/300" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[#1A1A1A]">苟在妖武乱世修仙</h3>
            <p class="text-sm text-gray-400 mt-1">作者：拿钱吃饭</p>
          </div>
          <img src="/input_file_0.png" class="w-5 h-5 object-contain opacity-20" alt="arrow" />
        </div>

        <!-- Catalog Title -->
        <div class="px-6 py-4 flex items-baseline gap-2">
          <h2 class="text-xl font-bold text-[#1A1A1A]">目录</h2>
          <span class="text-sm text-gray-400">(1233章)</span>
        </div>

        <!-- Chapter List -->
        <div class="flex-1 overflow-y-auto px-6 pb-10 space-y-7 mt-2">
          <div 
            v-for="(chapter, idx) in chapters" 
            :key="idx" 
            class="flex items-center justify-between active:opacity-60 transition-opacity cursor-pointer"
            @click="$emit('select-chapter', chapter)"
          >
            <span class="text-base text-gray-500">{{ chapter.title }}</span>
            <div v-if="chapter.isPaid" class="bg-[#F3E5F5] text-[#7C4DFF] text-[10px] px-2 py-1 rounded">
              付费章节
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const chapters = [
  { title: '第一章 重生反馈开始前', isPaid: false },
  { title: '第二章 游戏里的双休道侣', isPaid: false },
  { title: '第三章 异常的排行榜', isPaid: false },
  { title: '第四章 修为排行榜第一', isPaid: false },
  { title: '第五章 游戏里的双休道侣', isPaid: false },
  { title: '第六章 长河宗宗主', isPaid: false },
  { title: '第七章 买什么车，都充游戏', isPaid: true },
  { title: '第八章 游戏里的双休道侣', isPaid: true },
  { title: '第九章 游戏里的双休道侣', isPaid: true },
  { title: '第十章 游戏里的双休道侣', isPaid: true },
  { title: '第十一章 游戏里的双休道侣', isPaid: true },
];

defineEmits(['back', 'select-chapter']);
</script>

<style scoped>
/* Custom scrollbar for the chapter list */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #f0f0f0;
  border-radius: 10px;
}
</style>
