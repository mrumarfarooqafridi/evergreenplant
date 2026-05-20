"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartItems);
    calculateTotal(cartItems);
  }, []);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    setTotal(totalPrice);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
        <div className="max-w-2xl mx-auto text-center bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-10">
          <div className="h-10 w-10 sm:h-16 sm:w-16 mx-auto rounded-full bg-green-50 text-primary flex items-center justify-center mb-3 sm:mb-5">
            <FiShoppingBag className="text-xl sm:text-2xl" />
          </div>
          <h1 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-3">
            Your cart is currently empty
          </h1>
          <p className="text-gray-600 text-[10px] sm:text-sm mb-4 sm:mb-8">
            Looks like you have not added any plants yet. Explore our curated
            collection and bring nature home.
          </p>
          <Link href="/products" className="btn-primary">
            Browse Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <h1 className="text-lg sm:text-3xl font-bold mb-4 sm:mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-4 bg-white p-2 sm:p-4 rounded-lg shadow-md mb-2 sm:mb-4 border border-gray-100"
            >
              <Image
                src={item.product.images[0] || "/placeholder.jpg"}
                alt={item.product.name}
                width={100}
                height={100}
                className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold">
                  {item.product.name}
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-sm md:text-base">
                  AED {item.product.price}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span className="px-2 sm:px-3 py-1 border rounded text-[10px] sm:text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold text-[10px] sm:text-sm md:text-base">
                  AED {(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md h-fit border border-gray-100">
          <h2 className="text-sm sm:text-xl font-semibold mb-2 sm:mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span className="text-[10px] sm:text-sm">Subtotal</span>
            <span>AED {total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-[10px] sm:text-sm">Shipping</span>
            <span className="text-[10px] sm:text-sm">Free</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-sm sm:text-xl font-semibold mb-3 sm:mb-6">
            <span className="text-[10px] sm:text-sm">Total</span>
            <span>AED {total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="btn-primary w-full block text-center"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/products"
            className="block text-center mt-4 text-primary hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
