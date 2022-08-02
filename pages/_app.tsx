import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/main.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    import('jquery');
    import("bootstrap/dist/js/bootstrap");
  },[])

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
