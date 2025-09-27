import React from 'react';

const Card = (props) => {
  const { item, handeladdtocart } = props;

  return (
    <div style={{
      width: "200px",
      height: "350px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      boxSizing: "border-box",
      justifyContent: "space-between"
    }}>
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }}
      />

      {/* Product Info */}
      <div style={{ flex: "1", marginTop: "10px" }}>
        <h3 style={{ fontSize: "16px", margin: "0 0 5px", color: "#333" }}>{item.name}</h3>
        <p style={{
          fontSize: "12px",
          color: "#666",
          margin: "0 0 8px",
          height: "40px",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {item.description}
        </p>
        <p style={{ fontWeight: "bold", margin: "0 0 5px", color: "#111" }}>${item.price.toFixed(2)}</p>
        <p style={{ fontSize: "12px", color: item.in_stock ? "green" : "red" }}>
          {item.in_stock ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => handeladdtocart(item)}
        disabled={!item.in_stock}
        style={{
          padding: "8px",
          backgroundColor: item.in_stock ? "#28a745" : "#ccc",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: item.in_stock ? "pointer" : "not-allowed",
          fontSize: "14px",
          marginTop: "10px"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
