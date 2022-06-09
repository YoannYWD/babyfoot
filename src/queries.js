const getGames = 'SELECT * FROM games';
const getGameById = 'SELECT * FROM games WHERE id = $1';
const addGame = 'INSERT INTO games (player1, player2, in_progress) VALUES ($1, $2, $3) RETURNING id';
const updateGame = 'UPDATE games SET in_progress = $1 WHERE id = $2';
const deleteGame = 'DELETE FROM games WHERE id = $1';

const getMessages = 'SELECT * FROM messages';
const addMessage = 'INSERT INTO messages (author, message) VALUES ($1, $2)';


module.exports = {
    getGames,
    getGameById,
    addGame,
    updateGame,
    deleteGame,
    getMessages,
    addMessage
};