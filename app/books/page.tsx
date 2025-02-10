import { books } from "../../lib/books";
import BookCard from "../../components/BookCard";

export default function Books() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id}>
            <BookCard
              title={book.title}
              author={book.author}
              description={book.description}
              coverImage={book.coverImage}
              id={book.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
