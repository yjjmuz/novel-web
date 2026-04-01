<template>
  <div class="px-4 py-2">
    <div class="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-sm">
      <div 
        class="flex transition-transform duration-500 ease-out h-full"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(banner, index) in banners" 
          :key="index"
          class="w-full h-full flex-shrink-0"
        >
          <img :src="banner" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
      
      <!-- Indicators -->
      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        <div 
          v-for="(_, index) in banners" 
          :key="index"
          class="w-1.5 h-1.5 rounded-full transition-all duration-300"
          :class="currentIndex === index ? 'bg-white w-3' : 'bg-white/50'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const banners = [
  'https://picsum.photos/seed/banner1/800/340',
  'https://picsum.photos/seed/banner2/800/340',
  'https://picsum.photos/seed/banner3/800/340',
];

const currentIndex = ref(0);
let timer = null;

const startTimer = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % banners.length;
  }, 3000);
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
