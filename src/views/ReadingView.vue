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
          <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="back" />
        </button>
        <h1 class="text-lg font-medium text-[#1A1A1A] truncate max-w-[60%]">{{ novelTitle }}</h1>
        <button class="p-1">
          <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
        </button>
      </header>
    </transition>

    <!-- Reading Content -->
    <main 
      ref="contentRef"
      class="flex-1 pt-20 pb-10"
      :class="[
        pageMode === 'scroll' ? 'overflow-y-auto scroll-smooth px-6' : 'horizontal-read',
        pageMode === 'slide' ? 'scroll-smooth' : ''
      ]"
      :style="{ fontSize: fontSize + 'px', lineHeight: 1.8 }"
      @scroll="handleScroll"
      @click.stop="handleContentClick"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div :class="pageMode === 'scroll' ? 'max-w-2xl mx-auto' : 'h-full contents'">
        <!-- Loading State (Initial) -->
        <div v-if="loading && displayedChapters.length === 0" class="flex flex-col items-center justify-center py-20 gap-4">
          <div class="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-sm text-gray-400">正在加载章节...</p>
        </div>

        <template v-else>
          <div 
            v-for="(chapter, index) in displayedChapters" 
            :key="chapter.chapter.chapterid"
            class="chapter-section"
            :class="{ 'mb-20': pageMode === 'scroll' }"
            :data-chapter-id="chapter.chapter.chapterid"
          >
            <h2 class="text-center font-bold mb-10" :style="{ fontSize: (fontSize + 4) + 'px' }">
              {{ chapter.chapter.chaptername }}
            </h2>
            
            <div class="space-y-6 whitespace-pre-wrap break-words">
              {{ chapter.content }}
            </div>

            <!-- Paywall -->
            <div v-if="chapter.need_buy" class="mt-12 pt-12 border-t border-gray-200/30 text-center">
              <p class="text-sm text-gray-400 mb-8">本章为VIP章节，请购买后继续阅读</p>
              <div class="space-y-4 px-4">
                <button class="w-full py-4 bg-[#9FA8DA] text-white rounded-full font-medium shadow-sm active:opacity-90">
                  购买本章 <span class="text-xs opacity-80 ml-1">{{ chapter.chapter.saleprice }} 阅币</span>
                </button>
                <button class="w-full py-4 bg-[#D1D9FF] text-[#7C4DFF] rounded-full font-medium active:opacity-90">
                  充值会员
                </button>
              </div>
              <p class="text-xs text-gray-400 mt-4">充值会员后所有书籍免费阅读</p>
            </div>

            <!-- Next Chapter Trigger (Invisible sentinel) -->
            <div 
              v-if="index === displayedChapters.length - 1 && nextChapterId && !chapter.need_buy" 
              ref="loadMoreRef"
              class="inline-block"
              :class="pageMode === 'scroll' ? 'h-10 w-full' : 'h-full w-10'"
            ></div>
          </div>

          <!-- Loading Next Chapter Indicator -->
          <div v-if="loadingNext" class="flex flex-col items-center justify-center py-10 gap-2" :class="{ 'inline-flex h-full px-10': pageMode !== 'scroll' }">
            <div class="w-6 h-6 border-2 border-[#7C4DFF] border-t-transparent rounded-full animate-spin"></div>
            <p class="text-xs text-gray-400">正在加载下一章...</p>
          </div>
          
          <!-- End of Book -->
          <div v-if="!nextChapterId && displayedChapters.length > 0" class="py-20 text-center text-gray-400 text-sm" :class="{ 'inline-block h-full px-20 pt-40': pageMode !== 'scroll' }">
            - 已读完本书 -
          </div>
        </template>
      </div>
    </main>

    <!-- Floating Buttons -->
    <div v-if="showMenu" class="fixed right-4 bottom-72 flex flex-col gap-4 z-40">
      <button class="w-12 h-12 bg-white rounded-full shadow-lg flex flex-col items-center justify-center border border-gray-100 active:scale-95 transition-transform">
        <img src="/vuesax_linear_music-play@2x.png" class="w-5 h-5 object-contain" alt="listen" />
        <span class="text-[8px] text-gray-400">听书</span>
      </button>
      <button class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 active:scale-95 transition-transform" @click.stop="triggerToast">
        <img src="/vuesax_linear_music-play_1@2x.png" class="w-6 h-6 object-contain" alt="add" />
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
          <button 
            class="text-sm text-gray-500 disabled:opacity-30" 
            :disabled="!prevChapterId"
            @click="goToChapter(prevChapterId)"
          >上一章</button>
          <div class="flex-1 h-1 bg-gray-200 rounded-full relative">
            <div class="absolute left-0 top-0 h-full bg-[#7C4DFF] rounded-full" :style="{ width: progress + '%' }"></div>
            <div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#7C4DFF] rounded-full shadow-sm" :style="{ left: progress + '%' }"></div>
          </div>
          <button 
            class="text-sm text-gray-500 disabled:opacity-30" 
            :disabled="!nextChapterId"
            @click="goToChapter(nextChapterId)"
          >下一章</button>
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
              <button @click="fontSize = Math.max(12, fontSize - 2)" class="px-4 py-1 text-sm">A-</button>
              <span class="text-sm font-medium">{{ fontSize }}</span>
              <button @click="fontSize = Math.min(40, fontSize + 2)" class="px-4 py-1 text-sm">A+</button>
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

    <!-- Toast -->
    <transition name="fade">
      <div v-if="showToast" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-black/70 text-white px-6 py-3 rounded-xl text-sm">
        已加入书架
      </div>
    </transition>

    <!-- Catalog Popup -->
    <transition name="slide-up">
      <div v-if="showCatalogPopup" class="fixed inset-0 z-[60] flex flex-col">
        <div class="absolute inset-0 bg-black/40" @click="showCatalogPopup = false"></div>
        <div class="mt-auto h-[80vh] relative z-10">
          <CatalogSheet 
            :novel="novelData" 
            :currentChapterId="currentChapterId"
            @select="goToChapter" 
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { getChapterContent, getNovelDetail } from '../services/api';
import { ElMessage } from 'element-plus';
import CatalogSheet from '../components/CatalogSheet.vue';

