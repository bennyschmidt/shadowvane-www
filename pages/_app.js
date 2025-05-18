import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css';

import styles from '../styles/Home.module.css';

const TIMEOUT_INTERVAL = 6000;

export default function App ({ Component, pageProps }) {
  const [message, setMessage] = useState('SHADOWVANE is shutting down on June 16, 2025. Thanks for playing!');
  const [timeoutId, setTimeoutId] = useState();

  let timeout;

  const showNotification = message => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setMessage(message);
    setTimeoutId(setTimeout(() => setMessage(''), TIMEOUT_INTERVAL));
  };

  const props = {
    ...pageProps,

    showNotification
  };

  return (
    <>
      <Head>
        <title>SHADOWVANE</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo256.png" />
      </Head>
      <aside className={styles[`banner${message ? '-show' : ''}`]}>
        {message}
      </aside>
      <Component {...props} />
      <Analytics />
      <Script src="https://web.squarecdn.com/v1/square.js" />
      <Script defer src="js/fern-sdk.js" />
    </>
  );
}
