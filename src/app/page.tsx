import { Nav } from "../../components/Nav";
import { ResultsArea } from "../../components/ResultsArea";
import { SearchBar } from "../../components/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold mb-8 text-center">
            0xperplex answer engine
          </h1>
          <SearchBar />
          <ResultsArea />
        </div>
      </main>
    </div>
  );
}
