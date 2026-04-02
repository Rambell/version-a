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
                <div className="bg-[#ff0000] text-white text-sm py-2.5">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[40px] flex items-center justify-between">

                        <div className="w-4" />
                            <span className="text-center text-white">
                                Escoge tu programa con hasta <strong>35% OFF</strong> ⚡ Solo en Black Sale
                            </span>

                            <button
                                onClick={() => setShowBanner(false)}
                                className="hover:opacity-70 transition flex-shrink-0 hover:cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                )}


                <div className="bg-[#704efd] text-white py-20 px-4">
                    <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
                    

                    <h1 className="text-2xl md:text-4xl font-semibold ">
                        Cursos de Psicología con hasta{' '}
                        <span className="text-yellow-300">35% OFF</span>
                    </h1>

        
                    <p className="text-white/80 text-[15px]  max-w-xl">
                        Accede a descuentos especiales de Black Sale y eleva tu carrera profesional.
                    </p>


                    <div className="w-full max-w-xl flex items-center border-b-2 border-white/60 focus-within:border-white transition-colors">
                        <input
                            type="text"
                            id="hero-search"   
                            aria-label="Buscar cursos"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder=""
                            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none py-2 text-base"
                        />
                        <button className="text-white/80 hover:text-white transition ">
                            <Search size={27} className="font-bold hover:cursor-pointer" />
                        </button>
                    </div>


                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                        <span className="text-white">Buscar:</span>
                            {quickSearches.map((term) => (
                        <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="border border-white/50 text-white px-3 py-1 rounded-2xl hover:bg-white/30 transition-colors text-sm font-semibold"
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