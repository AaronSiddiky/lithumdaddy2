"use client";

import { books } from "@/lib/books";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Book {
  title: string;
  author: string;
  filepath: string;
}

interface QuoteResponse {
  quote: string;
  correct_book: Book;
  page: number;
  options: Book[];
  image_path: string;
}

interface EvaluationResponse {
  is_correct: boolean;
  feedback: string;
  correct_book: Book;
}

export function BookGuessingGame() {
  const [quoteData, setQuoteData] = useState<QuoteResponse | null>(null);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewQuote = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:8000/quote");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      setQuoteData(data);
      setGuess("");
      setFeedback("");
      setIsCorrect(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch quote");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuess = async () => {
    if (!quoteData) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guess,
          correct_book: quoteData.correct_book,
          options: quoteData.options,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate guess");
      }

      const evaluation: EvaluationResponse = await response.json();
      setFeedback(evaluation.feedback);
      setIsCorrect(evaluation.is_correct);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to evaluate guess");
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  if (error) {
    return (
      <div className="text-red-600 p-4 rounded-lg bg-red-100">
        <p>Error: {error}</p>
        <button
          onClick={fetchNewQuote}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {quoteData && (
        <>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-lg font-medium mb-2">Passage:</p>
            <p className="italic">{quoteData.quote}</p>
          </div>

          {quoteData.image_path && (
            <div className="mt-4">
              <img
                src={`http://127.0.0.1:8000/image/${quoteData.image_path}`}
                alt="Book page"
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="guess" className="block text-sm font-medium mb-2">
                Your guess:
              </label>
              <input
                type="text"
                id="guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter the book title..."
                disabled={isCorrect}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleGuess}
                disabled={isCorrect || !guess}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Submit Guess
              </button>
              <button
                onClick={fetchNewQuote}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                {isCorrect ? "Next Book" : "Skip"}
              </button>
            </div>

            {feedback && (
              <p
                className={`text-lg ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            )}

            {isCorrect && quoteData.correct_book && (
              <div className="mt-4">
                <p className="font-medium">Book Details:</p>
                <p>Title: {quoteData.correct_book.title}</p>
                <p>Author: {quoteData.correct_book.author}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
