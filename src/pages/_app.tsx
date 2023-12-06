import { AppWrapper } from '@/hooks/useContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { EdgeStoreProvider } from '@/lib/edgestore'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <AppWrapper>
    <EdgeStoreProvider>
    <Component {...pageProps} />
    </EdgeStoreProvider>
  </AppWrapper>
  )
}
