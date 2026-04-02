import { Search, ShoppingCart, Menu, X } from "lucide-react";

interface TopBarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}


export default function TopBar({ mobileOpen, setMobileOpen }: TopBarProps) {
  return (
    <div className="w-full bg-(--color-bg) ">

      <div className="mx-auto flex items-center justify-between py-4 not-even:px-4 md:px-8 xl:px-10px max-w-340">
        <div className="shrink-0">

           <div className="flex items-center gap-3">
            
              <button
                className="xl:hidden text-[var(--color-text)] p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} className="text-[#704efd]"  />}
              </button>
              <img
                src="https://storage.googleapis.com/statics-files-adipa-cl/dist_compress/dist/img/icons/logo-adipa.svg"
                alt="ADIPA"
                className="w-45 h-38.16px object-contain "
              />
            </div>
        </div>

        <div className="hidden xl:flex items-center border-2 border-(--color-accent) rounded-sm overflow-hidden w-135 h-9.5 ml-8">
          <input
            type="text"
            placeholder="¿Qué quieres aprender?"
            className="flex-1 px-5 py-2 text-[15px] outline-none text-[#5b6987] placeholder:text-gray-400"
          />
          <button className="bg-[var(--color-accent)] px-6 h-full text-white hover:bg-(--bg-hover)] transition flex items-center justify-center">
            <Search size={20} strokeWidth={2.5} className="cursor-pointer"/>
          </button>
        </div>


        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-5 text-[14px] text-[#2d3748]">
            <button className="font-bold hover:text-[#2cb7ff] transition">Iniciar Sesión</button>
            <button className="hover:text-[#2cb7ff] transition">Regístrate</button>
          </div>
          
          <div className="relative cursor-pointer text-[#6b46ff]">
            <ShoppingCart size={26} strokeWidth={2} />
            <span className="absolute -top-2 -right-2 bg-white text-[#6b46ff] text-[10px] font-bold w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}