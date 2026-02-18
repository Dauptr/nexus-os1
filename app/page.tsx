"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate the boot sequence loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center z-[9999]" style={{ background: "#000001" }}>
      
      {/* Background Canvas (Placeholder) */}
      <canvas className="fixed inset-0 z-0 pointer-events-none" style={{ background: "#000001" }} />

      {/* Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-10" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px" 
        }} 
      />

      {/* Scan Line Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        <div 
          className="absolute w-full h-[2px] opacity-20 animate-scan-line" 
          style={{ background: "linear-gradient(to bottom, transparent, #00f0ff, transparent)" }} 
        />
      </div>

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
        
        {/* Decorative Borders */}
        <div className="absolute -inset-10 border rounded-lg pointer-events-none animate-pulse" style={{ borderColor: "rgba(0, 240, 255, 0.3)" }} />
        <div className="absolute -inset-20 border rounded-lg pointer-events-none" style={{ borderColor: "rgba(0, 240, 255, 0.15)" }} />
      </div>

      {/* Boot Log Box */}
      <div className="w-80 md:w-96 space-y-4 z-30">
        <div 
          className="h-36 overflow-hidden rounded-lg p-3 font-mono text-xs backdrop-blur-sm"
          style={{ 
            background: "rgba(0, 10, 20, 0.9)", 
            border: "1px solid rgba(0, 240, 255, 0.3)", 
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.1), inset 0 0 20px rgba(0, 240, 255, 0.05)" 
          }}
        >
          <div className="flex items-center gap-2 mb-1.5" style={{ color: "#00f0ff" }}>
            <span className="text-xs">▸</span>
            <span>BIOS Initialization</span>
            {progress < 100 && <span className="animate-pulse">...</span>}
            {progress >= 100 && <span style={{ color: "#00ff00" }}> [OK]</span>}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(0, 240, 255, 0.1)", boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)" }}
          >
            <div 
              className="h-full rounded-full transition-all duration-200 relative overflow-hidden"
              style={{ 
                width: `${Math.min(progress, 100)}%`, 
                background: "linear-gradient(90deg, #00f0ff, #ff00aa)", 
                boxShadow: "0 0 15px #00f0ff" 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="text-center text-xs font-mono" style={{ color: "#6b7280" }}>
            {Math.min(progress, 100)}% Complete
          </div>
        </div>
      </div>
    </main>
  );
}
