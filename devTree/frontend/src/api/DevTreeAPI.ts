import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User } from "../types/User";
import type { ProfileForm } from "../types/ProfileForm";

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

export async function updateProfile(profileForm: ProfileForm) {
  try {
    const { data } = await api.patch<string>("/user", profileForm);
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
