import { Search, ShoppingCart } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-white">

      <div className="mx-auto flex items-center justify-between py-4 not-even:px-4 md:px-8 xl:px-10px max-w-340">
        <div className="shrink-0">
          <img
            src="https://storage.googleapis.com/statics-files-adipa-cl/dist_compress/dist/img/icons/logo-adipa.svg"
            alt="ADIPA"
            className="w-45 h-38.16px object-contain"
          />
        </div>


        <div className="hidden lg:flex items-center border-2 border-[#2cb7ff] rounded-sm overflow-hidden w-135 h-9.5 ml-8">
          <input
            type="text"
            placeholder="¿Qué quieres aprender?"
            className="flex-1 px-5 py-2 text-[15px] outline-none text-[#5b6987] placeholder:text-gray-400"
          />
          <button className="bg-[#2cb7ff] px-6 h-full text-white hover:bg-[#1fa0e6] transition flex items-center justify-center">
            <Search size={20} strokeWidth={2.5} />
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