"use client";

import { IMaskInput } from "react-imask";
import { useState } from "react";
import { useCartStore } from "@/shared/model/cartStore";
import styles from "./styles.module.scss";
import { sendOrder } from "@/shared/api/order";
import { Popup } from "@/shared/ui/components/popup";

export const Cart = () => {
  const { items, removeFromCart, clearCart, getTotal, setToCart, phone, setPhone } = useCartStore();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorPhone, setErrorPhone] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error">("success");

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
        id: item.id,
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
    <section className={styles.cart}>
      <div className={styles.cart__content}>
        <h2>Добавленные товары</h2>
        {items.length === 0 && <p>Корзина пуста</p>}

        {items.map((item) => (
          <div key={item.id} className={styles.cart__productInfo}>
            <p>{item.title}</p>
            <div>
              <button onClick={() => setToCart(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) => {
                  const value = Math.max(1, Number(e.target.value));
                  setToCart(item.id, value);
                }}
              />
              <button onClick={() => setToCart(item.id, item.quantity + 1)}>+</button>
            </div>
            <p>Цена: {item.price * item.quantity}₽</p>
            <button onClick={() => removeFromCart(item.id)}>Удалить</button>
          </div>
        ))}

        <hr />
        <p>Итого: {getTotal()}₽</p>
        <button onClick={clearCart} disabled={items.length === 0 || status === "loading"}>
          Очистить корзину
        </button>
      </div>

      <div className={styles.cart__purchase}>
        <IMaskInput
          mask="+7 (000) 000-00-00"
          value={phone}
          onAccept={(value) => {
            setPhone(value);
            if (errorPhone) setErrorPhone(false); // Убираем подсветку при вводе
          }}
          overwrite
          className={`${styles.cart__phoneNumber} ${errorPhone ? styles.errorInput : ""}`}
          type="tel"
          placeholder="+7 (___) ___-__-__"
          aria-invalid={errorPhone}
          aria-describedby="phone-error"
        />
        {errorPhone && (
          <p id="phone-error" className={styles.errorMessage}>
            Введите корректный номер телефона
          </p>
        )}

        <button
          onClick={handleOrder}
          className={styles.orderButton}
          disabled={items.length === 0 || status === "loading"}
          aria-busy={status === "loading"}
        >
          {status === "loading" ? "Отправка..." : "Заказать"}
        </button>

        {/* Попап для сообщений */}
        {popupMessage && (
          <Popup
            message={popupMessage}
            type={popupType}
            onClose={() => {
              setPopupMessage(null);
              setStatus("idle");
            }}
          />
        )}
      </div>
    </section>
  );
};
