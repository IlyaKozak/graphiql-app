import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import { LocaleProvider } from '../context/locale.context';
import { AuthProvider } from '../context/auth.context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LocaleProvider>
        <Component {...pageProps} />
      </LocaleProvider>
    </AuthProvider>
  );
}
