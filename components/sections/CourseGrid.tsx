'use client';

import { useState, useMemo } from 'react';
import { courses } from '../../data/course';
import CourseCard from '../ui/CourseCard';
import { ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ordenOptions = ['Todos', 'Más Populares', 'Precio: menor a mayor', 'Precio: mayor a menor'];

interface CourseGridProps {
  selectedCategories: string[];
}

export default function CourseGrid({ selectedCategories }: CourseGridProps) {
    const [orden, setOrden] = useState('Todos');

    const filteredCourses = useMemo(() => {
        let result = [...courses];

        if (selectedCategories.length > 0) {
            result = result.filter((c) => selectedCategories.includes(c.categoria));
        }

        if (orden === 'Precio: menor a mayor') {
            result.sort((a, b) => a.discountPrice - b.discountPrice);
            } else if (orden === 'Precio: mayor a menor') {
            result.sort((a, b) => b.discountPrice - a.discountPrice);
        }

        return result;
    }, [selectedCategories, orden]);

    return (
        <div className="flex-1 min-w-0">

            <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#6b46ff] font-semibold text-[15px]">
                    Cursos que te permitirán potenciar tu carrera.
                </h2>

                <div className="flex items-center gap-2">
                    <span className="text-[12px] text-gray-400 uppercase tracking-wide font-semibold">
                        Ordenar por
                    </span>
                    <div className="relative">
                        <select
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                            className="appearance-none border border-gray-200 rounded-lg text-[13px] text-[#2d3748] px-3 py-1.5 pr-8 outline-none cursor-pointer hover:border-[#6b46ff] transition-colors"
                            >
                            {ordenOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 min-h-100">
                {filteredCourses.length === 0 ? (
                    <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-400 min-h-100">
                        <span className="text-4xl mb-3"><Search className='text-5xl'/></span>
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