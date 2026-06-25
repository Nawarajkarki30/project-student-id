import axiosInstance from "./axiosInstance";

// file: a File object from an <input type="file" />
export const uploadImageApi = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return axiosInstance.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};