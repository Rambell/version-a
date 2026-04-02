'use client';

import { ChevronUp, ChevronDown, Zap, AlarmClock } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { quickLinks, areasTematicas, tipoPrograma, modalidad, categoria } from '@/data/filters';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const emojiMap: Record<string, React.ReactNode> = {
    zap: <Zap className="text-amber-400" />,
    clock: <AlarmClock className="text-red-400" />,
};

interface CourseSidebarProps {
    selectedCategories: string[];
    selectedTipos: string[];
    selectedModalidades: string[];
    selectedTags: string[];
    priceRange: number[];
    hoursRange: number[];
    discountRange: number[];
    onCategoryChange: (cat: string) => void;
    onTipoChange: (tipo: string) => void;
    onModalidadChange: (mod: string) => void;
    onTagChange: (tag: string) => void;
    onPriceChange: (val: number[]) => void;
    onHoursChange: (val: number[]) => void;
    onDiscountChange: (val: number[]) => void;
    onClearFilters: () => void;
    openAccordion: string | null;
    onAccordionChange: (name: string) => void;
    onQuickFilter: (filter: string) => void;  // ← agrega aquí
    quickFilter: string | null;  
  
};



export default function CategoryFilter({
    selectedCategories, selectedTipos, selectedModalidades, selectedTags,
    priceRange, hoursRange, discountRange,
    onCategoryChange, onTipoChange, onModalidadChange, onTagChange,
    onPriceChange, onHoursChange, onDiscountChange,
    onClearFilters, openAccordion, onAccordionChange, onQuickFilter, quickFilter,
}: CourseSidebarProps) {

    const formatCLP = (value: number) =>
        new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(value);

    const AccordionHeader = ({ name, label }: { name: string; label: string }) => (
        <button onClick={() => onAccordionChange(name)} className="w-full flex items-center justify-between mb-3">
            <span className="text-[13px] font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                {label}
            </span>
            {openAccordion === name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
    );

    const CheckboxList = ({ items, selected, onChange }: { items: string[]; selected: string[]; onChange: (item: string) => void }) => (
        <ul className="flex flex-col gap-2 mb-4">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        id={item}
                        checked={selected.includes(item)}
                        onChange={() => onChange(item)}
                        className="mt-1 accent-[#6b46ff] cursor-pointer"
                    />
                    <label htmlFor={item} className="text-[13px] text-[var(--color-text-light)] cursor-pointer hover:text-[var(--color-primary)] transition-colors leading-snug">
                        {item}
                    </label>
                </li>
            ))}
        </ul>
    );

    const SliderField = ({ value, onChange, min, max, step, format }: {
        value: number[]; onChange: (v: number[]) => void;
        min: number; max: number; step: number;
        format: (v: number) => string;
    }) => {

        const [localValue, setLocalValue] = useState(value);

        useEffect(() => {
            setLocalValue(value);

        }, [value]);

    return (
        <div className="px-2 pb-4">
            <div className="flex justify-between items-center mb-4 text-[13px] font-medium text-[var(--color-text-light)]">
                <span>{format(localValue[0])}</span>
                <span className="text-gray-400">—</span>
                <span>{format(localValue[1])}</span>
            </div>
            <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={localValue}
                min={min}
                max={max}
                step={step}
                onValueChange={setLocalValue}
                onValueCommit={onChange}
                minStepsBetweenThumbs={1}
            >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-[4px]">
                    <Slider.Range className="absolute bg-[var(--color-accent)] rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                    className="block w-5 h-5 bg-[var(--color-accent)] border-2 border-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-grab active:cursor-grabbing"
                    aria-label="Mínimo"
                />
                <Slider.Thumb
                    className="block w-5 h-5 bg-[var(--color-accent)] border-2 border-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-grab active:cursor-grabbing"
                    aria-label="Máximo"
                />
            </Slider.Root>
        </div>
    );
};

    return (
        <aside aria-label="Filtros de cursos" className="w-55 shrink-0">

            <ul className="mb-6 flex flex-col gap-2">
                {quickLinks.map(({ label, emoji }) => (
                    <li key={label}>
                        <button
                            onClick={() => onQuickFilter(label)}
                            className={`text-[14px] font-medium flex items-center gap-1 transition-colors
                                ${quickFilter === label
                                    ? 'text-[var(--color-primary)] font-semibold'
                                    : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                                }`}
                        >
                            {label} {emoji && <span>{emojiMap[emoji as string]}</span>}
                        </button>
                    </li>
                ))}
            </ul> 
            <div className="border-t border-[var(--color-border)] mb-4" />

            <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-semibold text-[var(--color-text)]">Filtros</span>
                <button onClick={onClearFilters} className="text-[12px] text-[var(--color-primary)] hover:underline">
                    Borrar filtros
                </button>
            </div>

            <div className="mb-4">
               <div className="mb-4">
                    <AccordionHeader name="area" label="Área Temática" />
                    <AnimatePresence initial={false}>
                        {openAccordion === 'area' && (
                            <motion.div
                                key="area"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <CheckboxList items={areasTematicas} selected={selectedCategories} onChange={onCategoryChange} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mb-4">
                <AccordionHeader name="programa" label="Tipos de programa" />
                <AnimatePresence initial={false}>
                        {openAccordion === 'programa' && (
                            <motion.div
                                key="programa"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <CheckboxList items={tipoPrograma} selected={selectedTipos} onChange={onTipoChange} />
                            </motion.div>
                        )}
                    </AnimatePresence>
            </div>

            <div className="mb-4">
                <AccordionHeader name="modalidad" label="Modalidad" />
                    <AnimatePresence initial={false}>
                        {openAccordion === 'modalidad' && (
                            <motion.div
                                key="modalidad"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <CheckboxList items={modalidad} selected={selectedModalidades} onChange={onModalidadChange} />
                            </motion.div>
                        )}
                    </AnimatePresence>
            </div>

            <div className="mb-4">
                <AccordionHeader name="categoria" label="Categoría" />
                <AnimatePresence initial={false}>
                    {openAccordion === 'categoria' && (
                        <motion.div
                            key="categoria"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            style={{ overflow: 'hidden' }}
                        >
                            <CheckboxList items={categoria} selected={selectedTags} onChange={onTagChange} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mb-6">
                <AccordionHeader name="precio" label="Rango de Precio" />

                 <AnimatePresence initial={false}>
                    {openAccordion === 'precio' && (
                        <motion.div
                            key="precio"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                           style={{ overflow: 'hidden' }}
                        >
                            <SliderField value={priceRange} onChange={onPriceChange} min={0} max={1200000} step={10000} format={formatCLP} />
                        </motion.div>
                        )}
                </AnimatePresence>
                
            </div>

            <div className="mb-6">
                <AccordionHeader name="horas" label="Rango de Horas" />
                
                <AnimatePresence initial={false}>
                    {openAccordion === 'horas' && (
                        <motion.div
                            key="horas"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                           style={{ overflow: 'hidden' }}
                        >
                    <SliderField value={hoursRange} onChange={onHoursChange} min={8} max={348} step={1} format={(v) => `${v} hrs`} />
                        </motion.div>
                        )}
                </AnimatePresence>
            </div>

            <div className="mb-6">
                <AccordionHeader name="descuento" label="Rango de Descuento" />
                <AnimatePresence initial={false}>
                    {openAccordion === 'descuento' && (
                        <motion.div
                            key="descuento"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                           style={{ overflow: 'hidden' }}
                        >
                    <SliderField value={discountRange} onChange={onDiscountChange} min={0} max={100} step={1} format={(v) => `${v}%`} />
                        </motion.div>
                        )}
                </AnimatePresence>
                
            </div>

        </aside>
    );
}