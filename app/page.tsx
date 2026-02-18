"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "> System ready.",
    "> Welcome to NEXUS OS v9.0",
    "> Type 'help' for available commands."
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait 1 second after loading finishes, then switch to desktop
          setTimeout(() => setIsBooted(true), 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.trim().toLowerCase();
      let response = "";
      
      // Simple command logic
      if (cmd === 'help') {
        response = "> Available commands: help, status, clear, date";
      } else if (cmd === 'status') {
        response = "> All systems operational. Node v17.9.1 detected.";
      } else if (cmd === 'clear') {
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      } else if (cmd === 'date') {
        response = `> Current time: ${new Date().toLocaleTimeString()}`;
      } else if (cmd) {
        response = `> Command not found: ${cmd}`;
      }

      setTerminalHistory(prev => [...prev, `> ${terminalInput}`, response]);
      setTerminalInput("");
    }
  };

  // --- VIEW 1: BOOT SEQUENCE ---
  if (!isBooted) {
    return (
      <main className="fixed inset-0 flex flex-col items-center justify-center z-[9999]" style={{ background: "#000001" }}>
        
        {/* Background Effects */}
        <canvas className="fixed inset-0 z-0 pointer-events-none" style={{ background: "#000001" }} />
        <div 
          className="fixed inset-0 pointer-events-none z-10 opacity-10" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px" 
          }} 
        />

        {/* Main Title */}
        <div className="relative mb-12 z-30">
          <h1 
            className="text-6xl md:text-8xl font-bold tracking-wider transition-all duration-100"
            style={{ 
              fontFamily: "monospace", 
              color: "#00f0ff", 
              textShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff, 0 0 80px #00f0ff" 
            }}
          >
            NEXUS
          </h1>
          <div className="text-center mt-2">
            <span className="text-sm tracking-[0.3em] animate-pulse" style={{ color: "#ff00aa" }}>
              OPERATING SYSTEM v9.0
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 md:w-96 space-y-4 z-30">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0, 240, 255, 0.1)" }}>
            <div 
              className="h-full rounded-full transition-all duration-200"
              style={{ 
                width: `${Math.min(progress, 100)}%`, 
                background: "linear-gradient(90deg, #00f0ff, #ff00aa)", 
                boxShadow: "0 0 15px #00f0ff" 
              }}
            />
          </div>
          <div className="text-center text-xs font-mono" style={{ color: "#6b7280" }}>
            {Math.min(progress, 100)}% Complete
          </div>
        </div>
      </main>
    );
  }

  // --- VIEW 2: TERMINAL INTERFACE ---
  return (
    <main className="fixed inset-0 flex flex-col p-4 md:p-8" style={{ background: "#000001" }}>
      {/* Top Bar */}
      <header className="flex justify-between items-center mb-4 border-b border-cyan-900/50 pb-2">
        <h1 
          className="text-xl font-bold tracking-widest"
          style={{ color: "#00f0ff", fontFamily: "monospace" }}
        >
          NEXUS TERMINAL
        </h1>
        <div className="text-xs font-mono" style={{ color: "#ff00aa" }}>
          SYS_STATUS: ONLINE
        </div>
      </header>

      {/* Terminal Output Window */}
      <div 
        className="flex-1 w-full rounded-lg p-4 font-mono text-sm overflow-y-auto"
        style={{ 
          background: "rgba(0, 10, 20, 0.9)", 
          border: "1px solid rgba(0, 240, 255, 0.3)", 
          color: "#00f0ff" 
        }}
      >
        {terminalHistory.map((line, index) => (
          <div key={index} className="mb-1">{line}</div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center mt-2">
          <span className="mr-2" style={{ color: "#ff00aa" }}>$</span>
          <input 
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none border-none"
            style={{ color: "#ffffff", caretColor: "#00f0ff" }}
            autoFocus
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-4 text-center text-xs font-mono text-gray-600">
        NEXUS OS Local Build // Node.js Environment
      </footer>
    </main>
  );
}
