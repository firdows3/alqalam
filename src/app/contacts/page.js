import styles from "../page.module.css";
import { Judson } from "next/font/google";
const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"], // or choose the weights you need
  display: "swap",
});
import {
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contacts() {
  return (
    <div className={`${judson.className} ${styles.page}`}>
      <div className={styles.contactBanner}>
        <img src="/contactBanner.png" />
      </div>
      <div className={styles.contactsContainer}>
        <div className={styles.contactsLeft}>
          <div
            style={{
              fontSize: "30px",
              color: "black",
              padding: "5px 0px",
            }}
          >
            GET IN TOUCH!
          </div>
          <div style={{ fontSize: "22px", color: "#605e5e" }}>
            I would like to hear from you
          </div>
          <div style={{ fontSize: "15px", color: "#626161" }}>
            If you have any inquiries, Please use the contact form!
          </div>
          <div className={styles.contactsIcons}>
            <a
              href="https://t.me/Alqalamschoolplc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane style={{ fontSize: 30 }} />
            </a>
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram style={{ fontSize: 30 }} />
            </a>
            <a href="mailto:youremail@example.com">
              <MdEmail style={{ fontSize: 30 }} />
            </a>
            <a
              href="https://www.tiktok.com/@yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok style={{ fontSize: 30 }} />
            </a>
            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF style={{ fontSize: 30 }} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn style={{ fontSize: 30 }} />
            </a>
          </div>
        </div>
        <form className={styles.contactsRight}>
          <div style={{ display: "flex", gap: 5 }}>
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
          </div>
          <input placeholder="Email" />
          <textarea placeholder="Comment" />
          <button className={styles.homeBtn}>Send</button>
        </form>
      </div>
    </div>
  );
}
