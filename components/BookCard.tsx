import Image from 'next/image';

interface BookCardProps {
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  isEnabled?: boolean;
}

export default function BookCard({ title, author, description, coverImage, isEnabled = true }: BookCardProps) {
  if (!isEnabled) return null;
  
  return (
    <div className="group">
      <div className="aspect-[2/3] relative overflow-hidden rounded-xl mb-3">
        {coverImage ? (
          <div className="relative w-full h-full">
            <Image 
              src={coverImage} 
              alt={`${title} cover`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full h-full bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 transition-colors flex items-center justify-center p-4">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">{title}</h3>
              <p className="text-neutral-400">{author}</p>
            </div>
          </div>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-neutral-300 text-sm">{description}</p>
      </div>
    </div>
  );
} 