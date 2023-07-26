import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

const OPERATING_SYSTEMS = {
  'Windows NT 10.0': 'Windows 10',
  'Windows NT 6.3': 'Windows 8.1',
  'Windows NT 6.2': 'Windows 8',
  'Windows NT 6.1': 'Windows 7',
  'Windows NT 6.0': 'Windows Vista',
  'Windows NT 5.1': 'Windows XP',
  'Windows NT 5.0': 'Windows 2000',
  'Mac': 'macOS',
  'X11': 'UNIX',
  'Linux': 'Linux'
};

const SCREENSHOTS = [
  'shadowvane-death.png',
  'shadowvane-docks.png',
  'shadowvane-jump.png',
  'shadowvane-pandemonium-8.png',
  'shadowvane-pve.png',
  'soul-barrier.png',
  'the-mists-pvp.png',
  'the-mists-sunset.png',
  'the-mists-victory.png',
  'afterworld-agarthe-2.png',
  'afterworld-agarthe-3.png',
  'afterworld-agarthe-4.png',
  'afterworld-agarthe-6.png',
  'afterworld-agarthe-dock.png',
  'afterworld-agarthe-guardian.png',
  'afterworld-agarthe-moon.png',
  'afterworld-agarthe-tunnel-2.png',
  'afterworld-agarthe-tunnel.png',
  'afterworld-agarthe.png',
  'afterworld-demon-2.png',
  'afterworld-demon-3.png',
  'afterworld-demon.png',
  'afterworld-moon.png',
  'afterworld-temple-of-the-moon-agarthe.png',
  'blood-portal-agarthe.png',
  'new-skill-agarthe.png'
];

const SQUARE_CONFIG = {
  // SQUARE_APP_ID: 'sandbox-sq0idb-wyDnCeGb3xKoq1jDladoBA',
  // SQUARE_LOCATION_ID: 'LREEPV1REVAGE',
  SQUARE_APP_ID: 'sq0idp-rT4cOK5_kccyWm8GYOnS0g',
  SQUARE_LOCATION_ID: 'LZQA0FV1D50R3',
}

const BASE_URL = 'https://www.exactchange.network/shadowvane';
// const BASE_URL = 'http://localhost:1337/shadowvane';

const MEDIA_URL = 'https://www.exactchange.network/media/downloads';
// const MEDIA_URL = 'http://localhost:1337/media/downloads';

