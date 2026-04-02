<template>
  <div class="flex flex-col h-full bg-white rounded-t-[32px] shadow-2xl overflow-hidden">
    <!-- Book Info Header -->
    <div class="px-6 pt-8 pb-4 flex items-center gap-4">
      <div class="w-14 h-18 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
        <img :src="novel?.icon" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div class="flex-1 overflow-hidden">
        <h3 class="text-lg font-bold text-[#1A1A1A] truncate">{{ novel?.articlename }}</h3>
        <p class="text-xs text-gray-400 mt-1">作者：{{ novel?.author }}</p>
      </div>
    </div>

    <!-- Catalog Title -->
    <div class="px-6 py-4 flex items-baseline gap-2 border-b border-gray-50">
      <h2 class="text-lg font-bold text-[#1A1A1A]">目录</h2>
      <span class="text-xs text-gray-400">({{ novel?.chapter?.length || 0 }}章)</span>
    </div>

    <!-- Chapter List -->
    <div class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
      <div 
        v-for="(chapter, idx) in novel?.chapter" 
        :key="idx" 
        class="flex items-center justify-between active:opacity-60 transition-opacity cursor-pointer"
        :class="{ 'text-[#7C4DFF] font-medium': Number(currentChapterId) === Number(chapter.chapterid) }"
        @click="$emit('select', chapter.chapterid)"
      >
        <span class="text-sm" :class="Number(currentChapterId) === Number(chapter.chapterid) ? 'text-[#7C4DFF]' : 'text-gray-600'">
          {{ chapter.chaptername }}
        </span>
        <div v-if="chapter.isvip" class="bg-[#F3E5F5] text-[#7C4DFF] text-[9px] px-1.5 py-0.5 rounded">
          付费
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  novel: Object,
  currentChapterId: [String, Number]
});
defineEmits(['select']);
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #f0f0f0;
  border-radius: 10px;
}
</style>
