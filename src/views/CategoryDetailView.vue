<template>
  <div class="min-h-screen bg-[#F8F9FA] pb-10 font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <button class="p-1" @click="$emit('back')">
          <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="back" />
        </button>
        <h1 class="text-xl font-bold text-[#1A1A1A]">{{ categoryName }}</h1>
        <button class="p-1">
          <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
        </button>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-gray-400">正在获取书籍...</p>
    </div>

    <!-- Book List -->
    <main v-else class="p-4">
      <div class="bg-white rounded-2xl p-4 shadow-sm space-y-8">
        <div v-for="(book, index) in books" :key="index" class="flex gap-4 cursor-pointer active:opacity-70" @click="$emit('navigate', 'bookDetail', book.id)">
          <img :src="book.cover" class="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
          <div class="flex-1 flex flex-col justify-between py-1 overflow-hidden">
            <div>
              <h3 class="text-base font-bold line-clamp-1 leading-tight">{{ book.title }}</h3>
              <p class="text-sm text-gray-500 mt-2 line-clamp-1">{{ book.desc }}</p>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-2 text-xs text-gray-400">
                <span>{{ book.category }}</span>
                <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{{ book.words }}</span>
              </div>
              <span class="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">阅读{{ book.reads }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { getCategoryDetail } from '../services/api';

const props = defineProps({
  categoryId: {
    type: [String, Number],
    required: true
  },
  categoryName: {
    type: String,
    default: '分类详情'
  }
});

const emit = defineEmits(['back', 'navigate']);

const loading = ref(true);
const books = ref([]);

const normalizeBook = (book) => ({
  id: book.articleid,
  title: book.articlename,
  cover: book.icon,
  desc: book.intro,
  author: book.author,
  words: book.words ? `${(book.words / 10000).toFixed(1)}万字` : '未知',
  category: book.type_txt || '其他',
  reads: book.allvisit ? `${(book.allvisit / 10000).toFixed(1)}万` : '0'
});

const fetchBooks = async () => {
  loading.value = true;
  try {
    const data = await getCategoryDetail(props.categoryId);
    books.value = data.map(normalizeBook);
  } catch (error) {
    console.error('Fetch category detail error:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, 0);
  });
  fetchBooks();
});
</script>
