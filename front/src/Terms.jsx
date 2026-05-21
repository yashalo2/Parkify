import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Shared.css";
import styles from "./Terms.module.css";
export default function TermsPrivacy() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <MdArrowBack color="red" size={30} />
      </div>
      <h1>Terms & Privacy</h1>

      <section className="card">
        <h2>Terms of Service</h2>
        <p>
          Users must follow booking policies and respect parking rules.
          Administrators commit to maintaining accurate data and fair access.
        </p>
      </section>

      <section className="card">
        <h2>Privacy Policy</h2>
        <p>
          We handle your data securely, with transparency and consent. Your
          information is never sold to third parties and is always protected.
        </p>
      </section>
      <section className="card">
        <h2>User Rights</h2>
        <p>
          You can request access, or correction of your data at any time.
          Parkify puts you in control of your information.
        </p>
      </section>
      <div className="footer">
        <div className="TermsLogo"></div>
        <div className="moreInfo">
          <div className={styles.blueDivContent}>
            <div className={`${styles.footerColumn} ${styles.brandInfo}`}>
              <h3>Smart Parking Made Easy.</h3>
              <p>
                Find, book, and pay for parking in seconds. Saving you time and
                fuel everyday.
              </p>
            </div>

            <div className={`${styles.footerColumn} ${styles.links}`}>
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#how-it-works">How it Works</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="/contact">contact</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
            </div>

            <div className={`${styles.footerColumn} ${styles.downloadApps}`}>
              <h4>Get the App</h4>
              <div className={styles.appButtons}>
                <a href="#" rel="noopener noreferrer" className={styles.appBtn}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94 1.07.08 2.16-.52 2.82-1.33z" />
                  </svg>
                  <span>App Store</span>
                </a>

                <a href="#" rel="noopener noreferrer" className={styles.appBtn}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5.25 3.06c-.1.1-.17.26-.17.47v16.94c0 .21.07.37.17.47l.05.05 9.53-9.53v-.2L5.3 3.01l-.05.05zm12.9 6.13l-3.02-1.72-2.92 2.92 2.92 2.92 3.02-1.72c.86-.49.86-1.3 0-1.8m-6.42.2l-2.42-2.42-4.01 4.01c.32.34.89.38 1.54.01l4.89-2.79-.01.19zm0-1.58l4.89 2.78c.65.37 1.22.33 1.54-.01l-4.01-4.01-2.42 2.41z" />
                  </svg>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
