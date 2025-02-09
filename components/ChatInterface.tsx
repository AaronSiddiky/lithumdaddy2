import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  highlightedPages?: {
    page: string;
    data: string;
  }[];
}

interface ChatInterfaceProps {
  bookTitle: string;
}

export default function ChatInterface({ bookTitle }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    data: string;
    page: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      let response;

      if (bookTitle === "The Translator of Desires: Poems") {
        response = await fetch(
          "https://ibnarabi-4c3fb86a4ffb.herokuapp.com/ask",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: input,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to get response");

        const data = await response.json();
        const assistantMessage: Message = {
          id: Math.random().toString(36).substring(7),
          role: "assistant",
          content: data.answer,
          timestamp: new Date(),
          highlightedPages: data.highlighted_pages,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            bookTitle,
          }),
        });

        if (!response.ok) throw new Error("Failed to get response");

        const data = await response.json();
        const assistantMessage: Message = {
          id: Math.random().toString(36).substring(7),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: "Sorry, there was an error processing your message.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleImageClick = (imageData: string, page: string) => {
    setSelectedImage({ data: imageData, page });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-neutral-900 to-black">
      <div className="h-16" />
      <div className="flex-1 overflow-y-auto p-4 pb-[100px] space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-200">
                Start a conversation about {bookTitle}
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                Ask questions, explore themes, or discuss specific passages
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex flex-col space-y-2 max-w-[80%] ${
                  message.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-800 text-neutral-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-neutral-500">
                  {format(message.timestamp, "h:mm a")}
                </span>

                {message.highlightedPages && (
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {message.highlightedPages.map((page, pageIndex) => (
                      <button
                        key={pageIndex}
                        onClick={() => handleImageClick(page.data, page.page)}
                        className="group relative bg-neutral-800/50 rounded-xl p-3 hover:bg-neutral-700/50 transition-all duration-200"
                      >
                        <div className="text-sm text-neutral-400 mb-2">
                          Page {page.page}
                        </div>
                        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                          <Image
                            src={`data:image/png;base64,${page.data}`}
                            alt={`Page ${page.page}`}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-800/50 rounded-2xl px-4 py-3 text-neutral-400">
              <div className="flex items-center space-x-2">
                <div
                  className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-6"
      >
        <div className="max-w-3xl mx-auto px-4 pb-6">
          <div className="relative flex items-end bg-neutral-800 rounded-xl shadow-lg">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the book..."
              className="flex-1 max-h-[120px] bg-transparent text-white px-4 py-3 focus:outline-none resize-none"
              disabled={isLoading}
              rows={1}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 text-white opacity-90 hover:opacity-100 disabled:opacity-50 transition-opacity"
            >
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full mx-4 bg-neutral-900 rounded-2xl overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-black/50 text-white/90 hover:bg-black/70 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent z-10">
              <h3 className="text-lg font-medium text-white">
                Page {selectedImage.page}
              </h3>
            </div>
            <div className="relative w-full h-[90vh]">
              <Image
                src={`data:image/png;base64,${selectedImage.data}`}
                alt={`Page ${selectedImage.page}`}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
