const express = require("express");
const cookieParser = require("cookie-parser");
const corn = require("node-cron");
const cors = require("cors");
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const { errorHandler } = require("./middleware/errorMiddleware");
const User = require("./models/User");
require("./utils/connectDB")();

const app = express();
const PORT = process.env.PORT || 5000;

//Cron for trail period : run every single
corn.schedule("0 0 * * * *", async () => {
  console.log("run task");
  try {
    // get the current date
    const today = new Date();
    const updatedUser = await User.updateMany(
      {
        trailActive: true,
        trailExpires: { $lt: today },
      },
      {
        trailActive: false,
        subscriptionPlan: "Free",
        monthlyRequestCount: 5,
      }
    );
    console.log(updatedUser);
  } catch (error) {
    console.log(error);
  }
});
//Cron for free plan : run at the end of every month
corn.schedule("0 0 1 * * *", async () => {
  try {
    // get the current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Free",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});
//Cron for Basic plan : run at the end of every month
corn.schedule("0 0 1 * * *", async () => {
  try {
    // get the current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Basic",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});
//Cron for Premium plan : run at the end of every month
corn.schedule("0 0 1 * * *", async () => {
  try {
    // get the current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Premium",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});
//--middlewares----
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
//----Routes-----
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);

//---ErrorHandler----
app.use(errorHandler);
//start the server
app.listen(PORT, console.log(`server is running on port ${PORT}`));
