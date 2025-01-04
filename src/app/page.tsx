import { Nav } from "../../components/Nav";
import { ResultsArea } from "../../components/ResultsArea";
import { SearchBar } from "../../components/SearchBar";

export default function Home() {
  return (
    <div className=" flex flex-col">
      <Nav />
      <main className="flex-grow flex flex-col p-4 font-mono text-sm z-10 space-y-10 fade-in">
        <div className="flex flex-col items-start xl:px-6">
          <h1 className="text-4xl font-bold  text-center text-white">
            0xperplex
          </h1>
          <p className="text-white">A space-focused RAG answer engine</p>
        </div>

        <div className="w-full max-w-[1400px] mx-auto">
          <SearchBar />
          <ResultsArea />
        </div>
      </main>
    </div>
  );
}
