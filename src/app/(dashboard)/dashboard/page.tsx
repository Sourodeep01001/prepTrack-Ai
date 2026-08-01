"use client";

import { useState } from "react";
import { CountdownBanner } from "@/components/CountdownBanner";
import { DailyTaskCard } from "@/components/DailyTaskCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function DashboardPage() {
  // Mock State (In production, replace with data fetched from backend)
  const [targetDate] = useState(
    new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
  );
  const [completed, setCompleted] = useState(false);
  const [postDraft, setPostDraft] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTask = {
    dayNumber: 12,
    gateSubject: "Operating Systems",
    gateTopic: "CPU Scheduling Algorithms & Deadlocks",
    dsaTopic: "Binary Tree Traversal Patterns",
    dsaProblems: 3,
  };

  const handleGeneratePost = async () => {
    const res = await fetch("/api/generate-linkedin-post", {
      method: "POST",
      body: JSON.stringify(currentTask),
    });
    const data = await res.json();
    setPostDraft(data.postDraft);
    setIsModalOpen(true);
  };

  const copyToClipboard = () => {
    if (postDraft) {
      navigator.clipboard.writeText(postDraft);
      alert("LinkedIn post copied to clipboard!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* 1. Exam Countdown Header */}
      <CountdownBanner
        targetDate={targetDate}
        completedDays={11}
        totalDays={180}
      />

      {/* 2. Daily To-Do Card */}
      <div className="max-w-xl mx-auto">
        <DailyTaskCard
          {...currentTask}
          isCompleted={completed}
          onToggleComplete={() => setCompleted(!completed)}
          onGeneratePost={handleGeneratePost}
        />
      </div>

      {/* 3. LinkedIn Draft Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Your Daily LinkedIn Post Draft</DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-sm whitespace-pre-wrap">
            {postDraft}
          </div>
          <Button
            onClick={copyToClipboard}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            <Copy className="w-4 h-4 mr-2" /> Copy to Clipboard
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
