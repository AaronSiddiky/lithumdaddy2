"use client";

import { useState } from "react";
import Image from "next/image";

interface HighlightedPage {
  page: string;
  data: string;
}

interface ApiResponse {
  answer: string;
  highlighted_pages: HighlightedPage[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
  pages?: HighlightedPage[];
  isLoading?: boolean;
}

interface ImageModalState {
  isOpen: boolean;
  imageData?: string;
  pageNumber?: string;
}

export default function IbnArabiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Greetings, I am Ibn Arabi's AI companion. How may I assist you in exploring 'The Translator of Desires'?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageModal, setImageModal] = useState<ImageModalState>({
    isOpen: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Add loading message
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "...", isLoading: true },
    ]);

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://ibnarabi-4c3fb86a4ffb.herokuapp.com/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        }
      );

      const data: ApiResponse = await response.json();

      // Replace loading message with actual response
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove loading message
        {
          role: "assistant",
          content: data.answer,
          pages: data.highlighted_pages,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      // Replace loading message with error message
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove loading message
        {
          role: "assistant",
          content:
            "I apologize, but I encountered an error while processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleImageClick = (imageData: string, pageNumber: string) => {
    setImageModal({
      isOpen: true,
      imageData,
      pageNumber,
    });
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left side - Book cover and info */}
        <div className="w-1/4 p-6 border-r border-gray-700">
          <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto mb-4">
            <Image
              src="/covers/ibnarabi.jpg"
              alt="The Translator of Desires"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold mt-3">
              The Translator of Desires
            </h1>
            <p className="text-sm text-gray-400 mt-1">by Ibn Arabi</p>
          </div>
        </div>

        {/* Right side - Chat interface */}
        <div className="flex-1 flex flex-col">
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-white"
                  } ${message.isLoading ? "animate-pulse" : ""}`}
                >
                  {message.content}
                </div>
                {message.pages && !message.isLoading && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-400">Referenced Pages:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {message.pages.map((page, pageIndex) => (
                        <div
                          key={pageIndex}
                          className="relative group cursor-pointer"
                          onClick={() => handleImageClick(page.data, page.page)}
                        >
                          <div className="relative h-[150px] rounded-lg overflow-hidden border border-gray-700 transition-transform transform hover:scale-[1.02]">
                            <Image
                              src={`data:image/png;base64,${page.data}`}
                              alt={`Page ${page.page}`}
                              fill
                              className="object-contain"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                          </div>
                          <div className="absolute top-1 left-1 bg-black bg-opacity-75 px-2 py-0.5 rounded text-xs text-white">
                            Page {page.page}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-700"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Ask about The Translator of Desires..."
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Modal */}
      {imageModal.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setImageModal({ isOpen: false })}
        >
          <div className="relative max-w-4xl w-full h-[80vh]">
            <div className="absolute top-4 right-4 z-10">
              <button
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200"
                onClick={() => setImageModal({ isOpen: false })}
              >
                Close
              </button>
            </div>
            <div className="relative w-full h-full">
              <Image
                src={`data:image/png;base64,${imageModal.imageData}`}
                alt={`Page ${imageModal.pageNumber}`}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
              Page {imageModal.pageNumber}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
