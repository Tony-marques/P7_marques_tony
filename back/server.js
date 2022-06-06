const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const commentRoute = require("./routes/comment.routes");
const likeRoute = require("./routes/like.routes");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likeRoute);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

// test
