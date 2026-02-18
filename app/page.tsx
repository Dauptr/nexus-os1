"use client";

import { useEffect, useState } from "react";

// Configuration for the scan
const TARGET_URL = "https://s12eh1dx2vs1-d.space.z.ai/";

const BOOT_SEQUENCE = [
  { type: 'system', message: "Initializing Core Systems..." },
  { type: 'highlight', message: `TARGET: ${TARGET_URL}` },
  { type: 'scan', message: "Resolving DNS..." },
  { type: 'result', message: "IP: 10.0.1.55 (Secure Proxy)", status: 'ok' },
  { type: 'scan', message: "Pinging Host..." },
  { type: 'result', message: "Latency: 18ms", status: 'ok' },
  { type: 'scan', message: "Establishing TLS 1.3..." },
  { type: 'result', message: "Cipher: AES-256-GCM", status: 'ok' },
  { type: 'scan', message: "Scanning Directories..." },
  { type: 'result', message: "Found: /_next/static/", status: 'ok' },
  { type: 'result', message: "Found: /app/", status: 'ok' },
  { type: 'system', message: "Connection Secured", status: 'ok' },
];

export default function Home() {
  const [systemState, setSystemState] = useState<"BOOTING" | "ONLINE">("BOOTING");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (systemState !== "BOOTING") return;

    let currentProgress = 0;
    const totalSteps = BOOT_SEQUENCE.length;
    
    // Process logs sequentially
    const processLog = (index: number) => {
      if (index >= totalSteps) {
        // Boot complete
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setSystemState("ONLINE"), 800);
        }, 500);
        return;
      }

      const step = BOOT_SEQUENCE[index];
      const delay = step.type === 'scan' ? 600 : 300;

      // Update Log
      setLogs(prev => [...prev, `▸ ${step.message}`]);
      
      // Update Progress
      currentProgress = ((index + 1) / totalSteps) * 100;
      setProgress(currentProgress);

      setTimeout(() => processLog(index + 1), delay);
    };

    // Start sequence
    processLog(0);

  }, [systemState]);

  // --- RENDER: ONLINE STATE (DASHBOARD) ---
  if (systemState === "ONLINE") {
    return (
      <main className="fixed inset-0 flex flex-col items-center justify-center z-[9999]" style={{ background: "#000001" }}>
         {/* Background Grid */}
         <div className="fixed inset-0 pointer-events-none z-10 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
        }}></div>

        <div className="relative z-30 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "monospace" }}>
            SYSTEM <span style={{ color: '#00f0ff' }}>ONLINE</span>
          </h1>
          <div className="p-4 border rounded-lg" style={{ borderColor: 'rgba(0, 240, 255, 0.3)', background: 'rgba(0, 20, 40, 0.8)' }}>
            <p className="text-sm" style={{ color: '#00f0ff' }}>Connection Established</p>
            <p className="text-xs text-gray-400 mt-2">{TARGET_URL}</p>
            <div className="mt-4 text-green-400 text-xs font-bold animate-pulse">
              ● SECURE HANDSHAKE COMPLETE
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- RENDER: BOOTING STATE (SCAN) ---
  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center z-[9999]" style={{ background: "#000001" }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
      }}></div>
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute w-full h-[2px] opacity-20" style={{
            background: "linear-gradient(to bottom, transparent, #00f0ff, transparent)",
            animation: "scan-line 6s linear infinite"
        }}></div>
      </div>

      {/* Logo */}
      <div className="relative mb-12 z-30">
        <h1 className="text-6xl md:text-8xl font-bold tracking-wider transition-all duration-100" 
            style={{ 
                fontFamily: "monospace", 
                color: "#00f0ff", 
                textShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff"
            }}>
            NEXUS
        </h1>
        <div className="text-center mt-2">
            <span className="text-sm tracking-[0.3em] animate-pulse" style={{ color: "#ff00aa" }}>
                DIAGNOSTIC MODE
            </span>
        </div>
        <div className="absolute -inset-10 border rounded-lg pointer-events-none animate-pulse" style={{ borderColor: "rgba(0, 240, 255, 0.3)" }}></div>
      </div>

      {/* Scan Log */}
      <div className="w-80 md:w-96 space-y-4 z-30">
        <div className="h-44 overflow-hidden rounded-lg p-3 font-mono text-xs backdrop-blur-sm" 
             style={{ 
                background: "rgba(0, 10, 20, 0.9)", 
                border: "1px solid rgba(0, 240, 255, 0.3)", 
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.1)" 
             }}>
             {logs.map((log, i) => (
                 <div key={i} className="flex items-center gap-2 mb-1" style={{ color: "#00f0ff" }}>
                    <span>{log}</span>
                 </div>
             ))}
             <div className="cursor-blink" style={{ width: 6, height: 10, background: '#00f0ff', display: 'inline-block' }}></div>
        </div>

        <div className="space-y-2">
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0, 240, 255, 0.1)", boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)" }}>
                <div className="h-full rounded-full transition-all duration-200 relative overflow-hidden" 
                     style={{ 
                        width: `${progress}%`, 
                        background: "linear-gradient(90deg, #00f0ff, #ff00aa)", 
                        boxShadow: "0 0 15px #00f0ff" 
                     }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
            </div>
            <div className="text-center text-xs font-mono" style={{ color: "#6b7280" }}>
                {Math.round(progress)}% Complete
            </div>
        </div>
      </div>

      {/* CSS for Animations */}
      <style jsx global>{`
        @keyframes scan-line {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
            animation: shimmer 2s infinite;
        }
        .cursor-blink {
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}
