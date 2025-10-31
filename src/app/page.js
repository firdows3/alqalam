"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { PiStudentBold } from "react-icons/pi"; // Students (phosphor icons)
import { MdOutlineSchool } from "react-icons/md"; // Teachers
import { HiOutlineBadgeCheck } from "react-icons/hi"; // Certificates
import { FaAngleRight, FaChalkboardTeacher } from "react-icons/fa";
import { Judson } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"], // or choose the weights you need
  display: "swap",
});
const faqs = [
  {
    question: "What makes Alqalam a special place for young learners?",
    answer:
      "Alqalam is more than just a school — it’s a community that fosters curiosity, kindness, and confidence in every child. We provide a safe, inclusive, and faith-based environment where students are encouraged to explore, ask questions, and discover their unique talents through both academic and creative learning experiences.",
  },
  {
    question: "What values guide education at Alqalam?",
    answer:
      "Our education is rooted in Islamic principles, emphasizing honesty, respect, compassion, discipline, and a love for learning. We believe that true education shapes both the mind and the heart, helping students grow into morally upright, responsible, and confident individuals.",
  },
  {
    question:
      "What subjects and activities are students engaged in at Alqalam?",
    answer:
      "Students at Alqalam enjoy a rich curriculum that includes core subjects such as Mathematics, English, Science, and Social Studies, along with Islamic Studies, Arabic, and Qur’an lessons. They also take part in creative arts, sports, and hands-on activities that strengthen teamwork, problem-solving, and self-expression.",
  },
  {
    question: "What support do teachers provide to help students grow?",
    answer:
      "Our teachers are dedicated mentors who nurture each child’s intellectual, emotional, and spiritual growth. They provide personalized attention, use engaging teaching methods, and create a warm, caring classroom atmosphere that builds confidence and encourages lifelong learning.",
  },
  {
    question: "What kind of learning environment does Alqalam offer?",
    answer:
      "Alqalam offers a joyful, well-structured, and stimulating learning environment where students feel safe, respected, and motivated to learn. Our classrooms are spaces of discovery and creativity, blending modern teaching techniques with moral and spiritual development.",
  },
  {
    question: "What vision does Alqalam have for its students’ future?",
    answer:
      "Alqalam envisions raising a generation of well-rounded, knowledgeable, and ethical individuals who embody Islamic values and contribute positively to society. We aim to prepare our students not only for academic success but also to become compassionate leaders and responsible global citizens.",
  },
];
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className={`${judson.className} ${styles.page}`}>
      <div className={styles.banner}>
        <img src="/homeBanner.jpg" />
        <div className={styles.homeAchievmentsBoxes}>
          <div className={styles.homeAcievmentsEachBox}>
            <div>
              <PiStudentBold style={{ width: 50, height: 50 }} />
            </div>
            <div
              style={{
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              <div>1K +</div>
              <div>STUDENTS</div>
            </div>
          </div>
          <div className={styles.homeAcievmentsEachBox}>
            <div>
              <FaChalkboardTeacher style={{ width: 50, height: 50 }} />
            </div>
            <div
              style={{
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              <div>100 +</div>
              <div>STAFF MEMBERS</div>
            </div>
          </div>
          <div className={styles.homeAcievmentsEachBox}>
            <div>
              <HiOutlineBadgeCheck style={{ width: 50, height: 50 }} />
            </div>
            <div
              style={{
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              <div>50 +</div>
              <div>CERTIFICATES</div>
            </div>
          </div>
          <div className={styles.homeAcievmentsEachBox}>
            <div>
              <PiStudentBold style={{ width: 50, height: 50 }} />
            </div>
            <div
              style={{
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              <div>1K +</div>
              <div>STUDENTS</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeAbout}>
        <div className={styles.homeAboutLeft}>
          <div>
            <img src="/homwAbout1.jpg" />
            <img src="/homwAbout2.jpg" />
          </div>
          <img src="/homeAbout3.jpg" />
        </div>
        <div className={styles.homeAboutRight}>
          <div className={styles.homeAboutTitle}>
            ALQALAM KINDERGARTEN AND PRIMARY SCHOOL
          </div>
          <div className={styles.homeAboutDesc}>
            At Alqalam Kindergarten and Primary School, we are dedicated to
            shaping young minds through a balanced blend of academic excellence,
            moral guidance, and spiritual development. Our mission is to provide
            a nurturing environment where every child feels valued, supported,
            and inspired to reach their full potential. With a team of
            passionate and caring teachers, we create joyful learning
            experiences that encourage curiosity, creativity, and critical
            thinking. Beyond academics, we instill strong ethical and spiritual
            values that guide our students to become responsible, confident, and
            compassionate individuals.
          </div>
          <Link href="/about" className={styles.homeBtn}>
            ABOUT US
          </Link>
        </div>
      </div>

      <div className={styles.homeFaq}>
        <div
          style={{ fontSize: "30px", color: "black", padding: "0px 30px 30px" }}
        >
          WHY ALQALAM?
        </div>
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.faqQuestion} onClick={() => toggle(index)}>
                <p>{faq.question}</p>
                <FaAngleRight
                  className={`${styles.arrowIcon} ${
                    activeIndex === index ? styles.rotate : ""
                  }`}
                />
              </div>
              <div
                className={`${styles.faqAnswer} ${
                  activeIndex === index ? styles.show : styles.hide
                }`}
              >
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    margin: "5px 2px",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
              <div className={styles.faq_underline}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
