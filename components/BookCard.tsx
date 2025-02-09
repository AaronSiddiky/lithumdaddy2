import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  isEnabled?: boolean;
  id: string;
}

export default function BookCard({
  title,
  author,
  description,
  coverImage,
  isEnabled = true,
  id,
}: BookCardProps) {
  if (!isEnabled) return null;

  // Convert the image path to use the correct directory and extension
  const processedCoverImage = coverImage
    ?.replace("/books/", "/covers/")
    .replace(".png", ".jpg");

  return (
    <Link href={`/books/${id}`} className="block group">
      <div className="aspect-[2/3] relative overflow-hidden rounded-xl mb-3">
        {coverImage ? (
          <div className="relative w-full h-full">
            <Image
              src={processedCoverImage || ""}
              alt={`${title} cover`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                console.error(`Error loading image: ${processedCoverImage}`);
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                Chat about this book →
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 transition-colors flex items-center justify-center p-4">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">{title}</h3>
              <p className="text-neutral-400">{author}</p>
              <span className="text-blue-500 mt-4 block opacity-0 group-hover:opacity-100 transition-opacity">
                Chat about this book →
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-neutral-300 text-sm">{description}</p>
      </div>
    </Link>
  );
}
