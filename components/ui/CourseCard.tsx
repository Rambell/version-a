    import { Course } from '@/types';
    import { Calendar, CircleAlert, Star, User } from 'lucide-react';
    import { useCart } from '@/context/CartContext';
    import { ShoppingCart, Check } from 'lucide-react';

    interface CourseCardProps {
        course: Course;
    }

    const modalidadDot: Record<string, string> = {
        'Online': 'bg-blue-400',
        'En Vivo': 'bg-green-400',
        'Presencial': 'bg-orange-400',
    };

    const modalidadTooltip: Record<string, string> = {
        'Online': 'Accede cuando quieras, a tu propio ritmo.',
        'En Vivo': 'Sesiones en tiempo real con el instructor. Se graban para verlas después.',
        'Presencial': 'Asistencia física requerida en sede.',
    };

    function formatPrice(price: number) {
        return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
    }

    function calcDiscount(original: number, discount: number) {
        return Math.round(((original - discount) / original) * 100);
    }

    export default function CourseCard({ course }: CourseCardProps) {
        const { title, instructor, startDate, originalPrice, discountPrice, modalidad, image, status } = course;
        const { addToCart, items } = useCart();
        const isInCart = items.some(i => i.id === course.id);

        const formattedDate = new Date(startDate + 'T12:00:00').toLocaleDateString('es-CL', {
            day: '2-digit', month: '2-digit', year: 'numeric',
        });

        const discountPercent = calcDiscount(originalPrice, discountPrice);

        return (
            <div className="bg-[var(--color-bg)] rounded-xl overflow-hidden shadow-sm border border-[var(--color-border)] flex flex-col
                hover:shadow-xl hover:-translate-y-1 hover:border-[var(--color-primary)]/20
                transition-all duration-300 ease-out group">

                <div className="relative w-full h-44 overflow-hidden cursor-pointer">
                    <img
                        src={image}
                        alt={`Imagen del curso: ${title}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute bottom-3 right-3">
                        <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[11px] font-medium bg-gray-800/70 cursor-default peer">
                            <span className={`w-1.5 h-1.5 rounded-full ${modalidadDot[modalidad]}`} />
                            {modalidad}
                            <span className="ml-0.5 text-white/60 text-[10px]">
                                <CircleAlert size={12} className="cursor-pointer" />
                            </span>
                        </div>

                        <div className="absolute bottom-full right-0 mb-2 w-52 z-10
                            bg-[var(--color-bg)] text-[var(--color-text)] text-[12px] leading-snug
                            px-3 py-2.5 rounded-xl shadow-xl border border-[var(--color-border)]
                            invisible opacity-0 translate-y-1
                            peer-hover:visible peer-hover:opacity-100 peer-hover:translate-y-0
                            transition-all duration-200 ease-out pointer-events-none"
                        >
                            {modalidadTooltip[modalidad]}
                            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-[var(--color-bg)] border-r border-b border-[var(--color-border)] rotate-45" />
                        </div>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-gray-800/70 px-2 py-1 rounded-full text-white text-[11px]">
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        <span>5.0</span>
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-[var(--color-text)] text-[14px] leading-snug mb-2 line-clamp-3">
                        {title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-light)] mb-3">
                        <User size={11} className="text-[var(--color-primary)]" />
                        <span>{instructor}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-light)] mb-1">
                        <Calendar size={12} />
                        <span>Inicio : {formattedDate}</span>
                        <span className="ml-auto text-green-500 font-medium">• {status ?? 'En progreso'}</span>
                    </div>

                     <div className="mt-auto pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[18px] font-bold text-[var(--color-text)]">
                                {formatPrice(discountPrice)}
                            </span>
                            <span className="bg-[var(--color-accent)] text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                                {discountPercent}%
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] text-[var(--color-text-light)] line-through">
                                {formatPrice(originalPrice)}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 rounded-lg text-[13px] font-semibold border border-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer">
                                Ver curso
                            </button>
                            <button
                                onClick={() => addToCart(course)}
                                disabled={isInCart}
                                className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer
                                    ${isInCart
                                        ? 'bg-green-100 text-green-700 cursor-default'
                                        : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
                                    }`}
                            >
                                {isInCart ? <><Check size={13} /> Agregado</> : <><ShoppingCart size={13} /> Carrito</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }