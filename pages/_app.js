import Head from 'next/head';
import { useEffect, useState } from 'react';

import '../styles/globals.css';

import styles from '../styles/Home.module.css';

export default function App ({ Component, pageProps }) {
  const [message, setMessage] = useState('');

  let timeout;

  const showNotification = message => {
    clearTimeout(timeout);
    setMessage(message);

    timeout = setTimeout(() => {
      setMessage('');
    }, TIMEOUT_INTERVAL);
  };

  const handleAPIResponse = async response => {
    const data = await response.json();

    const { message } = data;

    if (message) {
      showNotification(message);
    }
  };

  const props = {
    ...pageProps,

    showNotification,
    handleAPIResponse
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
