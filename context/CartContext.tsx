'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '@/types';

interface CartItem extends Course {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (course: Course) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    total: number;
    count: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('adipa-cart');
            if (stored) setItems(JSON.parse(stored));
        } catch {}
    }, []);

    useEffect(() => {
        localStorage.setItem('adipa-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (course: Course) => {
        setItems(prev => {
            if (prev.find(i => i.id === course.id)) return prev;
            return [...prev, { ...course, quantity: 1 }];
        });
        setIsOpen(true);
    };

    const removeFromCart = (id: number) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((acc, item) => acc + item.discountPrice, 0);
    const count = items.length;

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            clearCart,
            total,
            count,
            isOpen,
            setIsOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
    return ctx;
}