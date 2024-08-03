"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/types/categoryType";
import { useCategoryStore } from "@/store/categoryStore";

interface CategoryFormProps {
  defaultValues?: CategoryType;
  onSubmit: (data: CategoryType) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ defaultValues, onSubmit }) => {
  const { handleSubmit, control } = useForm<CategoryType>({
    defaultValues: defaultValues || { id: '', name: '' },
  });

  const { createCategory, updateCategory } = useCategoryStore();

  const submitHandler = async (data: CategoryType) => {
    if (data.id) {
      await updateCategory(data);
    } else {
      await createCategory(data);
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Nama Kategori" />
        )}
      />
      <Button type="submit">Simpan</Button>
    </form>
  );
};

export default CategoryForm;
