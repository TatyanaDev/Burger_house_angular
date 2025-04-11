const http = require("http");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
