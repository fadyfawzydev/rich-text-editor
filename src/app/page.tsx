import Image from "next/image";
import RichEditor from "./_components/richEditor/RichEditor";

export default function Home() {
  return (
    <main>
      <div className="container">
        <header>
          <h1 className="text-3xl ">Rich Editor POC</h1>
          <hr />
          <RichEditor />
        </header>
      </div>
    </main>
  );
}
