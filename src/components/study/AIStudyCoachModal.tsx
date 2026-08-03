"use client";

import { useStudy } from "@/context/StudyContext";
import { Sparkles, X, Send, Bot } from "lucide-react";
import { useState } from "react";

export function AIStudyCoachModal() {
  const { isAiModalOpen, setIsAiModalOpen, todayFocus, currentSession } = useStudy();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello Charan! I am your AI Study Coach. I have loaded your context:\n• Active Topic: ${todayFocus.topic}\n• Current Module: ${currentSession.module}\nHow can I assist your study session today?`,
    },
  ]);

  if (!isAiModalOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = { sender: "user", text: prompt.trim() };
    const aiReply = {
      sender: "ai",
      text: `I've analyzed your question regarding "${prompt.trim()}" in the context of ${currentSession.module}. Focus on master-level implementation concepts and process scheduling algorithms.`,
    };

    setMessages([...messages, userMsg, aiReply]);
    setPrompt("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="os-card w-full max-w-lg p-4 border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl flex flex-col h-[480px]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[var(--accent-purple)] text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)] leading-none">
                AI Study Coach Assistant
              </h3>
              <span className="text-[10px] font-semibold text-[var(--text-muted)]">
                Context-aware for Second Year Roadmap
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAiModalOpen(false)}
            className="h-6 w-6 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-2.5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`rounded-[12px] p-3 text-xs max-w-[85%] whitespace-pre-line font-medium ${
                  m.sender === "user"
                    ? "bg-[var(--accent-purple)] text-white"
                    : "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-2 border-t border-[var(--border-color)] flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI study question or explanation..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 os-input px-3 py-2 text-xs font-medium focus:outline-none"
          />
          <button
            type="submit"
            className="os-btn h-8 px-3.5 bg-[var(--accent-purple)] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[var(--accent-purple-hover)]"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
}
