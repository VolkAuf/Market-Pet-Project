"use client";

import { IMaskInput } from "react-imask";
import { useState, useEffect } from "react";
import { useCartStore } from "@/shared/model/cartStore";
import { sendOrder } from "@/shared/api/order";
import { Popup } from "@/shared/ui/components/popup";
import { ProductControlPanel } from "@/features/product/controlPanel";

export const Cart = () => {
  const { items, removeFromCart, clearCart, getTotal, phone, setPhone } = useCartStore();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorPhone, setErrorPhone] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotal());
  }, [items, getTotal]);

  const handleOrder = async () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 11) {
      setErrorPhone(true);
      setPopupMessage("Введите корректный номер телефона");
      setPopupType("error");
      return;
    }

    setErrorPhone(false);
    setStatus("loading");

    const order = {
      phone: digits,
      cart: items.map((item) => ({
        id: item.id!,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await sendOrder(order);

      if (result.success) {
        setStatus("success");
        setPopupMessage("Заказ успешно оформлен!");
        setPopupType("success");
        clearCart();
        setPhone("");
      } else {
        throw new Error(result.error || "Неизвестная ошибка");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setPopupMessage("Ошибка при отправке заказа. Попробуйте позже.");
      setPopupType("error");
    }
  };

  return (
    <section className="flex flex-col justify-center items-start p-3 mb-11 bg-gray-d9 rounded text-black">
      <h2 className="font-normal text-center">Добавленные товары</h2>
      <div className="flex flex-col items-end justify-evenly w-full font-normal">
        <div className="flex flex-col items-center w-full gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col justify-center items-start w-full bg-gray-77 rounded p-3">
              <div className="grid grid-cols-[40%_15%_25%] gap-4 text-6 w-full text-left max-md:flex max-md:flex-col max-md:items-start max-md:gap-1">
                <p className="truncate">{item.name}</p>
                <p className="min-w-20 truncate">x{item.quantity}</p>
                <p className="min-w-55 truncate">Цена: {item.price * item.quantity}₽</p>
              </div>
              <div className="flex justify-between items-center w-full gap-4 mt-2">
                <div className="max-md:max-w-77">
                  <ProductControlPanel id={item.id!} isSmall={true} />
                </div>
                <button className="gray-container-sm cursor-pointer" onClick={() => removeFromCart(item.id!)}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 ? <p>Корзина пуста</p> : <p className="text-7">Итого: {total}₽</p>}
        <button
          className="gray-container max-md:w-full"
          onClick={clearCart}
          disabled={items.length === 0 || status === "loading"}
        >
          Очистить корзину
        </button>
      </div>
      <div className="flex w-full justify-evenly items-end gap-4 flex-row max-md:flex-col max-md:items-center max-md:gap-2">
        <div className="flex flex-col justify-center items-start min-w-77 max-w-100">
          <p id="phone-error" className="text-errorColor text-4 h-6">
            {errorPhone && "Введите корректный номер телефона"}
          </p>
          <IMaskInput
            mask="+7 (000) 000-00-00"
            value={phone}
            onAccept={(value) => {
              setPhone(value);
              if (errorPhone) setErrorPhone(false);
            }}
            overwrite
            className={`gray-container text-white box-border w-full max-md:px-2 ${errorPhone && "outline-solid outline-4 outline-errorColor"}`}
            type="tel"
            placeholder="+7 (___) ___-__-__"
            aria-invalid={errorPhone}
            aria-describedby="phone-error"
          />
        </div>
        <button
          onClick={handleOrder}
          className="gray-container max-md:w-full"
          disabled={items.length === 0 || status === "loading"}
          aria-busy={status === "loading"}
        >
          {status === "loading" ? "Отправка..." : "Заказать"}
        </button>
        {popupMessage && (
          <Popup
            message={popupMessage}
            type={popupType}
            onCloseAction={() => {
              setPopupMessage(null);
              setStatus("idle");
            }}
          />
        )}
      </div>
    </section>
  );
};
