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
                <title>XCommerce | Compra falhou</title>
            </Head>
            <div className={styles.mainContainer}>
                <h1>Infelizmente ouve um problema na compra de {query.itemName ? query.itemName : 'produto'}</h1>
                <Link href={`/Home`}>
                    <button>
                        Voltar para loja
                    </button>
                </Link>
            </div>
        </>
    )
}