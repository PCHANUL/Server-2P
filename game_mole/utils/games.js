/*eslint-disable*/

const games = [];

// Join game
function gameJoin(nickname, gameRoomId, socketId, avatarId) {
  let game = {
    gameRoomId,
    usernames: [],
    socketId: [],
    avatarId: {},
    currentMole: 0,
    score: {},
  };

  if (!games.find((gameRoom) => gameRoom.gameRoomId === gameRoomId)) {
    game.usernames.push(nickname);
    game.score[nickname] = 0;
    game.socketId.push(socketId);
    game.avatarId[nickname] = avatarId;
    games.push(game);
    return [game, false];
  } else {
    if (games.find((gameRoom) => {
        if(gameRoom.gameRoomId === gameRoomId) return gameRoom.socketId.length === 2
      })) {
      return [games.find((gameRoom) => gameRoom.gameRoomId === gameRoomId), true];
    }
    games.find((gameRoom) => gameRoom.gameRoomId === gameRoomId).usernames.push(nickname);
    games.find((gameRoom) => gameRoom.gameRoomId === gameRoomId).score[nickname] = 0;
    games.find((gameRoom) => gameRoom.gameRoomId === gameRoomId).socketId.push(socketId);
    games.find((gameRoom) => gameRoom.gameRoomId === gameRoomId).avatarId[nickname] = avatarId;
    return [games.find((gameRoom) => gameRoom.gameRoomId === gameRoomId), false];
  }
}

// Get current users
function getCurrentScores(gameRoomId) {
  return getCurrentGame(gameRoomId).score;
}

function getCurrentGame(gameRoomId) {
  return games.find((gameRoom) => gameRoom.gameRoomId === gameRoomId);
}

function leaveGame(gameRoomId) {
  games.splice(
    games.findIndex((gameRoom) => gameRoom.gameRoomId === gameRoomId),
    1
  );
}

module.exports = {
  gameJoin,
  getCurrentGame,
  getCurrentScores,
  leaveGame,
};
