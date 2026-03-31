<template>
  <header class="sticky top-0 z-10 bg-[#F8F9FA] px-4 pt-4 pb-2">
    <div class="flex items-center justify-between mb-4">
      <button class="p-1">
        <X class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-xl font-bold text-[#1A1A1A]">贵妃书斋</h1>
      <button class="p-1">
        <MoreHorizontal class="w-6 h-6 text-gray-600" />
      </button>
    </div>
    
    <div class="relative flex items-center gap-3">
      <div class="relative flex-1 cursor-pointer" @click="$emit('search')">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <div 
          class="w-full bg-white rounded-full py-2 pl-10 pr-4 text-sm text-gray-400 shadow-sm border border-transparent active:border-orange-400 transition-all"
        >
          龙骑战机·热血爆燃
        </div>
      </div>
      <div class="relative">
        <CalendarCheck class="w-6 h-6 text-gray-700" />
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full scale-75">签到</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { X, MoreHorizontal, Search, CalendarCheck } from 'lucide-vue-next';
</script>
