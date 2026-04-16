import { useRef, useEffect } from "react";

export default function Terminal({ output }) {
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [output]);

  return (
    <div className="terminal-container">
      <div className="panel-title">Output Terminal</div>
      <div ref={outputRef} className="terminal-output">
        {output.map((line, i) => {
          const isErr = line.text.startsWith("err:");
          const isSys = line.text.startsWith("sys:");
          return (
            <div
              key={i}
              className={`log-line ${isErr ? "err" : isSys ? "sys" : "out"}`}
            >
              <span className="log-time">{line.time}</span>
              {line.text.replace(/^(err:|sys:|out:)/, "")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
