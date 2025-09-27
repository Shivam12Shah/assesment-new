import React from 'react';
import { Link } from 'react-router-dom';


const PaymentFailed = () => (
  <div style={{
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ffeaea 0%, #f8fafc 100%)',
    borderRadius: 18,
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    margin: '40px auto',
    maxWidth: 480,
    padding: '48px 32px',
  }}>
    <div style={{ fontSize: 64, marginBottom: 16, color: '#d9534f' }}>❌</div>
    <h1 style={{ color: '#d9534f', fontWeight: 700, fontSize: 32, marginBottom: 12 }}>Payment Failed</h1>
    <p style={{ color: '#333', fontSize: 18, marginBottom: 32 }}>Sorry, your payment could not be processed.</p>
    <Link to="/">
      <button style={{
        padding: '12px 36px',
        fontSize: '1.1em',
        background: 'linear-gradient(90deg, #d9534f 0%, #ffb199 100%)',
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

export default PaymentFailed;
