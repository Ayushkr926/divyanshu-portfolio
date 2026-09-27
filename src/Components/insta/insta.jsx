import { useState } from "react";
import styles from "./insta.module.css";

function Insta() {
  const [copied, setCopied] = useState(false);

  const copyHandle = async () => {
    try {
      await navigator.clipboard.writeText("divyanshucreates");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className={styles.container}>
      <div className={styles.footerTop}>
        <p className={styles.eyebrow}>GET IN TOUCH</p>
        <p className={styles.invitation}>Have a story worth telling?</p>
      </div>

      <div className={styles.contactRow}>
        <a
          className={styles.handle}
          href="https://www.instagram.com/divyanshucreates/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Divyanshu Creates on Instagram"
        >
          DIVYANSHUCREATES <span aria-hidden="true">↗</span>
        </a>
        <button className={styles.copyButton} type="button" onClick={copyHandle}>
          {copied ? "COPIED" : "COPY HANDLE"}
        </button>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} DIVYANSHU RAI</p>
        <nav className={styles.socialLinks} aria-label="Social links">
          <a href="https://www.instagram.com/divyanshucreates/" target="_blank" rel="noopener noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <a href="https://x.com/divyanshucreats" target="_blank" rel="noopener noreferrer">
            X <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <p className={styles.credits}>
          Design &amp; Dev by <strong>Ayush Tiwari</strong> and <strong>Divyanshu Rai</strong>
        </p>
      </div>
    </footer>
  );
}

export default Insta;
