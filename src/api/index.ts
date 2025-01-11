import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE } from '@/utils/Const';
import { getWindow } from '@/utils/Common';
const getAccessToken = () => localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const redirectToLogin = () => {
  const window = getWindow();
  if (window) {
    window.location.href = '/auth';
  }
}

export const apiGlobal = {
  get: async (url: string, params: any) => {
    const accessToken = getAccessToken()
    if (!accessToken) {
      redirectToLogin()
    }

    return axiosInstance
      .get(url, { params })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error)
      })
  },
  post: async (url: string, body: any, headers?: any, isDataForm?: boolean) => {
    const accessToken = getAccessToken()
    if (!accessToken) {
      redirectToLogin()
    }

    const config = {
      headers: {
        ...headers,
        'Content-Type': isDataForm ? 'multipart/form-data' : 'application/json',
      },
    }

    return axiosInstance
      .post(url, body, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error)
      })
  },
}

export default apiGlobal
