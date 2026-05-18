import { h, createState } from "@vdom-lib";
import "./Chat.css";
import { Sidebar } from "./Sidebar";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export function Chat() {
  const [sidebarOpen, setSidebarOpen] = createState(true);
  const [messages, setMessages] = createState<Message[]>([]);
  const [inputValue, setInputValue] = createState("");

  const handleSendMessage = () => {
    // const currentInputValue =
    //   document.querySelector<HTMLTextAreaElement>(".chat-input")?.value ?? "";
    // const messageText = currentInputValue.trim();

    if (inputValue.trim() !== "") {
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: currentMessages.length + 1, text: inputValue, sender: "user" },
      ]);
      setInputValue("");

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "That's interesting! Tell me more.",
            sender: "bot",
          },
        ]);
      }, 500);
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
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form
            className="chat-input-area"
            onSubmit={(e: SubmitEvent) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <textarea
              name="message"
              className="chat-input"
              placeholder="Type your message..."
              value={inputValue}
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
            <button className="send-btn" type="submit">
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
