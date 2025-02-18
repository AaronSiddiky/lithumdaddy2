'use client';

import { useState } from "react";
import BookCard from "../../../components/BookCard";
import Image from "next/image";
import { books as availableBooks } from "../../../lib/books";
import type { Book } from "../../../lib/books";
import { useRouter } from 'next/navigation';

const QUOTES = {
  "6": [ // Ibn Arabi quotes
    "The self is an ocean without a shore. Gazing upon it has no beginning or end, in this world and the next.",
    "My heart has become capable of every form: it is a pasture for gazelles and a convent for Christian monks.",
    "I believe in the religion of Love whatever direction its caravans may take.",
    // Add more Ibn Arabi quotes here
  ],
  // Add quotes for other books...
};

export default function QuotePractice() {
  const router = useRouter();

  // Existing states for book practice
  const [books, setBooks] = useState<Book[]>(availableBooks);
  const [currentQuote, setCurrentQuote] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // New states for AI chat
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [currentBookId, setCurrentBookId] = useState<string>("");

  const startGame = () => {
    const selectedBooks = books.filter(b => b.isSelected);
    if (selectedBooks.length === 0) {
      alert("Please select at least one book");
      return;
    }

    // Randomly select a book from selected books
    const randomBook = selectedBooks[Math.floor(Math.random() * selectedBooks.length)];
    const bookQuotes = QUOTES[randomBook.id as keyof typeof QUOTES] || [];
    
    if (bookQuotes.length === 0) {
      setCurrentQuote("No quotes available for this book yet.");
      return;
    }

    const randomQuote = bookQuotes[Math.floor(Math.random() * bookQuotes.length)];
    setCurrentQuote(randomQuote);
    setCurrentBookId(randomBook.id);
    setIsPlaying(true);
    setUserGuess("");
    setFeedback("");
    setIsCorrect(false);
  };

  const nextQuote = () => {
    const selectedBooks = books.filter(b => b.isSelected);
    const randomBook = selectedBooks[Math.floor(Math.random() * selectedBooks.length)];
    const bookQuotes = QUOTES[randomBook.id as keyof typeof QUOTES] || [];
    
    if (bookQuotes.length === 0) {
      setCurrentQuote("No quotes available for this book yet.");
      return;
    }

    const randomQuote = bookQuotes[Math.floor(Math.random() * bookQuotes.length)];
    setCurrentQuote(randomQuote);
    setCurrentBookId(randomBook.id);
    setUserGuess("");
    setFeedback("");
    setIsCorrect(false);
  };

  const checkGuess = () => {
    const correctBook = books.find(b => b.id === currentBookId);
    if (!correctBook) return;

    const guess = userGuess.toLowerCase().trim();
    const isAuthorMatch = correctBook.author.toLowerCase().includes(guess) || 
                         guess.includes(correctBook.author.toLowerCase());
    const isTitleMatch = correctBook.title.toLowerCase().includes(guess) || 
                        guess.includes(correctBook.title.toLowerCase());
    
    // Check for partial matches of title words
    const titleWords = correctBook.title.toLowerCase().split(' ');
    const isTitleWordsMatch = titleWords.some(word => 
      word.length > 3 && // Only check words longer than 3 letters
      (guess.includes(word) || word.includes(guess))
    );

    if (isAuthorMatch || isTitleMatch || isTitleWordsMatch) {
      setFeedback(`Correct! This quote is from "${correctBook.title}" by ${correctBook.author}`);
      setIsCorrect(true);
    } else {
      setFeedback(`Try again! This quote is from "${correctBook.title}" by ${correctBook.author}`);
    }
  };

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: aiMessage,
          systemMessage: `You are Ibn Arabi, the great Sufi mystic and philosopher. 
          Respond to questions in the style of Ibn Arabi, using metaphysical concepts 
          and drawing from works like Fusus al-Hikam and Al-Futuhat al-Makkiyya. 
          Focus on the unity of existence (wahdat al-wujud) and divine love.`
        }),
      });

      const data = await response.json();
      setAiResponse(data.message);
      setAiMessage("");
    } catch (error) {
      console.error('Error:', error);
      setAiResponse('An error occurred. Please try again.');
    }
  };

  const handleIbnArabiChat = () => {
    // Navigate to the Ibn Arabi page on the current website
    router.push('/IbnArabi');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] p-8 max-w-4xl mx-auto mt-[72px] relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quote Practice</h1>
        <button
          onClick={handleIbnArabiChat}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Chat with Ibn Arabi
        </button>
      </div>

      {showAIChat ? (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-neutral-900 rounded-lg p-6 mb-4 overflow-y-auto">
            {aiResponse && (
              <div className="bg-neutral-800 rounded-lg p-4 mb-4">
                <p className="whitespace-pre-wrap">{aiResponse}</p>
              </div>
            )}
          </div>

          <form onSubmit={handleAISubmit} className="flex gap-4">
            <input
              type="text"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="Ask Ibn Arabi a question..."
              className="flex-1 p-4 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-blue-500 outline-none"
            />
            <button
              type="submit"
              className="px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex flex-col space-y-6">
          {!isPlaying ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => setBooks(books.map(b => 
                      b.id === book.id ? {...b, isSelected: !b.isSelected} : b
                    ))}
                    className="cursor-pointer"
                  >
                    <BookCard {...book} />
                    <div className={`mt-2 p-2 text-center rounded-lg transition-colors ${
                      book.isSelected ? "bg-blue-500/20 text-blue-400" : "bg-neutral-800/50 text-neutral-400"
                    }`}>
                      {book.isSelected ? "Selected" : "Click to Select"}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={startGame}
                className="w-full py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Start Practice
              </button>
            </>
          ) : (
            <div className="space-y-8">
              <blockquote className="text-2xl text-center italic">
                "{currentQuote}"
              </blockquote>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  className="flex-1 p-4 bg-neutral-800 rounded-xl"
                  placeholder="Which book is this from?"
                  disabled={isCorrect}
                />
                {!isCorrect ? (
                  <button 
                    onClick={checkGuess}
                    className="px-6 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </button>
                ) : (
                  <button 
                    onClick={nextQuote}
                    className="px-6 bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Next Quote
                  </button>
                )}
              </div>
              {feedback && (
                <div className="p-4 bg-neutral-800 rounded-xl">
                  {feedback}
                </div>
              )}
              <button
                onClick={() => setIsPlaying(false)}
                className="text-neutral-400 hover:text-white"
              >
                ← Back to Book Selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 