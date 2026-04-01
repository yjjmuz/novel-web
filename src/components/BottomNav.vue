<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2 px-4 z-20">
    <button 
      v-for="item in navItems" 
      :key="item.id"
      @click="$emit('navigate', item.id)"
      class="flex flex-col items-center gap-1 relative"
    >
      <div class="relative">
        <img 
          :src="activeId === item.id ? item.activeIcon : item.inactiveIcon" 
          class="w-6 h-6 object-contain"
          alt="nav icon"
        />
      </div>
      <span :class="['text-[10px]', activeId === item.id ? 'text-[#7C4DFF] font-bold' : 'text-gray-400']">
        {{ item.name }}
      </span>
    </button>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  activeId: {
    type: String,
    default: 'home'
  }
});

defineEmits(['navigate']);

const navItems = [
  { 
    id: 'home', 
    name: '首页', 
    activeIcon: '/input_file_28.png', 
    inactiveIcon: '/home_inactive.png'
  },
  { 
    id: 'category', 
    name: '分类', 
    activeIcon: '/input_file_7.png', 
    inactiveIcon: '/category_inactive.png' 
  },
  { 
    id: 'bookshelf', 
    name: '书架', 
    activeIcon: '/input_file_20.png', 
    inactiveIcon: '/input_file_38.png' 
  },
  { 
    id: 'profile', 
    name: '我的', 
    activeIcon: '/input_file_56.png', 
    inactiveIcon: '/profile_inactive.png'
  },
];
</script>
