'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

const quickSearches = ['Autismo', 'Wisc', 'Ados', 'Trauma', 'ADI-R', 'WAIS', 'Peers'];

export default function Hero() {
  const [showBanner, setShowBanner] = useState(true);
  const [query, setQuery] = useState('');

  return (
    <section>

      {showBanner && (
        <div className="bg-red-600 text-white text-sm py-2.5 px-4 flex items-center justify-center gap-2 relative">
          <span>
            Escoge tu programa con hasta <strong>35% OFF</strong> ⚡ Solo en Black Sale
          </span>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 hover:opacity-70 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}


      <div className="bg-[#6b46ff] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          

          <h1 className="text-2xl md:text-4xl font-semibold ">
            Cursos de Psicología con hasta{' '}
            <span className="text-yellow-300">35% OFF</span>
          </h1>

 
          <p className="text-white/80 text-[15px] md:text-lg max-w-xl">
            Accede a descuentos especiales de Black Sale y eleva tu carrera profesional.
          </p>


          <div className="w-full max-w-xl flex items-center border-b-2 border-white/60 focus-within:border-white transition-colors">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=""
              className="flex-1 bg-transparent text-white placeholder-white/50 outline-none py-2 text-base"
            />
            <button className="text-white/80 hover:text-white transition">
              <Search size={25} className="font-bold" />
            </button>
          </div>


          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-white">Buscar:</span>
            {quickSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="border border-white/50 text-white px-3 py-1 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold"
              >
                {term}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}