import styles from "../page.module.css";
import { Judson } from "next/font/google";
const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"], // or choose the weights you need
  display: "swap",
});
export default function About() {
  return (
    <div className={`${judson.className} ${styles.page}`}>
      <div className={styles.aboutBanner}>
        <img src="/aboutCpd1.jpg" />
      </div>
      <div className={styles.aboutSchool}>
        <div className={styles.aboutHow}>
          <div className={styles.aboutHowTitle}>HOW ALQALAM STARTED?</div>
          <div>
            Al-Qalam Pre-Primary,Primary and Middle Level School P.L.C. was born
            from a dream — a dream to provide children with an education that
            shapes both the mind and the heart. Founded by Ustaz Bedru Nuru,
            Alqalam began as a small learning center built on strong values of
            faith, discipline, and community service. From the very start, the
            goal was clear: to nurture a generation grounded in Islamic
            principles, equipped with academic excellence, and prepared to make
            a positive difference in the world. In its early days, Alqalam
            started with a few classrooms, dedicated teachers, and parents who
            believed in the vision. Despite limited resources, the school was
            rich in purpose, passion, and prayer. Every lesson taught, every
            activity planned, and every value instilled carried the spirit of
            sincerity and commitment to raising children who not only excel in
            their studies but also embody good manners, respect, and compassion.
            Over time, Alqalam grew steadily — expanding its facilities,
            enhancing its curriculum, and welcoming more students into its
            family. The journey was not without challenges, but through hard
            work, unity, and unwavering faith, the school continued to progress
            and gain the trust of the community. Today, Al-Qalam
            Pre-Primary,Primary and Middle Level School P.L.C. stands as a
            symbol of dedication and growth. It is more than just a place of
            learning — it is a home where knowledge meets character, where
            teachers inspire, and where students are guided to become the best
            versions of themselves. With gratitude to Allah and the continued
            support of parents, teachers, and the community, Alqalam remains
            committed to shaping the future, one child at a time.
          </div>
        </div>
        <div className={styles.aboutVision}>
          <div className={styles.aboutVisionTitle}>ራዕይ</div>
          <div>በእውቀትና በሥነምግባር የበለፀጉ፣ በዓለም ደረጃ ተወዳዳሪ ተማሪዎችን የሚያፈራ ተቋም መሆን</div>
        </div>
        <div className={styles.aboutMission}>
          <div className={styles.aboutMissionTitle}>ተልዕኮ</div>
          <div>
            ደህንነቱ የተጠበቀና ምቹ አካባቢ በማቅረብ ተማሪዎችን በእውቀት፣ በክህሎትና በእሴት በማጎልበት በማህበረሰብ
            ውስጥ አዎንታዊ ተፅዕኖ እንዲፈጥሩ ማብቃት
          </div>
        </div>

        <div className={styles.aboutGoal}>
          <div className={styles.aboutGoalTitle}>እሴቶች</div>
          <ul>
            <li>
              <strong>ሞያዊነት:</strong>
              የመማር ማስተማርና የተማሪዎች ባህሪይ የጥራት ስታንዳርዱን እንጠብቃለን።
            </li>
            <li>
              <strong>ታማኝነት: </strong>
              በትምህርት ባለድርሻ አካላት መካከል ታማኝነትን እንገነባለን።
            </li>
            <li>
              <strong>ኃላፊነት: </strong>
              ተግባራችንን በሙሉ ኃላፊነትና በጥንቃቄ እንወጣለን።
            </li>
            <li>
              <strong>ተነሳሽነት: </strong>
              ችግሮችን ለመፍታት ፈጠራን፣አዳዲስ ሃሳቦችንና ተነሳሽነትን እናበረታታለን።
            </li>
            <li>
              <strong>ትብብር: </strong>
              በአክብሮትና በአንድነት አብረን በመስራት የጋራ ግባችንን እውን እናደርጋለን።
            </li>
            <li>
              <strong>አገልጋይነት: </strong>
              በትህትና በቀናነትና በቁርጠኝነት ለማህበረሰቡ በጎውን እናደርጋለን።{" "}
            </li>
            <li>
              <strong>ትህትና: </strong>
              ለሁሉም በቃልና በተግባር አክብሮትንና ትህትናን እናሳያለን።{" "}
            </li>
            <li>
              <strong>ፍትሃዊነት: </strong>
              ሁሉንም በእኩልነትና በፍትሃዊነት እናስተናግዳለን።
            </li>
            <li>
              <strong>ቻይነት: </strong>
              በመማር ማስተማሩ ሂደት እርጋታን፣ትዕግስትንና ጽናትን ተላብሰን ግባችንን እናሳካለን።
            </li>
            <li>
              <strong>ልህቀት: </strong>
              በትምህርት፣በባህሪይና በአገልግሎት የልህቀት ደረጃን ለማሳካት እንተጋለን።
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.aboutRules}>
        <div
          style={{ fontSize: "30px", color: "black", padding: "0px 30px 30px" }}
        >
          RULES & REGULATIONS
        </div>
        <ol>
          <li>
            Punctuality – Students must arrive on time and attend all classes
            regularly.
          </li>
          <li>
            Uniform – Proper school uniform must be worn neatly every day.
          </li>
          <li>
            Respect – Students should show respect to teachers, staff,
            classmates, and school property.
          </li>
          <li>
            Attendance – Absence must be supported by a written note or
            explanation from parents.
          </li>
          <li>
            Cleanliness – Students must keep classrooms, school grounds, and
            personal belongings clean and tidy.
          </li>
          <li>
            Conduct – Misbehavior, bullying, or the use of foul language is
            strictly prohibited.
          </li>
          <li>
            Learning Materials – Students must bring all required books and
            materials to class.
          </li>
          <li>
            Electronics – Mobile phones and gadgets are not allowed unless
            permitted for educational purposes
          </li>
          <li>
            Prayer and Manners – Students must observe Islamic manners, prayer
            times, and school ethics at all times.
          </li>
          <li>
            Parental Cooperation – Parents are encouraged to stay involved in
            their child’s learning and follow school communications regularly.
          </li>
        </ol>
      </div>
      <div className={styles.aboutCpd}>
        <div
          style={{ fontSize: "30px", color: "black", padding: "0px 30px 30px" }}
        >
          COMPOUND & FACILITIES
        </div>
        <div className={styles.aboutCpdImgs}>
          <img src="/homeBanner.jpg" />
          <img src="/aboutCpd1.jpg" />
          <img src="/aboutCpd2.jpg" />
          <img src="/aboutCpd3.jpg" />
          <img src="/aboutCpd4.jpg" />
          <img src="/aboutCpd5.jpg" />
          <img src="/aboutCpd6.jpg" />
        </div>
      </div>
      <div className={styles.aboutStaff}>
        <div
          style={{ fontSize: "30px", color: "black", padding: "0px 30px 30px" }}
        >
          STAFF MEMBERS
        </div>
        <div className={styles.aboutStaffMembers}>
          <div className={styles.aboutEachStaff}>
            <img src="/CEO.jpg" />
            <div>Mr. Some Body</div>
            <div>SCHOOL MANAGER</div>
          </div>
          <div className={styles.aboutEachStaff}>
            <img src="/CEO1.jpg" />
            <div>Mr. Some Body</div>
            <div>KG PRINCIPAL</div>
          </div>
          <div className={styles.aboutEachStaff}>
            <img src="/CEO1.jpg" />
            <div>Mrs. Some Body</div>
            <div>CSHIER</div>
          </div>
          <div className={styles.aboutEachStaff}>
            <img src="/CEO.jpg" />
            <div>Mr. Some Body</div>
            <div>SUPERVISOR</div>
          </div>
          <div className={styles.aboutEachStaff}>
            <img src="/CEO.jpg" />
            <div>Mr. Some Body</div>
            <div>SUPERVISOR</div>
          </div>
          <div className={styles.aboutEachStaff}>
            <img src="/CEO1.jpg" />
            <div>Mr. Some Body</div>
            <div>SURERVISOE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
