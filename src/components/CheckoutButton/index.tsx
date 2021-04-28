import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import stripeConfig from '../../../configs/stripe'

const stripePromise = loadStripe(stripeConfig.public_key);

const CheckoutButton = ({ id, itemName }) => {
  const handleClick = async () => {
      
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: id, 
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `http://localhost:3000/success?itemName=${itemName}`,
      cancelUrl: `http://localhost:3000/cancel?itemName=${itemName}`,
    });

    if (error) {
        console.log(error)
    }
  };
  return (
    <button role="link" onClick={() => handleClick()}>
        Comprar
    </button>
  );
}

export default CheckoutButton