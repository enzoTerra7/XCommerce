import Head  from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import { Header } from "../components/Header";

import styles from '../styles/successAndCancel.module.scss'

export default function Success() {

    const { query } = useRouter()

    return (
        <>
            <Header />
            <Head>
                <title>XCommerce | Parabéns pela compra!</title>
            </Head>
            <div className={styles.mainContainer}>
                <h1>Parábens por comprar {query.itemName ? query.itemName : 'produto'}</h1>
                <Link href={`/Home`}>
                    <button>
                        Voltar para loja
                    </button>
                </Link>
            </div>
        </>
    )
}