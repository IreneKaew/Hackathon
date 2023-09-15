const express = require("express");
const app = express();
const cors = require("cors");
const { connectionData } = require("./db");
connectionData();
// Middleware for JSON parsing
app.use(express.json());

// Enable CORS
app.use(cors());

// Import your contactRoutes, authRoutes, and carouselRoutes here
const contactRoutes = require("./routes/contactRoutes"); // Adjust the path accordingly
const authRoutes = require("./routes/authRoutes"); // Adjust the path accordingly
const carouselRoutes = require("./routes/carouselRoutes"); // Adjust the path accordingly

// Use your routes
app.use("/contact", contactRoutes);
app.use("/auth", authRoutes); // Assuming you have authentication routes
app.use("/carousel", carouselRoutes); // Add the carousel route

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
