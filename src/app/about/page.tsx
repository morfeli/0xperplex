import Image from "next/image";
import OxPerplexLogo from "../../../public/assets/0xperplex-logo.png";
import { Nav } from "../../../components/Nav";

export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      <Nav />
      <main className="container mx-auto px-4 py-8 fade-in">
        <h1 className="text-4xl  text-center mb-8 font-mono text-white">
          About 0xperplex
        </h1>
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src={OxPerplexLogo}
                alt="Oxperplex illustration"
                width={400}
                height={300}
                className="h-48 w-full object-cover md:h-full md:w-48"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                RAG Answer Engine
              </div>
              <p className="mt-2 text-gray-600">
                Oxperplex is a cutting-edge Retrieval-Augmented Generation (RAG)
                answer engine designed to revolutionize the way we access and
                process information. By combining the power of large language
                models with a vast knowledge base, Oxperplex delivers accurate,
                context-aware answers to your most complex queries.
              </p>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>
                    Advanced RAG technology for precise information retrieval
                  </li>
                  <li>
                    Real-time updates to ensure the most current information
                  </li>
                  <li>Customizable knowledge bases for specialized domains</li>
                  <li>
                    Natural language processing for intuitive interactions
                  </li>
                  <li>Scalable architecture to handle high-volume queries</li>
                </ul>
              </div>
              <p className="mt-4 text-gray-600">
                Whether you're a researcher, a business professional, or simply
                curious, Oxperplex is your gateway to a world of knowledge at
                your fingertips. Experience the future of information retrieval
                with Oxperplex.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
