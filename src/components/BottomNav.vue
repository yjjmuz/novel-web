<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2 px-4 z-20">
    <button 
      v-for="item in navItems" 
      :key="item.id"
      @click="$emit('navigate', item.id)"
      class="flex flex-col items-center gap-1 relative"
    >
      <div class="relative">
        <component 
          :is="item.icon" 
          :class="['w-6 h-6', activeId === item.id ? 'text-[#7C4DFF]' : 'text-gray-400']" 
        />
        <!-- Notification Dot -->
        <span 
          v-if="item.id === 'bookshelf'" 
          class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full border border-white"
        ></span>
      </div>
      <span :class="['text-[10px]', activeId === item.id ? 'text-[#7C4DFF] font-bold' : 'text-gray-400']">
        {{ item.name }}
      </span>
    </button>
  </nav>
</template>

<script setup>
import { Home, LayoutGrid, BookOpen, User } from 'lucide-vue-next';

defineProps({
  activeId: {
    type: String,
    default: 'home'
  }
});

defineEmits(['navigate']);

const navItems = [
  { id: 'home', name: '首页', icon: Home },
  { id: 'category', name: '分类', icon: LayoutGrid },
  { id: 'bookshelf', name: '书架', icon: BookOpen },
  { id: 'profile', name: '我的', icon: User },
];
</script>
