import Head from 'next/head';
import { useEffect, useState } from 'react';

import '../styles/globals.css';

import styles from '../styles/Home.module.css';

const TIMEOUT_INTERVAL = 6000;

export default function App ({ Component, pageProps }) {
  const [message, setMessage] = useState('');
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
        <title>Shadowvane | OPEN ALPHA</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo256.png" />
      </Head>
      <aside className={styles[`banner${message ? '-show' : ''}`]}>
        {message}
      </aside>
      <Component {...props} />
    </>
  );
}
