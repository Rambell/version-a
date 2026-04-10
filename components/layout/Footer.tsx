'use client'

import { SiInstagram, SiFacebook, SiYoutube, SiSpotify, SiTiktok } from '@icons-pack/react-simple-icons';
import { Mail, Phone, MapPin, Send, Globe, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import linkedinIcon from '../../assets/linkedinIcon.png'
import { StaticImageData } from 'next/image';
import { useState } from 'react';


const mainColumns = [
  {
    title: 'Programas',
    links: ['Cursos', 'Seminarios', 'Diplomados'],
  },
  {
    title: 'Recursos',
    links: ['Noticias', 'Glosario', 'Podcast Adipados', 'Investigaciones'],
  },
  {
    title: 'Escuelas',
    links: [
      'Escuela Salud Mental Adultos', 
      'Escuela de Salud Mental Infanto-Juvenil',
      'Escuela de Psicología Organizacional', 
      'Escuela Psicosocial Jurídica', 
      'Escuela de Educación Neurodesarrollo'
    ],
  }
];

const stackedColumns = [
  {
    title: 'Beneficios',
    links: ['Convenios', 'Programa Adipartners', 'Giftcards'],
  },
  {
    title: 'Conoce Adipa',
    links: ['Sobre Adipa', 'Escuelas', 'Docentes', 'Prensa'],
  },
];

const countries = [
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'México', flag: '🇲🇽' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Global', flag: <Globe size={18} strokeWidth={2.5} className="text-white" /> },
];
const socials: SocialItem[] = [
  { Icon: SiFacebook, href: 'https://www.facebook.com/adipa.cl' },
  { Icon: SiInstagram, href: 'https://www.instagram.com/adipa.cl/' },
  { Icon: SiYoutube, href: 'https://www.youtube.com/channel/UCSx-fxlxiMHExaWwyHT8P8A' },
  { Icon: linkedinIcon, href: 'https://www.linkedin.com/company/academia-digital-de-psicologia-y-aprendizaje-adipa/posts/?feedView=all', isCustom: true }, 
  { Icon: SiSpotify, href: 'https://open.spotify.com/show/4mwZlXLYaGdr9WIqiuSHup' },
  { Icon: SiTiktok, href: 'https://www.tiktok.com/@somosadipa' },
];

type SocialItem = {
  Icon: React.ElementType | StaticImageData; // Puede ser un componente o una imagen
  href: string;
  isCustom?: boolean;
};

export default function Footer() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [errors, setErrors] = useState({ nombre: false, email: false });

    const validateForm = () => {
        const nombreValido = /^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(nombre);
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        setErrors({
            nombre: !nombreValido,
            email: !emailValido
        });

        return nombreValido && emailValido;
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return; 

        setIsSending(true);
        await new Promise(res => setTimeout(res, 1200));
        setIsSending(false);
        setIsSubscribed(true);
    };

    return (
        <footer className="bg-[#3a3f5a] text-white font-sans">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[40px] py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12">
                    
                    <div className="flex flex-col gap-8">
                        <img
                            src="https://storage.googleapis.com/statics-files-adipa-cl/dist_compress/dist/img/icons/logo-adipa.svg"
                            alt="ADIPA"
                            className="w-40 brightness-0 invert"
                        />
                        <div className="flex flex-col gap-4">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-gray-300">Estamos presentes en:</span>
                            <ul className="flex flex-col gap-3">
                                {countries.map((c) => (
                                    <li key={c.name} className="flex items-center gap-3 text-[13px] font-bold hover:text-blue-300 cursor-pointer transition-colors group">
                                        <span className="w-6 flex justify-center">{c.flag}</span> 
                                        <span className="group-hover:translate-x-1 transition-transform">{c.name.toUpperCase()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

               
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-5">
                            <h4 className="text-[14px] font-bold uppercase tracking-widest border-b border-white/10 pb-2 inline-block text-[#8494C9]">Programas</h4>
                            <ul className="flex flex-col gap-3">
                                {['Cursos', 'Seminarios', 'Diplomados'].map(link => (
                                    <li key={link}><a href="#" className="text-[12px] font-bold text-gray-300 hover:text-white transition-all uppercase">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h4 className="text-[14px] font-bold uppercase tracking-widest border-b border-white/10 pb-2 inline-block text-[#8494C9]">Escuelas</h4>
                            <ul className="flex flex-col gap-3">
                                {mainColumns[2].links.map(link => (
                                    <li key={link}><a className="text-[12px] font-bold text-gray-300 hover:text-white transition-all uppercase cursor-pointer">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-5">
                            <h4 className="text-[14px] font-bold uppercase tracking-widest border-b border-white/10 pb-2 inline-block text-[#8494C9] ">Recursos</h4>
                            <ul className="flex flex-col gap-3">
                                {mainColumns[1].links.map(link => (
                                    <li key={link}><a  className="text-[12px] font-bold text-gray-300 hover:text-white transition-all uppercase cursor-pointer">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h4 className="text-[14px] font-bold uppercase tracking-widest border-b border-white/10 pb-2 inline-block text-[#8494C9]">Beneficios</h4>
                            <ul className="flex flex-col gap-3">
                                {stackedColumns[0].links.map(link => (
                                    <li key={link}><a  className="text-[12px] font-bold text-gray-300 hover:text-white transition-all uppercase cursor-pointer">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h4 className="text-[14px] font-bold uppercase tracking-widest border-b border-white/10 pb-2 inline-block text-[#8494C9]">Conoce Adipa</h4>
                            <ul className="flex flex-col gap-3">
                                {stackedColumns[1].links.map(link => (
                                    <li key={link}><a className="text-[12px] font-bold text-gray-300 hover:text-white transition-all uppercase cursor-pointer">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    
                    <div className="flex flex-col gap-6">
                        <h4 className="text-[14px] font-bold uppercase tracking-widest text-[#8494C9]">Contacto</h4>
                        <div className="flex flex-col gap-4 text-[13px] text-gray-300">
                            <div className="flex items-start gap-3"><Phone size={18} className="text-blue-300 shrink-0" /><span>CL +56957253424</span></div>
                            <div className="flex items-start gap-3"><Mail size={18} className="text-blue-300 shrink-0" /><span>info@adipa.cl</span></div>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-blue-300 shrink-0" />
                                <a href="https://www.google.com/maps/search/?api=1&query=Estoril+120+oficina+414+Las+Condes+Santiago+Chile" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    <span className="text-[12px] leading-tight text-white">Estoril 120, oficina 414, Las Condes. Santiago de Chile.</span>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <a className="text-[13px] font-bold text-white hover:underline cursor-pointer italic">¡REGALA UNA GIFTCARD!</a>
                            <a className="text-[12px] font-bold text-gray-300 hover:text-white cursor-pointer underline">¿Necesitas ayuda psicológica?</a>
                            <a className="text-[12px] font-bold text-gray-300 hover:text-white cursor-pointer underline">Términos y condiciones</a>
                            <a className="text-[12px] font-bold text-gray-300 hover:text-white cursor-pointer underline">Centro de ayuda</a>
                        </div>
                    </div>

                    
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10 h-fit min-h-[350px] flex flex-col transition-all duration-500">
                        {isSubscribed ? (
                            <div className="flex flex-col items-center justify-center flex-1 text-center animate-in fade-in zoom-in duration-300">
                                <CheckCircle2 size={32} className="text-[#2cb7ff] mb-4" />
                                <h4 className="text-[14px] font-bold uppercase mb-2">¡Éxito!</h4>
                                <p className="text-[12px] text-gray-400">Gracias por suscribirte.</p>
                                <button onClick={() => {setIsSubscribed(false); setNombre(''); setEmail('');}} className="mt-4 text-[11px] text-[#2cb7ff] hover:underline">Otro correo</button>
                            </div>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                                <h4 className="text-[13px] font-bold mb-2 uppercase leading-tight">Newsletter</h4>
                                <div className="flex flex-col gap-1">
                                    <label className={`text-[10px] font-bold uppercase ${errors.nombre ? 'text-red-400' : 'text-gray-400'}`}>Nombre*</label>
                                    <input 
                                        type="text" 
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className={`bg-white text-black px-3 py-1.5 rounded-md text-sm outline-none ${errors.nombre ? 'border-2 border-red-400' : ''}`} 
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className={`text-[10px] font-bold uppercase ${errors.email ? 'text-red-400' : 'text-gray-400'}`}>Email*</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`bg-white text-black px-3 py-1.5 rounded-md text-sm outline-none ${errors.email ? 'border-2 border-red-400' : ''}`} 
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Frecuencia*</label>
                                    <select className="bg-white text-black px-3 py-1.5 rounded-md text-sm outline-none">
                                        <option>Selecciona</option>
                                        <option>2 al mes</option>
                                        <option>1 al mes</option>
                                    </select>
                                </div>
                                <button 
                                    type="submit"
                                    disabled={isSending}
                                    className="bg-[#2cb7ff] hover:bg-blue-500 text-white font-bold py-2 rounded-md transition-all flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50"
                                >
                                    {isSending ? 'ENVIANDO...' : <>ENVIAR <Send size={14} /></>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

           
           
            <div className="bg-[#2a2e45] py-6">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[40px] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {socials.map(({ Icon, href, isCustom }, idx) => (
                            <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white text-[#3a3f5a] flex items-center justify-center hover:bg-[#2cb7ff] hover:text-white transition-all transform hover:-translate-y-1">
                                {isCustom ? <Image src={Icon as StaticImageData} alt="Icon" width={20} height={20} /> : (() => { const IC = Icon as React.ElementType; return <IC size={18} />; })()}
                            </a>
                        ))}
                    </div>
                    <p className="text-base text-gray-400 font-medium">© {new Date().getFullYear()} ADIPA — Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
    );
}