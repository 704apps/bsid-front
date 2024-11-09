import { Download } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-6xl text-white font-bold">
          BSID
        </h1>
        <h2 className="text-2xl md:text-4xl text-white font-semibold mt-4 md:mt-6">
          Experimente sua assinatura de Áudio
        </h2>
        <a
          href="/bsid.apk"
          download
          className="mt-8 flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded"
        >
          <Download className="text-lg mr-2" />
          Baixar APP
        </a>
      </div>
    </div>
  );
}
