"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap } from "lucide-react";

interface Props {
  targetDate: Date;
  completedDays: number;
  totalDays: number;
}

export function CountdownBanner({
  targetDate,
  completedDays,
  totalDays,
}: Props) {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const updateCountdown = () => {
      const diff = Math.ceil(
        (new Date(targetDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      );
      setDaysLeft(diff > 0 ? diff : 0);
    };
    const initialUpdate = window.setTimeout(updateCountdown, 0);
    const dailyUpdate = window.setInterval(updateCountdown, 60 * 60 * 1000);
    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(dailyUpdate);
    };
  }, [targetDate]);

  return (
    <Card className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-none shadow-xl">
      <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-10 h-10 text-indigo-400 animate-pulse" />
          <div>
            <p className="text-xs text-indigo-200 uppercase tracking-wider">
              Exam Countdown
            </p>
            <h2 className="text-3xl font-extrabold">
              {daysLeft} Days Remaining
            </h2>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-xs text-slate-300">Target Exam Window</p>
            <p className="font-semibold text-sm">
              6-Month Horizon ({totalDays} Days)
            </p>
            <p className="text-xs text-indigo-200">
              {completedDays} days completed
            </p>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 px-3 py-1 flex gap-1 items-center">
            <Zap className="w-4 h-4" /> Pace: On Track
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
