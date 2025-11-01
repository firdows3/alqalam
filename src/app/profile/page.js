"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { Judson } from "next/font/google";
import axios from "axios";
import { FaSearch, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function Profile() {
  const [data, setData] = useState({ teachers: [], parents: [] });
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showComm, setShowComm] = useState(false);
  const [studentId, setStudentID] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me");

        setUser(res.data.username);
        setRole(res.data.role);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser("");
        setRole("");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user");
        setData({
          teachers: res.data.teachers || [],
          parents: res.data.parents || [],
        });
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleAddClick = (id) => {
    setShowModal(true);
    setStudentID(id);
  };

  const criteriaList = [
    "Attendance",
    "Punctuality",
    "Homework",
    "Class Participation",
    "Behavior",
    "Respect",
    "Teamwork",
    "Listening Skills",
    "Neatness",
    "Attention in Class",
    "Completes Assignments",
  ];
  const [date, setDate] = useState("");
  const [homeworkSubjects, setHomeworkSubjects] = useState([]);
  const [dailyStatus, setDailyStatus] = useState([]);
  const [needExtraHelp, setNeedExtraHelp] = useState("");
  const [teacherNote, setTeacherNote] = useState("");
  const [communications, setCommunications] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const subjects = ["Math", "English", "Science", "History"];
  const statuses = ["Excellent", "Very Good", "Good", "Bad"];
  const [selectedStudentComms, setSelectedStudentComms] = useState([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const res = await axios.get("/api/communication");

        setCommunications(res.data);
      } catch (err) {
        console.error("Error fetching communications:", err);
      }
    };
    fetchCommunications();
  }, [role]);

  const parentData = data.parents.find((p) => p.username === user);
  const students = parentData?.parent?.students || [];

  const currentStudentId =
    selectedStudentId || (students.length > 0 ? students[0].id : "");

  const filteredComms = communications.filter(
    (c) => c.studentId === currentStudentId
  );
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const defaultWeek = Math.ceil(today.getDate() / 7);
  const defaultMonth = today.getMonth() + 1;
  const defaultDay = weekdays[(today.getDay() + 6) % 7]; // Monday=0
  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const filteredByDate = filteredComms.filter((c) => {
    const commDate = new Date(c.createdAt);
    const dayName = weekdays[(commDate.getDay() + 6) % 7]; // Monday=0
    const commWeek = Math.ceil(commDate.getDate() / 7);
    const commMonth = commDate.getMonth() + 1;

    return (
      dayName === selectedDay &&
      commMonth === selectedMonth &&
      commWeek === selectedWeek
    );
  });

  const handleCheckbox = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleStatusToggle = (criteria, rating) => {
    setDailyStatus((prev) => {
      const exists = prev.find(
        (s) => s.criteria === criteria && s.rating === rating
      );

      // remove if already selected
      if (exists) {
        return prev.filter(
          (s) => !(s.criteria === criteria && s.rating === rating)
        );
      }

      // ensure only one rating per criteria
      const filtered = prev.filter((s) => s.criteria !== criteria);
      return [...filtered, { criteria, rating }];
    });
  };

  const handleShowComm = (id) => {
    setStudentID(id);
    setShowComm(true);

    const studentComms = communications.filter((c) => c.studentId === id);
    setSelectedStudentComms(studentComms);
  };
  const filteredSelectedComms = selectedStudentComms.filter((c) => {
    const commDate = new Date(c.createdAt);
    const commWeek = Math.ceil(commDate.getDate() / 7);
    const commMonth = commDate.getMonth() + 1;
    const dayName = weekdays[(commDate.getDay() + 6) % 7]; // Monday=0

    return (
      dayName === selectedDay &&
      commMonth === selectedMonth &&
      commWeek === selectedWeek
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/communication", {
        studentId,
        date,
        homeworkSubjects,
        dailyStatus,
        needExtraHelp,
        teacherNote,
      });
      setShowModal(false);
      // reset fields
      setDate("");
      setHomeworkSubjects([]);
      setDailyStatus([]);
      setNeedExtraHelp("");
      setTeacherNote("");
    } catch (err) {
      console.error(err);
    }
  };

  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      router.push("/");
      setShowLogout(false);
      setUser("");
      setRole("");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div
      className={`${judson.className} ${styles.profileContainer}`}
      style={{ height: user ? "" : "50vh" }}
    >
      {user ? (
        <div
          style={{
            color: "#605e5e",
            fontSize: 30,
            display: "flex",
            gap: 15,
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3%",
          }}
        >
          <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
            <FaUserCircle style={{ fontSize: 40, color: "#605e5e" }} />
            {user + ","} {role}
          </div>
          <div>
            <button
              style={{ display: "flex", gap: 15, alignItems: "center" }}
              className={styles.addAnother}
              onClick={() => setShowLogout(true)}
            >
              <FaSignOutAlt /> LogOut{" "}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", fontSize: "30px" }}>
          There is no user
        </div>
      )}

      {/* TEACHERS TABLE */}
      {role === "TEACHER" && (
        <div className={styles.tableWrapper}>
          <table className={styles.dashboardTable}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Grade / Section</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.teachers
                .filter((t) => t.username === user) // ✅ Only show logged-in teacher
                .flatMap((t) => t.teacher?.students || []) // ✅ Get their students
                .filter(
                  (s) => s.name.toLowerCase().includes(search.toLowerCase()) // ✅ search filter
                )
                .map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      Grade {student.grade || "—"} / {student.section || "—"}
                    </td>
                    <td>
                      <button
                        className={styles.addAnother}
                        onClick={() => handleShowComm(student.id)}
                      >
                        View Comm.
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.addButton}
                        onClick={() => handleAddClick(student.id)}
                      >
                        Add Comm.
                      </button>
                    </td>
                  </tr>
                ))}

              {data.teachers
                .filter((t) => t.username === user)
                .flatMap((t) => t.teacher?.students || []).length === 0 && (
                <tr>
                  <td colSpan="4" className={styles.noData}>
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalComm}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Send Communication</h3>
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              <FaTimes
                style={{ cursor: "pointer", color: "#888" }}
                onClick={() => {
                  setShowModal(false);
                }}
              />
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Homework Subjects */}
              <label className={styles.sectionLabel}>Homework Subjects</label>
              <div className={styles.checkboxGroup}>
                {subjects.map((subj) => (
                  <label key={subj} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={homeworkSubjects.includes(subj)}
                      onChange={() =>
                        handleCheckbox(
                          homeworkSubjects,
                          setHomeworkSubjects,
                          subj
                        )
                      }
                    />
                    <span>{subj}</span>
                  </label>
                ))}
              </div>

              {/* Daily Status */}
              <label className={styles.sectionLabel}>Daily Status</label>
              <div className={styles.tableWrapper}>
                <table className={styles.statusTable}>
                  <thead>
                    <tr>
                      <th>Criteria</th>
                      {["NI", "G", "VG", "E"].map((rating) => (
                        <th key={rating}>{rating}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {criteriaList.map((criteria) => (
                      <tr key={criteria}>
                        <td className={styles.criteriaName}>{criteria}</td>
                        {[
                          "Needs Improvement",
                          "Good",
                          "Very Good",
                          "Excellent",
                        ].map((rating) => (
                          <td key={rating} className={styles.checkboxCell}>
                            <input
                              type="checkbox"
                              checked={
                                dailyStatus.find(
                                  (s) =>
                                    s.criteria === criteria &&
                                    s.rating === rating
                                ) !== undefined
                              }
                              onChange={() =>
                                handleStatusToggle(criteria, rating)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Need Extra Help */}
              <label>Need Extra Help</label>
              <textarea
                value={needExtraHelp}
                onChange={(e) => setNeedExtraHelp(e.target.value)}
                placeholder="Describe if student needs extra help..."
                style={{ height: "120px" }}
              ></textarea>

              {/* Teacher Note */}
              <label>Teacher Note</label>
              <textarea
                value={teacherNote}
                onChange={(e) => setTeacherNote(e.target.value)}
                placeholder="Add teacher's note..."
                style={{ height: "120px" }}
              ></textarea>

              <button type="submit" className={styles.submitButton}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* view communication */}
      {showComm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalComm}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Student Communications</h3>
              <FaTimes
                style={{ cursor: "pointer", color: "#888" }}
                onClick={() => {
                  setShowComm(false);
                  setSelectedStudentComms([]);
                  setSelectedDay(defaultDay);
                  setSelectedMonth(defaultMonth);
                  setSelectedWeek(defaultWeek);
                }}
              />
            </div>
            <div className={styles.commHeader}>
              <div className={styles.tabs}>
                {weekdays.map((day) => (
                  <button
                    key={day}
                    className={`${styles.tabButton} ${
                      selectedDay === day ? styles.activeTab : ""
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {months.map((month, i) => (
                  <option key={i} value={i + 1}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((w) => (
                  <option key={w} value={w}>
                    Week {w}
                  </option>
                ))}
              </select>
            </div>

            {filteredSelectedComms.length > 0 ? (
              filteredSelectedComms.map((comm) => (
                <div key={comm.id} className={styles.commCard}>
                  <div className={styles.commRow}>
                    <div className={styles.sectionTitle}>
                      Teacher {comm.teacher?.user.username}'s Note:{" "}
                    </div>
                    <div>{comm.teacherNote}</div>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.commRow}>
                    <div className={styles.sectionTitle}>Need Extra Help: </div>
                    <div>{comm.needExtraHelp || "None"}</div>
                  </div>
                  <div className={styles.divider}></div>
                  {/* Homework Subjects */}
                  <div className={styles.commRow}>
                    <div className={styles.sectionTitle}>
                      Homework Subjects:{" "}
                    </div>
                    <div className={styles.checkboxGroup}>
                      {["Math", "English", "Science", "History"].map(
                        (subject) => (
                          <label key={subject} className={styles.checkboxItem}>
                            <input
                              type="checkbox"
                              checked={comm.homeworkSubjects.includes(subject)}
                              readOnly
                            />
                            <span>{subject}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                  <div className={styles.divider}></div>

                  {/* Daily Status */}
                  <div>
                    <div className={styles.sectionTitle}>Daily Status: </div>
                    <div className={styles.statusTableWrapper}>
                      <table className={styles.statusTable}>
                        <thead>
                          <tr>
                            <th>Criteria</th>
                            {[
                              "Needs Improvement",
                              "Good",
                              "Very Good",
                              "Excellent",
                            ].map((rating) => (
                              <th key={rating}>{rating}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {comm.dailyStatus.map((s, i) => (
                            <tr key={i}>
                              <td>{s.criteria}</td>
                              {[
                                "Needs Improvement",
                                "Good",
                                "Very Good",
                                "Excellent",
                              ].map((rating) => (
                                <td key={rating}>
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={s.rating === rating}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className={styles.divider}></div>
                  {comm.parentComment && (
                    <>
                      <div className={styles.commRow}>
                        <div className={styles.sectionTitle}>
                          Parents Comment:{" "}
                        </div>
                        <div>{comm.parentComment}</div>
                      </div>
                      <div className={styles.divider}></div>
                    </>
                  )}
                  {/* Reply Button */}
                  {!comm.parentComment && (
                    <div>
                      {!comm.showReply ? (
                        <button
                          onClick={() =>
                            setCommunications((prev) =>
                              prev.map((c) =>
                                c.id === comm.id ? { ...c, showReply: true } : c
                              )
                            )
                          }
                          className={styles.replyButton}
                        >
                          Reply
                        </button>
                      ) : (
                        <div className={styles.replyForm}>
                          <FaTimes
                            style={{
                              cursor: "pointer",
                              color: "#888",
                            }}
                            onClick={() => {
                              setCommunications((prev) =>
                                prev.map((c) =>
                                  c.id === comm.id
                                    ? { ...c, showReply: false }
                                    : c
                                )
                              );
                            }}
                          />
                          <textarea
                            placeholder="Write your comment..."
                            value={comm.parentComment || ""}
                            onChange={(e) =>
                              setCommunications((prev) =>
                                prev.map((c) =>
                                  c.id === comm.id
                                    ? { ...c, parentComment: e.target.value }
                                    : c
                                )
                              )
                            }
                            className={styles.replyInput}
                          ></textarea>
                          <button
                            className={styles.submitButton}
                            onClick={async () => {
                              try {
                                const res = await axios.put(
                                  "/api/communication",
                                  {
                                    id: comm.id,
                                    parentComment: comm.parentComment,
                                  }
                                );

                                if (res.status === 200) {
                                  setCommunications((prev) =>
                                    prev.map((c) =>
                                      c.id === comm.id
                                        ? { ...c, showReply: false }
                                        : c
                                    )
                                  );
                                  const res = await axios.get(
                                    "/api/communication"
                                  );

                                  setCommunications(res.data);
                                }
                              } catch (error) {
                                console.error(
                                  "Error submitting comment:",
                                  error
                                );
                              }
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p
                style={{
                  color: "#777",
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                No communications found for this day.
              </p>
            )}
          </div>
        </div>
      )}

      {/* PARENTS SECTION */}
      {role === "PARENT" && (
        <div className={styles.parentSection}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "3%",
            }}
          >
            <h2 className={styles.sectionTitle}>
              {" "}
              {students.length > 0
                ? `${
                    students.find((s) => s.id === selectedStudentId)?.name ||
                    students[0].name
                  }'s Communication`
                : "No Student Selected"}
            </h2>

            {/* Dropdown if multiple students */}
            {students.length > 1 && (
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className={styles.dropdown}
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}

            {/* Student Name */}
            {students.length === 1 && (
              <h3 className={styles.studentName}>
                {students[0].name} — Grade {students[0].grade || "—"} /{" "}
                {students[0].section || "—"}
              </h3>
            )}
          </div>
          {/* Communications List */}
          {/* Weekday Tabs */}

          {/* Month & Week Dropdowns */}
          <div className={styles.commHeader}>
            <div className={styles.tabs}>
              {weekdays.map((day) => (
                <button
                  key={day}
                  className={`${styles.tabButton} ${
                    selectedDay === day ? styles.activeTab : ""
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {months.map((month, i) => (
                <option key={i} value={i + 1}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((w) => (
                <option key={w} value={w}>
                  Week {w}
                </option>
              ))}
            </select>
          </div>

          {filteredByDate.length > 0 ? (
            filteredByDate.map((comm) => (
              <div key={comm.id} className={styles.commCard}>
                <div className={styles.commRow}>
                  <div className={styles.sectionTitle}>
                    Teacher {comm.teacher?.user.username}'s Note:{" "}
                  </div>
                  <div>{comm.teacherNote}</div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.commRow}>
                  <div className={styles.sectionTitle}>Need Extra Help: </div>
                  <div>{comm.needExtraHelp || "None"}</div>
                </div>
                <div className={styles.divider}></div>
                {/* Homework Subjects */}
                <div className={styles.commRow}>
                  <div className={styles.sectionTitle}>Homework Subjects: </div>
                  <div className={styles.checkboxGroup}>
                    {["Math", "English", "Science", "History"].map(
                      (subject) => (
                        <label key={subject} className={styles.checkboxItem}>
                          <input
                            type="checkbox"
                            checked={comm.homeworkSubjects.includes(subject)}
                            readOnly
                          />
                          <span>{subject}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div className={styles.divider}></div>

                {/* Daily Status */}
                <div>
                  <div className={styles.sectionTitle}>Daily Status: </div>
                  <div className={styles.statusTableWrapper}>
                    <table className={styles.statusTable}>
                      <thead>
                        <tr>
                          <th>Criteria</th>
                          {[
                            "Needs Improvement",
                            "Good",
                            "Very Good",
                            "Excellent",
                          ].map((rating) => (
                            <th key={rating}>{rating}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comm.dailyStatus.map((s, i) => (
                          <tr key={i}>
                            <td>{s.criteria}</td>
                            {[
                              "Needs Improvement",
                              "Good",
                              "Very Good",
                              "Excellent",
                            ].map((rating) => (
                              <td key={rating}>
                                <input
                                  type="checkbox"
                                  readOnly
                                  checked={s.rating === rating}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className={styles.divider}></div>
                {comm.parentComment && (
                  <>
                    <div className={styles.commRow}>
                      <div className={styles.sectionTitle}>
                        Parents Comment:{" "}
                      </div>
                      <div>{comm.parentComment}</div>
                    </div>
                    <div className={styles.divider}></div>
                  </>
                )}
                {/* Reply Button */}
                {!comm.parentComment && (
                  <div>
                    {!comm.showReply ? (
                      <button
                        onClick={() =>
                          setCommunications((prev) =>
                            prev.map((c) =>
                              c.id === comm.id ? { ...c, showReply: true } : c
                            )
                          )
                        }
                        className={styles.replyButton}
                      >
                        Reply
                      </button>
                    ) : (
                      <div className={styles.replyForm}>
                        <FaTimes
                          style={{
                            cursor: "pointer",
                            color: "#888",
                          }}
                          onClick={() => {
                            setCommunications((prev) =>
                              prev.map((c) =>
                                c.id === comm.id
                                  ? { ...c, showReply: false }
                                  : c
                              )
                            );
                          }}
                        />
                        <textarea
                          placeholder="Write your comment..."
                          value={comm.parentComment || ""}
                          onChange={(e) =>
                            setCommunications((prev) =>
                              prev.map((c) =>
                                c.id === comm.id
                                  ? { ...c, parentComment: e.target.value }
                                  : c
                              )
                            )
                          }
                          className={styles.replyInput}
                        ></textarea>
                        <button
                          className={styles.submitButton}
                          onClick={async () => {
                            try {
                              const res = await axios.put(
                                "/api/communication",
                                {
                                  id: comm.id,
                                  parentComment: comm.parentComment,
                                }
                              );

                              if (res.status === 200) {
                                setCommunications((prev) =>
                                  prev.map((c) =>
                                    c.id === comm.id
                                      ? { ...c, showReply: false }
                                      : c
                                  )
                                );
                                const res = await axios.get(
                                  "/api/communication"
                                );

                                setCommunications(res.data);
                              }
                            } catch (error) {
                              console.error("Error submitting comment:", error);
                            }
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p
              style={{ color: "#777", marginTop: "1rem", textAlign: "center" }}
            >
              No communications found for this day.
            </p>
          )}
        </div>
      )}

      {/* show log out */}
      {showLogout && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalLogout}>
            <div
              style={{ fontSize: "25px", textAlign: "center", margin: "20px" }}
            >
              Are you sure?
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <button onClick={handleLogout} className={styles.addButton}>
                Yes
              </button>
              <button
                className={styles.addAnother}
                onClick={() => setShowLogout(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
