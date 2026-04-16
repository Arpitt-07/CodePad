import Editor from "@monaco-editor/react";
import { useState } from "react";

const FILE_EXTENSIONS = {
  63: "js",
  54: "cpp",
  71: "py",
};

export default function CodeEditor({
  LANGUAGES,
  language,
  handleLanguageChange,
  code,
  handleEditorChange,
  executeCode,
  isCompiling,
  roomId,
  onLeaveRoom,
}) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const ext = FILE_EXTENSIONS[language] || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `codepad.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="editor-section">
      <div className="editor-header">
        <div className="editor-header-left">
          <div className="tabs">
            {Object.entries(LANGUAGES).map(([id, lang]) => (
              <button
                key={id}
                onClick={() => handleLanguageChange(id)}
                className={`tab-btn ${language === Number(id) ? "active" : ""}`}
              >
                {lang.icon} {lang.label}
              </button>
            ))}
          </div>
          <div className="room-badge" onClick={handleCopyRoomId} title="Click to copy room code">
            <span className="room-badge-dot" />
            <span className="room-badge-label">Room</span>
            <span className="room-badge-code">{roomId}</span>
            <span className="room-badge-copy">{copied ? "✓" : "⎘"}</span>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={handleDownload} className="download-btn" title="Download code">
            ↓ Download
          </button>
          <button
            onClick={executeCode}
            disabled={isCompiling}
            className={`run-btn ${isCompiling ? "running" : ""}`}
          >
            {isCompiling ? "Compiling..." : "▶ Run Code"}
          </button>
          <button onClick={onLeaveRoom} className="leave-btn" title="Leave room">
            ✕ Leave
          </button>
        </div>
      </div>

      <div className="editor-wrapper">
        <Editor
          theme="vs-dark"
          language={LANGUAGES[language].monacoLang}
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            padding: { top: 24 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineHeight: 1.6,
          }}
        />
      </div>
    </div>
  );
}
