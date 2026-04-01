import Header from "../components/layout/Header"
import { Poppins } from 'next/font/google';
import './globals.css';


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
    <html lang="es" className={poppins.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}