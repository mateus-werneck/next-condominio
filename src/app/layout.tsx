/* eslint-disable camelcase */
import { Footer } from '@Components/Structure/Footer';
import { Header } from '@Components/Structure/Header';
import Main from '@Components/Structure/Main';
import { DeviceProvider } from '@Contexts/useDevice';
import { MobileMenuProvider } from '@Contexts/useMobileMenu';
import { isMobileAgent } from '@Lib/Treat/Mobile';
import { Libre_Franklin } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

export const metadata = {
  title: 'Controle de Condomínio'
};

export const viewport = {
  initialScale: 1,
  width: 'device-width'
};

const franklin = Libre_Franklin({ subsets: ['latin'] });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const nextHeaders = headers();
  const isMobileDevice = isMobileAgent(String(nextHeaders.get('User-Agent')));

  return (
    <html lang="en">
      <DeviceProvider isMobileDevice={Boolean(isMobileDevice)}>
        <MobileMenuProvider>
          <body className={franklin.className + ' bg-slate-200 text-slate-800'}>
            <div id="portal" />
            <Header />
            <Main>{children}</Main>
            <Footer />
          </body>
        </MobileMenuProvider>
      </DeviceProvider>
    </html>
  );
}
