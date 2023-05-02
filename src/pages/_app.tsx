import type { AppProps } from 'next/app';

import { LocaleProvider } from '../context/locale.context';
import { AuthProvider } from '../context/auth.context';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LocaleProvider>
        <Component {...pageProps} />
      </LocaleProvider>
    </AuthProvider>
  );
}
