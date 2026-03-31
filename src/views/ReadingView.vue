<template>
  <div 
    class="min-h-screen transition-colors duration-300 relative overflow-hidden flex flex-col"
    :style="{ backgroundColor: currentBgColor, color: textColor }"
    @click="toggleMenu"
  >
    <!-- Top Bar -->
    <transition name="slide-down">
      <header 
        v-if="showMenu" 
        class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-gray-100"
        @click.stop
      >
        <button @click="$emit('back')" class="p-1">
          <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="close" />
        </button>
        <h1 class="text-lg font-medium text-[#1A1A1A]">贵妃书斋</h1>
        <button class="p-1">
          <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
        </button>
      </header>
    </transition>

    <!-- Reading Content -->
    <main 
      class="flex-1 overflow-y-auto px-6 pt-20 pb-10"
      :style="{ fontSize: fontSize + 'px', lineHeight: 1.8 }"
    >
      <div class="max-w-2xl mx-auto">
        <h2 class="text-center font-bold mb-10" :style="{ fontSize: (fontSize + 4) + 'px' }">
          {{ chapterTitle }}
        </h2>
        
        <div class="space-y-6">
          <p v-for="(p, i) in content" :key="i" class="indent-8">
            {{ p }}
          </p>
        </div>

        <!-- Paywall -->
        <div v-if="isPaidChapter" class="mt-12 pt-12 border-t border-gray-200/30 text-center">
          <p class="text-sm text-gray-400 mb-8">免费章节已阅读完毕，请购买本书后继续阅读</p>
          <div class="space-y-4 px-4">
            <button class="w-full py-4 bg-[#9FA8DA] text-white rounded-full font-medium shadow-sm active:opacity-90">
              购买本书 <span class="text-xs opacity-80 ml-1">¥7 <del>¥57</del></span>
            </button>
            <button class="w-full py-4 bg-[#D1D9FF] text-[#7C4DFF] rounded-full font-medium active:opacity-90">
              充值会员
            </button>
          </div>
          <p class="text-xs text-gray-400 mt-4">充值会员后所有书籍免费阅读</p>
        </div>
      </div>
    </main>

    <!-- Floating Buttons -->
    <div v-if="!showMenu" class="fixed right-4 bottom-24 flex flex-col gap-4 z-40">
      <button class="w-12 h-12 bg-white rounded-full shadow-lg flex flex-col items-center justify-center border border-gray-100 active:scale-95 transition-transform">
        <img src="/input_file_54.png" class="w-5 h-5 object-contain" alt="listen" />
        <span class="text-[8px] text-gray-400">听书</span>
      </button>
      <button class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 active:scale-95 transition-transform">
        <img src="/input_file_18.png" class="w-6 h-6 object-contain" alt="add" />
      </button>
    </div>

    <!-- Bottom Menu -->
    <transition name="slide-up">
      <div 
        v-if="showMenu" 
        class="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 pt-4 pb-8"
        @click.stop
      >
        <!-- Progress Slider -->
        <div v-if="activeSubMenu === 'none'" class="flex items-center gap-4 mb-6">
          <button class="text-sm text-gray-500">上一章</button>
          <div class="flex-1 h-1 bg-gray-200 rounded-full relative">
            <div class="absolute left-0 top-0 h-full bg-[#7C4DFF] rounded-full" style="width: 30%"></div>
            <div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#7C4DFF] rounded-full shadow-sm" style="left: 30%"></div>
          </div>
          <button class="text-sm text-gray-500">下一章</button>
        </div>

        <!-- Brightness Slider -->
        <div v-if="activeSubMenu === 'brightness'" class="flex items-center gap-4 mb-6">
          <span class="text-xs text-gray-400">亮度-</span>
          <div class="flex-1 h-1 bg-gray-200 rounded-full relative">
            <div class="absolute left-0 top-0 h-full bg-[#7C4DFF] rounded-full" :style="{ width: brightness + '%' }"></div>
            <div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#7C4DFF] rounded-full shadow-sm" :style="{ left: brightness + '%' }"></div>
          </div>
          <span class="text-xs text-gray-400">亮度+</span>
        </div>

        <!-- Settings Panel -->
        <div v-if="activeSubMenu === 'settings'" class="space-y-6 mb-6">
          <!-- Font Size -->
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-400 w-10">字号</span>
            <div class="flex-1 flex items-center justify-between bg-gray-50 rounded-full p-1">
              <button @click="fontSize--" class="px-4 py-1 text-sm">A-</button>
              <span class="text-sm font-medium">{{ fontSize }}</span>
              <button @click="fontSize++" class="px-4 py-1 text-sm">A+</button>
            </div>
          </div>
          <!-- Background -->
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-400 w-10">背景</span>
            <div class="flex-1 flex items-center justify-between">
              <button 
                v-for="bg in bgOptions" 
                :key="bg.color"
                @click="bgColor = bg.color"
                class="w-8 h-8 rounded-full border border-gray-200"
                :class="{ 'ring-2 ring-[#7C4DFF] ring-offset-2': bgColor === bg.color }"
                :style="{ backgroundColor: bg.color }"
              ></button>
            </div>
          </div>
          <!-- Page Mode -->
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-400 w-10">翻页</span>
            <div class="flex-1 flex items-center gap-2">
              <button 
                v-for="mode in pageModes" 
                :key="mode.value"
                @click="pageMode = mode.value"
                class="flex-1 py-1.5 text-xs rounded-full border transition-colors"
                :class="pageMode === mode.value ? 'bg-[#7C4DFF] text-white border-[#7C4DFF]' : 'bg-white text-gray-600 border-gray-200'"
              >
                {{ mode.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Main Tabs -->
        <div class="flex items-center justify-between">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="handleTabClick(tab.id)"
            class="flex flex-col items-center gap-1"
            :class="activeSubMenu === tab.id ? 'text-[#7C4DFF]' : 'text-gray-600'"
          >
            <img :src="tab.icon" class="w-6 h-6 object-contain" :alt="tab.label" />
            <span class="text-[10px]">{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- Catalog Drawer -->
    <transition name="fade">
      <div v-if="showCatalog" class="fixed inset-0 z-[60] bg-black/40" @click="showCatalog = false">
        <transition name="slide-left">
          <div class="w-[85%] h-full bg-white flex flex-col" @click.stop>
            <div class="p-6 border-b border-gray-50">
              <div class="flex gap-4 mb-6">
                <img src="https://picsum.photos/seed/reader_cover/200/300" class="w-16 h-20 object-cover rounded shadow-sm" referrerPolicy="no-referrer" />
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-[#1A1A1A]">苟在妖武乱世修仙</h3>
                  <p class="text-sm text-gray-400 mt-1">作者：拿钱吃饭</p>
                </div>
                <img src="/input_file_0.png" class="w-5 h-5 object-contain text-gray-300 self-center" alt="arrow" />
              </div>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-[#1A1A1A]">目录 <span class="text-sm font-normal text-gray-400 ml-2">(1233章)</span></h2>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto">
              <div 
                v-for="(chapter, idx) in allChapters" 
                :key="idx"
                class="px-6 py-4 flex items-center justify-between active:bg-gray-50"
                @click="selectChapter(idx)"
              >
                <span class="text-sm text-gray-600">{{ chapter.title }}</span>
                <span v-if="chapter.isPaid" class="text-[10px] text-[#7C4DFF] bg-[#F3E5F5] px-2 py-0.5 rounded">付费章节</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="showToast" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-black/70 text-white px-6 py-3 rounded-xl text-sm">
        已加入书架
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['back']);

const showMenu = ref(false);
const showCatalog = ref(false);
const activeSubMenu = ref('none'); // 'none', 'brightness', 'settings'
const showToast = ref(false);

const fontSize = ref(18);
const bgColor = ref('#FFFFFF');
const brightness = ref(30);
const pageMode = ref('scroll');
const isDarkMode = ref(false);

const chapterTitle = '苟在妖武乱世修仙';
const content = [
  '“拒绝了？”',
  '方夕脸色有些难看地瞪着阿福。',
  '阿福低着头，满是忐忑：“老奴耗费重金，找了中人，也承诺可以再加钱，奈何……”',
  '方夕深深呼吸了一口气。',
  '作为修仙者，他何时受过这种屈辱？',
  '……好吧，在青竹山坊市经常受这种屈辱，都特么快习惯了。',
  '习惯就好，习惯就好啊。',
  '“罢了，想来是我资质一般，别人看不上眼。”',
  '他耸耸肩膀。',
  '作为修仙者，哪怕是最低层次，耳聪目明，过目不忘的本事还是有的。',
  '习惯就好，习惯就好啊。',
  '“罢了，想来是我资质一般，别人看不上眼。”',
];

const isPaidChapter = ref(true);

const bgOptions = [
  { color: '#FFFFFF' },
  { color: '#E1BEE7' },
  { color: '#F5F5DC' },
  { color: '#E0F2F1' },
  { color: '#B0BEC5' },
];

const pageModes = [
  { label: '上下', value: 'scroll' },
  { label: '平移', value: 'slide' },
  { label: '无', value: 'none' },
  { label: '翻页', value: 'flip' },
];

const tabs = computed(() => [
  { id: 'catalog', label: '目录', icon: '/input_file_39.png' },
  { id: 'brightness', label: '亮度', icon: '/input_file_40.png' },
  { id: 'mode', label: isDarkMode.value ? '白天' : '黑夜', icon: isDarkMode.value ? '/input_file_40.png' : '/input_file_41.png' },
  { id: 'settings', label: '设置', icon: '/input_file_17.png' },
]);

const allChapters = [
  { title: '第一章 重生反馈开始前', isPaid: false },
  { title: '第二章 游戏里的双休道侣', isPaid: false },
  { title: '第三章 异常的排行榜', isPaid: false },
  { title: '第四章 修为排行榜第一', isPaid: false },
  { title: '第五章 游戏里的双休道侣', isPaid: false },
  { title: '第六章 长河宗宗主', isPaid: false },
  { title: '第七章 买什么车，都充游戏', isPaid: true },
  { title: '第八章 游戏里的双休道侣', isPaid: true },
  { title: '第九章 游戏里的双休道侣', isPaid: true },
];

const currentBgColor = computed(() => isDarkMode.value ? '#121212' : bgColor.value);
const textColor = computed(() => isDarkMode.value ? '#999' : '#1A1A1A');

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  if (!showMenu.value) activeSubMenu.value = 'none';
};

const handleTabClick = (id) => {
  if (id === 'catalog') {
    showCatalog.value = true;
    showMenu.value = false;
  } else if (id === 'mode') {
    isDarkMode.value = !isDarkMode.value;
  } else {
    activeSubMenu.value = activeSubMenu.value === id ? 'none' : id;
  }
};

const selectChapter = (idx) => {
  showCatalog.value = false;
  // Handle chapter selection
};

const triggerToast = () => {
  showToast.value = true;
  setTimeout(() => showToast.value = false, 2000);
};
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: transform 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-100%);
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from, .slide-left-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.indent-8 {
  text-indent: 2em;
}
</style>
