'use client';

import ErrorBoundary from '../../components/ErrorBoundary';
import BookCard from "../../components/BookCard";

const books = [
  {
    title: "Inferno",
    author: "Dante Alighieri",
    description: "First part of the Divine Comedy, following Dante's journey through Hell.",
    isEnabled: true
  },
  {
    title: "Essays",
    author: "Michel de Montaigne",
    description: "Pioneering work in the essay form, exploring human nature and experience.",
    isEnabled: true
  },
  {
    title: "King Lear",
    author: "William Shakespeare",
    description: "Tragic play about power, family, and madness in ancient Britain.",
    isEnabled: true
  },
  {
    title: "Selected Works",
    author: "Sor Juana",
    description: "Poetry and prose from the Mexican nun and intellectual.",
    isEnabled: true
  },
  {
    title: "Selected Stories",
    author: "Machado de Assis",
    description: "Short stories from one of Brazil's greatest writers.",
    isEnabled: true
  },
  {
    title: "Love in a Fallen City",
    author: "Eileen Chang",
    description: "Novella exploring love and society in wartime Hong Kong.",
    isEnabled: true
  },
  {
    title: "To the Lighthouse",
    author: "Virginia Woolf",
    description: "Modernist novel examining time, perception, and family relationships.",
    isEnabled: true
  }
];

export default function Books() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Books</h1>
      <ErrorBoundary>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard
              key={book.title}
              {...book}
            />
          ))}
        </div>
      </ErrorBoundary>
    </div>
  );
} 