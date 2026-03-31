<template>
  <div class="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
    <HomeView 
      v-if="currentView === 'home'" 
      @search="currentView = 'search'" 
      @navigate="currentView = $event"
    />
    <CategoryView 
      v-else-if="currentView === 'category'" 
      @select-category="handleSelectCategory" 
    />
    <CategoryDetailView 
      v-else-if="currentView === 'categoryDetail'" 
      :categoryName="selectedCategory" 
      @back="currentView = 'category'" 
      @navigate="currentView = $event"
    />
    <SearchView 
      v-else-if="currentView === 'search'" 
      @back="currentView = 'home'" 
      @navigate="currentView = $event"
    />
    <BookshelfView 
      v-else-if="currentView === 'bookshelf'" 
      @search="currentView = 'search'"
      @navigate="currentView = $event"
    />
    <ProfileView 
      v-else-if="currentView === 'profile'" 
      @navigate="currentView = $event"
    />
    <ProfileSettingsView
      v-else-if="currentView === 'profileSettings'"
      @back="currentView = 'profile'"
    />
    <BookDetailView
      v-else-if="currentView === 'bookDetail'"
      @back="currentView = 'home'"
      @read="currentView = 'reading'"
    />
    <ReadingView 
      v-else-if="currentView === 'reading'" 
      @back="currentView = 'bookDetail'" 
    />
    <LoginView
      v-else-if="currentView === 'login'"
      @back="currentView = 'home'"
      @login-success="currentView = 'home'"
    />
    <div v-else class="flex items-center justify-center h-screen text-gray-400">
      {{ currentView }} 页面正在开发中...
    </div>

    <BottomNav 
      v-if="!['categoryDetail', 'search', 'profileSettings', 'bookDetail', 'reading', 'login'].includes(currentView)" 
      :activeId="currentView" 
      @navigate="currentView = $event" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HomeView from './views/HomeView.vue';
import CategoryView from './views/CategoryView.vue';
import CategoryDetailView from './views/CategoryDetailView.vue';
import SearchView from './views/SearchView.vue';
import BookshelfView from './views/BookshelfView.vue';
import ProfileView from './views/ProfileView.vue';
import ProfileSettingsView from './views/ProfileSettingsView.vue';
import BookDetailView from './views/BookDetailView.vue';
import ReadingView from './views/ReadingView.vue';
import LoginView from './views/LoginView.vue';
import BottomNav from './components/BottomNav.vue';

const currentView = ref('home');
const selectedCategory = ref('');

const handleSelectCategory = (name) => {
  selectedCategory.value = name;
  currentView.value = 'categoryDetail';
};
</script>

<style>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
