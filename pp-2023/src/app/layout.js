import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'
import Header from './common/Header';
import Footer from './common/Footer';
import { Roboto, Playfair_Display } from 'next/font/google';
import { LoadingStatusProvider } from './common/LoadingScreen';

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
        <Header />
          <LoadingStatusProvider>
            {children}
          </LoadingStatusProvider>
        <Footer />
      </body>
    </html>
  )
}
