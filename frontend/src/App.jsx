import { useState, useCallback } from "react";
import CodeEditor from "./components/Editor/CodeEditor";
import Sidebar from "./components/Sidebar/Sidebar";
import UsernameModal from "./components/UsernameModal";
import { LANGUAGES } from "./utils/constants";
import { timestamp, currentFormattedTime } from "./utils/time";
import { useSocketio } from "./hooks/useSocketio";
import { useCompiler } from "./hooks/useCompiler";

function App() {
  const [roomId, setRoomId] = useState(null);
  const [code, setCode] = useState(LANGUAGES[63].boilerplate);
  const [language, setLanguage] = useState(63);
  const [output, setOutput] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [username, setUsername] = useState(null);

  const appendOutput = useCallback((line) => {
    setOutput((prev) => [...prev, { text: line, time: timestamp() }]);
  }, []);

  const { emitCodeChange, emitLanguageChange, emitChatMessage } = useSocketio(
    roomId,
    setCode,
    setLanguage,
    setMessages,
    appendOutput,
    LANGUAGES
  );

  const { isCompiling, executeCode } = useCompiler(appendOutput);

  const handleEditorChange = (value) => {
    setCode(value);
    emitCodeChange(value);
  };

  const handleLanguageChange = (id) => {
    const numId = Number(id);
    setLanguage(numId);
    setCode(LANGUAGES[numId].boilerplate);
    emitLanguageChange(numId);
    emitCodeChange(LANGUAGES[numId].boilerplate);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const timeString = currentFormattedTime();
    setMessages((prev) => [
      ...prev,
      { text: chatInput, sender: username, time: timeString, isMe: true },
    ]);
    emitChatMessage(chatInput, username);
    setChatInput("");
  };

  const handleRunCode = () => {
    executeCode(code, language);
  };

  const handleJoin = (name, room) => {
    setUsername(name);
    setRoomId(room);
  };

  const handleLeaveRoom = () => {
    setUsername(null);
    setRoomId(null);
    setCode(LANGUAGES[63].boilerplate);
    setLanguage(63);
    setOutput([]);
    setMessages([]);
    setChatInput("");
  };

  if (!username || !roomId) {
    return <UsernameModal onJoin={handleJoin} />;
  }

  return (
    <div className="app-container">
      <CodeEditor
        LANGUAGES={LANGUAGES}
        language={language}
        handleLanguageChange={handleLanguageChange}
        code={code}
        handleEditorChange={handleEditorChange}
        executeCode={handleRunCode}
        isCompiling={isCompiling}
        roomId={roomId}
        onLeaveRoom={handleLeaveRoom}
      />
      <Sidebar
        output={output}
        messages={messages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendChat={handleSendChat}
      />
    </div>
  );
}

export default App;