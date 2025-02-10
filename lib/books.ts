export interface Book {
  id: string;
  title: string;
  author: string;
  isSelected: boolean;
  coverImage: string;
  description: string;
}

export const books: Book[] = [
  {
    id: "6",
    title: "The Translator of Desires: Poems",
    author: "Ibn Arabi",
    isSelected: false,
    coverImage: "/covers/ibnarabi.jpg",
    description:
      "A masterpiece of Sufi love poetry, exploring the depths of divine and human love through mystical verses that have influenced spiritual seekers for centuries.",
  },
  {
    id: "1",
    title: "Inferno",
    author: "Dante Alighieri",
    isSelected: false,
    coverImage: "/covers/inferno.jpg",
    description:
      "The first part of Dante's Divine Comedy, depicting the poet's journey through Hell.",
  },
  {
    id: "2",
    title: "Essays",
    author: "Michel de Montaigne",
    isSelected: false,
    coverImage: "/covers/essays.jpg",
    description:
      "A collection of philosophical essays exploring human nature and society.",
  },
  {
    id: "3",
    title: "King Lear",
    author: "William Shakespeare",
    isSelected: false,
    coverImage: "/covers/king-lear.jpg",
    description:
      "Shakespeare's tragedy about a king who divides his realm among his three daughters.",
  },
  {
    id: "4",
    title: "Selected Works",
    author: "Sor Juana",
    isSelected: false,
    coverImage: "/covers/sorjuana.jpg",
    description:
      "Selected works from the Mexican nun and scholar, known for her poetry and prose.",
  },
  {
    id: "5",
    title: "To the Lighthouse",
    author: "Virginia Woolf",
    isSelected: false,
    coverImage: "/covers/lighthouse.jpg",
    description:
      "A modernist novel exploring time, perception, and the nature of art.",
  },
];
