import Link from 'next/link'
import styles from './styles.module.scss'

export const Header = () => {
    return(
        <header className={styles.headerContainer}>
            <span className={styles.logo}>
                <Link href={`/Home/`}>
                    XCommerce
                </Link>
            </span>
            <span className={styles.nav}>
                <nav>
                    <ul>
                        <Link href={`/Home`}>
                            <li>Ver todos os produtos</li>
                        </Link>
                        <Link href={`/`}>
                            <li>Sair</li>
                        </Link>
                    </ul>
                </nav>
            </span>
        </header>
    )
}