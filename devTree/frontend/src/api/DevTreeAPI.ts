import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User } from "../types/User";
import type { UserHandle } from "../types/UserHandle";

export async function getUser() {
  try {
    const { data } = await api.get<User>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function updateProfile(formData: User) {
  try {
    const { data } = await api.patch<string>("/user", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await api.post<{ image: string }>("/user/image", formData);
    return data.image;
  } catch (error) {
    if (isAxiosError(error) && error) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function getUserByHandle(handle: string) {
  try {
    const { data } = await api.get<UserHandle>(`/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error) {
      throw new Error(error.response?.data.error);
    }
  }
}
