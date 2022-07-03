const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
const { forIn } = require("lodash");

const lobbies = [];

const removeLobby = (lobby) => {
  let deleteKey = lobby.key;

  forIn(lobbies, (lobby) => {
    if (lobby.key === deleteKey) {
      const index = lobbies.indexOf(lobby);
      lobbies.splice(index, 1);
    }
  });
};

// Routes to diagnose any issues once the API is deployed
app.use("/lobbies", (req, res) => {
  res.json(lobbies);
});

app.use("/", (req, res) => {
  res.json("Health check, API is running");
});

io.on("connection", (socket) => {
  const fullSend = (key, msg) => {
    socket.emit(key, msg); // With this one, only the sender receives the new message
    socket.broadcast.emit(key, msg); // With this one, only everyone else receives the new message
  };

  // Sends all the current lobbies to anyone who is connected
  fullSend("Lobbies", lobbies);

  socket.on("ButtonPressed", (msg) => {
    fullSend("ButtonPressed", msg);
  });

  // This functionality creates a lobby, and adds it to the list of lobbies
  socket.on("CreateLobby", (lobby) => {
    lobbies.push(lobby);
    fullSend("Lobbies", lobbies);
  });

  // This functionality starts a game (e.g. someone has joined someone's lobby)
  socket.on("GameStarted", (lobby) => {
    // Remove lobby from list of lobbies, so no one else can join
    removeLobby(lobby);

    // Sends the host of the lobby into gameplay once someone joins
    fullSend(lobby, "Game started!");
  });

  socket.on("Gameplay", (response) => {
    // Send through the latest state of the game to everyone in the lobby
    fullSend(response.lobby, {
      board: response.board,
      currentMove: response.currentMove,
      whoMoved: response.whoMoved,
    });
  });
});

server.listen(port, () => console.log("\n\tServer running on port " + port));
