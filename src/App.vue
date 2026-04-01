<template>
  <div class="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
    <HomeView 
      v-if="currentView === 'home'" 
      @search="handleNavigate('search')" 
      @navigate="handleNavigate"
    />
    <CategoryView 
      v-else-if="currentView === 'category'" 
      @select-category="handleSelectCategory" 
    />
    <CategoryDetailView 
      v-else-if="currentView === 'categoryDetail'" 
      :categoryName="selectedCategory" 
      @back="handleNavigate('category')" 
      @navigate="handleNavigate"
    />
    <SearchView 
      v-else-if="currentView === 'search'" 
      @back="handleNavigate('home')" 
      @navigate="handleNavigate"
    />
    <BookshelfView 
      v-else-if="currentView === 'bookshelf'" 
      :isLoggedIn="isLoggedIn"
      @search="handleNavigate('search')"
      @navigate="handleNavigate"
    />
    <ProfileView 
      v-else-if="currentView === 'profile'" 
      :isLoggedIn="isLoggedIn"
      @navigate="handleNavigate"
    />
    <ProfileSettingsView
      v-else-if="currentView === 'profileSettings'"
      @back="handleNavigate('profile')"
      @logout="handleLogout"
    />
    <BookDetailView
      v-else-if="currentView === 'bookDetail'"
      @back="handleNavigate('home')"
      @read="handleNavigate('reading')"
      @catalog="handleNavigate('catalog')"
    />
    <ReadingView 
      v-else-if="currentView === 'reading'" 
      @back="handleNavigate('bookDetail')" 
      @catalog="handleNavigate('catalog')"
    />
    <CatalogView
      v-else-if="currentView === 'catalog'"
      @back="handleNavigate(previousView || 'reading')"
      @select-chapter="handleNavigate('reading')"
    />
    <LoginView
      v-else-if="currentView === 'login'"
      @back="handleNavigate('home')"
      @login-success="handleLoginSuccess"
    />
    <div v-else class="flex items-center justify-center h-screen text-gray-400">
      {{ currentView }} 页面正在开发中...
    </div>

    <BottomNav 
      v-if="!['categoryDetail', 'search', 'profileSettings', 'bookDetail', 'reading', 'login', 'catalog'].includes(currentView)" 
      :activeId="currentView" 
      @navigate="handleNavigate" 
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import HomeView from './views/HomeView.vue';
import CategoryView from './views/CategoryView.vue';
import CategoryDetailView from './views/CategoryDetailView.vue';
import SearchView from './views/SearchView.vue';
import BookshelfView from './views/BookshelfView.vue';
import ProfileView from './views/ProfileView.vue';
import ProfileSettingsView from './views/ProfileSettingsView.vue';
import BookDetailView from './views/BookDetailView.vue';
import ReadingView from './views/ReadingView.vue';
import CatalogView from './views/CatalogView.vue';
import LoginView from './views/LoginView.vue';
import BottomNav from './components/BottomNav.vue';

const currentView = ref('home');
const previousView = ref('');
const selectedCategory = ref('');
const isLoggedIn = ref(false);

const handleNavigate = (view) => {
  if ((view === 'profile' || view === 'profileSettings') && !isLoggedIn.value) {
    currentView.value = 'login';
    return;
  }
  if (view === 'catalog') {
    previousView.value = currentView.value;
  }
  currentView.value = view;
};

const handleLoginSuccess = () => {
  isLoggedIn.value = true;
  currentView.value = 'home';
};

const handleLogout = () => {
  isLoggedIn.value = false;
  currentView.value = 'home';
};

const handleSelectCategory = (name) => {
  selectedCategory.value = name;
  handleNavigate('categoryDetail');
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
