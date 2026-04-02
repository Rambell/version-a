'use client';

import { useState, useMemo } from 'react';
import { courses } from '../../data/course';
import CourseCard from '../ui/CourseCard';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ordenOptions = ['Todos', 'Más Populares', 'Top 10 semanal', 'Mejor Valorados', 'Nuevos Lanzamientos', 'Precio: menor a mayor', 'Precio: mayor a menor'];

interface CourseGridProps {
    selectedCategories: string[];
    selectedTipos: string[];
    selectedModalidades: string[];
    selectedTags: string[];
    priceRange: number[];
    hoursRange: number[];
    discountRange: number[];
    searchQuery: string;
    quickFilter: string | null;
    onQuickFilter: (filter: string | null) => void;
    onOpenSidebar: () => void;
}

export default function CourseGrid({
    selectedCategories, selectedTipos, selectedModalidades, selectedTags,
    priceRange, hoursRange, discountRange,
    searchQuery, quickFilter, onQuickFilter, onOpenSidebar,
}: CourseGridProps) {
    const [orden, setOrden] = useState('Todos');

    const filteredCourses = useMemo(() => {
        let result = [...courses];

        // Búsqueda por texto
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((c) =>
                c.title.toLowerCase().includes(q) ||
                c.tags?.some(tag => tag.toLowerCase().includes(q))
            );
        }

        // Filtro área temática
        if (selectedCategories.length > 0) {
            result = result.filter((c) => selectedCategories.includes(c.categoria));
        }

        // Filtro tipo de programa
        if (selectedTipos.length > 0) {
            result = result.filter((c) => selectedTipos.includes(c.tipo));
        }

        // Filtro modalidad
        if (selectedModalidades.length > 0) {
            result = result.filter((c) => selectedModalidades.includes(c.modalidad));
        }

        // Filtro tags/categoría
        if (selectedTags.length > 0) {
            result = result.filter((c) => c.tags?.some(tag => selectedTags.includes(tag)));
        }

        // Filtro precio
        result = result.filter((c) =>
            c.discountPrice >= priceRange[0] && c.discountPrice <= priceRange[1]
        );

        // Filtro horas
        result = result.filter((c) =>
            c.horas >= hoursRange[0] && c.horas <= hoursRange[1]
        );

        // Filtro descuento
        result = result.filter((c) => {
            const pct = Math.round(((c.originalPrice - c.discountPrice) / c.originalPrice) * 100);
            return pct >= discountRange[0] && pct <= discountRange[1];
        });

        // Quick filter
        if (quickFilter === 'Top 10 semanal') {
            result = result.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
        } else if (quickFilter === 'Más Populares') {
            result = result.sort((a, b) => b.popularity - a.popularity);
        } else if (quickFilter === 'Mejores Valorados') {
            result = result.sort((a, b) => b.rating - a.rating);
        } else if (quickFilter === 'Nuevos Lanzamientos') {
            result = result.filter((c) => c.status === 'Nuevo');
        } else if (quickFilter === 'Ofertas Flash') {
            result = result.filter((c) => {
                const pct = Math.round(((c.originalPrice - c.discountPrice) / c.originalPrice) * 100);
                return pct >= 25;
            });
        } else if (quickFilter === 'Pre Lanzamiento') {
            result = result.filter((c) => c.status === 'Próximamente');
        }

        // Ordenar
        if (orden === 'Precio: menor a mayor') {
            result.sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (orden === 'Precio: mayor a menor') {
            result.sort((a, b) => b.discountPrice - a.discountPrice);
        } else if (orden === 'Más Populares') {
            result.sort((a, b) => b.popularity - a.popularity);
        } else if (orden === 'Top 10 semanal') {
            result = result.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
        } else if (orden === 'Mejor Valorados') {
            result.sort((a, b) => b.rating - a.rating);
        } else if (orden === 'Nuevos Lanzamientos') {
            result = result.filter((c) => c.status === 'Nuevo');
        }

        return result;

    }, [selectedCategories, selectedTipos, selectedModalidades, selectedTags,
        priceRange, hoursRange, discountRange, searchQuery, quickFilter, orden]);

    return (
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
                <h2 className="hidden xl:block text-[var(--color-primary)] font-semibold text-[15px]">
                    Cursos que te permitirán potenciar tu carrera.
                </h2>

                <div className="flex items-center gap-3 w-full xl:w-auto xl:ml-auto">
                    <button
                        onClick={onOpenSidebar}
                        className="xl:hidden flex-1 flex items-center justify-center gap-2 border border-[var(--color-border)] px-3 py-2 rounded-lg text-[13px] font-medium text-[var(--color-text)] hover:border-[var(--color-primary)] transition"
                    >
                        <SlidersHorizontal size={15} />
                        FILTROS
                    </button>

                    <div className="flex flex-col xl:flex-row xl:items-center gap-1 xl:gap-2">
                        <span className="hidden xl:block text-[12px] text-gray-400 uppercase tracking-wide font-semibold whitespace-nowrap">
                            Ordenar por
                        </span>
                        <div className="flex-1 xl:flex-none flex items-center gap-2 border border-[var(--color-border)] rounded-lg px-3 py-1.5 bg-[var(--color-bg)]">
                            <div className="relative flex-1 xl:w-48">
                                <select
                                    value={orden}
                                    onChange={(e) => setOrden(e.target.value)}
                                    className="w-full appearance-none text-[13px] text-[var(--color-text)] outline-none cursor-pointer bg-[var(--color-bg)]"
                                >
                                    {ordenOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 min-h-[400px]">
                {filteredCourses.length === 0 ? (
                    <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-400 min-h-[400px]">
                        <Search size={48} className="mb-3 text-gray-300" />
                        <p className="text-[14px]">No hay cursos para los filtros seleccionados.</p>
                        <p className="text-[12px] mt-1">Prueba quitando algunos filtros.</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map((course) => (
                            <motion.div
                                key={course.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}