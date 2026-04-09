import { Search, ShoppingCart, Menu, X } from "lucide-react";
import DarkMode from "../ui/DarkMode";
import { useCart } from "@/context/CartContext";


interface TopBarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function TopBar({ mobileOpen, setMobileOpen }: TopBarProps) {
  const { count, setIsOpen } = useCart();

  return (
    <div className="w-full bg-[var(--color-bg)] ">
      <div className="mx-auto flex items-center justify-between py-3 px-4 md:px-8 xl:px-[40px] max-w-[1440px]">

        <div className="flex items-center gap-3">
          <button
            className="xl:hidden text-[var(--color-text)] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen
              ? <X size={24} />
              : <Menu size={24} className="text-[var(--color-primary)]" />
            }
          </button>
          <img
            src="https://storage.googleapis.com/statics-files-adipa-cl/dist_compress/dist/img/icons/logo-adipa.svg"
            alt="ADIPA"
            className="w-28 md:w-36 xl:w-44 h-auto object-contain dark:brightness-0 dark:invert"
            style={{ filter: 'none' }}
          />
        </div>

        <div className="hidden xl:flex items-center border-2 border-[var(--color-accent)] rounded-sm overflow-hidden w-[500px] h-10 ml-8">
          <label htmlFor="topbar-search" className="sr-only">Buscar cursos</label>
          <input
            id="topbar-search"
            type="text"
            placeholder="¿Qué quieres aprender?"
            className="flex-1 px-5 py-2 text-[15px] outline-none bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-light)]"
          />
          <button
            aria-label="Buscar"
            className="bg-[var(--color-accent)] px-6 h-full text-white hover:bg-[var(--color-accent-dark)] transition flex items-center justify-center"
          >
            <Search size={20} strokeWidth={2.5} className="cursor-pointer" />
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-5">

        
          <button aria-label="Buscar" className="xl:hidden text-[var(--color-accent)] p-1">
            <Search size={22} strokeWidth={2.5} />
          </button>

           <div className="xl:hidden">
            <DarkMode />
          </div>

        
          <div className="hidden xl:flex items-center gap-5 text-[14px] text-[var(--color-text)]">
            <button className="font-bold hover:text-[var(--color-accent)] transition">
              Iniciar Sesión
            </button>
            <button className="hover:text-[var(--color-accent)] transition">
              Regístrate
            </button>
            <DarkMode />
          </div>

        
          <div
            className="relative cursor-pointer text-[var(--color-primary)]"
            onClick={() => setIsOpen(true)}
        >
            <ShoppingCart size={22} strokeWidth={2} />
            {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {count}
                </span>
            )}
        </div>
        </div>

      </div>
    </div>
  );
}