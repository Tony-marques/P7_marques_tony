const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const commentRoute = require("./routes/comment.routes");
const likeRoute = require("./routes/like.routes");
const app = express();
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
// const PORTHTTP = process.env.PORTHTTP;
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");

// Permet de récupérer les données au format JSON et le req.body
app.use(express.json());

// Analyse les charges utiles dans l'URL
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Permet de définir les contrôles d'accès
const corsOptions = {
  // Uniquement les requêtes venant de cette source
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Définit divers en-têtes pour la sécurité
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Permet d'accéder au fichier static
app.use("/images", express.static(path.join(__dirname, "images")));

// Création des routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likeRoute);

// const https = require("https");
// const http = require("http");
// const fs = require("fs");

// const key = fs.readFileSync(__dirname + "/cert/key.pem");
// const cert = fs.readFileSync(__dirname + "/cert/cert.pem");

// const options = {
//   key: key,
//   cert: cert,
// };

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(options, app);

// httpServer.listen(PORTHTTP, () => {
//   console.log(`Serveur lancé sur http://localhost:${PORTHTTP}`);
// });
// Ecoutez le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
