const OrderDetails = require('../schemas/orderdetails');
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("evendasdsad", event);
    
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.created': {
      const paymentIntent = event.data.object;
      console.log('💰 PaymentIntent was successful!', paymentIntent.id);
      // Save order details to DB (status: success)
      try {
        const meta = paymentIntent.metadata || {};
        // You may want to store more info in metadata when creating the paymentIntent
        const order = new OrderDetails({
          userName: meta.customer_name || '',
          userEmail: meta.customer_email || '',
          cartItems: meta.cartItems ? JSON.parse(meta.cartItems) : [],
          totalAmount: paymentIntent.amount / 100,
          paymentIntentId: paymentIntent.id,
          status: 'success'
        });
        await order.save();
        console.log('✅ Order saved to DB');
      } catch (err) {
        console.error('❌ Error saving order:', err.message);
      }
      break;
    }
    case 'payment_intent.payment_failed': {
      const failedIntent = event.data.object;
      console.log('❌ PaymentIntent failed:', failedIntent.id);
      // Save failed order to DB
      try {
        const meta = failedIntent.metadata || {};
        const order = new OrderDetails({
          userName: meta.customer_name || '',
          userEmail: meta.customer_email || '',
          cartItems: meta.cartItems ? JSON.parse(meta.cartItems) : [],
          totalAmount: failedIntent.amount / 100,
          paymentIntentId: failedIntent.id,
          status: 'failed'
        });
        await order.save();
        console.log('❌ Failed order saved to DB');
      } catch (err) {
        console.error('❌ Error saving failed order:', err.message);
      }
      break;
    }
    // ... handle other event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};
// 
// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_PUBIC_KEY); 
const stripe = require('stripe')(process.env.STRIPE_PUBIC_KEY);

exports.strippayemnt = async (req, res) => {
  console.log("asjdhasjkdhask", req.body);
  
  const { cardDetails, totalAmount } = req.body;

  if (!cardDetails || !totalAmount) {
    return res.status(400).json({ error: "Missing cardDetails or totalAmount" });
  }

  try {
    console.log("✅ Creating payment intent");


    // Add cartItems to metadata as JSON string for later retrieval in webhook
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // convert to cents
      currency: 'usd',
      metadata: {
        customer_name: cardDetails.userName,
        customer_email: cardDetails.userEmail,
        cartItems: JSON.stringify(
          (req.body.cartItems || []).map(item => ({ id: item.id, qty: item.qty }))
        )
      },
    });

    console.log("asdsadsadsadsdadasd",paymentIntent);
    
    console.log("✅ PaymentIntent created:", paymentIntent.id);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("❌ Error creating payment intent:", err.message);
    res.status(500).json({ error: err.message });
  }
};