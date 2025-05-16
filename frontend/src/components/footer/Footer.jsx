import styles from './Footer.module.css';

function Footer()  {
    return (
        <footer className={styles.footer}>
            <span>© 2025 EduMeet. All rights reserved.</span>
            <div className={styles.links}>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Help</a>
            </div>
        </footer>
    );
};

export default Footer;
