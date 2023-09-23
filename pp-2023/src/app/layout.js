import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'
import Navbar from './common/Header';
import Footer from './common/Footer';
import { Roboto, Playfair_Display } from 'next/font/google';

export const roboto = Roboto({ 
  weight: ['400', '500'],
  subsets: ['latin'],
})

export const playfair = Playfair_Display({
  subsets: ['latin']
})

export const metadata = {
  title: 'Programmierprojekt 2023',
  description: 'Programmierprojekt der LL 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
