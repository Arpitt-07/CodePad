import { useRef, useEffect } from "react";

export default function Chat({
  messages,
  chatInput,
  setChatInput,
  handleSendChat,
}) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="panel-title">Team Chat</div>
      <div ref={chatRef} className="chat-history">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble-wrapper ${msg.isMe ? "me" : "them"}`}
          >
            <div className="chat-sender">{msg.isMe ? "You" : msg.sender}</div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendChat} className="chat-input-form">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-btn">
          Send
        </button>
      </form>
    </div>
  );
}
