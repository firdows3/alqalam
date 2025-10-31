"use client";
import Link from "next/link";
import "./styles/header.css";
import { Judson } from "next/font/google";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"], // or choose the weights you need
  display: "swap",
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();

        if (data.authenticated) {
          setUser(data.username);
          setRole(data.role);
        } else {
          setUser("");
          setRole("");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser("");
        setRole("");
      }
    };

    fetchUser();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
      setOpenLogout(false);
      setUser("");
      setRole("");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className={`${judson.className} header`}>
      <Link href="/" className="header-logo">
        <img src="/logo.jpg" />
      </Link>
      <div className={menuOpen ? " header-middle visible" : "header-middle"}>
        <Link
          style={{
            color: pathname === "/" ? "#000" : "",
            borderBottom: pathname === "/" ? ".5px solid #000" : "",
          }}
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          style={{
            color: pathname === "/about" ? "#000" : "",
            borderBottom: pathname === "/about" ? ".5px solid #000" : "",
          }}
          href="/about"
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          style={{
            color: pathname === "/contacts" ? "#000" : "",
            borderBottom: pathname === "/contacts" ? ".5px solid #000" : "",
          }}
          href="/contacts"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
        {role === "admin" && (
          <Link
            style={{
              color: pathname === "/adminDashboard" ? "#000" : "",
              borderBottom:
                pathname === "/adminDashboard" ? ".5px solid #000" : "",
            }}
            href="/adminDashboard"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        )}
        {menuOpen && (
          <div>
            {user ? (
              <Link href="/profile">
                <FaUserCircle style={{ fontSize: 35, color: "#605e5e" }} />
              </Link>
            ) : (
              <div
                className="visible-header-right"
                style={{ cursor: "pointer" }}
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/login">Login</Link>
              </div>
            )}
          </div>
        )}
      </div>
      {user ? (
        <Link href="/profile">
          <FaUserCircle style={{ fontSize: 35, color: "#605e5e" }} />
        </Link>
      ) : (
        <div className="header-right" style={{ cursor: "pointer" }}>
          <Link href="/login">Login</Link>
        </div>
      )}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>
    </div>
  );
}
