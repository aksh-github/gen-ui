import { h } from "@vdom-lib";
import "./Sidebar.css";
import { currState } from "../utils/state";

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
        <h3>Current Intent: {currState.get().currentIntent || "None"}</h3>
        <p>Running: {currState.get().inProgress ? "Yes" : "No"}</p>
        <div className="sidebar-empty-state">
          <div className="sidebar-empty-icon" aria-hidden="true">
            :)
          </div>
          <p className="sidebar-empty-title">You're all caught up</p>
          <p className="sidebar-empty-copy">Nothing for now.</p>
        </div>
        <button
          onClick={() =>
            currState.set({
              ...currState.get(),
              currentIntent: "",
              inProgress: false,
            })
          }
        >
          Reset
        </button>
      </div>
      {/* <button
        onClick={() =>
          currState.set({
            ...currState.get(),
            currentIntent: "",
            inProgress: false,
          })
        }
      >
        Reset
      </button> */}
    </aside>
  );
}