export default function Home ({ showNotification }) {
  const [OSName, setOSName] = useState();
  const [isOverlayShown, setIsOverlayShown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [squareToken, setSquareToken] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const getPayload = useRef();

  useEffect(() => {
    getPayload.current = () => ({
      OSName,
      username: email,
      displayName,
      password1,
      password2,
      squareToken
    });
  }, [OSName, email, displayName, password1, password2, squareToken]);

  useEffect(() => {
    for (const userAgent of Object.keys(OPERATING_SYSTEMS)) {
      const OS = OPERATING_SYSTEMS[userAgent];

      if (window.navigator.userAgent.includes(userAgent)) {
        setOSName(OS);
      }
    }
  }, []);


  const onSignup = async payload => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response?.ok) {
        const result = await response.json();

        if (result?.success) {
          showNotification('Your account has been created! Check your email for further instructions.');
          setIsOverlayShown(false);

        } else {
          if (result?.message) {
            showNotification(result.message);
          } else {
            showNotification('Unknown error.');
          }
        }
      }
    } catch (error) {
      showNotification(error?.message || 'Unknown error.');
    }

    setIsDisabled(false);
  };

  const onClickPlay = () => {
    const frond = FernSDK.Frond({
      rootElement: document.getElementById('buy'),
      squareAppId: SQUARE_CONFIG.SQUARE_APP_ID,
      squareLocationId: SQUARE_CONFIG.SQUARE_LOCATION_ID,
      onPayment: onClickCreate
    });

    frond.onShow({ cards: [] });
    setIsOverlayShown(true);
  };

  const onClickDownloadWin = () => {
    window.location.href = `${MEDIA_URL}/shadowvane/win/Shadowvane.zip`;
  };

  const onClickDownloadMac = () => {
    window.location.href = `${MEDIA_URL}/shadowvane/mac/Shadowvane.zip`;
  };

  const onClickDownloadLinux = () => {
    window.location.href = `${MEDIA_URL}/shadowvane/linux/Shadowvane.zip`;
  };

  const onClickCreate = ({ squareToken: token }) => {
    setIsDisabled(true);
    setSquareToken(token);

    const reasons = [];

    const {
      OSName: currentOSName,
      username: currentEmail,
      displayName: currentDisplayName,
      password1: currentPassword1,
      password2: currentPassword2,
      squareToken: currentSquareToken
    } = getPayload.current();

    if (!currentEmail?.match('@') || currentEmail.trim().length < 3) {
      reasons.push('invalid email address');
    }

    if (currentDisplayName.trim().length < 2) {
      reasons.push('character name too short');
    }

    if (currentPassword1.trim().length < 6) {
      reasons.push('password too short');
    }

    if (currentPassword1.trim() !== currentPassword2.trim()) {
      reasons.push('passwords don\'t match');
    }

    if (!token) {
      reasons.push('Invalid payment.');
    }

    if (reasons.length) {
      showNotification(`Issues: ${reasons.join(', ')}`);
      setIsDisabled(false);

      return;
    }

    onSignup({
      OSName: currentOSName,
      username: currentEmail,
      displayName: currentDisplayName,
      password1: currentPassword1,
      password2: currentPassword2,
      squareToken: token
    });
  };

  return (
    <>
      <aside className={isOverlayShown ? styles['overlay-show'] : styles.overlay}>
        <div className={styles.buy} id="buy">
          <h3>New Account</h3>
          <p style={{ maxWidth: '75%' }}>
            Buy now: Play now! The game is in OPEN ALPHA and will also go through an OPEN BETA phase before the final version is released. If you buy the game now, you can play immediately and will be invited to all future closed tests.
          </p>
          <ul className={styles.shop}>
            <li className={styles.item}>
              <div className={styles.shadowvane}>
                <Image
                  alt="SHADOWVANE"
                  src="/img/product-box.png"
                  width={204}
                  height={300}
                />
                <div className={styles.payments}>
                  <h5 className={styles.price}>$19.99</h5>
                  <p>Retail price. There is no subscription fee to access online services.</p>
                </div>
              </div>
            </li>
          </ul>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Character name"
            value={displayName}
            onChange={({ target: { value } }) => setDisplayName(value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            value={password1}
            onChange={({ target: { value } }) => setPassword1(value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Repeat password"
            value={password2}
            onChange={({ target: { value } }) => setPassword2(value)}
            autoComplete="off"
          />
        </div>
        <hr />
        <div className={styles.download}>
          <h3>Download</h3>
          <ul className={styles.platforms}>
            <li className={styles.platform}>
              <h5>Windows</h5>
              <button onClick={onClickDownloadWin}>
                Download (.exe)
              </button>
            </li>
            <li className={styles.platform}>
              <h5>Mac</h5>
              <button onClick={onClickDownloadMac}>
                Download (.dmg)
              </button>
            </li>
            <li className={styles.platform}>
              <h5>Linux</h5>
              <button onClick={onClickDownloadLinux}>
                Download (.AppImage)
              </button>
            </li>
          </ul>
          <aside className={styles.notice}>
            <h3>System Requirements</h3>
            <p>Windows® 10 or newer (64-bit)</p>
            <p>Debian 8, Ubuntu 18.04, CentOS 7, Fedora 27, or newer (64-bit)</p>
            <p>macOS Big Sur 11.1 or newer</p>
            <p>Processor: Intel® Core™ i5 2.4GHz or higher</p>
            <p>Memory: 16GB RAM</p>
            <p>Graphics: NVIDIA® Geforce® GTX970, AMD Radeon™ RX 480, or better</p>
            <p>Storage: SSD with 5 GB available space</p>
            <p>Internet: Broadband Connection</p>
            <p style={{ fontSize: ".9em" }}>* Low graphics settings, 30fps</p>
            <p style={{ fontSize: ".9em" }}>** Shadowvane will attempt to run on hardware below minimum specifications, but in such cases the game experience may be significantly diminished</p>
          </aside>
        </div>
        <button onClick={() => setIsOverlayShown(false)} className={styles.close}>
          Close
        </button>
      </aside>
      <header className={styles.hero}>
        <section className={[styles.container, styles.cta].join(' ')}>
          <h2>Shadowvane</h2>
          <button className={styles.play} onClick={onClickPlay}>
            Play
          </button>
        </section>
        <div className={styles.video}>
          <video
            poster="/img/shadowvane-background.jpg"
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="https://www.exactchange.network/media/into-the-mists.mp4" type="video/mp4" />
          </video>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.info}>
          <h3>Soulslike MMO</h3>
          <p>Shadowvane is a Soulslike MMORPG with a 1v1 PvP Arena, 5v5 Battleground, and an Open World realm where players can interact and advance their character.</p>
        </div>
        <div className={styles.product}>
          <Image
            alt="Shadowvane"
            src="/img/screenshots/shadowvane-pve.png"
            width={640}
            height={360}
            unoptimized
          />
        </div>
        <div className={styles.product}>
          <Image
            alt="Shadowvane"
            src="/img/screenshots/the-mists-victory.png"
            width={640}
            height={360}
            unoptimized
          />
        </div>
        <div className={styles.info}>
          <h3>To Hell and Back</h3>
          <p>Players can compete in either a 5v5 PvP match in a hellish city called Pandemonium, or a 1v1 PvP arena in The Mists.</p>
          <p>PvE objectives are completed in Afterworld &mdash; an open world realm where players and demons alike roam free.</p>
        </div>
      </main>
      <section className={[styles.container, styles.features].join(' ')}>
        <div>
          <h4>Character Prototypes</h4>
          <p>Build your character from a player template called a prototype. Unlock new prototypes in Afterworld to experience different play styles.</p>
        </div>
        <div id="character-select" className={styles.characters}>
          <ul>
            <li>
              <Image
                alt="A knight in Shadowvane"
                src="/img/knight-avatar.png"
                width={80}
                height={80}
              />
              <h3>Knight</h3>
            </li>
            <li title="Coming soon">
              <Image
                alt="A huntress in Shadowvane"
                src="/img/huntress-avatar.png"
                width={80}
                height={80}
              />
              <h3><span className={styles.lock} title="Coming soon" />Huntress</h3>
            </li>
            <li title="Coming soon">
              <Image
                alt="A necromancer in Shadowvane"
                src="/img/necromancer-avatar.png"
                width={80}
                height={80}
              />
              <h3><span className={styles.lock} title="Coming soon" />Necromancer</h3>
            </li>
            <li title="Coming soon">
              <Image
                alt="A priest in Shadowvane"
                src="/img/priest-avatar.png"
                width={80}
                height={80}
              />
              <h3><span className={styles.lock} title="Coming soon" />Priest</h3>
            </li>
          </ul>
          <div id="character-preview" className={styles.knight}>
            <Image
              alt="A knight in Shadowvane"
              src="/img/preview-knight.png"
              width={320}
              height={320}
              unoptimized
            />
            <ul id="character-abilities" className={styles.abilities}>
              <li>
                <Image
                  alt="Lich Blade"
                  title="Lich Blade"
                  src="/img/lich-blade-icon.png"
                  width={40}
                  height={40}
                />
              </li>
              <li>
                <Image
                  alt="Cross Bolt"
                  title="Cross Bolt"
                  src="/img/cross-bolt-icon.png"
                  width={40}
                  height={40}
                />
              </li>
              <li>
                <Image
                  alt="Soul Barrier"
                  title="Soul Barrier"
                  src="/img/soul-barrier-icon.png"
                  width={40}
                  height={40}
                />
              </li>
              <li>
                <Image
                  alt="Death Sentence"
                  title="Death Sentence"
                  src="/img/death-sentence-icon.png"
                  width={40}
                  height={40}
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={[styles.container, styles.features].join(' ')}>
        <h4>Game Features</h4>
        <ul>
          <li className={styles.feature} title="The Mists (PvP)">
            <Image
              alt="The Mists (PvP)"
              title="The Mists (PvP)"
              src="/img/pvp-avatar.png"
              width={80}
              height={80}
            />
            <h3>Arena<br />(PvP)</h3>
          </li>
          <li className={styles.feature} title="Pandemonium (PvP)">
            <Image
              alt="Pandemonium (PvP)"
              title="Pandemonium (PvP)"
              src="/img/dungeons-avatar.png"
              width={80}
              height={80}
            />
            <h3>Battlegrounds<br />(PvP)</h3>
          </li>
          <li className={styles.feature}>
            <Image
              alt="Afterworld (Open World)"
              src="/img/openworld-avatar.png"
              width={80}
              height={80}
            />
            <h3>Afterworld<br />(Open World)</h3>
          </li>
        </ul>
      </section>
      <section className={[styles.container, styles.media].join(' ')}>
        <h4>Screenshots</h4>
        <div className={styles.screenshots}>
          {SCREENSHOTS.map(src => (
            <div key={src} className={styles.screenshot}>
              <Image
                alt="Shadowvane screenshot"
                src={`/img/screenshots/${src}`}
                width={880}
                height={496}
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>
      <footer className={styles.footer}>
        <h4>Gameplay Video</h4>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/85uYYHmn1ns"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
          style={{ maxWidth: '90vw', margin: '0 auto' }}
        />
        <button className={styles.play} onClick={onClickPlay}>
          Play
        </button>
      </footer>
      <div className={styles.subfooter}>
        <Link href="mailto:hello@bennyschmidt.com" target="_blank">
          <Image
            alt="Email the developer"
            src="/img/envelope.png"
            width={17}
            height={17}
            style={{ display: 'block', opacity: .25, margin: '0 .5rem' }}
          />
        </Link>
        <Link href="https://discord.gg/S7zh2ekg" target="_blank">
          <Image
            alt="Shadowvane on Discord"
            src="/img/discord.png"
            width={20}
            height={15}
            style={{ display: 'block', opacity: .25, margin: '0 .5rem' }}
          />
        </Link>
        <Link href="https://www.indiedb.com/games/shadowvane" target="_blank">
          <Image
            alt="Shadowvane on IndieDB"
            src="/img/indiedb.png"
            width={64}
            height={30}
            style={{ display: 'block', opacity: .25, margin: '0 .5rem' }}
          />
        </Link>
      </div>
    </>
  );
}
