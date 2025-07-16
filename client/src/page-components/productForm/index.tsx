"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchRandomImg } from "@/shared/api/image";
import { createOrUpdateProduct } from "@/shared/api/product";
import { Product } from "@/entities/product";
import { InputField } from "@/shared/ui/components/InputFieldProps";

type ProductFormProps = {
  productProp: Product | null;
};

export const ProductForm = ({ productProp = null }: ProductFormProps) => {
  const router = useRouter();
  const [loadingImage, setLoadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    article: "",
    price: "",
    quantity: "",
    imageUrl: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    article: "",
    price: "",
    quantity: "",
    description: "",
  });
  const action = productProp && productProp.id ? "Изменение" : "Создание";

  useEffect(() => {
    if (productProp) {
      setForm({
        name: productProp.name,
        article: productProp.article,
        price: productProp.price.toString(),
        quantity: productProp.quantity.toString(),
        imageUrl: productProp.imageUrl,
        description: productProp.description,
      });
    }
  }, [productProp]);

  const validateForm = () => {
    const errors = {
      name: "",
      article: "",
      price: "",
      quantity: "",
      description: "",
    };

    if (!form.name.trim()) {
      errors.name = "Название обязательно";
    }

    if (!form.article.trim()) {
      errors.article = "Артикул обязателен";
    }

    if (!form.description.trim()) {
      errors.description = "Описание обязателено";
    }

    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (isNaN(price) || price <= 0) {
      errors.price = "Цена должна быть больше 0";
    }

    if (isNaN(quantity) || quantity < 0) {
      errors.quantity = "Количество не может быть отрицательным";
    }

    setFormErrors(errors);

    return Object.values(errors).every((err) => err === "");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetImage = async () => {
    if (!form.name) return;
    setLoadingImage(true);
    try {
      const data = await fetchRandomImg(form.name);
      setForm((prev) => ({ ...prev, imageUrl: data.imageUrl }));
    } catch (err) {
      console.error("Ошибка при получении изображения:", err);
      alert("Не удалось получить изображение");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.imageUrl || !validateForm()) {
      alert("Пожалуйста, заполните все поля и получите изображение");
      return;
    }

    setSubmitting(true);

    try {
      const product: Product = {
        name: form.name,
        article: form.article,
        price: Number(form.price),
        quantity: Number(form.quantity),
        imageUrl: form.imageUrl,
        description: form.description,
      };
      if (productProp?.id) {
        product.id = productProp.id;
      }
      await createOrUpdateProduct(product);
      router.push("/");
    } catch (err) {
      console.error(`Ошибка ${action} продукта`, err);
      alert(`Ошибка при ${action} продукта`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-xl mx-auto mt-0 w-full">
      <h1 className="text-4xl mb-6">{action} продукта</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-90 h-90 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {form.imageUrl && <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />}
          </div>
          <button
            type="button"
            onClick={handleGetImage}
            disabled={loadingImage || !form.name}
            className="gray-container-sm"
          >
            {loadingImage ? "Загрузка..." : "Получить картинку"}
          </button>
        </div>
        <InputField
          id="article"
          name="article"
          value={form.article}
          onChange={handleChange}
          label="Артикул"
          placeholder="Артикул"
          error={formErrors.article}
          required
        />
        <InputField
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          label="Название"
          placeholder="Название"
          error={formErrors.name}
          required
        />
        <InputField
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          label="Описание"
          placeholder="Описание"
          error={formErrors.description}
          required
        />
        <InputField
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
          label="Цена"
          placeholder="1000"
          type="number"
          error={formErrors.price}
          required
        />
        <InputField
          id="quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          label="Количество"
          placeholder="10"
          type="number"
          error={formErrors.quantity}
          required
        />

        <button type="submit" className="gray-container" disabled={submitting}>
          {submitting ? `${action}...` : `${action} продукта`}
        </button>
      </form>
    </div>
  );
};
