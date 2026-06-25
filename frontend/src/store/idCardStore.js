import { create } from "zustand";
import {
  getAllIdCardsApi,
  getIdCardByIdApi,
  createIdCardApi,
  updateIdCardApi,
  deleteIdCardApi,
  getMyIdCardApi,
} from "../api/idCardApi";

export const useIdCardStore = create((set, get) => ({
  idCards: [], // admin's full list
  selectedIdCard: null, // admin viewing one card
  myIdCard: null, // student's own card (null = not yet created)
  isLoading: false,
  error: null,

  fetchAllIdCards: async (search = "") => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getAllIdCardsApi(search);
      set({ idCards: data.idCards, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load ID cards",
        isLoading: false,
      });
    }
  },

  fetchIdCardById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getIdCardByIdApi(id);
      set({ selectedIdCard: data.idCard, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load ID card",
        isLoading: false,
      });
    }
  },

  createIdCard: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await createIdCardApi(formData);
      set({ idCards: [data.idCard, ...get().idCards], isLoading: false });
      return data.idCard;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create ID card";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  updateIdCard: async (id, formData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await updateIdCardApi(id, formData);
      set({
        idCards: get().idCards.map((card) =>
          card._id === id ? data.idCard : card
        ),
        selectedIdCard: data.idCard,
        isLoading: false,
      });
      return data.idCard;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update ID card";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  deleteIdCard: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteIdCardApi(id);
      set({
        idCards: get().idCards.filter((card) => card._id !== id),
        isLoading: false,
      });
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete ID card";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  fetchMyIdCard: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getMyIdCardApi();
      set({ myIdCard: data.idCard, isLoading: false }); // null is valid (empty state)
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load your ID card",
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));