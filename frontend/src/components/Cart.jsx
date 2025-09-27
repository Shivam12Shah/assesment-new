import React, { useState, useRef, useEffect } from 'react';

// Add Google Fonts dynamically

import Nav from './Nav';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
  const { cart, onQtyChange } = props;
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const checkoutFormRef = useRef(null);
  const [cardDetails, setCardDetails] = useState({
    userName: '',
    userEmail: '',
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'cardNumber' || name === 'cvv') {
      // Only allow digits for card number and CVV
      newValue = value.replace(/[^0-9]/g, '');
    }
    setCardDetails(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields
    const { userName, userEmail, cardNumber, name, expiry, cvv } = cardDetails;
    // Name (userName) validation: > 3 letters
    if (!userName || userName.trim().length < 3) {
      alert('Name must be at least 3 characters.');
      return;
    }
    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail || !emailRegex.test(userEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Card number: only digits, length 13-19 (Visa/Master/Amex range)
    const cardNumClean = cardNumber.replace(/\s+/g, '');
    if (!/^[0-9]{13,19}$/.test(cardNumClean)) {
      alert('Card number must be 13-19 digits.');
      return;
    }
    // Name on card: > 3 letters
    if (!name || name.trim().length < 3) {
      alert('Name on card must be at least 3 characters.');
      return;
    }
    // CVV: exactly 3 digits
    if (!/^[0-9]{3}$/.test(cvv)) {
      alert('CVV must be exactly 3 digits.');
      return;
    }

    // Expiry: MM/YY format and must be in the future
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert('Expiry must be in MM/YY format.');
      return;
    }
    // Check if expiry is in the future
    const [expMonth, expYear] = expiry.split('/').map(Number);
    if (expMonth < 1 || expMonth > 12) {
      alert('Expiry month must be between 01 and 12.');
      return;
    }
    // Get current month and year
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // last two digits
    const currentMonth = now.getMonth() + 1;
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      alert('Card expiry date must be in the future.');
      return;
    }

    // Prepare checkout data
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const checkoutData = {
      cardDetails: { ...cardDetails },
      cartItems: cart.map(item => ({ ...item })),
      totalAmount: Number(totalAmount.toFixed(2))
    };
    console.log("sdsadhkasjhdka");
    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:3000/payment-init", checkoutData);
      // Redirect to payment result page with orderId
      console.log("ye mer response syahasd", response.status);
      if( response.status){
        navigate(`/payment-success`, { state: { purchasedItems: cart } })
      }else{
        navigate(`/payment-failed`)
      }
    } catch (err) {
      alert('Payment failed! ' + (err.response?.data?.error || err.message));
    }
    // Reset form
    setCardDetails({ userName: '', userEmail: '', cardNumber: '', name: '', expiry: '', cvv: '' });
    setShowCheckout(false);
  };

  // Scroll to checkout form when it appears
  useEffect(() => {
    if (showCheckout && checkoutFormRef.current) {
      checkoutFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showCheckout]);

  return (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <Nav />
      <div style={{ padding: "32px 0", maxWidth: 900, margin: '0 auto' }}>
        {cart.length > 0 ? (
          <>
            <h2 style={{ fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 24 }}>Your Cart</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {cart.map((item) => (
                <div key={item.id} style={{
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 32,
                  padding: 24,
                  transition: 'box-shadow 0.2s',
                  border: '1px solid #e3e3e3',
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px #e3e3e3' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: '#333' }}>{item.name}</h3>
                    <p style={{ color: '#666', fontSize: 14, margin: '8px 0 0 0', minHeight: 32 }}>{item.description}</p>
                    <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 13 }}>
                      <span style={{ color: '#888' }}><strong>Category:</strong> {item.category}</span>
                      <span style={{ color: '#888' }}><strong>Price:</strong> ${item.price}</span>
                      <span style={{ color: item.in_stock ? '#28a745' : '#d9534f' }}><strong>In Stock:</strong> {item.in_stock ? 'Yes' : 'No'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
                      <button
                        onClick={() => onQtyChange(item.id, item.qty - 1)}
                        disabled={item.qty <= 1}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          border: 'none',
                          background: '#f0f0f0',
                          color: '#333',
                          fontSize: 20,
                          cursor: item.qty > 1 ? 'pointer' : 'not-allowed',
                          transition: 'background 0.2s',
                        }}
                      >-</button>
                      <span style={{ minWidth: 36, textAlign: 'center', fontWeight: 600, fontSize: 18 }}>{item.qty}</span>
                      <button
                        onClick={() => onQtyChange(item.id, item.qty + 1)}
                        disabled={!item.in_stock}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          border: 'none',
                          background: '#007bff',
                          color: '#fff',
                          fontSize: 20,
                          cursor: item.in_stock ? 'pointer' : 'not-allowed',
                          transition: 'background 0.2s',
                        }}
                      >+</button>
                    </div>
                  </div>
                  <div style={{ minWidth: 120, textAlign: 'right' }}>
                    <p style={{ fontWeight: 600, fontSize: 16, color: '#222', margin: 0 }}>Subtotal</p>
                    <p style={{ fontSize: 18, color: '#007bff', margin: 0 }}>${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              textAlign: 'right',
              marginTop: 40,
              fontSize: 22,
              fontWeight: 700,
              color: '#222',
              background: '#f8fafc',
              padding: '18px 32px',
              borderRadius: 12,
              boxShadow: '0 2px 8px #e3e3e3',
              maxWidth: 350,
              marginLeft: 'auto',
            }}>
              Total: ${cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
            </div>

            <div style={{ textAlign: 'right', marginTop: 32 }}>
              <button
                onClick={() => setShowCheckout(true)}
                style={{
                  padding: '12px 32px',
                  fontSize: '1.1em',
                  background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  boxShadow: '0 2px 8px #e3e3e3',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Checkout
              </button>
            </div>

            {showCheckout && (
              <form
                ref={checkoutFormRef}
                onSubmit={handleCheckoutSubmit}
                style={{
                  marginTop: 40,
                  background: '#fff',
                  border: '1px solid #e3e3e3',
                  padding: '32px 28px',
                  borderRadius: 16,
                  maxWidth: 420,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                }}
              >
                <h3 style={{ fontWeight: 700, fontSize: 22, color: '#007bff', marginBottom: 24 }}>Enter Card Details</h3>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 500, color: '#333' }}>Your Name:</label><br />
                  <input
                    type="text"
                    name="userName"
                    value={cardDetails.userName}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, marginTop: 4 }}
                  />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 500, color: '#333' }}>Email Address:</label><br />
                  <input
                    type="email"
                    name="userEmail"
                    value={cardDetails.userEmail}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, marginTop: 4 }}
                  />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 500, color: '#333' }}>Card Number:</label><br />
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, marginTop: 4 }}
                  />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 500, color: '#333' }}>Name on Card:</label><br />
                  <input
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, marginTop: 4 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 500, color: '#333' }}>Expiry:</label><br />
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, marginTop: 4 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 500, color: '#333' }}>CVV:</label><br />
                    <input
                      type="password"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, marginTop: 4 }}
                    />
                  </div>
                </div>
                <button type="submit" style={{
                  padding: '12px 32px',
                  background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 17,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #e3e3e3',
                  marginTop: 8,
                  transition: 'background 0.2s',
                }}>Submit Payment</button>
              </form>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: 120, fontFamily: 'Poppins, Arial, sans-serif' }}>
            <h1 style={{ color: '#888', fontWeight: 700, fontSize: 32, letterSpacing: 1 }}>Your cart is empty</h1>
            <p style={{ color: '#aaa', fontSize: 18, marginTop: 12, fontWeight: 400 }}>Add some products to get started!</p>
            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: 28,
                padding: '12px 36px',
                fontSize: '1.1em',
                background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontFamily: 'Poppins, Arial, sans-serif',
                boxShadow: '0 2px 8px #e3e3e3',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Add Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