const props = defineProps({
  novelId: {
    type: [String, Number],
    required: true
  },
  chapterId: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['back', 'catalog', 'update-chapter']);

const contentRef = ref(null);
const loadMoreRef = ref(null);
const showMenu = ref(false);
const activeSubMenu = ref('none');
const showToast = ref(false);
const loading = ref(false);
const showCatalogPopup = ref(false);

let observer = null;

const setupObserver = () => {
  if (observer) observer.disconnect();
  
  // In Vue 3, refs inside v-for are arrays. 
  // We need the actual element (the first one since it's only rendered for the last item)
  const target = Array.isArray(loadMoreRef.value) ? loadMoreRef.value[0] : loadMoreRef.value;

  if (!target) return;

  observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    // Only trigger if intersecting and NOT already loading
    if (entry.isIntersecting && !loadingNext.value && nextChapterId.value) {
      const nextId = nextChapterId.value;
      if (!displayedChapters.value.some(c => Number(c.chapter.chapterid) === Number(nextId))) {
        loadingNext.value = true;
        fetchChapter(nextId, true);
      }
    }
  }, {
    root: null,
    threshold: 0,
    rootMargin: '100px' // Trigger when 100px from viewport
  });

  observer.observe(target);
};

watch(loadMoreRef, (newVal) => {
  const el = Array.isArray(newVal) ? newVal[0] : newVal;
  if (el) setupObserver();
}, { deep: true });

const fontSize = ref(Number(localStorage.getItem('reading-font-size')) || 18);
const bgColor = ref(localStorage.getItem('reading-bg-color') || '#FFFFFF');
const brightness = ref(30);
const pageMode = ref('scroll');
const isDarkMode = ref(false);

const novelData = ref(null);
const novelTitle = ref('');
const displayedChapters = ref([]);
const chapterList = ref([]);
const loadingNext = ref(false);

const currentChapterId = ref(Number(props.chapterId));

const currentChapterIndex = computed(() => {
  if (!chapterList.value.length || !currentChapterId.value) return -1;
  return chapterList.value.findIndex(c => c.chapterid === Number(currentChapterId.value));
});

