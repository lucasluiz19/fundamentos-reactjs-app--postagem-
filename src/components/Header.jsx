import styles from './header.module.css';
import igniteLogo from '../assets/Ignite-logo.svg';

export function Header(){
    return(
        <header className={styles.header}>
            <span>
                <img src={igniteLogo} alt="logotipo verde do ignite" />
                <p>Ignite Feed</p>
            </span>
            
           
        </header>
     
    )
}