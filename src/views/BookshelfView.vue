<template>
  <div class="min-h-screen bg-white pb-20 font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 border-b border-gray-50">
      <div class="flex items-center justify-between mb-2">
        <button class="p-1">
          <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="close" />
        </button>
        <h1 class="text-xl font-bold text-[#1A1A1A]">贵妃书斋</h1>
        <button class="p-1">
          <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
        </button>
      </div>

      <!-- Sub Header -->
      <div class="px-2 py-2">
        <template v-if="!isEditMode">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-6">
              <button 
                class="flex items-center gap-1 text-2xl font-bold transition-all"
                :class="activeTab === 'bookshelf' ? 'text-[#1A1A1A]' : 'text-gray-400 text-lg'"
                @click="activeTab = 'bookshelf'"
              >
                书架
              </button>
              <button 
                class="flex items-center gap-1 text-2xl font-bold transition-all"
                :class="activeTab === 'history' ? 'text-[#1A1A1A]' : 'text-gray-400 text-lg'"
                @click="activeTab = 'history'"
              >
                浏览历史
              </button>
            </div>
            <div class="flex items-center gap-4">
              <img src="/input_file_15.png" class="w-6 h-6 object-contain cursor-pointer active:opacity-70" alt="search" @click="$emit('search')" />
              <button class="text-base text-gray-600" @click="enterEditMode">编辑</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex items-center justify-between">
            <button class="text-lg text-gray-600" @click="toggleSelectAll">
              {{ isAllSelected ? '取消' : '全选' }}
            </button>
            <div class="text-center">
              <h2 class="text-lg font-bold">全部书籍</h2>
              <p class="text-xs text-gray-400">已选择 {{ selectedIds.length }} 本书</p>
            </div>
            <button class="text-lg text-gray-600" @click="exitEditMode">完成</button>
          </div>
        </template>
      </div>
    </header>

    <!-- Book Content -->
    <main class="px-4 py-4 flex-1 flex flex-col">
      <template v-if="isLoggedIn">
        <!-- Bookshelf Grid -->
        <div v-if="activeTab === 'bookshelf'" class="grid grid-cols-3 gap-x-4 gap-y-6">
          <div 
            v-for="book in books" 
            :key="book.id" 
            class="relative flex flex-col gap-2 cursor-pointer"
            @touchstart="handleTouchStart(book.id)"
            @touchend="handleTouchEnd"
            @mousedown="handleMouseDown(book.id)"
            @mouseup="handleMouseUp"
            @click="handleBookClick(book.id)"
          >
            <div class="relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-gray-50">
              <img :src="book.cover" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <!-- Selection Overlay -->
              <div 
                v-if="isEditMode" 
                class="absolute inset-0 bg-black/5 flex items-start justify-end p-1.5"
              >
                <div 
                  class="w-5 h-5 rounded-full border flex items-center justify-center transition-colors"
                  :class="selectedIds.includes(book.id) ? 'bg-[#7C4DFF] border-[#7C4DFF]' : 'bg-white/80 border-gray-300'"
                >
                  <img v-if="selectedIds.includes(book.id)" src="/input_file_5.png" class="w-3 h-3 object-contain" alt="check" />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-sm font-medium text-[#1A1A1A] line-clamp-2 leading-tight h-9">
                {{ book.title }}
              </h3>
              <p class="text-[10px] text-gray-400">{{ book.progress }}</p>
            </div>
          </div>
        </div>

        <!-- History List -->
        <div v-else class="space-y-8">
          <div v-for="item in historyBooks" :key="item.id" class="flex gap-4 cursor-pointer active:opacity-70" @click="emit('navigate', 'bookDetail', item.id)">
            <img :src="item.cover" class="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
            <div class="flex-1 flex flex-col justify-between py-1 overflow-hidden">
              <div class="flex justify-between items-start">
                <div class="flex-1 pr-2">
                  <h3 class="text-base font-bold line-clamp-1 leading-tight">
                    <span class="text-red-500">遮天</span>{{ item.titleSuffix }}
                  </h3>
                  <p class="text-xs text-gray-400 mt-2 line-clamp-1">{{ item.description }}</p>
                </div>
                <button 
                  class="px-3 py-1.5 rounded-full text-xs transition-all flex-shrink-0"
                  :class="item.isInBookshelf ? 'bg-gray-100 text-gray-400' : 'bg-gradient-to-r from-[#B388FF] to-[#7C4DFF] text-white shadow-sm'"
                  @click.stop="toggleInBookshelf(item)"
                >
                  {{ item.isInBookshelf ? '已加入书架' : '加入书架' }}
                </button>
              </div>
              <div class="flex items-center gap-2 text-xs text-gray-400 mt-2">
                <span v-for="(tag, idx) in item.tags" :key="idx">
                  {{ tag }}
                  <span v-if="idx < item.tags.length - 1" class="ml-1">·</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Not Logged In State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center py-20">
        <div class="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <img src="/input_file_38.png" class="w-16 h-16 object-contain opacity-20" alt="empty bookshelf" />
        </div>
        <p class="text-gray-400 text-sm mb-8">登录后可同步书架书籍</p>
        <button 
          class="px-12 py-3 bg-gradient-to-r from-[#B388FF] to-[#7C4DFF] text-white rounded-full font-bold shadow-lg shadow-[#7C4DFF]/20 active:scale-95 transition-transform"
          @click="$emit('navigate', 'login')"
        >
          去登录
        </button>
      </div>
    </main>

    <!-- Bottom Delete Bar -->
    <div 
      v-if="isEditMode" 
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 flex flex-col items-center justify-center gap-1 active:bg-gray-50 transition-colors"
      @click="deleteSelected"
    >
      <img src="/input_file_4.png" class="w-6 h-6 object-contain" alt="delete" />
      <span class="text-[10px] text-[#7C4DFF]">删除</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

const activeTab = ref('bookshelf');
const isEditMode = ref(false);
const selectedIds = ref([]);

const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['search', 'navigate']);

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, 0);
  });
});

