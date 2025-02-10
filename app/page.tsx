import { books } from "@/lib/books";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">Available Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="relative max-w-[200px]">
            <Link
              href={
                book.author === "Ibn Arabi" ? "/IbnArabi" : `/books/${book.id}`
              }
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-neutral-400">{book.author}</p>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                  {book.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
//
