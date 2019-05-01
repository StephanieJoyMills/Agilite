const { getNotes } = require("../../db-service");

module.exports = async function(app) {
  const http = require("http").Server(app);
  const io = require("socket.io")(http);

  io.on("connection", async socket => {
    let previousId;

    setInterval(function() {
      socket.emit("stream", { title: "A new title via Socket.IO!" });
    }, 1000);
    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId, () =>
        console.log(`Socket ${socket.id} joined room ${currentId}`)
      );
      previousId = currentId;
    };

    socket.on("getBoardNotes", async docId => {
      safeJoin(boardId);
      const notes = await getNotes(id);
      socket.emit("board notes:", notes);
    });

    socket.on("editBoard", async board => {
      //upsert note
      socket.to(board.id).emit("board", notes);
    });

    console.log(`Socket ${socket.id} has connected`);
  });
};
