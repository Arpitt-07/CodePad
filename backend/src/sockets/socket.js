const rooms = new Map();

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ Connected: ${socket.id}`);

    socket.on('join-room', (roomId) => {
      if (typeof roomId !== 'string' || !roomId.trim()) return;

      for (const [rid, members] of rooms) {
        if (members.has(socket.id)) {
          members.delete(socket.id);
          socket.leave(rid);
          socket.to(rid).emit('user-left', socket.id);
          if (members.size === 0) rooms.delete(rid);
        }
      }

      socket.join(roomId);
      if (!rooms.has(roomId)) rooms.set(roomId, new Set());
      rooms.get(roomId).add(socket.id);

      socket.to(roomId).emit('user-joined', socket.id);
    });

    socket.on('code-change', ({ roomId, code }) => {
      if (typeof roomId !== 'string' || typeof code !== 'string') return;
      socket.to(roomId).emit('code-change', code);
    });

    socket.on('language-change', ({ roomId, languageId }) => {
      if (typeof roomId !== 'string') return;
      socket.to(roomId).emit('language-change', Number(languageId)); 
    });

    socket.on('chat-message', ({ roomId, message, sender }) => {
      if (typeof roomId !== 'string' || typeof message !== 'string') return;
      socket.to(roomId).emit('chat-message', {
        text: message,
        sender: sender,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      });
    });

    socket.on('disconnect', () => {
      for (const [rid, members] of rooms) {
        if (members.has(socket.id)) {
          members.delete(socket.id);
          socket.to(rid).emit('user-left', socket.id);
          if (members.size === 0) rooms.delete(rid);
        }
      }
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
