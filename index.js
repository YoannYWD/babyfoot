const express = require("express");
const socket = require("socket.io");
const pool = require('./db');
const queries = require('./src/queries');

// App
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Fichier static
app.use(express.static("public"));

// Websocket
const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");

  //Matchs
  socket.on("get games", function () {
    pool.query(queries.getGames, (error, results) => {
        if (error) throw error;
        io.emit("get games", results.rows);
    })
  });
  socket.on("add game", function (data) {
    pool.query(queries.addGame, [data.player1, data.player2, data.in_progress], (error, results) => {
        if (error) throw error;
        res = results.rows;
        data.id = res[0].id;
        io.emit("add game", data);
    })
  });
  socket.on("update game", function (data) {
    pool.query(queries.updateGame, [data.in_progress, data.id], (error, results) => {
        if (error) throw error;
        pool.query(queries.getGames, (error, results) => {
            if (error) throw error;
            io.emit("update games", results.rows);
        })
    })
  });
  socket.on("delete game", function (data) {
    pool.query(queries.deleteGame, [data.id], (error, results) => {
        if (error) throw error;
        pool.query(queries.getGames, (error, results) => {
            if (error) throw error;
            io.emit("update games", results.rows);
        })
    })
  });

  //Messages
  socket.on("get message", function () {
    pool.query(queries.getMessages, (error, results) => {
        if (error) throw error;
        io.emit("get message", results.rows);
    })
  });
  socket.on("add message", function (data) {
    pool.query(queries.addMessage, [data.author, data.message], (error, results) => {
        if (error) throw error;
    })
    io.emit("add message", data);
  });
});