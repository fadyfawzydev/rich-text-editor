import Image from "next/image";
import { RichTextEditor } from "./_components/RichTextEditor";

export default function Home() {
  return (
    <main>
      <div className="container">
        <header>
          <h1 className="text-3xl ">Rich Editor POC</h1>
          <hr />
          <RichTextEditor />
        </header>
      </div>
    </main>
  );
}
