"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { Judson } from "next/font/google";
import {
  FaPlus,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students");
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ teachers: [], parents: [], students: [] });
  const [formData, setFormData] = useState({
    username: "", // for Teacher or Student if not Parent
    password: "",
    phone: "", // for Teacher or Parent
    grade: "",
    section: "",
    age: "",
    experience: "",
    students: [
      // for Parent role
      {
        name: "",
        grade: "",
        age: "",
        section: "",
      },
    ],
  });
  const [communications, setCommunications] = useState([]);
  const [selectedStudentComms, setSelectedStudentComms] = useState([]);
  const [studentId, setStudentID] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user");
        setData({
          teachers: res.data.teachers || [],
          parents: res.data.parents || [],
          students: res.data.students || [],
        });
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStudentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStudents = [...formData.students];
    updatedStudents[index][name] = value;
    setFormData({ ...formData, students: updatedStudents });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className={styles.sortIcon} />;
    if (sortConfig.direction === "asc")
      return <FaSortUp className={styles.sortIcon} />;
    return <FaSortDown className={styles.sortIcon} />;
  };

  const handleAddClick = () => {
    setShowModal(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await axios.post("/api/user", {
        role,
        ...formData, // sends parent info + students array if role === "PARENT"
      });

      // Clear form
      setFormData({
        username: "",
        password: "",
        phone: "",
        grade: "",
        section: "",
        age: "",
        experience: "",
        students: [
          {
            name: "",
            grade: "",
            age: "",
            section: "",
          },
        ],
      });
      setRole("");
      setShowModal(false);
      const res = await axios.get("/api/user");
      setData({
        teachers: res.data.teachers || [],
        parents: res.data.parents || [],
        students: res.data.students || [],
      });
    } catch (err) {
      console.error("User creation failed:", err);
    } finally {
      setLoading(false);
    }
  };
  const addStudentField = () => {
    setFormData((prev) => ({
      ...prev,
      students: [
        ...prev.students,
        {
          name: "",
          grade: "",
          age: "",
          section: "",
        },
      ],
    }));
  };
  const removeStudentField = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      students: prevData.students.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const res = await axios.get("/api/communication");

        setCommunications(res.data);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    };
    fetchCommunications();
  }, []);
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
  const [showComm, setShowComm] = useState(false);

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

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const filteredStudents = data.students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGrade = selectedGrade ? student.grade === selectedGrade : true;
    const matchesSection = selectedSection
      ? student.section.toUpperCase() === selectedSection
      : true;

    return matchesSearch && matchesGrade && matchesSection;
  });

  const renderTable = () => (
    <>
      {/* Top bar with search and add */}
      <div className={styles.tableTopBar}>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {activeTab !== "students" && (
          <button className={styles.addButton} onClick={handleAddClick}>
            <FaPlus /> Add
          </button>
        )}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>Add New User</h3>
                <FaTimes
                  style={{ cursor: "pointer", color: "#888" }}
                  onClick={() => {
                    setShowModal(false);
                    setRole("");
                  }}
                />
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Common fields */}
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />

                {/* Role dropdown */}
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  {/* <option value="STUDENT">Student</option> */}
                  <option value="TEACHER">Teacher</option>
                  <option value="PARENT">Parent</option>
                </select>

                {/* Conditional fields */}
                {/* {role === "STUDENT" && (
                  <>
                    <input
                      type="number"
                      name="grade"
                      placeholder="Grade"
                      value={formData.grade}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="section"
                      placeholder="Section"
                      value={formData.section}
                      onChange={handleChange}
                    />
                  </>
                )} */}

                {activeTab === "teachers" && (
                  <>
                    <input
                      type="number"
                      name="grade"
                      placeholder="Grade"
                      value={formData.grade}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="section"
                      placeholder="Section"
                      value={formData.section}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      name="experience"
                      placeholder="Experience (years)"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </>
                )}

                {/* Parent fields */}
                {activeTab === "parents" && (
                  <>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Parent Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <h4>Students</h4>
                    {formData.students.map((student, index) => (
                      <div key={index} className={styles.studentForm}>
                        <button
                          type="button"
                          onClick={() => removeStudentField(index)}
                          className={styles.removeBtn}
                        >
                          <FaTimes />
                        </button>
                        <input
                          type="text"
                          name="name"
                          placeholder="Student Name"
                          value={student.username}
                          onChange={(e) => handleStudentChange(index, e)}
                        />
                        <input
                          type="number"
                          name="grade"
                          placeholder="Grade"
                          value={student.grade}
                          onChange={(e) => handleStudentChange(index, e)}
                        />
                        <input
                          type="number"
                          name="age"
                          placeholder="Age"
                          value={student.age}
                          onChange={(e) => handleStudentChange(index, e)}
                        />
                        <input
                          type="text"
                          name="section"
                          placeholder="Section"
                          value={student.section}
                          onChange={(e) => handleStudentChange(index, e)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addStudentField}
                      className={styles.addAnother}
                    >
                      + Add Another Student
                    </button>
                  </>
                )}

                <button type="submit" className={styles.submitButton}>
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Table */}
      {/* students TABLE */}
      {activeTab === "students" && (
        <>
          <div className={styles.filterTabs}>
            {/* Grade Filter */}
            <div className={styles.filterGroup}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((grade) => (
                <button
                  key={grade}
                  className={`${styles.filterButton} ${
                    selectedGrade === grade ? styles.activeFilter : ""
                  }`}
                  onClick={() =>
                    setSelectedGrade(selectedGrade === grade ? "" : grade)
                  }
                >
                  {grade}
                </button>
              ))}
            </div>
            {/* Section Filter */}
            <div className={styles.filterGroup}>
              {["A", "B", "C", "D"].map((section) => (
                <button
                  key={section}
                  className={`${styles.filterButton} ${
                    selectedSection === section ? styles.activeFilter : ""
                  }`}
                  onClick={() =>
                    setSelectedSection(
                      selectedSection === section ? "" : section
                    )
                  }
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
          <table className={styles.dashboardTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade / Section</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.grade + " / " + student.section}</td>
                    <td>{student.age || "—"}</td>
                    <td>
                      <button
                        className={styles.addAnother}
                        onClick={() => handleShowComm(student.id)}
                      >
                        View Comm.
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className={styles.noData}>
                    No Students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}{" "}
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
      {/* PARENTS TABLE */}
      {activeTab === "parents" && (
        <table className={styles.dashboardTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Child</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.parents.length > 0 ? (
              data.parents.map((parent) => (
                <tr key={parent.id}>
                  <td>{parent.username}</td>
                  <td>
                    {parent.parent.students && parent.parent.students.length > 0
                      ? parent.parent.students.map((s) => s.name).join(", ")
                      : "—"}
                  </td>
                  <td>{parent.parent.phone || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.noData}>
                  No parents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {/* TEACHERS TABLE */}
      {activeTab === "teachers" && (
        <div className={styles.tableWrapper}>
          <table className={styles.dashboardTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade / Section</th>
                <th>Total Students</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {data.teachers.length > 0 ? (
                data.teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.username}</td>
                    <td>
                      Grade {teacher.teacher?.grade || "—"} /{" "}
                      {teacher.teacher?.section || "—"}
                    </td>
                    <td>{teacher.teacher?.students.length}</td>
                    <td>{teacher.teacher?.experience || "—"} years</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className={styles.noData}>
                    No teachers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  return (
    <div className={`${judson.className} ${styles.dashboardContainer}`}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <ul className={styles.sidebarList}>
          <li
            className={`${styles.sidebarItem} ${
              activeTab === "students" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("students")}
          >
            <FaUserGraduate className={styles.sidebarIcon} /> Students
          </li>
          <li
            className={`${styles.sidebarItem} ${
              activeTab === "parents" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("parents")}
          >
            <FaUsers className={styles.sidebarIcon} /> Parents
          </li>
          <li
            className={`${styles.sidebarItem} ${
              activeTab === "teachers" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("teachers")}
          >
            <FaChalkboardTeacher className={styles.sidebarIcon} /> Teachers
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.dashboardMain}>
        <h2 style={{ color: "black", marginBottom: "20px" }}>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        {renderTable()}
      </main>
    </div>
  );
}
