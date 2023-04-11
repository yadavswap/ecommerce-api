import  express from "express";
import Stripe from 'stripe';

import dotenv from "dotenv"
dotenv.config()
import dbConnect from "../config/dbConect.js";
import { globalErrHandler,notFound } from "../middlewares/globalErrorHandler.js";
import userRoutes from "../routes/usersRoute.js";
import productRoutes from "../routes/productRoute.js";
import categoryRoute from "../routes/categoryRoute.js";
import brandRoute from "../routes/brandRoute.js";
import colorRoute from "../routes/colorRoute.js";
import reviewRoute from "../routes/reviewRoute.js";
import orderRoute from "../routes/orderRoute.js";
import couponRoutes from "../routes/couponRoute.js";
import Order from "../models/Order.js";
dbConnect()
const app= express()
// pass incoming data
app.use(express.json())
// stripe
// stripe instamce
const stripe = new Stripe(process.env.STRIPE_KEY)

const endpointSecret = "whsec_dacde31ddfd5d03b3a1e82c239cd1dec15c8b66b4e48bbcf9ead40bd3298227e";

app.post('/webhook', express.raw({type: 'application/json'}),async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log(event);
  } catch (err) {
    console.log('err',err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if(event.type === "checkout.session.completed"){
    // update the order
    console.log(event);
    const session = event.data.object;
    const {orderId}= session.metadata;
    const paymentStatus =session.payment_status;
    const paymentMethod=session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
    // find the order
    const order = await Order.findByIdAndUpdate(
      JSON.parse(orderId),{
      totalPrice:totalAmount/100,
      currency,
      paymentMethod,
      paymentStatus,
      },
      {
        new :true

      }
    );
      console.log(order);
  }else{
    return;
  }

  // // Handle the event
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
// routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/products",productRoutes)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/brand",brandRoute)
app.use("/api/v1/colors",colorRoute)
app.use("/api/v1/reviews",reviewRoute)
app.use("/api/v1/orders",orderRoute)
app.use("/api/v1/coupons",couponRoutes)

app.listen(2030, () => console.log('Running on port 2030'));

// 404error
app.use(notFound) 
// error middlewre
app.use(globalErrHandler)


export default app;