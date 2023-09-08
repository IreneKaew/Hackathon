const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

// Array to store message history
const messageHistorical = [];
// Store connected users & their usernames
const users = {};

// Socket.IO event handling at Initialize
io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("join", (username) => {
    users[socket.id] = username;
    socket.emit("message", {
      user: "Server",
      content: `Welcome to the chat, ${username}!`,
    });
    socket.broadcast.emit("message", {
      user: "Server",
      content: `${username} has joined the chat.`,
    });
  });

  // Send message history to the client
  socket.emit("messageHistory", messageHistorical);

  socket.on("message", (message) => {
    const user = users[socket.id];
    const messageWithUsername = {
      user: user,
      content: message,
    };
    messageHistorical.push(messageWithUsername);
    io.emit("message", messageWithUsername);
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    delete users[socket.id];
    if (user) {
      io.emit("message", {
        user: "Server",
        content: `${user} has left the chat.`,
      });
    }
    console.log("A client disconnected");
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server started on port 3000");
});