const prevChapterId = computed(() => {
  const index = currentChapterIndex.value;
  if (index > 0) return chapterList.value[index - 1].chapterid;
  return null;
});

const nextChapterId = computed(() => {
  if (!chapterList.value.length || displayedChapters.value.length === 0) return null;
  
  const lastChapter = displayedChapters.value[displayedChapters.value.length - 1];
  if (!lastChapter || !lastChapter.chapter) return null;
  
  const lastId = Number(lastChapter.chapter.chapterid);
  const index = chapterList.value.findIndex(c => Number(c.chapterid) === lastId);
  
  if (index >= 0 && index < chapterList.value.length - 1) {
    return chapterList.value[index + 1].chapterid;
  }
  return null;
});

const progress = computed(() => {
  if (!chapterList.value.length || currentChapterIndex.value === -1) return 0;
  return ((currentChapterIndex.value + 1) / chapterList.value.length) * 100;
});

const fetchNovelInfo = async () => {
  try {
    const data = await getNovelDetail(props.novelId);
    novelData.value = data;
    novelTitle.value = data.articlename;
    chapterList.value = data.chapter || [];
  } catch (error) {
    console.error('Fetch novel info error:', error);
  }
};

const chapterCache = new Map();

const fetchChapter = async (cid, isAppend = false) => {
  if (chapterCache.has(cid)) {
    const data = chapterCache.get(cid);
    if (isAppend) {
      displayedChapters.value.push(data);
    } else {
      displayedChapters.value = [data];
    }
    loading.value = false;
    loadingNext.value = false;
    return;
  }

  try {
    const data = await getChapterContent(props.novelId, cid);
    chapterCache.set(cid, data);
    if (isAppend) {
      displayedChapters.value.push(data);
    } else {
      displayedChapters.value = [data];
    }
  } catch (error) {
    console.error('Fetch chapter error:', error);
    ElMessage.error('获取章节内容失败');
  } finally {
    loading.value = false;
    loadingNext.value = false;
  }
};

const checkAutoLoad = () => {
  if (!contentRef.value || loadingNext.value || !nextChapterId.value) return;
  
  const scroller = contentRef.value;
  
  if (pageMode.value === 'scroll') {
    const scrollBottom = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
    if (scrollBottom < 100) {
      const nextId = nextChapterId.value;
      if (!displayedChapters.value.some(c => Number(c.chapter.chapterid) === Number(nextId))) {
        loadingNext.value = true;
        fetchChapter(nextId, true);
      }
    }
  } else {
    // Horizontal check
    const scrollRight = scroller.scrollWidth - scroller.scrollLeft - scroller.clientWidth;
    if (scrollRight < 100) {
      const nextId = nextChapterId.value;
      if (!displayedChapters.value.some(c => Number(c.chapter.chapterid) === Number(nextId))) {
        loadingNext.value = true;
        fetchChapter(nextId, true);
      }
    }
  }
};

const goToChapter = async (cid) => {
  if (!cid) return;
  
  loading.value = true;
  showMenu.value = false;
  showCatalogPopup.value = false;
  currentChapterId.value = Number(cid);
  
  await fetchChapter(cid, false);
  
  emit('update-chapter', cid);
  
  if (contentRef.value) {
    if (pageMode.value === 'scroll') {
      contentRef.value.scrollTop = 0;
    } else {
      contentRef.value.scrollLeft = 0;
    }
  }
};

const handleScroll = () => {
  if (!contentRef.value) return;
  updateActiveChapter();
  checkAutoLoad();
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  if (!showMenu.value) activeSubMenu.value = 'none';
};

const handleContentClick = (e) => {
  if (showMenu.value) {
    showMenu.value = false;
    activeSubMenu.value = 'none';
    return;
  }
  
  const x = e.clientX;
  const y = e.clientY;
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  // Check if click is in the center 3x3 cell (5th cell)
  const isInCenter = x > w / 3 && x < (w * 2) / 3 && y > h / 3 && y < (h * 2) / 3;
  
  if (isInCenter) {
    toggleMenu();
  } else {
    // All other areas trigger pagination
    if (x < w / 2) {
      prevPage();
    } else {
      nextPage();
    }
  }
};

