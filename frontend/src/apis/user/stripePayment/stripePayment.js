import axios from "axios";
//Stripe Payment
export const handleFreeSubscriptionAPI = async () => {
  const response = await axios.post(
    "https://ai-content-generator-1-ond7.onrender.com/api/v1/stripe/free-plan",
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//Stripe Payment
export const createStripePaymentIntentAPI = async (payment) => {
  console.log(payment);
  const response = await axios.post(
    "https://ai-content-generator-1-ond7.onrender.com/api/v1/stripe/checkout",
    {
      amount: Number(payment?.amount),
      subscriptionPlan: payment?.plan,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Verify  Payment =====

export const verifyPaymentAPI = async (paymentId) => {
  const response = await axios.post(
    `https://ai-content-generator-1-ond7.onrender.com/api/v1/stripe/verify-payment/${paymentId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
