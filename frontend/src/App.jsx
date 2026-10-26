import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  BookOpen,
  Bell,
  CalendarDays,
  GraduationCap,
  LogIn,
  LogOut,
  MessageCircle,
  PlusCircle,
  Search,
  Users,
  CheckCircle2,
  Menu,
  X,
  UserCheck
} from "lucide-react";
import { api } from "./api";

const emptyUser = { name: "", email: "", password: "", college: "", course: "MCA", semester: "" };

function Layout({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("edubridge_token");
    setUser(null);
    navigate("/login");
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="topbar">
        <Link className="brand" to="/" aria-label="EduBridge Home">
          <span className="brand-mark" aria-hidden="true">
            <GraduationCap size={22} />
          </span>
          EduBridge
        </Link>

        {user && (
          <>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className={`topbar-nav ${mobileMenuOpen ? "open" : ""}`} aria-label="Main Navigation">
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                Dashboard
              </Link>
              <Link to="/doubts" className={location.pathname.startsWith("/doubts") ? "active" : ""}>
                Doubts
              </Link>
              <Link to="/tutors" className={location.pathname.startsWith("/tutors") ? "active" : ""}>
                Tutors
              </Link>
              <Link to="/bookings" className={location.pathname === "/bookings" ? "active" : ""}>
                Sessions
              </Link>
              <Link to="/notifications" className={location.pathname === "/notifications" ? "active" : ""}>
                Notifications
              </Link>
              <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
                Profile
              </Link>
              <button className="ghost logout-btn" onClick={logout} aria-label="Log out of EduBridge">
                <LogOut size={16} aria-hidden="true" />
                <span>Logout</span>
              </button>
            </nav>
          </>
        )}
      </header>

      <main id="main-content" className="container" tabIndex="-1">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Auth mode="login" setUser={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Auth mode="register" setUser={setUser} />} />
          <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/doubts" element={user ? <Doubts /> : <Navigate to="/login" />} />
          <Route path="/doubts/:id" element={user ? <DoubtDetails /> : <Navigate to="/login" />} />
          <Route path="/tutors" element={user ? <Tutors /> : <Navigate to="/login" />} />
          <Route path="/bookings" element={user ? <Bookings user={user} /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

function Auth({ mode, setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(mode === "login" ? { email: "", password: "" } : emptyUser);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const url = mode === "login" ? "/auth/login" : "/auth/register";
      const { data } = await api.post(url, form);
      localStorage.setItem("edubridge_token", data.token);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="brand-large" aria-hidden="true">
          <GraduationCap size={28} /> <span>EduBridge</span>
        </div>
        <h1 id="auth-title">{mode === "login" ? "Welcome back" : "Create your student account"}</h1>
        <p className="muted">
          {mode === "login"
            ? "Continue your peer-learning journey."
            : "Join your college peer-learning community."}
        </p>

        {error && (
          <div className="alert" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="form-grid">
          {mode === "register" && (
            <>
              <label htmlFor="reg-name" className="sr-only">Full name</label>
              <input
                id="reg-name"
                placeholder="Full name"
                aria-label="Full name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <label htmlFor="reg-college" className="sr-only">College</label>
              <input
                id="reg-college"
                placeholder="College (e.g. FISAT)"
                aria-label="College"
                value={form.college || ""}
                onChange={(e) => setForm({ ...form, college: e.target.value })}
                required
              />
              <div className="form-grid two">
                <div>
                  <label htmlFor="reg-course" className="sr-only">Course</label>
                  <input
                    id="reg-course"
                    placeholder="Course (e.g. MCA)"
                    aria-label="Course"
                    value={form.course || "MCA"}
                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="reg-semester" className="sr-only">Semester</label>
                  <input
                    id="reg-semester"
                    placeholder="Semester (e.g. S3)"
                    aria-label="Semester"
                    value={form.semester || ""}
                    onChange={(e) => setForm({ ...form, semester: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}

          <label htmlFor="auth-email" className="sr-only">Email address</label>
          <input
            id="auth-email"
            type="email"
            placeholder="College email address"
            aria-label="Email address"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label htmlFor="auth-password" className="sr-only">Password</label>
          <input
            id="auth-password"
            type="password"
            placeholder="Password (6-128 characters)"
            aria-label="Password"
            value={form.password || ""}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
            maxLength={128}
          />

          <button className="primary full" type="submit" disabled={submitting}>
            {submitting ? (
              "Please wait..."
            ) : mode === "login" ? (
              <>
                <LogIn size={17} aria-hidden="true" /> Login
              </>
            ) : (
              <>
                <PlusCircle size={17} aria-hidden="true" /> Create Account
              </>
            )}
          </button>
        </form>

        <p className="switch">
          {mode === "login" ? "New to EduBridge? " : "Already have an account? "}
          <Link to={mode === "login" ? "/register" : "/login"}>
            {mode === "login" ? "Register" : "Login"}
          </Link>
        </p>
      </section>
    </div>
  );
}

function Dashboard({ user }) {
  const [stats, setStats] = useState({ doubts: 0, tutors: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/doubts"), api.get("/tutors"), api.get("/bookings")])
      .then(([d, t, b]) =>
        setStats({
          doubts: d.data.doubts.length,
          tutors: t.data.tutors.length,
          bookings: b.data.bookings.length
        })
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const highlights = [
    { title: "Ask a doubt", text: "Get answers and explanations from classmates in your course." },
    { title: "Find a tutor", text: "Search by subject, skill, and schedule flexibility." },
    { title: "Track sessions", text: "Coordinate, accept, complete, and review every study session." }
  ];

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <span className="eyebrow">COLLEGE PEER LEARNING</span>
          <h1 id="hero-title">
            Learn together. <span>Grow together.</span>
          </h1>
          <p>
            Ask an academic doubt, find a knowledgeable peer, and turn mutual help into a structured tutoring session.
          </p>
          <div className="actions">
            <Link className="primary" to="/doubts">
              <BookOpen size={17} aria-hidden="true" />
              Explore Doubts
            </Link>
            <Link className="secondary" to="/tutors">
              <Users size={17} aria-hidden="true" />
              Find a Tutor
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <GraduationCap size={74} />
          <div>
            <b>{user.name}</b>
            <small>{user.course} • {user.college}</small>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Platform Statistics">
        {loading ? (
          <Stat icon={<MessageCircle aria-hidden="true" />} label="Loading" value="--" />
        ) : (
          <>
            <Stat icon={<MessageCircle aria-hidden="true" />} label="Open Doubts" value={stats.doubts} />
            <Stat icon={<Users aria-hidden="true" />} label="Peer Tutors" value={stats.tutors} />
            <Stat icon={<CalendarDays aria-hidden="true" />} label="My Sessions" value={stats.bookings} />
          </>
        )}
      </section>

      <section aria-labelledby="workflow-heading">
        <div className="section-head">
          <h2 id="workflow-heading">How EduBridge works</h2>
          <span>Core learner → tutor journey</span>
        </div>
        <div className="steps">
          {["Ask a Doubt", "Get Peer Answers", "Discover a Tutor", "Book a Session"].map((x, i) => (
            <div className="step" key={x}>
              <span aria-hidden="true">{i + 1}</span>
              <b>{x}</b>
              <small>
                {[
                  "Post your academic question.",
                  "Learn from fellow students.",
                  "Search by skills & subjects.",
                  "Schedule online or offline."
                ][i]}
              </small>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="highlights-heading">
        <div className="section-head">
          <h2 id="highlights-heading">Quick wins</h2>
          <span>Keep momentum this week</span>
        </div>
        <div className="highlights-grid">
          {highlights.map((item) => (
            <div className="highlight-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="stat">
      <span className="stat-icon">{icon}</span>
      <div>
        <b>{value}</b>
        <small>{label}</small>
      </div>
    </div>
  );
}

function Doubts() {
  const [doubts, setDoubts] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", subject: "", tags: "" });
  const [error, setError] = useState("");

  const load = () =>
    api
      .get("/doubts", { params: search ? { search } : undefined })
      .then((r) => setDoubts(r.data.doubts))
      .catch((e) => setError(e.response?.data?.message || "Unable to load doubts"));

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/doubts", {
        ...form,
        tags: form.tags
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      });
      setForm({ title: "", description: "", subject: "", tags: "" });
      setOpen(false);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Unable to create doubt");
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">ACADEMIC DOUBTS</span>
          <h1>Doubt Board</h1>
          <p>Ask questions and learn from peers in your college.</p>
        </div>
        <button
          className="primary"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="new-doubt-panel"
        >
          <PlusCircle size={17} aria-hidden="true" />
          {open ? "Cancel" : "Ask a Doubt"}
        </button>
      </div>

      {open && (
        <section id="new-doubt-panel" className="panel" aria-labelledby="post-doubt-title">
          <h3 id="post-doubt-title">Post a new doubt</h3>
          <form onSubmit={create} className="form-grid">
            <label htmlFor="doubt-title" className="sr-only">Doubt title</label>
            <input
              id="doubt-title"
              placeholder="Doubt title (e.g. How does B+ Tree indexing work?)"
              aria-label="Doubt title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              maxLength={160}
            />
            <label htmlFor="doubt-subject" className="sr-only">Subject</label>
            <input
              id="doubt-subject"
              placeholder="Subject (e.g. DBMS, Data Structures)"
              aria-label="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              maxLength={100}
            />
            <label htmlFor="doubt-desc" className="sr-only">Detailed description</label>
            <textarea
              id="doubt-desc"
              placeholder="Explain your doubt clearly so peers can help..."
              aria-label="Detailed description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              maxLength={5000}
            />
            <label htmlFor="doubt-tags" className="sr-only">Tags</label>
            <input
              id="doubt-tags"
              placeholder="Tags: normalization, sql, indexing (comma-separated)"
              aria-label="Tags (comma-separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
            <button className="primary" type="submit">
              Post Doubt
            </button>
          </form>
        </section>
      )}

      <div className="searchbar" role="search">
        <Search size={18} aria-hidden="true" />
        <input
          placeholder="Search doubts by keyword, tag or subject..."
          aria-label="Search doubts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
        />
        <button className="secondary" onClick={load} aria-label="Submit doubt search">
          Search
        </button>
      </div>

      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}

      <div className="list" aria-label="List of Academic Doubts">
        {doubts.map((d) => (
          <Link
            to={`/doubts/${d._id}`}
            className="list-card"
            key={d._id}
            aria-label={`${d.title}, subject: ${d.subject}, status: ${d.status}`}
          >
            <div>
              <span className="tag">{d.subject}</span>
              <h3>{d.title}</h3>
              <p>{d.description}</p>
              <small>
                By {d.author?.name || "Student"} • {d.answers?.length || 0} answers
              </small>
            </div>
            <span className={`status ${d.status}`}>{d.status}</span>
          </Link>
        ))}
        {!doubts.length && (
          <div className="empty" role="status">
            No doubts found. Be the first to ask!
          </div>
        )}
      </div>
    </>
  );
}

function DoubtDetails() {
  const { id } = useParams();
  const [d, setD] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api
      .get(`/doubts/${id}`)
      .then((r) => setD(r.data.doubt))
      .catch((e) => setError(e.response?.data?.message || "Unable to load doubt"));

  useEffect(() => {
    load();
  }, [id]);

  const post = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/doubts/${id}/answers`, { content: answer });
      setAnswer("");
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Unable to post answer");
    }
  };

  const toggleStatus = async () => {
    if (!d) return;
    const nextStatus = d.status === "open" ? "resolved" : "open";
    try {
      await api.put(`/doubts/${id}/status`, { status: nextStatus });
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Unable to update status");
    }
  };

  if (!d) return <div className="loading" role="status">{error || "Loading doubt details..."}</div>;

  return (
    <>
      <Link to="/doubts" className="back" aria-label="Return to Doubt Board">
        ← Back to doubts
      </Link>

      <section className="detail" aria-labelledby="doubt-detail-title">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
          <div>
            <span className="tag">{d.subject}</span>
            <h1 id="doubt-detail-title">{d.title}</h1>
          </div>
          <button
            className={d.status === "open" ? "primary small" : "secondary small"}
            onClick={toggleStatus}
            aria-label={`Mark doubt as ${d.status === "open" ? "resolved" : "open"}`}
          >
            {d.status === "open" ? "Mark as Resolved" : "Re-open Doubt"}
          </button>
        </div>
        <p className="lead">{d.description}</p>
        <small>Asked by {d.author?.name} • {d.author?.college}</small>
      </section>

      <div className="section-head">
        <h2>Peer Answers</h2>
        <span>{d.answers?.length || 0} responses</span>
      </div>

      <div className="answers" aria-label="Peer Answers">
        {d.answers?.map((a) => (
          <div className="answer" key={a._id}>
            <div className="avatar" aria-hidden="true">
              {a.user?.name?.[0] || "S"}
            </div>
            <div>
              <b>{a.user?.name}</b>
              <p>{a.content}</p>
              <small>{a.user?.skills?.join(" • ") || "Student"}</small>
            </div>
          </div>
        ))}
        {!d.answers?.length && (
          <div className="empty" role="status">No answers yet. Share your understanding!</div>
        )}
      </div>

      <section className="panel" aria-labelledby="share-answer-title">
        <h3 id="share-answer-title">Share your answer</h3>
        <form onSubmit={post} className="form-grid">
          <label htmlFor="answer-content" className="sr-only">Your answer</label>
          <textarea
            id="answer-content"
            placeholder="Explain the concept clearly in your own words..."
            aria-label="Your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            maxLength={5000}
          />
          <button className="primary" type="submit">
            Post Answer
          </button>
        </form>
      </section>
    </>
  );
}

function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const load = () =>
    api
      .get("/tutors", { params: search ? { search } : undefined })
      .then((r) => setTutors(r.data.tutors))
      .catch((e) => setError(e.response?.data?.message || "Unable to load tutors"));

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">PEER TUTORS</span>
          <h1>Find a Tutor</h1>
          <p>Discover fellow students who can help with your subjects and skills.</p>
        </div>
      </div>

      <div className="searchbar" role="search">
        <Search size={18} aria-hidden="true" />
        <input
          placeholder="Search by name, subject or skill (e.g. Java, DBMS)..."
          aria-label="Search tutors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
        />
        <button className="secondary" onClick={load} aria-label="Submit tutor search">
          Search
        </button>
      </div>

      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}

      <div className="tutor-grid" aria-label="Available Peer Tutors">
        {tutors.map((t) => (
          <div className="tutor-card" key={t._id}>
            <div className="avatar big" aria-hidden="true">
              {t.name?.[0]}
            </div>
            <h3>{t.name}</h3>
            <small>{t.course} • {t.college}</small>
            <p>{t.bio || "Peer tutor ready to help fellow students."}</p>
            <div className="chips">
              {[...(t.subjects || []), ...(t.skills || [])].slice(0, 5).map((x) => (
                <span className="tag" key={x}>
                  {x}
                </span>
              ))}
            </div>
            <div className="tutor-foot">
              <span>★ {Number(t.ratingAverage || 0).toFixed(1)} ({t.ratingCount || 0}) · {t.reputation || 0} pts</span>
              <button
                className="primary small"
                onClick={() => setSelected(t)}
                aria-label={`Request tutoring session with ${t.name}`}
              >
                Request Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {!tutors.length && (
        <div className="empty" role="status">
          No tutors found matching your search. Add subjects and skills in your profile to be discoverable!
        </div>
      )}

      {selected && <BookingModal tutor={selected} close={() => setSelected(null)} />}
    </>
  );
}

function BookingModal({ tutor, close }) {
  const [form, setForm] = useState({
    subject: tutor.subjects?.[0] || "",
    mode: "offline",
    date: "",
    time: "",
    location: "College Library",
    notes: ""
  });
  const [msg, setMsg] = useState("");
  const modalRef = useRef(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings", { ...form, tutor: tutor._id });
      setMsg("Tutoring request sent successfully.");
      setTimeout(close, 900);
    } catch (e) {
      setMsg(e.response?.data?.message || "Unable to send request");
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && close()}
      role="presentation"
    >
      <section
        className="modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="close" onClick={close} aria-label="Close dialog">
          ×
        </button>
        <span className="eyebrow">REQUEST PEER TUTORING</span>
        <h2 id="modal-title">{tutor.name}</h2>
        <p className="muted">{tutor.subjects?.join(" • ") || "Academic support"}</p>

        {msg && (
          <div className="alert success" role="alert" aria-live="polite">
            {msg}
          </div>
        )}

        <form onSubmit={submit} className="form-grid">
          <label htmlFor="booking-subject" className="sr-only">Subject</label>
          <input
            id="booking-subject"
            placeholder="Subject to cover"
            aria-label="Subject to cover"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />

          <label htmlFor="booking-mode" className="sr-only">Mode of session</label>
          <select
            id="booking-mode"
            aria-label="Mode of session"
            value={form.mode}
            onChange={(e) => setForm({ ...form, mode: e.target.value })}
          >
            <option value="offline">Offline (Campus)</option>
            <option value="online">Online</option>
          </select>

          <div className="form-grid two">
            <div>
              <label htmlFor="booking-date" className="sr-only">Date</label>
              <input
                id="booking-date"
                type="date"
                aria-label="Session date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="booking-time" className="sr-only">Time</label>
              <input
                id="booking-time"
                type="time"
                aria-label="Session time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </div>
          </div>

          <label htmlFor="booking-location" className="sr-only">Location</label>
          <input
            id="booking-location"
            placeholder="Campus location or online link"
            aria-label="Campus location or meeting link"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <label htmlFor="booking-notes" className="sr-only">Notes</label>
          <textarea
            id="booking-notes"
            placeholder="Optional notes or topics for the session"
            aria-label="Optional notes for tutor"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <button className="primary" type="submit">
            Send Request
          </button>
        </form>
      </section>
    </div>
  );
}

function Bookings({ user }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () =>
    api
      .get("/bookings")
      .then((r) => setItems(r.data.bookings))
      .catch((e) => setError(e.response?.data?.message || "Unable to load sessions"))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const act = async (id, type) => {
    try {
      await api.put(`/bookings/${id}/${type}`);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Action failed");
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">TUTORING SESSIONS</span>
          <h1>My Sessions</h1>
          <p>Manage your incoming requests and scheduled peer sessions.</p>
        </div>
      </div>

      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}

      <div className="booking-list" aria-label="Tutoring Sessions List">
        {loading ? (
          <div className="loading" role="status">Loading sessions…</div>
        ) : (
          items.map((b) => (
            <div className="booking" key={b._id}>
              <div>
                <span className={`status ${b.status}`}>{b.status}</span>
                <h3>{b.subject}</h3>
                <p>
                  {String(b.learner?._id) === String(user.id) ? "Tutor: " : "Learner: "}
                  <b>
                    {String(b.learner?._id) === String(user.id)
                      ? b.tutor?.name
                      : b.learner?.name}
                  </b>
                </p>
                <small>
                  {b.date} • {b.time} • {b.mode} • {b.location || "Online"}
                </small>
              </div>
              <div className="booking-actions">
                {String(b.tutor?._id) === String(user.id) && b.status === "pending" && (
                  <>
                    <button
                      className="secondary"
                      onClick={() => act(b._id, "reject")}
                      aria-label="Reject booking request"
                    >
                      Reject
                    </button>
                    <button
                      className="primary"
                      onClick={() => act(b._id, "accept")}
                      aria-label="Accept booking request"
                    >
                      Accept
                    </button>
                  </>
                )}
                {["accepted"].includes(b.status) && (
                  <button
                    className="primary"
                    onClick={() => act(b._id, "complete")}
                    aria-label="Mark session as completed"
                  >
                    <CheckCircle2 size={16} aria-hidden="true" /> Complete
                  </button>
                )}
                {b.status === "completed" &&
                  String(b.learner?._id) === String(user.id) &&
                  !b.reviewedByLearner && <ReviewForm booking={b} onDone={load} />}
                {b.status === "completed" &&
                  b.reviewedByLearner &&
                  String(b.learner?._id) === String(user.id) && (
                    <span className="success-text" role="status">
                      <UserCheck size={16} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                      Review submitted
                    </span>
                  )}
              </div>
            </div>
          ))
        )}
        {!items.length && !loading && (
          <div className="empty" role="status">No tutoring sessions yet.</div>
        )}
      </div>
    </>
  );
}

function ReviewForm({ booking, onDone }) {
  const [rating, setRating] = useState("5");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api.post(`/reviews/booking/${booking._id}`, { rating: Number(rating), feedback });
      setMessage("Thanks for your feedback!");
      onDone();
    } catch (e) {
      setMessage(e.response?.data?.message || "Unable to submit review");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="review-form" onSubmit={submit} aria-label="Review completed session">
      <label htmlFor={`rating-${booking._id}`}>Rate this session</label>
      <select
        id={`rating-${booking._id}`}
        aria-label="Rating score from 1 to 5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Very good</option>
        <option value="3">3 - Good</option>
        <option value="2">2 - Fair</option>
        <option value="1">1 - Poor</option>
      </select>
      <label htmlFor={`feedback-${booking._id}`} className="sr-only">Feedback</label>
      <input
        id={`feedback-${booking._id}`}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        maxLength={1000}
        placeholder="Optional feedback for your tutor"
        aria-label="Feedback comment for tutor"
      />
      <button className="secondary" disabled={saving} type="submit">
        {saving ? "Submitting..." : "Submit review"}
      </button>
      {message && <small role="status" aria-live="polite">{message}</small>}
    </form>
  );
}

function Notifications() {
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () =>
    api
      .get("/notifications")
      .then((r) => {
        setItems(r.data.notifications);
        setUnread(r.data.unread);
      })
      .catch((e) => setError(e.response?.data?.message || "Unable to load notifications"))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      load();
    } catch (e) {}
  };

  const markAll = async () => {
    try {
      await api.put("/notifications/read-all");
      load();
    } catch (e) {}
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">ACTIVITY</span>
          <h1>
            Notifications{" "}
            {unread > 0 && (
              <span className="notification-count" aria-label={`${unread} unread notifications`}>
                {unread}
              </span>
            )}
          </h1>
          <p>Stay updated about answers and tutoring sessions.</p>
        </div>
        <button className="secondary" onClick={markAll} aria-label="Mark all notifications as read">
          <Bell size={16} aria-hidden="true" />
          Mark all as read
        </button>
      </div>

      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}

      <div className="notification-list" aria-label="Notification feed">
        {loading ? (
          <div className="loading" role="status">Loading notifications…</div>
        ) : (
          items.map((n) => (
            <div
              className={`notification ${n.read ? "read" : ""}`}
              key={n._id}
              onClick={() => !n.read && markRead(n._id)}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !n.read && markRead(n._id)}
              aria-label={`${n.title}: ${n.message}. ${n.read ? "Read" : "Unread"}`}
            >
              <span className="notification-icon" aria-hidden="true">
                <Bell size={17} />
              </span>
              <div>
                <b>{n.title}</b>
                <p>{n.message}</p>
                <small>{new Date(n.createdAt).toLocaleString()}</small>
              </div>
              {!n.read && <span className="unread-dot" aria-label="Unread notification indicator" />}
            </div>
          ))
        )}
        {!items.length && !loading && (
          <div className="empty" role="status">You're all caught up!</div>
        )}
      </div>
    </>
  );
}

function Profile({ user, setUser }) {
  const [form, setForm] = useState({
    ...user,
    skills: (user.skills || []).join(", "),
    subjects: (user.subjects || []).join(", ")
  });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const { data } = await api.put("/auth/profile", {
        ...form,
        skills: form.skills
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        subjects: form.subjects
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      });
      setUser(data.user);
      setMsg("Profile updated successfully!");
    } catch (e) {
      setMsg(e.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">YOUR PROFILE</span>
          <h1>Profile & Skills</h1>
          <p>Tell your college peers what subjects and skills you can learn and teach.</p>
        </div>
      </div>

      <section className="panel" aria-labelledby="profile-form-title">
        <h3 id="profile-form-title" className="sr-only">Edit Profile Details</h3>
        <form onSubmit={save} className="form-grid two">
          <div>
            <label htmlFor="prof-name">Full Name</label>
            <input
              id="prof-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              aria-label="Full Name"
              required
            />
          </div>
          <div>
            <label htmlFor="prof-college">College</label>
            <input
              id="prof-college"
              value={form.college}
              disabled
              aria-label="College (read only)"
            />
          </div>
          <div>
            <label htmlFor="prof-course">Course</label>
            <input
              id="prof-course"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              placeholder="Course (e.g. MCA)"
              aria-label="Course"
            />
          </div>
          <div>
            <label htmlFor="prof-semester">Semester</label>
            <input
              id="prof-semester"
              value={form.semester}
              onChange={(e) => setForm({ ...form, semester: e.target.value })}
              placeholder="Semester"
              aria-label="Semester"
            />
          </div>
          <div>
            <label htmlFor="prof-subjects">Subjects Taught / Studied</label>
            <input
              id="prof-subjects"
              value={form.subjects}
              onChange={(e) => setForm({ ...form, subjects: e.target.value })}
              placeholder="Subjects (comma separated: DBMS, OS)"
              aria-label="Subjects (comma separated)"
            />
          </div>
          <div>
            <label htmlFor="prof-skills">Skills & Expertise</label>
            <input
              id="prof-skills"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              placeholder="Skills (comma separated: Python, React)"
              aria-label="Skills (comma separated)"
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="prof-avail">Tutoring Availability</label>
            <input
              id="prof-avail"
              value={form.availability || ""}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              placeholder="e.g. Weekday evenings, Saturdays 2-5pm"
              aria-label="Tutoring Availability"
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="prof-bio">Short Bio</label>
            <textarea
              id="prof-bio"
              value={form.bio || ""}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell fellow students about your academic interests and how you can help..."
              aria-label="Short Bio"
            />
          </div>
          <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "14px" }}>
            <button className="primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </button>
            {msg && (
              <span className="success-text" role="status" aria-live="polite">
                {msg}
              </span>
            )}
          </div>
        </form>
      </section>
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("edubridge_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/profile")
      .then((r) => setUser(r.data.user))
      .catch(() => localStorage.removeItem("edubridge_token"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading" role="status" aria-live="polite">
        Loading EduBridge...
      </div>
    );
  }

  return <Layout user={user} setUser={setUser} />;
}
