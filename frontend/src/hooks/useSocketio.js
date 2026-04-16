import { useEffect, useCallback } from "react";
import { socket } from "../services/socket";

export function useSocketio(
  roomId,
  setCode,
  setLanguage,
  setMessages,
  appendOutput,
  LANGUAGES
) {
  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);
    appendOutput(`sys:Joined room ${roomId}`);

    socket.on("code-change", (newCode) => setCode(newCode));

    socket.on("language-change", (newLangId) => {
      setLanguage(newLangId);
      setCode(LANGUAGES[newLangId]?.boilerplate || "");
    });

    socket.on("chat-message", (msgData) => {
      setMessages((prev) => [...prev, { ...msgData, isMe: false }]);
    });

    return () => {
      socket.off("code-change");
      socket.off("language-change");
      socket.off("chat-message");
    };
  }, [roomId, setCode, setLanguage, setMessages, appendOutput, LANGUAGES]);

  const emitCodeChange = useCallback(
    (code) => {
      socket.emit("code-change", { roomId, code });
    },
    [roomId]
  );

  const emitLanguageChange = useCallback(
    (languageId) => {
      socket.emit("language-change", { roomId, languageId });
    },
    [roomId]
  );

  const emitChatMessage = useCallback(
    (message, sender) => {
      socket.emit("chat-message", { roomId, message, sender });
    },
    [roomId]
  );

  return {
    emitCodeChange,
    emitLanguageChange,
    emitChatMessage,
  };
}
