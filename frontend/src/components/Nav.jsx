import React from 'react'
import { Link } from 'react-router-dom'


const Nav = ({ cartCount }) => {
  return (
    <nav style={{
      width: '100%',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 48px',
      background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          fontSize: 24,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: 1.5,
          gap: 10
        }}
      >
        <span style={{
          display: 'inline-block',
          width: 32,
          height: 32,
          background: 'linear-gradient(135deg, #fff 60%, #00c6ff 100%)',
          borderRadius: '50%',
          marginRight: 10,
          boxShadow: '0 2px 8px #00c6ff33',
        }}></span>
        ShopEase
      </Link>
      <Link
        to="/cart"
        style={{
          textDecoration: 'none',
          fontSize: 20,
          color: '#fff',
          fontWeight: 500,
          background: 'rgba(255,255,255,0.12)',
          padding: '8px 22px',
          borderRadius: 8,
          transition: 'background 0.2s, color 0.2s',
          position: 'relative',
          display: 'inline-block',
        }}
        onMouseOver={e => e.currentTarget.style.background = '#fff'}
        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
      >
        Cart
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: -8,
            right: 8,
            background: '#ff4757',
            color: '#fff',
            borderRadius: '50%',
            minWidth: 22,
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 2px 8px #ff475733',
            padding: '0 6px',
            border: '2px solid #fff',
          }}>{cartCount}</span>
        )}
      </Link>
    </nav>
  );
}

export default Nav