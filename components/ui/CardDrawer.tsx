'use client';

import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function formatPrice(price: number) {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
}

export default function CartDrawer() {
    const { items, removeFromCart, clearCart, total, count, isOpen, setIsOpen } = useCart();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`fixed top-0 right-0 h-full w-[380px] max-w-full bg-[var(--color-bg)] shadow-2xl z-50
                transform transition-transform duration-300 ease-out flex flex-col
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
     
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                        <ShoppingCart size={20} className="text-[var(--color-primary)]" />
                        <h2 className="font-bold text-[var(--color-text)] text-[16px]">
                            Mi carrito
                            {count > 0 && (
                                <span className="ml-2 bg-[var(--color-primary)] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                                    {count}
                                </span>
                            )}
                        </h2>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[var(--color-text-light)] hover:text-[var(--color-text)] transition"
                        aria-label="Cerrar carrito"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--color-text-light)]">
                            <ShoppingCart size={48} className="opacity-30" />
                            <p className="text-[14px]">Tu carrito está vacío</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[var(--color-primary)] text-[13px] hover:underline"
                            >
                                Explorar cursos
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]"
                                >
                                    {/* Imagen */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                    />

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[13px] font-semibold text-[var(--color-text)] line-clamp-2 leading-snug mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-[11px] text-[var(--color-text-light)] mb-2">
                                            {item.instructor}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[14px] font-bold text-[var(--color-text)]">
                                                {formatPrice(item.discountPrice)}
                                            </span>
                                            <span className="text-[11px] text-[var(--color-text-light)] line-through">
                                                {formatPrice(item.originalPrice)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quitar */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-[var(--color-text-light)] hover:text-red-500 transition flex-shrink-0"
                                        aria-label="Quitar del carrito"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="px-6 py-4 border-t border-[var(--color-border)] flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] text-[var(--color-text-light)]">Total</span>
                            <span className="text-[20px] font-bold text-[var(--color-text)]">
                                {formatPrice(total)}
                            </span>
                        </div>
                        <button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 rounded-xl transition-colors text-[15px]">
                            Ir al pago
                        </button>
                        <button
                            onClick={clearCart}
                            className="flex items-center justify-center gap-2 text-[12px] text-[var(--color-text-light)] hover:text-red-500 transition"
                        >
                            <Trash2 size={13} />
                            Vaciar carrito
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}