const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 8081

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // TODO: Ganti jadi URL react-mu
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("INFO:", "seseorang telah bergabung ke chat room!");

  socket.on("chat message", (msg) => {
    console.log("INFO:", "incoming message", JSON.stringify(msg));
    io.emit("incoming message", msg);
  });

  socket.on("disconnect", () => {
    console.log("INFO:", "seseorang telah pergi dari chat room!");
  });
});

server.listen(PORT, () => {
  console.log("INFO:", `Listening on port http://localhost:${PORT}`);
});
