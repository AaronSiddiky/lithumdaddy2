'use client';

import { useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  isSelected: boolean;
}

const availableBooks: Book[] = [
  { id: '1', title: "Inferno", author: "Dante Alighieri", isSelected: false },
  { id: '2', title: "Essays", author: "Michel de Montaigne", isSelected: false },
  { id: '3', title: "King Lear", author: "William Shakespeare", isSelected: false },
  { id: '4', title: "Selected Works", author: "Sor Juana", isSelected: false },
  { id: '5', title: "Selected Stories", author: "Machado de Assis", isSelected: false },
  { id: '6', title: "Love in a Fallen City", author: "Eileen Chang", isSelected: false },
  { id: '7', title: "To the Lighthouse", author: "Virginia Woolf", isSelected: false }
];

export default function QuotePractice() {
  const [books, setBooks] = useState<Book[]>(availableBooks);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [userGuess, setUserGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleBookSelection = (bookId: string) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, isSelected: !book.isSelected } : book
    ));
  };

  const startGame = async () => {
    const selectedBooks = books.filter(book => book.isSelected);
    if (selectedBooks.length === 0) {
      alert('Please select at least one book');
      return;
    }
    setIsPlaying(true);
    // Here you'll call your API to get a quote
    // For now, we'll use placeholder functionality
    setCurrentQuote('Sample quote from the selected books...');
  };

  const submitGuess = async () => {
    // Here you'll call your API to check the guess
    // For now, we'll use placeholder functionality
    setFeedback('Feedback will appear here...');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quote ID Practice</h1>
      
      {!isPlaying ? (
        <div className="space-y-6">
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Select Books for Practice</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {books.map(book => (
                <div 
                  key={book.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors
                    ${book.isSelected 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-neutral-800 hover:border-neutral-700'}`}
                  onClick={() => toggleBookSelection(book.id)}
                >
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm text-neutral-400">{book.author}</p>
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
        <div className="space-y-6">
          <div className="bg-neutral-900 p-6 rounded-lg">
            <blockquote className="text-lg italic mb-6">
              "{currentQuote}"
            </blockquote>
            
            <div className="space-y-4">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Which book is this from?"
                className="w-full p-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-blue-500 outline-none"
              />
              
              <button
                onClick={submitGuess}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Submit Guess
              </button>
            </div>
          </div>
          
          {feedback && (
            <div className="bg-neutral-900 p-4 rounded-lg">
              {feedback}
            </div>
          )}
          
          <button
            onClick={() => setIsPlaying(false)}
            className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
          >
            ← Back to Book Selection
          </button>
        </div>
      )}
    </div>
  );
} 