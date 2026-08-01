"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { BookOpen, Code2, Sparkles } from "lucide-react";

interface TaskProps {
  dayNumber: number;
  gateSubject: string;
  gateTopic: string;
  dsaTopic: string;
  dsaProblems: number;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onGeneratePost: () => void;
}

export function DailyTaskCard({
  dayNumber,
  gateSubject,
  gateTopic,
  dsaTopic,
  dsaProblems,
  isCompleted,
  onToggleComplete,
  onGeneratePost,
}: TaskProps) {
  return (
    <Card
      className={`transition-all border-2 ${isCompleted ? "border-emerald-500/50 bg-emerald-50/20" : "border-slate-200"}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          Day {dayNumber} To-Do List
        </CardTitle>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={onToggleComplete}
            id={`day-${dayNumber}`}
          />
          <label
            htmlFor={`day-${dayNumber}`}
            className="text-sm font-medium cursor-pointer"
          >
            {isCompleted ? "Completed" : "Mark Done"}
          </label>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GATE Task */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-indigo-600 mt-1" />
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase">
              {gateSubject}
            </p>
            <p className="text-sm font-medium">{gateTopic}</p>
          </div>
        </div>

        {/* DSA Task */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-start gap-3">
          <Code2 className="w-5 h-5 text-emerald-600 mt-1" />
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase">
              DSA Focus ({dsaTopic})
            </p>
            <p className="text-sm font-medium">
              Solve {dsaProblems} LeetCode Problems on {dsaTopic}
            </p>
          </div>
        </div>

        <Button
          onClick={onGeneratePost}
          disabled={!isCompleted}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <Sparkles className="w-4 h-4 mr-2" /> Generate LinkedIn Post Draft
        </Button>
      </CardContent>
    </Card>
  );
}
