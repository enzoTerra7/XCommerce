import styles from '../styles/home.module.scss'
import { signIn, SignInResponse, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

import Head from 'next/head'

export default function Home() {

  const [ session, loading ] = useSession()

  return (
    <>
      <Head>
        <title>XCommerce | login </title>
      </Head>
      {!session && <>
        <div className={styles.homeContainer}>
          <div className={styles.pageLogin}>
            <h1>Faça seu log in</h1>
            <span className={styles.inputGroup}>
              <button onClick={(): Promise<SignInResponse> => signIn('auth0')}>Sign in</button>
            </span>
          </div>
        </div>
      </>}
      {session && <>
        <div className={styles.homeContainer}>
          <div className={styles.withLogin}>
            <span>
              <h2>Logado com:</h2>
              <small>{session.user.email}</small>
            </span>
            <span>
              <Link href={`/Home/`}>
                <button>Ir para loja</button>
              </Link>
            </span>
            <span>
              <button onClick={(): Promise<void> => signOut()}>Sign out</button>
            </span>
          </div>
        </div>
      </>}
    </>
  )
}

