import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useKattyDefault } from "katty";
import { useRef } from 'react';
import { useWindowResize } from './useWindowSize';

export default function Home() {
  const windowSize = useWindowResize()

  return (
    <>
      <Head>
        <title>Katty - Streamer version</title>
        <meta name="description" content="Katty is a cute animal that does random things" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main key={[windowSize.height,windowSize.width].join("-")}>
        <Cat />
      </main>
    </>
  );
}

const Cat = () => {
  const platformRef = useRef<HTMLDivElement>(null);
  useKattyDefault(platformRef.current, 2);

  return (
    <div className={styles.main} ref={platformRef} />
  )
}