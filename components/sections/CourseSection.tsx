'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import CategoryFilter from '../ui/CategoryFilter';
import CourseGrid from '../sections/CourseGrid';
import PromoBanner from './PromoBanner';

export default function CourseSection() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [openAccordion, setOpenAccordion] = useState<string | null>('area');

    const handleCategoryChange = (cat: string) => {
        setSelectedCategories((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const handleClearFilters = () => setSelectedCategories([]);

    const handleAccordionChange = (name: string) => {
        setOpenAccordion((prev) => (prev === name ? null : name));
    };

    return (
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[40px] py-10">
            <div className="flex gap-10">
                <CategoryFilter
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    onClearFilters={handleClearFilters}
                    openAccordion={openAccordion}
                    onAccordionChange={handleAccordionChange}
                />

                <div className="flex-1 min-w-0 flex flex-col">
                    <PromoBanner
                        imageUrl="https://adipa.cl/content/uploads/2026/03/black-sale-banner-cursos.webp"
                        alt="Black Sale 35% OFF"
                    />

                    {selectedCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedCategories.map((cat) => (
                                <span
                                    key={cat}
                                    className="flex items-center gap-1.5 bg-[#f0ebff] text-[#6b46ff] text-[12px] font-medium px-3 py-1.5 rounded-full border border-[#6b46ff]/20"
                                >
                                {cat}
                                <button
                                    onClick={() => handleCategoryChange(cat)}
                                    className="hover:opacity-70 transition"
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

                    <CourseGrid selectedCategories={selectedCategories} />
                </div>
            </div>
        </section>
    );
}