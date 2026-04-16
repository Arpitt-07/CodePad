import { useState } from "react";

function generateRoomId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export default function UsernameModal({ onJoin }) {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [mode, setMode] = useState(null);

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newRoomId = generateRoomId();
    onJoin(trimmed, newRoomId);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    const trimmedRoom = roomId.trim().toUpperCase();
    if (!trimmed || !trimmedRoom) return;
    onJoin(trimmed, trimmedRoom);
  };

  const canProceed = name.trim().length > 0;

  return (
    <div className="username-overlay">
      <div className="username-modal">
        <div className="modal-glow" />
        <div className="modal-icon">⌨️</div>
        <h1 className="modal-title">CodePad Live</h1>
        <p className="modal-subtitle">
          Real-time collaborative coding sessions
        </p>

        {!mode && (
          <>
            <div className="modal-form">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                className="modal-input"
                autoFocus
                maxLength={24}
              />
            </div>
            <div className="room-actions">
              <button
                onClick={() => handleCreate()}
                disabled={!canProceed}
                className="modal-join-btn create-btn"
              >
                ✦ Create Room
              </button>
              <button
                onClick={() => setMode("join")}
                disabled={!canProceed}
                className="modal-join-btn join-btn"
              >
                → Join Room
              </button>
            </div>
          </>
        )}

        {mode === "join" && (
          <form onSubmit={handleJoinRoom} className="modal-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="modal-input"
              maxLength={24}
            />
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              placeholder="Room code (e.g. A3X9K2)"
              className="modal-input room-code-input"
              autoFocus
              maxLength={6}
            />
            <div className="room-actions">
              <button
                type="button"
                onClick={() => setMode(null)}
                className="modal-back-btn"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={!canProceed || roomId.trim().length < 3}
                className="modal-join-btn"
              >
                Join Session →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
