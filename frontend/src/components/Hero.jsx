import React from "react";
import Nav from "./Nav";
import Home from "./Home";


const Hero = (props) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0eafc 100%)',
      paddingBottom: 40
    }}>
      <Nav cartCount={props.cartCount} />
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        marginTop: 32,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        padding: '32px 36px',
        minHeight: 600
      }}>
        <Home allproducts={props.allproducts} handeladdtocart={props.handeladdtocart} />
      </div>
    </div>
  );
};

export default Hero;
