"use client";

import * as React from "react";
import CategoryTable from "@/components/category/CategoryTable";
import { FiPlus } from "react-icons/fi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CategoryForm from "@/components/category/CategoryForm";
import { useCategoryStore } from "@/store/categoryStore";
import { CategoryType } from "@/types/categoryType";

export default function CategoryPage() {
  const { createCategory } = useCategoryStore();

  const handleCreateCategory = async (data: CategoryType) => {
    await createCategory(data);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Kategori</h1>
        <Dialog>
          <DialogTrigger>
            <FiPlus className="w-6 h-6" />
          </DialogTrigger>
          <DialogContent className="max-w-lg mx-auto">
            <CategoryForm onSubmit={handleCreateCategory} />
          </DialogContent>
        </Dialog>
      </div>
      <CategoryTable />
    </>
  );
}
