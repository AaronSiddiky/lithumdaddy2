import BookCard from "../../components/BookCard";

const books = [
  {
    title: "Inferno",
    author: "Dante Alighieri",
    description: "First part of the Divine Comedy, following Dante's journey through Hell.",
    coverImage: "/covers/inferno.jpg",
    isEnabled: true
  },
  {
    title: "Essays",
    author: "Michel de Montaigne",
    description: "Pioneering work in the essay form, exploring human nature and experience.",
    coverImage: "/covers/essays.jpg",
    isEnabled: true
  },
  {
    title: "King Lear",
    author: "William Shakespeare",
    description: "Tragic play about power, family, and madness in ancient Britain.",
    coverImage: "/covers/king-lear.jpg",
    isEnabled: true
  },
  {
    title: "Selected Works",
    author: "Sor Juana",
    description: "Poetry and prose from the Mexican nun and intellectual.",
    coverImage: "/covers/sorjuana.jpg",
    isEnabled: true
  },
  {
    title: "Selected Stories",
    author: "Machado de Assis",
    description: "Short stories from one of Brazil's greatest writers.",
    coverImage: "/covers/machado.jpg",
    isEnabled: true
  },
  {
    title: "Love in a Fallen City",
    author: "Eileen Chang",
    description: "Novella exploring love and society in wartime Hong Kong.",
    coverImage: "/covers/fallen-city.jpg",
    isEnabled: true
  },
  {
    title: "To the Lighthouse",
    author: "Virginia Woolf",
    description: "Modernist novel examining time, perception, and family relationships.",
    coverImage: "/covers/lighthouse.jpg",
    isEnabled: true
  }
];

export default function Books() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Books</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard
            key={`${book.author}-${book.title}`}
            title={book.title}
            author={book.author}
            description={book.description}
            coverImage={book.coverImage}
            isEnabled={book.isEnabled}
          />
        ))}
      </div>
    </div>
  );
} 