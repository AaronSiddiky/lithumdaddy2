export default function RequestFeature() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Request a Feature</h1>
      <form className="max-w-lg space-y-4">
        <div>
          <label className="block mb-2">Feature Description</label>
          <textarea 
            className="w-full p-2 rounded bg-neutral-900 border border-neutral-800"
            rows={4}
          />
        </div>
        <button 
          className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
} 