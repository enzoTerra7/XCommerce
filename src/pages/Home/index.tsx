import Head from 'next/head';
import { Header } from '../../components/Header';

import styles from './style.module.scss'

import { GetStaticProps } from 'next'
import Stripe from 'stripe'

import strapiConfig from '../../../configs/stripe'
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async () => {
    const stripe = new Stripe(strapiConfig.secret_key, {
        apiVersion: '2020-08-27',
    });

    const products = await stripe.products.list()
    
    return {
        props: {
          products: products.data
        }
    }
}


export default function Home ({products}) {

    const letestProduct = products.slice(0, 2)

    const otherProducts = products.slice(2)

    
    return (
        <>
        <Header />
        <div className={styles.mainContainer}>
            <Head>
                <title>XCommerce | Home</title>
            </Head>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>Ultimos lançamentos</h2>
                    <span className={styles.bar}></span>
                    <div className={styles.card}>
                        {letestProduct.map( (p) => (
                            <div key={p.id} className={styles.cardContainer}>
                                <span className={styles.imgBook}>
                                    <img src={p.images} alt=""/>
                                </span>
                                <Link href={`/products/${p.id}`}>
                                    <p>
                                        {p.name} <br/>
                                        <small>{p.description}</small>
                                    </p>
                                </Link>
                                <strong>{p.metadata.price}</strong>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.title}>
                    <h2>Todos os lançamentos</h2>
                    <span className={styles.bar}></span>
                    <span className={styles.allProducts}>
                        <div className={styles.card}>
                            {otherProducts.map( (p) => (
                                <div key={p.id} className={styles.cardContainer} style={{marginBottom: '2rem'}}>
                                    <span className={styles.imgBook}>
                                        <img src={p.images} alt=""/>
                                    </span>
                                    <Link href={`/products/${p.id}`}>
                                        <p>
                                            {p.name} <br/>
                                            <small>{p.description}</small>
                                        </p>
                                    </Link>
                                    <strong>{p.metadata.price}</strong>
                                </div>
                            ))}
                        </div>
                    </span>
                </div>
            </div>
        </div>
        </>
    )
}