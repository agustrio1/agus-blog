import { create } from "zustand";
import { CategoryType } from "@/types/categoryType";

export type CategoryStore = {
  categories: CategoryType[];
  isLoading: boolean;
  error: string | null;
  getCategories: () => Promise<void>;
  createCategory: (data: CategoryType) => Promise<void>;
  updateCategory: (data: CategoryType) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  handleEdit: (category: CategoryType) => void;
  handleUpdate: (data: CategoryType) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleCloseDialog: () => void;
  selectedCategory: CategoryType | null;
  isDialogOpen: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
  isDialogOpen: false,
  currentPage: 1,

  getCategories: async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      set({ categories: data });
    } catch (error) {
      set({ error: "Gagal memuat kategori" });
    }
  },
  createCategory: async (data: CategoryType) => {
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      set((state) => ({ categories: [...state.categories, data] }));
    } catch (error) {
      set({ error: "Gagal menambah kategori" });
    }
  },
  updateCategory: async (data: CategoryType) => {
    try {
      await fetch('/api/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === data.id ? data : category
        ),
      }));
    } catch (error) {
      set({ error: "Gagal memperbarui kategori" });
    }
  },
  deleteCategory: async (id: string) => {
    try {
      await fetch(`/api/categories`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
      }));
    } catch (error) {
      set({ error: "Gagal menghapus kategori" });
    }
  },
  handleEdit: (category: CategoryType) => {
    set({ selectedCategory: category, isDialogOpen: true });
  },
  handleUpdate: async (data: CategoryType) => {
    try {
      await useCategoryStore.getState().updateCategory(data);
      await useCategoryStore.getState().getCategories();
      set({ isDialogOpen: false, selectedCategory: null });
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  },
  handleDelete: async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await useCategoryStore.getState().deleteCategory(id);
        await useCategoryStore.getState().getCategories();
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  },
  handleCloseDialog: () => {
    set({ isDialogOpen: false, selectedCategory: null });
  },
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
}));
