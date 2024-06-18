import React from "react";
import ReactDOM from "react-dom/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./AuthContext/AuthContext";
//Stripe configuration
const stripePromise = loadStripe(
  "pk_test_51PM9R1CT2tpzIoZcOa18M053v2oS3arRcsQxKTSQnNk7tbmekPY47pHqh0OF5rR1fZKwxrfyblHYj25Cunx8MoGt00ZpBRQqin"
);
const options = {
  mode: "payment",
  currency: "usd",
  amount: 1099,
};
const root = ReactDOM.createRoot(document.getElementById("root"));
//React query client
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
