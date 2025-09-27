import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const purchasedItems = location.state?.purchasedItems || [];

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0ffe9 0%, #f8fafc 100%)',
      borderRadius: 18,
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      margin: '40px auto',
      maxWidth: 600,
      padding: '48px 32px',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16, color: '#28a745' }}>🎉</div>
      <h1 style={{ color: '#28a745', fontWeight: 700, fontSize: 32, marginBottom: 12 }}>Payment Successful!</h1>
      <p style={{ color: '#333', fontSize: 18, marginBottom: 32 }}>Your order has been placed successfully.</p>

      {purchasedItems.length > 0 && (
        <div style={{ width: '100%', marginBottom: 32 }}>
          <h3 style={{ color: '#007bff', fontWeight: 600, fontSize: 22, marginBottom: 18, textAlign: 'center' }}>Purchased Products</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            width: '100%',
            margin: '0 auto',
          }}>
            {purchasedItems.map((item, idx) => (
              <div key={item.id + '-' + idx} style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px #e3e3e3',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 220,
              }}>
                <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 10 }} />
                <div style={{ fontWeight: 600, fontSize: 16, color: '#222', marginBottom: 4 }}>{item.name}</div>
                <div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>{item.description}</div>
                <div style={{ color: '#007bff', fontWeight: 500, fontSize: 15, marginBottom: 2 }}>Qty: {item.qty}</div>
                <div style={{ color: '#28a745', fontWeight: 600, fontSize: 15 }}>${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/">
        <button style={{
          padding: '12px 36px',
          fontSize: '1.1em',
          background: 'linear-gradient(90deg, #28a745 0%, #00c6ff 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: '0 2px 8px #e3e3e3',
          cursor: 'pointer',
          marginTop: 8,
          transition: 'background 0.2s',
        }}>Go to Home</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
