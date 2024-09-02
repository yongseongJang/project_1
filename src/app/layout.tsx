import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ReactQueryProviders } from '@/hooks';
import { ReportContextProvider } from '@/contexts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
      <body className={pretendard.className}>
        <ReactQueryProviders>
          <ReportContextProvider>{children}</ReportContextProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}