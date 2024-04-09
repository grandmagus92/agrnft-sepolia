import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import styles from "../styles/Home.module.css"
import Link from "next/link"
export default function Navbar(){
    const address = useAddress();
    return(
        <div className={styles.container}>
            <div className={styles.navbar}>
            <Link href="/">
                <h1 className={styles.h1}>AGR</h1>
            </Link>
            <div className={styles.navLinks}>
                {address && (
                    <Link href={`/profile/${address}`}>
                    <p>My NFT</p>
                    </Link>
                )}
            </div>
            <ConnectWallet />
            </div>
        </div>
    )
}