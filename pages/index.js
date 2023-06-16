import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

const OPERATING_SYSTEMS = {
  "Windows NT 10.0": "Windows 10",
  "Windows NT 6.3": "Windows 8.1",
  "Windows NT 6.2": "Windows 8",
  "Windows NT 6.1": "Windows 7",
  "Windows NT 6.0": "Windows Vista",
  "Windows NT 5.1": "Windows XP",
  "Windows NT 5.0": "Windows 2000",
  "Mac": "macOS",
  "X11": "UNIX",
  "Linux": "Linux"
};

export default function Home ({
  handleAPIResponse,
  showNotification
}) {
  const [OSName, setOSName] = useState();

  useEffect(() => {
    for (const userAgent of Object.keys(OPERATING_SYSTEMS)) {
      const OS = OPERATING_SYSTEMS[userAgent];

      if (window.navigator.userAgent.includes(userAgent)) {
        setOSName(OS);
      }
    }
  }, []);

  return (
    <>
      <header className={styles.hero}>
        <section className={[styles.container, styles.cta].join(' ')}>
          <h2>Shadowvane</h2>
          <button className={styles.play} title="Coming soon">
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
            <source src="https://www.exactchange.network/media/shadowvane.mp4" type="video/mp4" />
          </video>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.info}>
          <h3>Free to Play</h3>
          <p>Shadowvane is a free-to-play online arena with MMO elements. Compete against other players in real-time PvP and complete PvE objectives in the open world.</p>
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
            src="/img/screenshots/shadowvane-pandemonium-bridge.png"
            width={640}
            height={360}
            unoptimized
          />
        </div>
        <div className={styles.info}>
          <h3>Through Hell and Back</h3>
          <p>Players begin by competing in either 5v5 or 1v1 PvP matches in a hellish city called Pandemonium.</p>
          <p>PvE objectives are completed in Afterworld &mdash; an open world realm where players and demons alike roam free.</p>
        </div>
      </main>
      <section className={[styles.container, styles.features].join(' ')}>
        <div>
          <h4>Character Prototypes</h4>
          <p>Build your character from a PvP player template. As you gain experience and levels, you can customize the look, feel, and even class behavior of your character by unlocking traits, appearances, and abilities.</p>
        </div>
        <div id="character-select" className={styles.characters}>
          <ul>
            <li>
              <Image
                alt="A knight in Shadowvane"
                src="/img/knight-avatar.png"
                width={80}
                height={80}
                unoptimized
              />
              <h3>Knight</h3>
            </li>
            <li>
              <Image
                alt="An unknown character in Shadowvane"
                src="/img/blank-avatar.png"
                width={80}
                height={80}
                unoptimized
              />
              <h3>???</h3>
            </li>
            <li>
              <Image
                alt="An unknown character in Shadowvane"
                src="/img/blank-avatar.png"
                width={80}
                height={80}
                unoptimized
              />
              <h3>???</h3>
            </li>
            <li>
              <Image
                alt="An unknown character in Shadowvane"
                src="/img/blank-avatar.png"
                width={80}
                height={80}
                unoptimized
              />
              <h3>???</h3>
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
                  alt="Death Strike"
                  title="Death Strike"
                  src="/img/death-strike-icon.png"
                  width={40}
                  height={40}
                  unoptimized
                />
              </li>
              <li>
                <Image
                  alt="Cross Bolt"
                  title="Cross Bolt"
                  src="/img/cross-bolt-icon.png"
                  width={40}
                  height={40}
                  unoptimized
                />
              </li>
              <li>
                <Image
                  alt="Infinity Slice"
                  title="Infinity Slice"
                  src="/img/infinity-slice-icon.png"
                  width={40}
                  height={40}
                  unoptimized
                />
              </li>
              <li>
                <Image
                  alt="Death Sentence"
                  title="Death Sentence"
                  src="/img/death-sentence-icon.png"
                  width={40}
                  height={40}
                  unoptimized
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={[styles.container, styles.features].join(' ')}>
        <h4>Game Features</h4>
        <ul>
          <li className={styles.feature}>
            <Image
              alt="Pandemonium (PvP)"
              title="Pandemonium (PvP)"
              src="/img/pvp-avatar.png"
              width={80}
              height={80}
              unoptimized
            />
            <h3>Pandemonium<br />(PvP)</h3>
          </li>
          <li className={styles.feature}>
            <Image
              alt="Afterworld (Open World)"
              title="Afterworld (Open World)"
              src="/img/openworld-avatar.png"
              width={80}
              height={80}
              unoptimized
            />
            <h3>Afterworld<br />(Open World)</h3>
          </li>
          <li className={styles.feature}>
            <Image
              alt="Dungeons (PvE)"
              title="Dungeons (PvE)"
              src="/img/dungeons-avatar.png"
              width={80}
              height={80}
              unoptimized
            />
            <h3>Dungeons<br />(PvE)</h3>
          </li>
        </ul>
      </section>
      <section className={[styles.container, styles.media].join(' ')}>
        <h4>Media</h4>
        <div className={styles.screenshots}>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-bloodfiend-0.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-bloodfiend-1.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-bloodfiend-2.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-bloodvane.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-candle.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-candles.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-countdown.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-death.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-docks.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-grass.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-jump.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-0.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-1.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-2.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-4.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-5.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-6.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-7.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-8.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pandemonium-bridge.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pve.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-pvp.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-ranged-attack.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-shadowfiend.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-sword.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-target.png"
              width={880}
              height={496}
            />
          </div>
          <div className={styles.screenshot}>
            <Image
              alt="Shadowvane screenshot"
              src="/img/screenshots/shadowvane-victory.png"
              width={880}
              height={496}
            />
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <h3>Pandemonium awaits</h3>
        <p>Shadowvane is currently in OPEN ALPHA. You can queue up for matches in Pandemonium (PvP) for now. It is free to play!</p>
        <button className={styles.play} title="Coming soon">
          Play
        </button>
      </footer>
    </>
  );
}
