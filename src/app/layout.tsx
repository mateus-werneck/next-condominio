/* eslint-disable camelcase */
import { Libre_Franklin } from 'next/font/google';
import { headers } from 'next/headers';
import { Footer } from '@Components/Structure/Footer';
import { Header } from '@Components/Structure/Header';
import Main from '@Components/Structure/Main';
import { DeviceProvider } from '@Contexts/useDevice';
import { isMobileAgent } from '@Utils/Mobile';
import './globals.css';

export const metadata = {
  title: 'Controle de Condomínio',
  icons: {
    icon: 'https://ctpfcs.com.br/themes/wc_ecommerce/images/favicon.ico'
  },
  viewport: {
    initialScale: 1,
    width: 'device-width'
  }
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
      <body className={franklin.className + ' bg-slate-200 text-slate-800'}>
        <DeviceProvider isMobileDevice={Boolean(isMobileDevice)}>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </DeviceProvider>
      </body>
    </html>
  );
}
