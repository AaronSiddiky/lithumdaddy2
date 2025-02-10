"use client";

import { useState } from "react";
import BookCard from "../../components/BookCard";
import Image from "next/image";
import { books as availableBooks } from "../../lib/books";
import type { Book } from "../../lib/books";

export default function QuotePractice() {
  const [books, setBooks] = useState<Book[]>(availableBooks);
  const [currentQuote, setCurrentQuote] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleBookSelection = (bookId: string) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, isSelected: !book.isSelected } : book
      )
    );
  };

  const startGame = async () => {
    const selectedBooks = books.filter((book) => book.isSelected);
    if (selectedBooks.length === 0) {
      alert("Please select at least one book");
      return;
    }
    setIsPlaying(true);
    // Here you'll call your API to get a quote
    // For now, we'll use placeholder functionality
    setCurrentQuote("Sample quote from the selected books...");
  };

  const submitGuess = async () => {
    // Here you'll call your API to check the guess
    // For now, we'll use placeholder functionality
    setFeedback("Feedback will appear here...");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] p-8 max-w-4xl mx-auto mt-[72px] relative">
      <h1 className="text-2xl font-bold mb-6">Quote ID Practice</h1>

      {!isPlaying ? (
        <div className="flex-1 flex flex-col space-y-6">
          <div className="flex-1 bg-neutral-900 p-6 rounded-lg overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              Select Books for Practice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  onClick={() => toggleBookSelection(book.id)}
                  className="cursor-pointer"
                >
                  <BookCard
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    coverImage={book.coverImage}
                    id={book.id}
                  />
                  <div
                    className={`mt-2 p-2 text-center rounded-lg transition-colors ${
                      book.isSelected
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-neutral-800/50 text-neutral-400"
                    }`}
                  >
                    {book.isSelected ? "Selected" : "Click to Select"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Start Practice
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Quote Display Section - Takes available space */}
          <div className="flex-1 flex items-center justify-center mb-4">
            <div className="max-w-2xl w-full">
              <blockquote className="text-2xl text-center italic text-neutral-200">
                &ldquo;{currentQuote}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Fixed Bottom Section */}
          <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800">
            <div className="max-w-4xl w-full mx-auto p-6">
              <div className="flex gap-6">
                {/* Book Info Section */}
                <div className="flex gap-6 flex-1">
                  <div className="w-32 h-48 relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/covers/IbnArabi.jpg"
                      alt="Book cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      The Translator of Desires: Poems
                    </h3>
                    <p className="text-neutral-400 mb-4">Ibn Arabi</p>
                    <p className="text-sm text-neutral-300 line-clamp-3">
                      A masterpiece of Sufi love poetry, exploring the depths of
                      divine and human love through mystical verses that have
                      influenced spiritual seekers for centuries.
                    </p>
                  </div>
                </div>

                {/* Input and Controls */}
                <div className="flex-1">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      placeholder="Which book is this from?"
                      className="flex-1 p-4 bg-neutral-800 rounded-xl border border-neutral-700 focus:border-blue-500 outline-none text-lg"
                    />
                    <button
                      onClick={submitGuess}
                      className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex-shrink-0"
                    >
                      Submit
                    </button>
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="mt-4 text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>←</span>
                    <span>Back to Book Selection</span>
                  </button>

                  {/* Feedback Display */}
                  {feedback && (
                    <div className="mt-4 p-4 bg-neutral-800 rounded-xl">
                      <p className="text-neutral-200">{feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
