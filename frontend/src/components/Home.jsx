import React, { useState } from "react";
import Card from "./Card";

const Home = (props) => {
    console.log("asdjksahdsjkadh", props);

 

  return (
    <div style={{ padding: '0', width: '100%' }}>
      <h2 style={{
        fontWeight: 700,
        fontSize: 32,
        color: '#007bff',
        marginBottom: 32,
        letterSpacing: 1.2,
        textAlign: 'center',
        marginTop: 0
      }}>
        All Products
      </h2>
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '28px',
          justifyContent: 'center',
          alignItems: 'stretch',
          margin: '0 auto',
          padding: '0 8px 32px 8px',
        }}
      >
        {props.allproducts.map((item, index) => (
          <Card key={index} item={item} handeladdtocart={props.handeladdtocart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
