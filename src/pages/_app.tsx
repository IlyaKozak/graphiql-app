import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import { LocaleProvider } from '../context/locale.context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocaleProvider>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}
