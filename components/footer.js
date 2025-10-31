import Link from "next/link";
import "./styles/footer.css";
import {
  FaInstagram,
  FaTelegramPlane,
  FaFacebookF,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";

import { Judson } from "next/font/google";
const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"], // or choose the weights you need
  display: "swap",
});

export default function Footer() {
  return (
    <div className={`${judson.className} footer`}>
      <div className="footer-top">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0404138030876!2d38.703903074499124!3d9.060078288502783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8967b39b7561%3A0x1a92df229fa98785!2sAl-qalam%20school!5e0!3m2!1sen!2set!4v1761294787067!5m2!1sen!2set"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="footer-middle">
        <div className="footer-middle-left">
          <img src="/logo.png" />
          <Link className="footer-link" href="/">
            Privacy and Policy
          </Link>
          <Link className="footer-link" href="/">
            Terms of Service
          </Link>
        </div>
        <div className="footer-middle-icons">
          <a href="https://telegram.org" target="_blank">
            <FaTelegramPlane />
          </a>
          <a href="https://instagram.com" target="_blank">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank">
            <FaFacebookF />
          </a>
          <a href="https://www.tiktok.com" target="_blank">
            <FaTiktok />
          </a>
          <a href="https://linkedin.com" target="_blank">
            <FaLinkedinIn />
          </a>
        </div>
        <div className="footer-middle-right">
          <div>alqalam@gmail.com</div>
          <div>+251-99-999-9999</div>
          <div>+251-99-999-9999</div>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: 20 }}>
        copyright &copy; Alqalam kindergarten and primary school | All rights
        reserved.
      </div>
    </div>
  );
}
