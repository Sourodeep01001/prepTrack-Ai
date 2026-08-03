"use client";

import { useEffect, useRef, useState } from "react";
import { UserAvatar, useClerk, useUser } from "@clerk/nextjs";
import { LogOut, Settings } from "lucide-react";

export function LandingAccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const displayName = user?.fullName || user?.firstName || "PrepTrack user";
  const email = user?.primaryEmailAddress?.emailAddress || "Account email";

  return (
    <div className="landing-account-menu" ref={menuRef}>
      <button
        type="button"
        className="landing-account-image-button"
        aria-label="Open account menu"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((open) => !open)}
      >
        <UserAvatar
          rounded
          appearance={{
            elements: {
              avatarBox: "landing-account-user-avatar",
            },
          }}
        />
      </button>

      {isOpen && (
        <div className="landing-account-popover" role="dialog" aria-label="Account information">
          <div className="landing-account-summary">
            <div className="landing-account-popover-logo" aria-hidden="true">
              <UserAvatar
                rounded
                appearance={{
                  elements: {
                    avatarBox: "landing-account-user-avatar landing-account-user-avatar-large",
                  },
                }}
              />
            </div>
            <div>
              <small>Signed in as</small>
              <strong>{displayName}</strong>
              <p>{email}</p>
            </div>
          </div>

          <div className="landing-account-popover-actions">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openUserProfile();
              }}
            >
              <Settings size={16} aria-hidden="true" />
              <span><strong>Manage account</strong><small>Email, password &amp; security</small></span>
            </button>
            <button type="button" className="is-signout" onClick={() => void signOut()}>
              <LogOut size={16} aria-hidden="true" />
              <span><strong>Sign out</strong><small>End this session safely</small></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
