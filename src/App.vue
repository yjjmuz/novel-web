<template>
  <div class="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
    <!-- Main Tabs with v-show to keep state and avoid reloading -->
    <HomeView 
      v-show="currentView === 'home'" 
      @search="handleNavigate('search')" 
      @navigate="handleNavigate"
    />
    <CategoryView 
      v-show="currentView === 'category'" 
      @select-category="handleSelectCategory" 
    />
    <BookshelfView 
      v-show="currentView === 'bookshelf'" 
      :isLoggedIn="isLoggedIn"
      @search="handleNavigate('search')"
      @navigate="handleNavigate"
    />
    <ProfileView 
      v-show="currentView === 'profile'" 
      :isLoggedIn="isLoggedIn"
      :userData="userData"
      @navigate="handleNavigate"
    />

    <!-- Sub Pages with v-if (standard navigation) -->
    <CategoryDetailView 
      v-if="currentView === 'categoryDetail'" 
      :categoryId="selectedCategoryId"
      :categoryName="selectedCategoryName" 
      @back="goBack" 
      @navigate="handleNavigate"
    />
    <SearchView 
      v-if="currentView === 'search'" 
      @back="goBack" 
      @navigate="handleNavigate"
    />
    <ProfileSettingsView
      v-if="currentView === 'profileSettings'"
      :userData="userData"
      @back="goBack"
      @logout="handleLogout"
    />
    <BookDetailView
      v-if="currentView === 'bookDetail'"
      :bookId="selectedBookId"
      @back="goBack"
      @read="handleNavigate('reading', $event)"
      @catalog="handleNavigate('catalog')"
    />
    <ReadingView 
      v-if="currentView === 'reading'" 
      :novelId="selectedBookId"
      :chapterId="selectedChapterId"
      @back="goBack" 
      @catalog="handleNavigate('catalog')"
      @update-chapter="selectedChapterId = $event"
    />
    <CatalogView
      v-if="currentView === 'catalog'"
      :novelId="selectedBookId"
      @back="goBack"
      @select-chapter="handleNavigate('reading', $event)"
    />
    <LoginView
      v-if="currentView === 'login'"
      @back="goBack"
      @login-success="handleLoginSuccess"
    />

    <BottomNav 
      v-if="['home', 'category', 'bookshelf', 'profile'].includes(currentView)" 
      :activeId="currentView" 
      @navigate="handleNavigate" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
const selectedCategoryName = ref('');
const selectedCategoryId = ref('');
const selectedBookId = ref('');
const selectedChapterId = ref('');
const isLoggedIn = ref(!!localStorage.getItem('token'));
const userData = ref(JSON.parse(localStorage.getItem('userData') || 'null'));

const mainTabs = ['home', 'category', 'bookshelf', 'profile'];

const handleNavigate = (view, id = null, pushState = true) => {
  // Handle specific data updates
  if (view === 'bookDetail' && id !== null) {
    if (selectedBookId.value !== id) {
      selectedBookId.value = id;
      selectedChapterId.value = '';
    }
  } else if (view === 'reading' && id !== null) {
    selectedChapterId.value = id;
  }
  
  if ((view === 'profile' || view === 'profileSettings') && !isLoggedIn.value) {
    handleNavigate('login', null, pushState);
    return;
  }

  // Update view
  currentView.value = view;

  // Push to history if requested
  if (pushState) {
    const state = { 
      view, 
      selectedBookId: selectedBookId.value, 
      selectedChapterId: selectedChapterId.value,
      selectedCategoryId: selectedCategoryId.value,
      selectedCategoryName: selectedCategoryName.value
    };
    window.history.pushState(state, '', '');
  }
};

const goBack = () => {
  window.history.back();
};

const handlePopState = (event) => {
  if (event.state) {
    const { view, selectedBookId: bid, selectedChapterId: cid, selectedCategoryId: catId, selectedCategoryName: catName } = event.state;
    selectedBookId.value = bid;
    selectedChapterId.value = cid;
    selectedCategoryId.value = catId;
    selectedCategoryName.value = catName;
    currentView.value = view;
  } else {
    currentView.value = 'home';
  }
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
  // Initial state for home
  window.history.replaceState({ view: 'home' }, '', '');
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});

const handleLoginSuccess = (user) => {
  isLoggedIn.value = true;
  userData.value = user;
  handleNavigate('home');
};

const handleLogout = () => {
  isLoggedIn.value = false;
  userData.value = null;
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  handleNavigate('home');
};

const handleSelectCategory = (category) => {
  selectedCategoryName.value = category.name;
  selectedCategoryId.value = category.id;
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
