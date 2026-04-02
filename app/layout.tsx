import Header from "../components/layout/Header"
import { Poppins } from 'next/font/google';
import './globals.css';
import Footer from "@/components/layout/Footer";
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/providers/ThemeProvider";


export const metadata: Metadata = {
  title: 'ADIPA - VersionA',
  description: 'Plataforma de educación continua especializada en psicología y salud mental. Cursos, diplomados y especializaciones en Chile y Latinoamérica.',
  keywords: ['psicología', 'salud mental', 'cursos online', 'diplomados', 'ADIPA', 'Chile'],

  openGraph: {
    title: 'ADIPA - Cursos de Psicología y Salud Mental',
    description: 'Accede a cursos especializados en psicología clínica, neurociencias y más. Educación continua para profesionales.',
    url: 'https://adipa.cl',
    siteName: 'ADIPA',
    images: [
      {
        url: 'https://storage.googleapis.com/statics-files-adipa-cl/dist_compress/dist/img/icons/logo-adipa.svg',
        width: 1200,
        height: 630,
        alt: 'ADIPA - Educación en Psicología',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
}


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
        <Header />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}