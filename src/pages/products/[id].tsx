import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Stripe from 'stripe'

import strapiConfig from '../../../configs/stripe'
import CheckoutButton from '../../components/CheckoutButton'
import { Header } from '../../components/Header'

import styles from './styles.module.scss'

type Props = {
    price: string,
    priceId: string;
    image: string,
    update: number,
    description: string,
    name: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    const stripe = new Stripe(strapiConfig.secret_key, {
        apiVersion: '2020-08-27',
    });

    const products = await stripe.products.list()

    console.log(products.data)

    const paths = products.data.map(p => ({
        params: {
            id: p.id
        }
    }))
    
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const stripe = new Stripe(strapiConfig.secret_key, {
        apiVersion: '2020-08-27',
    });

    const products = await stripe.products.retrieve(params.id as string)

    return {
        props: {
            price: products.metadata.price,
            priceId: products.metadata.priceId,
            image: products.images,
            update: products.updated,
            description: products.description,
            name: products.name,
        },
    }
}

export default function Product ({price, priceId, image, update, description, name}: Props){

    return(
        <>
            <Header />
            <Head>
                <title>XCommerce | {name}</title>
            </Head>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>Detalhes do produto</h2>
                        <span className={styles.bar}></span>
                    </div>
                    <div className={styles.contentContainer}>
                        <img src={image} alt="Imagem do produto"/>
                        <span>
                            <h2>Nome</h2>
                            <strong>{name}</strong>
                        </span>
                        <span>
                            <h2>Código de upload</h2>
                            <strong>{update}</strong>
                        </span>
                        <span>
                            <h2>Descrição</h2>
                            <p>{description}</p>
                        </span>
                    </div>
                    <div className={styles.priceAndBuy}>
                        <span>
                            <h2>Preço</h2>
                            <strong>{price}</strong>
                        </span>
                        <span>
                            <h2>Finalizar compra</h2>
                            <span className={styles.inputGroup}>
                                <CheckoutButton id={priceId} itemName={name}/>
                            </span>
                        </span>
                        <span>
                            <h2>Voltar para loja</h2>
                            <Link href={`/Home`}>
                                <span className={styles.inputGroup}>
                                    <button>Voltar</button>
                                </span>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )

}