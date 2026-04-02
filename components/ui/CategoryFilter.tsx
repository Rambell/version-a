'use client';

import { ChevronUp, ChevronDown, Zap, AlarmClock } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';

import { quickLinks, areasTematicas, tipoPrograma, modalidad, categoria } from '@/data/filters';

const emojiMap: Record<string, React.ReactNode> = {
    zap: <Zap className="text-amber-400" />,
    clock: <AlarmClock className="text-red-400" />,
};

interface CourseSidebarProps {
    selectedCategories: string[];
    onCategoryChange: (cat: string) => void;
    onClearFilters: () => void;
    openAccordion: string | null;           
    onAccordionChange: (name: string) => void; 
}

export default function CategoryFilter({
    selectedCategories,
    onCategoryChange,
    onClearFilters,
    openAccordion,
    onAccordionChange,
}: CourseSidebarProps) {

    
    const [priceRange, setPriceRange] = useState([0, 1200000]);
    const [hoursRange, setHoursRange] = useState([8, 348]);
    const [discountRange, setDiscountRange] = useState([0, 100]);

    const formatCLP = (value: number) =>
        new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(value);

    
    const AccordionHeader = ({ name, label }: { name: string; label: string }) => (
        <button
            onClick={() => onAccordionChange(name)}
            className="w-full flex items-center justify-between mb-3"
        >
            <span className="text-[13px] font-semibold text-[#2d3748] hover:text-[#6b46ff] transition-colors cursor-pointer">
                {label}
            </span>
            {openAccordion === name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
    );

    const CheckboxList = ({ items }: { items: string[] }) => (
        <ul className="flex flex-col gap-2 mb-4">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        id={item}
                        checked={selectedCategories.includes(item)}
                        onChange={() => onCategoryChange(item)}
                        className="mt-1 accent-[#6b46ff] cursor-pointer"
                    />
                    <label htmlFor={item} className="text-[13px] text-[#5b6987] cursor-pointer hover:text-[#6b46ff] transition-colors leading-snug">
                        {item}
                    </label>
                </li>
            ))}
        </ul>
    );

    return (
        <aside className="w-[220px] flex-shrink-0">

      
            <ul className="mb-6 flex flex-col gap-2">
                {quickLinks.map(({ label, emoji }) => (
                <li key={label}>
                    <a href="#" className="text-[14px] text-[#2d3748] hover:text-[#6b46ff] transition-colors font-medium flex items-center gap-1">
                        {label} {emoji && <span>{emojiMap[emoji]}</span>}
                    </a>
                </li>
                ))}
            </ul>

            <div className="border-t border-gray-200 mb-4" />

                <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] font-semibold text-[#2d3748]">Filtros</span>
                    <button onClick={onClearFilters} className="text-[12px] text-[#6b46ff] hover:underline">
                        Borrar filtros
                    </button>
                </div>

         
                <div className="mb-4">
                    <AccordionHeader name="area" label="Área Temática" />
                    {openAccordion === 'area' && <CheckboxList items={areasTematicas} />}
                </div>

                
                <div className="mb-4">
                    <AccordionHeader name="programa" label="Tipos de programa" />
                    {openAccordion === 'programa' && <CheckboxList items={tipoPrograma} />}
                </div>

          
                <div className="mb-4">
                    <AccordionHeader name="modalidad" label="Modalidad" />
                    {openAccordion === 'modalidad' && <CheckboxList items={modalidad} />}
                </div>


                <div className="mb-4">
                    <AccordionHeader name="categoria" label="Categoría" />
                    {openAccordion === 'categoria' && <CheckboxList items={categoria} />}
                </div>

           
                <div className="mb-6">
                    <AccordionHeader name="precio" label="Rango de Precio" />
                        {openAccordion === 'precio' && (
                            <div className="px-2">
                                <div className="flex justify-between items-center mb-4 text-[13px] font-medium text-[#5b6987]">
                                    <span>{formatCLP(priceRange[0])}</span>
                                    <span className="text-gray-400">—</span>
                                    <span>{formatCLP(priceRange[1])}</span>
                                </div>
                                <Slider.Root className="relative flex items-center select-none touch-none w-full h-5"
                                    value={priceRange} max={1200000} min={0} step={10000} onValueChange={setPriceRange}>
                                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-[4px]">
                                        <Slider.Range className="absolute bg-[#2cb7ff] rounded-full h-full" />
                                    </Slider.Track>
                                    <Slider.Thumb className="block w-5 h-5 bg-[#2cb7ff] border-2 border-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-pointer" />
                                    <Slider.Thumb className="block w-5 h-5 bg-[#2cb7ff] border-2 border-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-pointer" />
                                </Slider.Root>
                            </div>
                        )}
                </div>

                <div className="mb-6">
                    <AccordionHeader name="horas" label="Rango de Horas" />
                        {openAccordion === 'horas' && (
                            <div className="px-2">
                                <div className="flex justify-between items-center mb-4 text-[13px] font-medium text-[#5b6987]">
                                    <span>{hoursRange[0]} hrs</span>
                                    <span className="text-gray-400">—</span>
                                    <span>{hoursRange[1]} hrs</span>
                                </div>
                                <Slider.Root className="relative flex items-center select-none touch-none w-full h-5"
                                        value={hoursRange} max={348} min={8} step={1} onValueChange={setHoursRange}>
                                        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[4px]">
                                            <Slider.Range className="absolute bg-[#2cb7ff] rounded-full h-full" />
                                        </Slider.Track>
                                    <Slider.Thumb className="block w-5 h-5 bg-[#2cb7ff] border-2 border-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-pointer" />
                                    <Slider.Thumb className="block w-5 h-5 bg-[#2cb7ff] border-2 border-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-pointer" />
                                </Slider.Root>
                            </div>
                        )}
                </div>

            <div className="mb-6">
                <AccordionHeader name="descuento" label="Rango de Descuento" />
                    {openAccordion === 'descuento' && (
                        <div className="px-2">
                            <div className="flex justify-between items-center mb-4 text-[13px] font-medium text-[#5b6987]">
                                <span>{discountRange[0]} %</span>
                                <span className="text-gray-400">—</span>
                                <span>{discountRange[1]} %</span>
                            </div>
                            <Slider.Root className="relative flex items-center select-none touch-none w-full h-5"
                                value={discountRange} max={100} min={0} step={1} onValueChange={setDiscountRange}>
                                <Slider.Track className="bg-gray-200 relative grow rounded-full h-[4px]">
                                    <Slider.Range className="absolute bg-[#2cb7ff] rounded-full h-full" />
                                </Slider.Track>
                                <Slider.Thumb className="block w-5 h-5 bg-[#2cb7ff] border-2 border-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-pointer" />
                                <Slider.Thumb className="block w-5 h-5 bg-[#2cb7ff] border-2 border-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-pointer" />
                            </Slider.Root>
                        </div>
                    )}
            </div>
        </aside>
    );
}