const books = ref([
  { id: 1, title: '高手下山，我不会武功，...', progress: '1章/560章', cover: 'https://picsum.photos/seed/shelf1/200/300' },
  { id: 2, title: '高手下山', progress: '1章/560章', cover: 'https://picsum.photos/seed/shelf2/200/300' },
  { id: 3, title: '高手下山，我', progress: '1章/560章', cover: 'https://picsum.photos/seed/shelf3/200/300' },
  { id: 4, title: '高手.', progress: '1章/560章', cover: 'https://picsum.photos/seed/shelf4/200/300' },
  { id: 5, title: '高手下山，我不会.', progress: '1章/560章', cover: 'https://picsum.photos/seed/shelf5/200/300' },
  { id: 6, title: '高手下山，我不会武功，...', progress: '1章/560章', cover: 'https://picsum.photos/seed/shelf6/200/300' },
]);

const historyBooks = ref([
  { id: 101, titleSuffix: '之从蓝日开始', description: '行医第一方：让求医夫妻和离，...', tags: ['穿越', '205万字'], cover: 'https://picsum.photos/seed/hist1/200/300', isInBookshelf: true },
  { id: 102, titleSuffix: '之师兄说得对', description: '修仙觅长生，热血任逍遥，踏莲曳...', tags: ['穿越', '205万字'], cover: 'https://picsum.photos/seed/hist2/200/300', isInBookshelf: false },
  { id: 103, titleSuffix: '之深空彼岸', description: '浩瀚的宇宙中，一片星系的生灭', tags: ['穿越', '205万字'], cover: 'https://picsum.photos/seed/hist3/200/300', isInBookshelf: true },
  { id: 104, titleSuffix: '之我为长生仙', description: '仙神妖魔，王侯将相；龙女掌灯，...', tags: ['穿越', '205万字'], cover: 'https://picsum.photos/seed/hist4/200/300', isInBookshelf: true },
]);

const toggleInBookshelf = (item) => {
  item.isInBookshelf = !item.isInBookshelf;
  if (item.isInBookshelf) {
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

const isAllSelected = computed(() => {
  return books.value.length > 0 && selectedIds.value.length === books.value.length;
});

const enterEditMode = () => {
  isEditMode.value = true;
};

const exitEditMode = () => {
  isEditMode.value = false;
  selectedIds.value = [];
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = [];
  } else {
    selectedIds.value = books.value.map(b => b.id);
  }
};

const handleBookClick = (id) => {
  if (isEditMode.value) {
    const index = selectedIds.value.indexOf(id);
    if (index > -1) {
      selectedIds.value.splice(index, 1);
    } else {
      selectedIds.value.push(id);
    }
  } else {
    emit('navigate', 'bookDetail', id);
  }
};

const deleteSelected = () => {
  if (selectedIds.value.length === 0) return;
  
  ElMessageBox.confirm(
    `确定要将选中的 ${selectedIds.value.length} 本书移出书架吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      roundButton: true
    }
  ).then(() => {
    books.value = books.value.filter(b => !selectedIds.value.includes(b.id));
    ElMessage({
      type: 'success',
      message: '已成功移出书架',
    });
    exitEditMode();
  }).catch(() => {
    // Cancelled
  });
};

// Long press logic
let pressTimer = null;

const handleTouchStart = (id) => {
  if (isEditMode.value) return;
  pressTimer = setTimeout(() => {
    enterEditMode();
    selectedIds.value = [id];
  }, 600);
};

const handleTouchEnd = () => {
  clearTimeout(pressTimer);
};

const handleMouseDown = (id) => {
  if (isEditMode.value) return;
  pressTimer = setTimeout(() => {
    enterEditMode();
    selectedIds.value = [id];
  }, 600);
};

const handleMouseUp = () => {
  clearTimeout(pressTimer);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
