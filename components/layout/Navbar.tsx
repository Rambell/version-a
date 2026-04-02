'use client';

const links = [
    { label: 'Descubre ADIPA', 
        badge: null, 
        hasArrow: true, 
        submenu: [
            {label:'Nosotros', items:['Concurso: Sobre Adipa', 'Explora las escuelas de Adipa', 'Docentes', 'Impacto', 'Sala de prensa', 'Trabaja con nosotros']  },
            {label:'Comunidad', items:['Concurso: En tus Palabras', 'Encuentra Empleos', 'Eventos', 'Testimonios'] },
            {label:'Beneficios', items:['Convenios', 'Programa Adipartners', 'Cueso gratis de cumpleaños', 'Ver Todos']  },
            {label:'Categorías', items:null },
            {label:'Rutas', items:null },
            {label:'Capacitación Institucional', items:null },   
        ], 
    },
    { label: 'Recursos', 
        badge: null, 
        hasArrow: true, 
        submenu: [
            { label: 'Ebook Gratuitos', items: null }, 
            { label: 'Glosario', items: null },     
            { label: 'Investigaciones', items: null }, 
            { label: 'Noticias', items: null }, 
            { label: 'Newesletter', items: null }, 
            { label: 'Podcast Adipados', items: null }
        ], 
    },
    { label: 'Seminarios', badge: 'GRATIS' },
    { label: 'Congreso', badge: 'NUEVO' },
    { label: 'Especializaciones', badge: null },
    { label: 'Acreditaciones', badge: null },
    { label: 'Sesiones Magistrales', badge: null },
    { label: 'Diplomados', badge: null },
    { label: 'Cursos', badge: null },
];


    const badgeStyles: Record<string, string> = {
        GRATIS: 'bg-[#6b46ff]', 
        NUEVO: 'bg-[#ff006e]',  
    };

export default function Navbar() {
    return (
        <nav className="w-full bg-white border-b border-gray-100 relative">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8 xl:px-[40px] h-14">
                
                <div className="flex items-center h-full">
                    <div className="flex items-center gap-3 mr-6 h-full pt-1">
                        <img src="https://storage.googleapis.com/statics-files-adipa-cl/dist_compress/dist/img/icons/icons-whatsapp.svg" className="w-[18px]" alt="" />
                        <span className="text-gray-300 font-light">|</span>
                    </div>
                        
              
                    <div className="flex items-center gap-5 xl:gap-8 h-full">
                        {links.map(({ label, badge, hasArrow, submenu }) => (
                            <div key={label} className="group h-full relative flex items-center">

                                <a href="#"
                                    className={`whitespace-nowrap text-[#2d3748] group-hover:text-[#2cb7ff] transition-colors text-[14px] flex items-center gap-1 h-full border-b-2 border-transparent group-hover:border-[#2cb7ff] pt-2
                                        ${label === 'Congreso' || label === 'Cursos' ? 'font-bold' : 'font-medium'}`} 
                                >
                                    {badge && (
                                        <span className={`absolute top-1 left-3/4 -translate-x-1/2 text-[9px] px-1.5 py-0.5 rounded-sm font-bold text-white uppercase ${badgeStyles[badge]}`}>
                                            {badge}
                                        </span>
                                    )}
                                    {label}
                                    {hasArrow && <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>}
                                </a>

                                {submenu && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl border-t border-gray-100 z-50
                                        invisible opacity-0 scale-y-95 origin-top
                                        group-hover:visible group-hover:opacity-100 group-hover:scale-y-100
                                        transition-all duration-400 ease-out">
                                        <ul className="py-2">
                                            {submenu.map((item) => (
                                                <li key={item.label} className="group/sub relative">
                                                    <a href="#" className="flex items-center justify-between px-6 py-3 text-[14px] text-[#5b6987] hover:bg-gray-100 hover:text-[#704efd] transition-colors font-medium">
                                                        {item.label}
                                                        {item.items && <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7-7" /></svg>}
                                                    </a>
                          
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            
                <a href="#" className="flex items-center bg-[#00b0ff] hover:bg-[#0096db] text-white transition-all shadow-md overflow-hidden
                    rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-[20px] px-4 py-2 h-[45px] ml-10 flex-shrink-0"
                >
                    <div className="pr-3 flex items-center justify-center">
                        <img 
                            src="https://adipa.cl/content/uploads/2026/03/black-sale-icono-mini-banner-1.webp" 
                            alt="Black Sale" 
                            className="w-7 h-7 object-contain"
                        />
                    </div>
                    <div className="h-6 w-[1.5px] bg-white opacity-40"></div>
                    <div className="pl-3">
                        <span className="text-[12px]">
                            Black Sale Oficial
                        </span>
                    </div>
                </a>
            </div>
        </nav>
    );
}