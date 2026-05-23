import { h, createState } from "@vdom-lib";
import "./Chat.css";
import { Sidebar } from "./Sidebar";
import { ApiError, classifyPrompt } from "../utils/api";
import {
  currState,
  GENERIC_ERROR_MESSAGE,
  MESSAGE_VARIANT,
  SERVER_UNREACHABLE_MESSAGE,
  UNKNOWN,
  Message,
} from "../utils/state";

// https://thariqs.github.io/html-effectiveness/

function Icon({ variant }: { variant: MESSAGE_VARIANT | undefined }) {
  switch (variant) {
    case MESSAGE_VARIANT.ERROR:
      return (
        <svg
          className="message-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case MESSAGE_VARIANT.WARN:
      return (
        <svg
          className="message-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    default:
      return null;
  }
}

export function Chat() {
  const [sidebarOpen, setSidebarOpen] = createState(true);
  const [messages, setMessages] = createState<Message[]>([]);
  const [inputValue, setInputValue] = createState("");
  const [isLoading, setIsLoading] = createState(false);
  const { inProgress } = currState.get();

  // createEffect(() => {
  //   if (currState.get().inProgress) {
  //     setSidebarOpen(true);
  //   } else {
  //     setSidebarOpen(false);
  //   }
  // }, [sidebarOpen]);

  const handleSendMessage = async () => {
    // const currentInputValue =
    //   document.querySelector<HTMLTextAreaElement>(".chat-input")?.value ?? "";
    // const messageText = currentInputValue.trim();

    const messageText = inputValue.trim();

    if (messageText !== "" && !isLoading) {
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: currentMessages.length + 1, text: messageText, sender: "user" },
      ]);
      setInputValue("");
      setIsLoading(true);

      try {
        const result = await classifyPrompt(messageText);

        // if there is any error
        if (result?.error) {
          throw new ApiError(500, "Something wrong");
        }

        // if intent is UNKNOWN
        if (result?.intent === UNKNOWN) {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              text: `We can't process this type of intent`,
              sender: "bot",
              variant: MESSAGE_VARIANT.WARN,
            },
          ]);
          return;
        }

        // we got right intent to process

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: `Intent: ${result.intent} (${Math.round(
              result.confidence * 100,
            )}% confidence)`,
            sender: "bot",
          },
        ]);

        currState.set((prev) => ({
          ...prev,
          currentIntent: result.intent,
          id: prev.id + 1,
          inProgress: true,
        }));

        setSidebarOpen(true);
      } catch (error) {
        const isApiError =
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 600;

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: isApiError
              ? GENERIC_ERROR_MESSAGE
              : SERVER_UNREACHABLE_MESSAGE,
            sender: "bot",
            variant: MESSAGE_VARIANT.ERROR,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //   console.log("Send message:", inputValue);

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="chat-header">
        <h1 className="chat-title">Chat</h1>
        <div className="header-spacer" />
      </header>

      <div className="chat-main">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((isOpen) => !isOpen)}
        />

        {/* Chat Area */}
        <div className="chat-content">
          <div className="messages-area">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender} ${msg.variant ?? ""}`}
              >
                <div className="message-bubble">
                  <Icon variant={msg?.variant} />
                  <span>{msg.text}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot loading" aria-live="polite">
                <div className="message-bubble">
                  <span className="loading-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>Classifying...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            className="chat-input-area"
            onSubmit={(e: SubmitEvent) => {
              e.preventDefault();

              if (inProgress || isLoading) return;

              handleSendMessage();
            }}
          >
            <textarea
              name="message"
              className="chat-input"
              placeholder="Type your message..."
              value={inputValue}
              disabled={isLoading || inProgress}
              onInput={(e: InputEvent) => {
                const target = e.target as HTMLTextAreaElement;
                setInputValue(target.value);
              }}
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const target = e.target as HTMLTextAreaElement;
                  target.form?.requestSubmit();
                }
              }}
            />
            <button
              className="send-btn"
              type="submit"
              disabled={isLoading || inProgress || inputValue.trim() === ""}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4379842 C3.03521743,10.5950816 3.34915502,10.7521789 3.50612381,10.7521789 L16.6915026,11.5376659 C16.6915026,11.5376659 17.1624089,11.5376659 17.1624089,12.0089581 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
