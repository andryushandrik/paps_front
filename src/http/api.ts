import axios from 'axios';
import { authPayload } from './types';

const URL =
  process.env.NODE_ENV === 'production' ? process.env.API_PROD_URL : 'http://localhost:5000/api';
console.log(URL);

const $host = axios.create({
  baseURL: URL
});

const $authHost = axios.create({
  baseURL: URL
});

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refresh();
      return $authHost(originalRequest);
    }
    return Promise.reject(error);
  }
);

/* Auth */


export const logIn = async (email, password): Promise<authPayload> => {
  const { data } = await $host.post('auth/login', {
    email: email.trim(),
    password: password.trim()
  });
  localStorage.setItem('token', data.accessToken);
  return data;
};

export const check = async () => {
  const { data } = await $authHost.get('auth');
  console.log(data);

  return data;
};

export const refresh = async () => {
  const { data } = await $host.patch('auth/refreshToken');
  console.log(data);
  localStorage.setItem('token', data.token);
  return data;
};

export const logOut = async () => {
  const { data } = await $authHost.patch('auth/logout');
  console.log(data);
  localStorage.removeItem('token');
  return data;
};

/* Folders */
export const fetchFolders = async () => {
  const { data } = await $authHost.get('folders');
  return data;
};

export const createFolder = async (name: string) => {
  const { data } = await $authHost.post('folders', { name });
  return data;
};

/* Tasks */
export type taskData = {
  folderId: number;
  name: string;
  description: string;
};
export const fetchTasks = async (query: Partial<taskData>) => {
  const { data } = await $authHost.get('tasks', { params: query });
  return data;
};

export const createTask = async (payload: taskData) => {
  const { data } = await $authHost.post('tasks', { ...payload });
  return data;
};

/* Actions */
// export type taskData = {
//   folderId: number;
//   name: string;
//   description: string;
// };
export const fetchActions = async (userId, taskId) => {
  const { data } = await $authHost.get('actions', { params: {userId, taskId} });
  return data;
};

export const fetchActionStats = async (id) => {
  const { data } = await $authHost.get('actions/'+id+"/admin");
  return data;
};

export const startAction = async (userId, taskId) => {
  const { data } = await $authHost.post('actions', { userId, taskId });
  return data;
};

export const endAction = async (id) => {
  const { data } = await $authHost.put('actions/'+id+"/end");
  return data;
};

/* Dashboard */

export const getDashboard = async () => {
  const { data } = await $authHost.get('actions/dashboard');
  return data;
};