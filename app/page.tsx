import { BookGuessingGame } from "@/components/BookGuessingGame";

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Guess the Book!</h1>
      <BookGuessingGame />
    </main>
  );
}
