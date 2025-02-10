import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 w-[260px] h-screen bg-black border-r border-neutral-800 p-6">
      <Link href="/" className="block text-white hover:text-neutral-400">
        <h1 className="text-2xl font-bold mb-8">LitHumDaddy</h1>
      </Link>
      <nav className="space-y-4">
        <Link href="/books" className="block text-white hover:text-neutral-400">
          Books
        </Link>
        <Link
          href="/quote-practice"
          className="block text-white hover:text-neutral-400"
        >
          Quote Practice
        </Link>
        <Link
          href="/final-prep"
          className="block text-white hover:text-neutral-400"
        >
          Final Prep
        </Link>
        <div className="pt-4 border-t border-neutral-800">
          <Link
            href="/unlimited-access"
            className="block text-blue-500 hover:text-blue-400 font-medium"
          >
            ✨ Unlimited Access
          </Link>
        </div>
      </nav>
    </div>
  );
}
