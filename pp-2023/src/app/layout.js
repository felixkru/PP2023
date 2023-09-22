import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'
/* import { Inter } from 'next/font/google' */
import { Roboto, Playfair_Display } from 'next/font/google';

export const roboto = Roboto({ 
  weight: ['400', '500'],
  subsets: ['latin'],
})

export const playfair = Playfair_Display({
  subsets: ['latin']
})

export const metadata = {
  title: 'PROG 2023 - KMeans',
  description: 'Programmierprojekt der LL 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
