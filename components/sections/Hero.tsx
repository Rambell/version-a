'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

const quickSearches = ['Autismo', 'Wisc', 'Ados', 'Trauma', 'ADI-R', 'WAIS', 'Peers'];

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function Hero({ searchQuery, setSearchQuery }: HeroProps) {
    const [showBanner, setShowBanner] = useState(true);

    return (
        <section>

            {showBanner && (
                <div className="bg-red-600 text-white text-sm py-2.5">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[40px] flex items-center justify-between">
                        <div className="w-4 shrink-0" />
                        <span className="text-center text-white text-[12px] md:text-[14px]">
                            Escoge tu programa con hasta <strong>35% OFF</strong> ⚡ Solo en Black Sale
                        </span>
                        <button
                            onClick={() => setShowBanner(false)}
                            aria-label="Cerrar anuncio"
                            className="hover:opacity-70 transition flex-shrink-0 cursor-pointer ml-2"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-[var(--color-primary)] text-white py-12 md:py-16 xl:py-20 px-4">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5 md:gap-6">

             
                    <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold leading-tight">
                        Cursos de Psicología con hasta{' '}
                        <span className="text-yellow-300">35% OFF</span>
                    </h1>

                 
                    <p className="text-white/80 text-[13px] md:text-[15px] max-w-xl">
                        Accede a descuentos especiales de Black Sale y eleva tu carrera profesional.
                    </p>

                  
                    <div className="w-full max-w-xl flex items-center border-b-2 border-white/60 focus-within:border-white transition-colors">
                        <label htmlFor="hero-search" className="sr-only">Buscar cursos</label>
                        <input
                            type="text"
                            id="hero-search"
                            aria-label="Buscar cursos"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder=""
                            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none py-2 text-[14px] md:text-base"
                        />
                        <button
                            aria-label="Buscar"
                            className="text-white/80 hover:text-white transition"
                        >
                            <Search size={24} className="cursor-pointer" />
                        </button>
                    </div>

                  
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="text-white text-[13px]">Buscar:</span>
                        {quickSearches.map((term) => (
                            <button
                                key={term}
                                onClick={() => setSearchQuery(term)}
                                className="border border-white/50 text-white px-3 py-1 rounded-2xl hover:bg-white/30 transition-colors text-[12px] md:text-[13px] font-semibold"
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