import RichEditor from "./_components/RichEditor";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">Estate Book Tiny MCE </h1>
      <RichEditor />
    </main>
  );
}
