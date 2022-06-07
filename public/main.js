const socket = io();

//Matchs
socket.emit("get games");
socket.on("get games", (games) => {
    games.map((game) => {
        addNewGame({ id:game.id, player1:game.player1, player2:game.player2, in_progress:game.in_progress })
    })
})

const inputPlayer1= document.querySelector(".game_form__input_player1");
const inputPlayer2 = document.querySelector(".game_form__input_player2");
const gameForm = document.querySelector(".game_form");
const gameBox = document.querySelector(".games__history");

const addNewGame = ({ id, player1, player2, in_progress }) => {
    if (in_progress === true) {
        const game = `
        <div class="games__game_inprogress">
            <div class="row">
                <div class="col-6">
                    <p>${player1} vs ${player2}</p>
                </div>
                <div class="col-6">
                <button class="game_update__button" value="${id}">
                    Terminer
                </button>
                </div>
            </div>
        </div>
        `;
        gameBox.innerHTML += game;
    } else {
        const game = `
        <div class="games__game_inprogress">
            <div class="row">
                <div class="col-6">
                    <p>${player1} vs ${player2}</p>
                </div>
                <div class="col-6">
                <button class="game_delete__button" value="${id}">
                    Supprimer
                </button>
                </div>
            </div>
        </div>
        `;
        gameBox.innerHTML += game;
    }

    const gameUpdate = document.getElementsByClassName("game_update__button");
    for (let i = 0; i < gameUpdate.length; i++) {
        gameUpdate[i].addEventListener("click", () => {
            socket.emit("update game", {
                in_progress: false,
                id: gameUpdate[i].value
            });
        });
    }
    const gameDelete = document.getElementsByClassName("game_delete__button");
    for (let i = 0; i < gameDelete.length; i++) {
        gameDelete[i].addEventListener("click", () => {
            socket.emit("delete game", {
                in_progress: false,
                id: gameDelete[i].value
            });
        });
    }
};

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputPlayer1.value) {
    return;
  }
  if (!inputPlayer2.value) {
    return;
  }
  socket.emit("add game", {
    player1: inputPlayer1.value,
    player2: inputPlayer2.value,
    in_progress: true
  });
  inputPlayer1.value = "";
  inputPlayer2.value = "";
});

socket.on("add game", (data) => {
  addNewGame({ id:data.id, player1: data.player1, player2: data.player2, in_progress: data.in_progress });
});

socket.on("update games", (games) => {
    gameBox.innerHTML = '';
    console.log(games);
    games.map((game) => {
        addNewGame({ id:game.id, player1:game.player1, player2:game.player2, in_progress:game.in_progress })
    })
})

//Messages
socket.emit("get message");
socket.on("get message", (messages) => {
    messages.map((message) => {
        addNewMessage({author:message.author, message:message.message})
    })
})

const inputAuthor = document.querySelector(".message_form__input_author");
const inputMessage = document.querySelector(".message_form__input_message");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");

const addNewMessage = ({ author, message }) => {
  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
        <div class="card bg-light my-2">
            <h5 class="card-title ps-1">${author}</h5>
            <p class="card-text ps-1">${message}</p>
        </div>
    </div>
  </div>`;
  messageBox.innerHTML += receivedMsg;
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputAuthor.value) {
    return;
  }
  if (!inputMessage.value) {
    return;
  }
  socket.emit("add message", {
    author: inputAuthor.value,
    message: inputMessage.value,
  });
  inputAuthor.value = "";
  inputMessage.value = "";
});

socket.on("add message", function (data) {
  addNewMessage({ author: data.author, message: data.message });
});

