<template>
  <div class="min-h-screen bg-white font-sans text-[#333] flex flex-col">
    <!-- Header -->
    <header class="px-4 py-3 flex items-center justify-between border-b border-gray-50">
      <button @click="$emit('back')" class="p-1">
        <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="back" />
      </button>
      <h1 class="text-lg font-bold text-[#1A1A1A]">目录</h1>
      <div class="w-8"></div>
    </header>

    <main class="flex-1 flex flex-col">
      <!-- Loading State -->
      <div v-if="loading" class="flex-1 flex flex-col items-center justify-center gap-4">
        <div class="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-sm text-gray-400">正在加载目录...</p>
      </div>

      <!-- Catalog Sheet -->
      <CatalogSheet 
        v-else
        :novel="novel" 
        @select="$emit('select-chapter', $event)" 
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNovelDetail } from '../services/api';
import CatalogSheet from '../components/CatalogSheet.vue';

const props = defineProps({
  novelId: {
    type: [String, Number],
    required: true
  }
});

defineEmits(['back', 'select-chapter']);

const novel = ref(null);
const loading = ref(true);

const fetchCatalog = async () => {
  loading.value = true;
  try {
    const data = await getNovelDetail(props.novelId);
    novel.value = data;
  } catch (error) {
    console.error('Fetch catalog error:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCatalog);
</script>

<style scoped>
:deep(.rounded-t-\[32px\]) {
  border-radius: 0;
}
</style>
