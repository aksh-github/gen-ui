import { h } from "@vdom-lib";
import "./Sidebar.css";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={`chat-sidebar ${isOpen ? "open" : "closed"}`}
      aria-label="Chat sidebar"
    >
      <div className="sidebar-header">
        <span className="sidebar-title">Conversations</span>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          title={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isOpen}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      <div className="sidebar-body" aria-hidden={!isOpen}>
        <button className="new-chat-btn">New chat</button>
        <div className="conversations">
          <button className="conversation-item active">
            <span className="conversation-title">Current chat</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
