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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center bg-white border border-gray-100 rounded-2xl shadow-sm p-10">
          <div className="h-16 w-16 mx-auto rounded-full bg-green-50 text-primary flex items-center justify-center mb-5">
            <FiShoppingBag className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Your cart is currently empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you have not added any plants yet. Explore our curated collection and bring nature home.
          </p>
          <Link href="/products" className="btn-primary">
            Browse Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
              <Image
                src={item.product.images[0] || "/placeholder.jpg"}
                alt={item.product.name}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">AED {item.product.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span className="px-3 py-1 border rounded">
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
                <p className="font-semibold">
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

        <div className="bg-white p-6 rounded-lg shadow-md h-fit border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>AED {total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-semibold mb-6">
            <span>Total</span>
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
