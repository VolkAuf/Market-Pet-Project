"use client";

import { IMaskInput } from "react-imask";
import { useState, useEffect } from "react";
import { useCartStore } from "@/shared/model/cartStore";
import { sendOrder } from "@/shared/api/order";
import { Popup } from "@/shared/ui/components/popup";
import { ProductControlPanel } from "@/features/product/controlPanel";
import styles from "./styles.module.scss";

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
      <h2 className={styles.cart__title}>Добавленные товары</h2>
      <div className={styles.cart__content}>
        <div className={styles.cart__productList}>
          {items.map((item) => (
            <div key={item.id} className={styles.productInfo}>
              <div className={styles.productInfo__text}>
                <p className={styles.productInfo__title}>{item.name}</p>
                <p className={styles.productInfo__quantity}>x{item.quantity}</p>
                <p className={styles.productInfo__price}>Цена: {item.price * item.quantity}₽</p>
              </div>
              <div className={styles.productInfo__buttons}>
                <div className={styles.productInfo__controlPanel}>
                  <ProductControlPanel id={item.id} isSmall={true} />
                </div>
                <button className={styles.productInfo__removeButton} onClick={() => removeFromCart(item.id)}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 ? <p>Корзина пуста</p> : <p className={styles.cart__totalSum}>Итого: {total}₽</p>}
        <button
          className={styles.cart__button}
          onClick={clearCart}
          disabled={items.length === 0 || status === "loading"}
        >
          Очистить корзину
        </button>
      </div>
      <div className={styles.cart__purchase}>
        <div className={styles.cart__phoneContainer}>
          <p id="phone-error" className={styles.cart__errorMessage}>
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
            className={`${styles.cart__phoneNumber} ${errorPhone ? styles.cart__phoneNumber__errorInput : ""}`}
            type="tel"
            placeholder="+7 (___) ___-__-__"
            aria-invalid={errorPhone}
            aria-describedby="phone-error"
          />
        </div>
        <button
          onClick={handleOrder}
          className={styles.cart__button}
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
