<template>
  <div class="min-h-screen bg-white font-sans text-[#333] flex flex-col">
    <!-- Header -->
    <header class="px-4 py-4 flex items-center justify-between">
      <button class="p-1" @click="$emit('back')">
        <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="back" />
      </button>
      <h1 class="text-lg font-bold text-[#1A1A1A]">贵妃书斋</h1>
      <button class="p-1">
        <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
      </button>
    </header>

    <main class="flex-1 px-8 pt-12">
      <!-- Login State -->
      <div v-if="mode === 'login'" class="flex flex-col items-center">
        <!-- Logo Section -->
        <div class="flex flex-col items-center mb-16">
          <div class="w-24 h-24 rounded-full bg-[#F5F5F5] border border-gray-100 overflow-hidden mb-4 shadow-sm">
            <img src="https://picsum.photos/seed/guifei_logo/200/200" alt="Logo" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h2 class="text-xl font-bold text-[#1A1A1A]">贵妃书斋</h2>
          <p class="text-[10px] text-gray-400 tracking-[0.2em] mt-1">GUI FEI SHU ZHAI</p>
        </div>

        <!-- Form -->
        <div class="w-full space-y-4">
          <div class="relative">
            <input 
              v-model="phone"
              type="text" 
              placeholder="请输入手机号"
              class="w-full bg-[#F0F2F5] rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C4DFF]/30 transition-all"
            />
          </div>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入密码"
              class="w-full bg-[#F0F2F5] rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C4DFF]/30 transition-all"
            />
            <button 
              class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
              @click="showPassword = !showPassword"
            >
              <img src="/input_file_32.png" class="w-5 h-5 object-contain" alt="eye" />
            </button>
          </div>
        </div>

        <!-- Action Button -->
        <button 
          class="w-full mt-12 py-4 bg-gradient-to-r from-[#E1BEE7] to-[#B39DDB] text-white rounded-full font-medium shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70"
          :disabled="loading"
          @click="handleLogin"
        >
          <div v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <!-- Footer Links -->
        <div class="w-full mt-6 flex justify-between px-2">
          <button class="text-sm text-gray-600" @click="mode = 'register'">去注册</button>
          <button class="text-sm text-gray-600">忘记密码</button>
        </div>
      </div>

      <!-- Register State -->
      <div v-else class="flex flex-col items-center">
        <!-- Greeting Section -->
        <div class="flex items-center gap-3 mb-12 self-start">
          <div class="w-12 h-12 rounded-full bg-[#F5F5F5] border border-gray-100 overflow-hidden shadow-sm">
            <img src="https://picsum.photos/seed/guifei_logo/200/200" alt="Logo" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h2 class="text-xl font-bold text-[#001B3D]">登录贵妃书斋 开启精彩人生</h2>
        </div>

        <!-- Form -->
        <div class="w-full space-y-4">
          <div class="relative">
            <input 
              v-model="phone"
              type="text" 
              placeholder="请输入手机号"
              class="w-full bg-[#F0F2F5] rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C4DFF]/30 transition-all"
            />
          </div>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请设置您的密码（6-18位字符）"
              class="w-full bg-[#F0F2F5] rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C4DFF]/30 transition-all"
            />
            <button 
              class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
              @click="showPassword = !showPassword"
            >
              <img src="/input_file_32.png" class="w-5 h-5 object-contain" alt="eye" />
            </button>
          </div>
          <div class="relative">
            <input 
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'" 
              placeholder="请再次输入您设置的密码"
              class="w-full bg-[#F0F2F5] rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C4DFF]/30 transition-all"
            />
            <button 
              class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <img src="/input_file_32.png" class="w-5 h-5 object-contain" alt="eye" />
            </button>
          </div>
        </div>

        <!-- Action Button -->
        <button 
          class="w-full mt-12 py-4 bg-[#A6B1C2] text-white rounded-full font-medium shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70"
          :disabled="loading"
          @click="handleRegister"
        >
          <div v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {{ loading ? '注册中...' : '注册' }}
        </button>

        <!-- Footer Links -->
        <div class="w-full mt-6 flex justify-center">
          <button class="text-sm text-gray-600" @click="mode = 'login'">已有账号，去登录</button>
        </div>

        <!-- Agreement -->
        <div class="mt-auto mb-8 flex items-start gap-2 px-4">
          <button 
            class="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center transition-colors"
            :class="agreed ? '' : 'bg-gray-100'"
            @click="agreed = !agreed"
          >
            <img v-if="agreed" src="/input_file_5.png" class="w-5 h-5 object-contain" alt="check" />
          </button>
          <p class="text-xs text-gray-400 leading-relaxed">
            请您阅读并同意“贵妃书斋用户协议”和“隐私政策”
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { login, register } from '../services/api';

const emit = defineEmits(['back', 'login-success']);

const mode = ref('login'); // 'login' or 'register'
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const agreed = ref(true);

const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!phone.value || !password.value) {
    ElMessage.warning('请输入手机号和密码');
    return;
  }
  loading.value = true;
  try {
    const data = await login(phone.value, password.value);
    ElMessage.success('登录成功');
    // Save to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('userData', JSON.stringify(data.user.user));
    emit('login-success', data.user.user);
  } catch (error) {
    ElMessage.error(error.message || '登录失败');
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  if (!agreed.value) {
    ElMessage.warning('请先阅读并同意用户协议');
    return;
  }
  if (!phone.value || !password.value || !confirmPassword.value) {
    ElMessage.warning('请填写完整信息');
    return;
  }
  if (password.value !== confirmPassword.value) {
    ElMessage.warning('两次输入密码不一致');
    return;
  }
  loading.value = true;
  try {
    await register(phone.value, password.value);
    ElMessage.success('注册成功，请登录');
    mode.value = 'login';
    // Clear password for login
    password.value = '';
    confirmPassword.value = '';
  } catch (error) {
    ElMessage.error(error.message || '注册失败');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
