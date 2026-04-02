import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getHomeData = async (channel) => {
  try {
    const response = await api.get('/api/index', {
      params: { channel }
    });
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || '获取数据失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getCategoryList = async (channel) => {
  try {
    const response = await api.get('/api/cate/list', {
      params: { channel }
    });
    if (response.data.code === 200) {
      return response.data.data.list;
    }
    throw new Error(response.data.message || '获取分类列表失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getCategoryDetail = async (cateId) => {
  try {
    const response = await api.get('/api/cate/detail', {
      params: { cate_id: cateId }
    });
    if (response.data.code === 200) {
      return response.data.data.list;
    }
    throw new Error(response.data.message || '获取分类详情失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getHotSearch = async () => {
  try {
    const response = await api.get('/api/novel/hotSearch');
    if (response.data.code === 200) {
      return response.data.data.list;
    }
    throw new Error(response.data.message || '获取搜索推荐失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const searchNovels = async (key) => {
  try {
    const response = await api.get('/api/novel/search', {
      params: { key }
    });
    if (response.data.code === 200) {
      return response.data.data.list;
    }
    throw new Error(response.data.message || '搜索失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const login = async (phone, password) => {
  try {
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('password', password);
    const response = await api.post('/api/login', formData);
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || '登录失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const register = async (phone, password) => {
  try {
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('password', password);
    const response = await api.post('/api/register', formData);
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || '注册失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getNovelDetail = async (id) => {
  try {
    const response = await api.get('/api/novel/detail', {
      params: { id }
    });
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || '获取小说详情失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getChapterContent = async (novelId, chapterId) => {
  try {
    const response = await api.get('/api/novel/content', {
      params: { novel_id: novelId, chapter_id: chapterId }
    });
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || '获取章节内容失败');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
