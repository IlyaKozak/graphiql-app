import type { AppProps } from 'next/app';

import { LocaleProvider } from '../context/locale.context';
import { AuthProvider } from '../context/auth.context';
import '@/styles/globals.css';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LocaleProvider>
          <Component {...pageProps} />
        </LocaleProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
