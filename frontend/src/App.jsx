import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Hero from "./components/Hero";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";

const App = () => {
  const [allproducts, setAllReoducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Priya/Jupiter/MSO/PC_Shoveler_200x200_06._CB800722151_.jpg",
      price: 59.99,
      description:
        "Bluetooth-enabled wireless headphones with noise cancellation.",
      category: "Electronics",
      in_stock: true,
    },
    {
      id: 2,
      name: "Running Shoes",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Priya/Jupiter/MSO/PC_Shoveler_200x200_04._CB800722151_.jpg",
      price: 89.99,
      description:
        "Lightweight running shoes designed for maximum comfort and performance.",
      category: "Footwear",
      in_stock: true,
    },
    {
      id: 3,
      name: "Smart Watch",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/certified_refurbished/anjaga/RenewedMarketing2025/Jupiter25/GW/PC_CC_379x304_1x._SY304_CB799151965_.jpg",
      price: 129.99,
      description:
        "Track your activity, heart rate, and sleep with this stylish smart watch.",
      category: "Electronics",
      in_stock: false,
    },
    {
      id: 4,
      name: "Coffee Maker",
      image: "https://m.media-amazon.com/images/I/71keqeuJ0eL._AC_SY200_.jpg",
      price: 49.99,
      description:
        "Brew delicious coffee with this compact and easy-to-use machine.",
      category: "Home Appliances",
      in_stock: true,
    },
    {
      id: 5,
      name: "Backpack",
      image: "https://m.media-amazon.com/images/I/71YBXXC6T6L._AC_SY200_.jpg",
      price: 39.99,
      description:
        "Durable backpack with multiple compartments for all your travel needs.",
      category: "Accessories",
      in_stock: true,
    },
    {
      id: 6,
      name: "Desk Lamp",
      image: "https://m.media-amazon.com/images/I/81+Csy-WQwL._AC_SY200_.jpg",
      price: 24.99,
      description:
        "LED desk lamp with adjustable brightness and flexible neck.",
      category: "Home Decor",
      in_stock: true,
    },
    {
      id: 7,
      name: "Gaming Keyboard",
      image: "https://m.media-amazon.com/images/I/41ASR9mjFTL._SR480,440_.jpg",
      price: 69.99,
      description:
        "Mechanical keyboard with RGB lighting and programmable keys.",
      category: "Electronics",
      in_stock: true,
    },
    {
      id: 8,
      name: "Water Bottle",
      image: "https://m.media-amazon.com/images/I/41uPss3u3eL._SR480,440_.jpg",
      price: 14.99,
      description: "Eco-friendly stainless steel water bottle, 750ml capacity.",
      category: "Kitchen",
      in_stock: true,
    },
    {
      id: 9,
      name: "Yoga Mat",
      image: "https://m.media-amazon.com/images/I/4146uuCQ1UL._SR480,440_.jpg",
      price: 29.99,
      description:
        "Non-slip yoga mat with carrying strap, ideal for all levels.",
      category: "Fitness",
      in_stock: false,
    },
    {
      id: 10,
      name: "Bluetooth Speaker",
      image: "https://m.media-amazon.com/images/I/31Q14qzdoZL._SR480,440_.jpg",
      price: 44.99,
      description:
        "Portable Bluetooth speaker with high-quality sound and long battery life.",
      category: "Electronics",
      in_stock: true,
    },
  ]);
  const [cart, setcart] = useState([]);

  const handeladdtocart = (item) => {
    setcart((prevCart) => {
      const existing = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                qty: (typeof cartItem.qty === "number" ? cartItem.qty : 1) + 1,
              }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };
  // Handler to change quantity in cart
  const handleQtyChange = (id, newQty) => {
    setcart((prevCart) => {
      if (newQty < 1) {
        // Remove item if qty < 1
        return prevCart.filter((item) => item.id !== id);
      }
      return prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: typeof newQty === "number" && !isNaN(newQty) ? newQty : 1,
            }
          : item
      );
    });
  };

  // Calculate total cart item count
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div>
      <Routes>
        <Route
          path="/cart"
          element={<Cart cart={cart} onQtyChange={handleQtyChange} />}
        />
        <Route
          path="/"
          element={
            <Hero allproducts={allproducts} handeladdtocart={handeladdtocart} cartCount={cartCount} />
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </div>
  );
};

export default App;
