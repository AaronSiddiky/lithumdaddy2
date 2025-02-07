export default function TopBar() {
  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4">
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors">
          Help
        </button>
        <button className="px-4 py-2 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors">
          Settings
        </button>
        <button className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors">
          Log in
        </button>
      </div>
    </div>
  );
} 