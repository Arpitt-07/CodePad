import { useState } from "react";

export function useCompiler(appendOutput) {
  const [isCompiling, setIsCompiling] = useState(false);

  const executeCode = async (code, languageId) => {
    if (!code.trim()) return;
    setIsCompiling(true);
    appendOutput("sys:Compiling via JDoodle...");

    try {
      const response = await fetch("https://codepad-b79q.onrender.com/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, languageId }),
      });

      const data = await response.json();

      if (data.stderr) {
        data.stderr
          .trim()
          .split("\n")
          .forEach((line) => appendOutput(`err:${line}`));
      } else {
        const lines = (data.stdout || "").trim().split("\n").filter(Boolean);
        if (lines.length === 0)
          appendOutput("sys:Execution finished with no output.");
        else lines.forEach((line) => appendOutput(`out:${line}`));
      }
    } catch (error) {
      appendOutput(`err:Network Error - ${error.message}`);
    } finally {
      setIsCompiling(false);
    }
  };

  return {
    isCompiling,
    executeCode,
  };
}
