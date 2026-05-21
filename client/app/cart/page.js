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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        <div className="lg:col-span-2 space-y-2 sm:space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
                <Image
                  src={item.product.images[0] || "/plant-placeholder.svg"}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                  {item.product.name}
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm mb-2">
                  AED {item.product.price}
                </p>
                {item.product.category && (
                  <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[8px] sm:text-xs rounded-full">
                    {item.product.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
                >
                  -
                </button>
                <span className="w-6 sm:w-8 md:w-10 text-center text-[10px] sm:text-xs md:text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col items-end gap-1 sm:gap-2 flex-shrink-0">
                <p className="font-semibold text-xs sm:text-sm md:text-base text-gray-900">
                  AED {(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 sm:p-2 rounded-lg transition-colors"
                  aria-label="Remove item"
                >
                  <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md h-fit border border-gray-100 sticky top-4">
          <h2 className="text-sm sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-2 sm:space-y-3 mb-4">
            <div className="flex justify-between text-[10px] sm:text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                AED {total.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-[10px] sm:text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
          </div>

          <hr className="my-3 sm:my-4 border-gray-200" />

          <div className="flex justify-between text-base sm:text-xl font-bold mb-4 sm:mb-6">
            <span className="text-gray-900">Total</span>
            <span className="text-green-600">AED {total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="btn-primary w-full block text-center py-3 sm:py-4 text-xs sm:text-sm font-semibold"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/products"
            className="block text-center mt-3 sm:mt-4 text-primary hover:text-green-700 text-[10px] sm:text-sm font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
