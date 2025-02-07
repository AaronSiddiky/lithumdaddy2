export default function SearchSection() {
  const actionButtons = ["Search with ChatGPT", "Talk with ChatGPT", "Research", "Sora", "More"];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Ask a question..."
          className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
        />
        <button className="absolute right-4 bottom-4 text-neutral-500">↑</button>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {actionButtons.map((label) => (
          <button
            key={label}
            className="px-4 py-2 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
} 