import axiosInstance from "./axiosInstance";

export const createIdCardApi = (data) => axiosInstance.post("/idcards", data);

export const getAllIdCardsApi = (search = "") =>
  axiosInstance.get(`/idcards${search ? `?search=${search}` : ""}`);

export const getIdCardByIdApi = (id) => axiosInstance.get(`/idcards/${id}`);

export const updateIdCardApi = (id, data) =>
  axiosInstance.put(`/idcards/${id}`, data);

export const deleteIdCardApi = (id) => axiosInstance.delete(`/idcards/${id}`);

export const getMyIdCardApi = () => axiosInstance.get("/idcards/me");