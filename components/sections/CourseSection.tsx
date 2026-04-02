'use client';

import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import CategoryFilter from '../ui/CategoryFilter';
import CourseGrid from '../sections/CourseGrid';
import PromoBanner from './PromoBanner';

interface CourseSectionProps {
  searchQuery: string;
}

export default function CourseSection({ searchQuery }: CourseSectionProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTipos, setSelectedTipos] = useState<string[]>([]);
    const [selectedModalidades, setSelectedModalidades] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 1200000]);
    const [hoursRange, setHoursRange] = useState([8, 348]);
    const [discountRange, setDiscountRange] = useState([0, 100]);
    const [openAccordion, setOpenAccordion] = useState<string | null>('area');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [quickFilter, setQuickFilter] = useState<string | null>(null);

    const handleCategoryChange = (cat: string) =>
        setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);

    const handleTipoChange = (tipo: string) =>
        setSelectedTipos((prev) => prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]);

    const handleModalidadChange = (mod: string) =>
        setSelectedModalidades((prev) => prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]);

    const handleTagChange = (tag: string) =>
        setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedTipos([]);
        setSelectedModalidades([]);
        setSelectedTags([]);
        setPriceRange([0, 1200000]);
        setHoursRange([8, 348]);
        setDiscountRange([0, 100]);
        setQuickFilter(null);
    };

    const handleAccordionChange = (name: string) =>
        setOpenAccordion((prev) => (prev === name ? null : name));

    // Todos los filtros activos para chips
    const allActiveFilters = [
        ...selectedCategories,
        ...selectedTipos,
        ...selectedModalidades,
        ...selectedTags,
        ...(quickFilter ? [quickFilter] : []),
    ];

    const removeFilter = (filter: string) => {
        setSelectedCategories((prev) => prev.filter((c) => c !== filter));
        setSelectedTipos((prev) => prev.filter((t) => t !== filter));
        setSelectedModalidades((prev) => prev.filter((m) => m !== filter));
        setSelectedTags((prev) => prev.filter((t) => t !== filter));
        if (quickFilter === filter) setQuickFilter(null);
    };

    return (
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[40px] py-10">

            {/* Drawer mobile */}
            {sidebarOpen && (
                <div className="xl:hidden fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
                    <div className="relative bg-[var(--color-bg)] w-[300px] h-full overflow-y-auto p-6 shadow-xl ml-auto">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-bold text-[var(--color-text)]">Filtros</span>
                            <button onClick={() => setSidebarOpen(false)}>
                                <X size={20} className="text-[var(--color-text)]" />
                            </button>
                        </div>
                        <CategoryFilter
                            selectedCategories={selectedCategories}
                            selectedTipos={selectedTipos}
                            selectedModalidades={selectedModalidades}
                            selectedTags={selectedTags}
                            priceRange={priceRange}
                            hoursRange={hoursRange}
                            discountRange={discountRange}
                            onCategoryChange={handleCategoryChange}
                            onTipoChange={handleTipoChange}
                            onModalidadChange={handleModalidadChange}
                            onTagChange={handleTagChange}
                            onPriceChange={setPriceRange}
                            onHoursChange={setHoursRange}
                            onDiscountChange={setDiscountRange}
                            onClearFilters={handleClearFilters}
                            openAccordion={openAccordion}
                            onAccordionChange={handleAccordionChange}
                            onQuickFilter={setQuickFilter}   // ← agrega aquí
                            quickFilter={quickFilter} 
                        />
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="mt-6 w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold text-[14px]"
                        >
                            Ver resultados
                        </button>
                    </div>
                </div>
            )}

            <div className="flex gap-10">
                {/* Sidebar desktop */}
                <div className="hidden xl:block">
                    <CategoryFilter
                        selectedCategories={selectedCategories}
                        selectedTipos={selectedTipos}
                        selectedModalidades={selectedModalidades}
                        selectedTags={selectedTags}
                        priceRange={priceRange}
                        hoursRange={hoursRange}
                        discountRange={discountRange}
                        onCategoryChange={handleCategoryChange}
                        onTipoChange={handleTipoChange}
                        onModalidadChange={handleModalidadChange}
                        onTagChange={handleTagChange}
                        onPriceChange={setPriceRange}
                        onHoursChange={setHoursRange}
                        onDiscountChange={setDiscountRange}
                        onClearFilters={handleClearFilters}
                        openAccordion={openAccordion}
                        onAccordionChange={handleAccordionChange}
                        onQuickFilter={setQuickFilter}   // ← agrega aquí
                        quickFilter={quickFilter} 
                    />
                </div>

                <div className="flex-1 min-w-0 flex flex-col">
                    <PromoBanner
                        imageUrl="https://adipa.cl/content/uploads/2026/03/black-sale-banner-cursos.webp"
                        alt="Black Sale 35% OFF"
                    />

                    {/* Chips filtros activos */}
                    {allActiveFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {allActiveFilters.map((filter) => (
                                <span
                                    key={filter}
                                    className="flex items-center gap-1.5 bg-[var(--color-bg-soft)] text-[var(--color-primary)] text-[12px] font-medium px-3 py-1.5 rounded-full border border-[var(--color-primary)]/20"
                                >
                                    {filter}
                                    <button
                                        onClick={() => removeFilter(filter)}
                                        className="hover:opacity-70 transition"
                                        aria-label={`Quitar filtro ${filter}`}
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                            <button
                                onClick={handleClearFilters}
                                className="text-[12px] text-gray-400 hover:text-red-500 transition underline"
                            >
                                Limpiar todo
                            </button>
                        </div>
                    )}

                    <CourseGrid
                        selectedCategories={selectedCategories}
                        selectedTipos={selectedTipos}
                        selectedModalidades={selectedModalidades}
                        selectedTags={selectedTags}
                        priceRange={priceRange}
                        hoursRange={hoursRange}
                        discountRange={discountRange}
                        searchQuery={searchQuery}
                        quickFilter={quickFilter}
                        onQuickFilter={setQuickFilter}
                        onOpenSidebar={() => setSidebarOpen(true)}
                    />
                </div>
            </div>
        </section>
    );
}