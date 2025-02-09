import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-[260px] bg-neutral-950 border-r border-neutral-800 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          <Link href="/">LitHumDaddy</Link>
        </h1>
      </div>

      <nav className="space-y-2">
        <Link 
          href="/books" 
          className="block px-4 py-2 rounded-lg hover:bg-neutral-900 transition-colors"
        >
          Books
        </Link>
        <Link 
          href="/quote-practice" 
          className="block px-4 py-2 rounded-lg hover:bg-neutral-900 transition-colors"
        >
          Quote Practice
        </Link>
        <Link 
          href="/final-prep" 
          className="block px-4 py-2 rounded-lg hover:bg-neutral-900 transition-colors"
        >
          Final Prep
        </Link>
      </nav>
    </div>
  );
} 