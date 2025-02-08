import Link from "next/link";

export default function Sidebar() {
  const navLinks = [
    { href: "/books", label: "Books" },
    { href: "/quote-practice", label: "Quote ID Practice" },
    { href: "/final-prep", label: "Final Prep" },
    { href: "/request-feature", label: "Request a Feature" }
  ];

  return (
    <div className="fixed w-[260px] h-screen border-r border-neutral-800 p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium">LitHumDaddy</h1>
        <button className="text-xl">☰</button>
      </div>
      
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="p-2 rounded hover:bg-neutral-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
} 