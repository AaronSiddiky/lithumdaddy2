import Image from 'next/image';
import { Book } from '../lib/books';

interface BookCardProps {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  id: string;
}

export default function BookCard({ title, author, description, coverImage }: BookCardProps) {
  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
      <div className="relative aspect-[2/3]">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-neutral-400 mb-2">{author}</p>
        <p className="text-sm text-neutral-300 line-clamp-3">{description}</p>
      </div>
    </div>
  );
} 