const nextPage = () => {
  if (!contentRef.value) return;
  const scroller = contentRef.value;
  
  if (pageMode.value === 'scroll') {
    const targetScroll = scroller.scrollTop + scroller.clientHeight - 40;
    scroller.scrollTop = targetScroll;
  } else {
    // Horizontal page turn
    const targetScroll = scroller.scrollLeft + scroller.clientWidth;
    scroller.scrollLeft = targetScroll;
  }
  
  // Check if we need to load more
  setTimeout(() => {
    checkAutoLoad();
    updateActiveChapter();
  }, 350);
};

const prevPage = () => {
  if (!contentRef.value) return;
  const scroller = contentRef.value;
  
  if (pageMode.value === 'scroll') {
    const targetScroll = Math.max(0, scroller.scrollTop - scroller.clientHeight + 40);
    scroller.scrollTop = targetScroll;
  } else {
    // Horizontal page turn
    const targetScroll = Math.max(0, scroller.scrollLeft - scroller.clientWidth);
    scroller.scrollLeft = targetScroll;
  }
  
  setTimeout(updateActiveChapter, 350);
};

const updateActiveChapter = () => {
  if (!contentRef.value) return;
  const sections = contentRef.value.querySelectorAll('.chapter-section');
  let activeId = currentChapterId.value;
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (pageMode.value === 'scroll') {
      if (rect.top < window.innerHeight / 2) {
        activeId = Number(section.getAttribute('data-chapter-id'));
      }
    } else {
      // Horizontal check: if the section is visible in the viewport
      if (rect.left < window.innerWidth / 2 && rect.right > window.innerWidth / 2) {
        activeId = Number(section.getAttribute('data-chapter-id'));
      }
    }
  });
  
  if (Number(activeId) !== Number(currentChapterId.value)) {
    currentChapterId.value = activeId;
    emit('update-chapter', activeId);
  }
};

let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  if (pageMode.value === 'scroll') return;
  
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  
  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;
  
  // Horizontal swipe
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
    if (dx < 0) {
      nextPage();
    } else {
      prevPage();
    }
  }
};

const handleTabClick = (id) => {
  if (id === 'catalog') {
    showCatalogPopup.value = true;
    showMenu.value = false;
  } else if (id === 'mode') {
    isDarkMode.value = !isDarkMode.value;
  } else {
    activeSubMenu.value = activeSubMenu.value === id ? 'none' : id;
  }
};

const triggerToast = () => {
  showToast.value = true;
  setTimeout(() => showToast.value = false, 2000);
};

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
];

const tabs = computed(() => [
  { id: 'catalog', label: '目录', icon: '/input_file_39.png' },
  { id: 'brightness', label: '亮度', icon: '/input_file_40.png' },
  { id: 'mode', label: isDarkMode.value ? '白天' : '黑夜', icon: isDarkMode.value ? '/input_file_40.png' : '/input_file_41.png' },
  { id: 'settings', label: '设置', icon: '/input_file_17.png' },
]);

const currentBgColor = computed(() => isDarkMode.value ? '#121212' : bgColor.value);
const textColor = computed(() => isDarkMode.value ? '#999' : '#1A1A1A');

watch(fontSize, (val) => localStorage.setItem('reading-font-size', val));
watch(bgColor, (val) => localStorage.setItem('reading-bg-color', val));

onMounted(async () => {
  loading.value = true;
  await fetchNovelInfo();
  await fetchChapter(props.chapterId, false);
  nextTick(() => {
    if (contentRef.value) {
      if (pageMode.value === 'scroll') {
        contentRef.value.scrollTop = 0;
      } else {
        contentRef.value.scrollLeft = 0;
      }
    }
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

watch(() => props.chapterId, (newId) => {
  if (Number(currentChapterId.value) !== Number(newId)) {
    goToChapter(newId);
  }
});
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.horizontal-read {
  display: block;
  column-width: 100vw;
  column-gap: 0;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: normal;
  padding: 0 24px;
}

.horizontal-read .chapter-section {
  display: block;
  width: auto;
  height: 100%;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.indent-8 {
  text-indent: 2em;
}
</style>
