import Terminal from "./Terminal";
import Chat from "./Chat";

export default function Sidebar({
  output,
  messages,
  chatInput,
  setChatInput,
  handleSendChat,
}) {
  return (
    <div className="sidebar-section">
      <Terminal output={output} />
      <Chat
        messages={messages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendChat={handleSendChat}
      />
    </div>
  );
}
