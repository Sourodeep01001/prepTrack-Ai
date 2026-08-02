"use client";

import type { PointerEvent } from "react";
import { useRef } from "react";
import { BookOpen, Check, Code2, Flame, Share2, Sparkles } from "lucide-react";

export function HeroDashboardPreview() {
  const sceneRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const scene = sceneRef.current;
    if (!scene) return;
    const bounds = scene.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
    scene.style.setProperty("--preview-rotate-x", `${rotateX}deg`);
    scene.style.setProperty("--preview-rotate-y", `${rotateY}deg`);
  }

  function resetTilt() {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.style.setProperty("--preview-rotate-x", "-2deg");
    scene.style.setProperty("--preview-rotate-y", "-6deg");
  }

  return (
    <div
      className="hero-preview-scene"
      ref={sceneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      aria-label="Preview of the PrepTrack AI dashboard"
    >
      <div className="hero-preview-shadow" aria-hidden="true" />
      <div className="hero-preview-window">
        <div className="preview-sidebar">
          <div className="preview-logo">P</div>
          <span className="is-active"><span /></span>
          <span><span /></span>
          <span><span /></span>
          <div className="preview-avatar">C</div>
        </div>

        <div className="preview-content">
          <div className="preview-header">
            <div>
              <small>MONDAY, AUG 03</small>
              <h3>Good morning, <em>builder.</em></h3>
            </div>
            <div className="preview-streak"><Flame size={15} /> 12</div>
          </div>

          <div className="preview-progress-card">
            <div>
              <small>GATE 2027</small>
              <strong>180 days to go</strong>
            </div>
            <div className="preview-progress-ring"><span>34%</span></div>
          </div>

          <div className="preview-label"><span>Today&apos;s focus</span><small>2 tasks</small></div>

          <div className="preview-task">
            <div className="preview-task-icon is-violet"><BookOpen size={16} /></div>
            <div><small>GATE PREP</small><strong>CPU Scheduling &amp; Deadlocks</strong></div>
            <span className="preview-check"><Check size={13} /></span>
          </div>

          <div className="preview-task">
            <div className="preview-task-icon is-orange"><Code2 size={16} /></div>
            <div><small>CODING</small><strong>Binary Tree Patterns</strong></div>
            <span className="preview-check"><Check size={13} /></span>
          </div>

          <button type="button" className="preview-generate-button" tabIndex={-1}>
            <Sparkles size={14} /> Generate LinkedIn post
          </button>
        </div>
      </div>

      <div className="preview-float-card preview-float-streak" aria-hidden="true">
        <span><Flame size={16} /></span>
        <div><strong>+1 day</strong><small>Streak growing</small></div>
      </div>
      <div className="preview-float-card preview-float-post" aria-hidden="true">
        <span><Share2 size={17} /></span>
        <div><small>POST READY</small><strong>Milestone drafted!</strong></div>
        <Check size={15} />
      </div>
    </div>
  );
}
