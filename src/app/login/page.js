"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { Judson } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(""); // reset error

    try {
      const res = await axios.post(
        "/api/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = res.data;

      // If backend sends an error response
      if (res.status !== 200) {
        setError(data.error || "Login failed");
        return;
      }

      // ✅ Role-based navigation
      if (data.role === "admin") {
        router.push("/adminDashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`${judson.className} ${styles.page} ${styles.loginPage}`}>
      <div className={styles.loginContainer}>
        <div className={styles.loginLeft}>
          <img src="/logo.jpg" alt="Logo" />
          <div>WELCOME TO ALQALAM KINDERGARTEN & PRIMARY SCHOOL!</div>
        </div>
        <div className={styles.divider}></div>
        <form className={styles.loginRight} onSubmit={handleLogin}>
          <div style={{ marginBottom: 8 }}>LOGIN TO YOUR ACCOUNT</div>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}

          <button className={styles.homeBtn} style={{ marginTop: 8 }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
