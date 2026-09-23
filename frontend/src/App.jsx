import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { BookOpen, Bell, CalendarDays, GraduationCap, LogIn, LogOut, MessageCircle, PlusCircle, Search, Users, CheckCircle2 } from "lucide-react";
import { api } from "./api";

const emptyUser = { name:"", email:"", password:"", college:"", course:"MCA", semester:"" };

function Layout({ user, setUser }) {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("edubridge_token"); setUser(null); navigate("/login"); };
  return <div className="app">
    <header className="topbar">
      <Link className="brand" to="/"><span className="brand-mark"><GraduationCap size={21}/></span>EduBridge</Link>
      {user && <nav>
        <Link to="/">Dashboard</Link><Link to="/doubts">Doubts</Link><Link to="/tutors">Tutors</Link><Link to="/bookings">Sessions</Link><Link to="/notifications">Notifications</Link><Link to="/profile">Profile</Link>
        <button className="ghost" onClick={logout}><LogOut size={16}/>Logout</button>
      </nav>}
    </header>
    <main className="container"><Routes>
      <Route path="/login" element={user ? <Navigate to="/"/> : <Auth mode="login" setUser={setUser}/>}/>
      <Route path="/register" element={user ? <Navigate to="/"/> : <Auth mode="register" setUser={setUser}/>}/>
      <Route path="/" element={user ? <Dashboard user={user}/> : <Navigate to="/login"/>}/>
      <Route path="/doubts" element={user ? <Doubts/> : <Navigate to="/login"/>}/>
      <Route path="/doubts/:id" element={user ? <DoubtDetails/> : <Navigate to="/login"/>}/>
      <Route path="/tutors" element={user ? <Tutors/> : <Navigate to="/login"/>}/>
      <Route path="/bookings" element={user ? <Bookings user={user}/> : <Navigate to="/login"/>}/><Route path="/notifications" element={user ? <Notifications/> : <Navigate to="/login"/>}/>
      <Route path="/profile" element={user ? <Profile user={user} setUser={setUser}/> : <Navigate to="/login"/>}/>
    </Routes></main>
  </div>
}

function Auth({ mode, setUser }) {
  const navigate = useNavigate();
  const [form,setForm]=useState(mode==="login"?{email:"",password:""}:emptyUser);
  const [error,setError]=useState("");
  const submit=async(e)=>{
    e.preventDefault(); setError("");
    try{
      const url=mode==="login"?"/auth/login":"/auth/register";
      const {data}=await api.post(url,form);
      localStorage.setItem("edubridge_token",data.token); setUser(data.user); navigate("/");
    }catch(err){setError(err.response?.data?.message||"Something went wrong");}
  };
  return <div className="auth-wrap"><section className="auth-card">
    <div className="brand-large"><GraduationCap/> <span>EduBridge</span></div>
    <h1>{mode==="login"?"Welcome back":"Create your student account"}</h1>
    <p className="muted">{mode==="login"?"Continue your peer-learning journey.":"Join your college peer-learning community."}</p>
    {error&&<div className="alert">{error}</div>}
    <form onSubmit={submit} className="form-grid">
      {mode==="register"&&<><input placeholder="Full name" value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} required/><input placeholder="College" value={form.college||""} onChange={e=>setForm({...form,college:e.target.value})} required/><input placeholder="Course" value={form.course||"MCA"} onChange={e=>setForm({...form,course:e.target.value})}/><input placeholder="Semester" value={form.semester||""} onChange={e=>setForm({...form,semester:e.target.value})}/></>}
      <input type="email" placeholder="Email" value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})} required/>
      <input type="password" placeholder="Password (min 6 characters)" value={form.password||""} onChange={e=>setForm({...form,password:e.target.value})} required minLength={6}/>
      <button className="primary full">{mode==="login"?<><LogIn size={17}/>Login</>:<><PlusCircle size={17}/>Create Account</>}</button>
    </form>
    <p className="switch">{mode==="login"?"New to EduBridge? ":"Already have an account? "}<Link to={mode==="login"?"/register":"/login"}>{mode==="login"?"Register":"Login"}</Link></p>
  </section></div>
}

function Dashboard({user}){
  const [stats,setStats]=useState({doubts:0, tutors:0, bookings:0});
  useEffect(()=>{Promise.all([api.get("/doubts"),api.get("/tutors"),api.get("/bookings")]).then(([d,t,b])=>setStats({doubts:d.data.doubts.length,tutors:t.data.tutors.length,bookings:b.data.bookings.length})).catch(()=>{});},[]);
  return <><div className="hero"><div><span className="eyebrow">COLLEGE PEER LEARNING</span><h1>Learn together. <span>Grow together.</span></h1><p>Ask a doubt, find a knowledgeable peer, and turn academic help into a structured tutoring session.</p><div className="actions"><Link className="primary" to="/doubts"><BookOpen size={17}/>Explore Doubts</Link><Link className="secondary" to="/tutors"><Users size={17}/>Find a Tutor</Link></div></div><div className="hero-art"><GraduationCap size={74}/><div><b>{user.name}</b><small>{user.course} • {user.college}</small></div></div></div>
    <div className="stats"><Stat icon={<MessageCircle/>} label="Open Doubts" value={stats.doubts}/><Stat icon={<Users/>} label="Peer Tutors" value={stats.tutors}/><Stat icon={<CalendarDays/>} label="My Sessions" value={stats.bookings}/></div>
    <div className="section-head"><h2>How EduBridge works</h2><span>Core learner → tutor journey</span></div>
    <div className="steps">{["Ask a Doubt","Get Peer Answers","Discover a Tutor","Book a Session"].map((x,i)=><div className="step" key={x}><span>{i+1}</span><b>{x}</b><small>{["Post your academic question.","Learn from fellow students.","Search by skills & subjects.","Schedule online or offline."][i]}</small></div>)}</div>
  </>
}
function Stat({icon,label,value}){return <div className="stat"><span className="stat-icon">{icon}</span><div><b>{value}</b><small>{label}</small></div></div>}

function Doubts(){
  const [doubts,setDoubts]=useState([]); const [search,setSearch]=useState(""); const [open,setOpen]=useState(false); const [form,setForm]=useState({title:"",description:"",subject:"",tags:""}); const [error,setError]=useState("");
  const load=()=>api.get("/doubts",{params:search?{search}:undefined}).then(r=>setDoubts(r.data.doubts)).catch(e=>setError(e.response?.data?.message||"Unable to load doubts"));
  useEffect(()=>{load()},[]);
  const create=async e=>{e.preventDefault();try{await api.post("/doubts",{...form,tags:form.tags.split(",").map(x=>x.trim()).filter(Boolean)});setForm({title:"",description:"",subject:"",tags:""});setOpen(false);load();}catch(e){setError(e.response?.data?.message||"Unable to create doubt")}};
  return <><div className="page-head"><div><span className="eyebrow">ACADEMIC DOUBTS</span><h1>Doubt Board</h1><p>Ask questions and learn from peers in your college.</p></div><button className="primary" onClick={()=>setOpen(!open)}><PlusCircle size={17}/>Ask a Doubt</button></div>
    {open&&<section className="panel"><h3>Post a new doubt</h3><form onSubmit={create} className="form-grid"><input placeholder="Doubt title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/><input placeholder="Subject (e.g. DBMS)" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} required/><textarea placeholder="Explain your doubt clearly..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/><input placeholder="Tags: normalization, SQL" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})}/><button className="primary">Post Doubt</button></form></section>}
    <div className="searchbar"><Search size={18}/><input placeholder="Search doubts..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load()}/><button className="secondary" onClick={load}>Search</button></div>
    {error&&<div className="alert">{error}</div>}<div className="list">{doubts.map(d=><Link to={`/doubts/${d._id}`} className="list-card" key={d._id}><div><span className="tag">{d.subject}</span><h3>{d.title}</h3><p>{d.description}</p><small>By {d.author?.name||"Student"} • {d.answers?.length||0} answers</small></div><span className={`status ${d.status}`}>{d.status}</span></Link>)}{!doubts.length&&<div className="empty">No doubts found. Be the first to ask!</div>}</div>
  </>
}

function DoubtDetails(){
  const {id}=useParams(); const [d,setD]=useState(null); const [answer,setAnswer]=useState(""); const [error,setError]=useState("");
  const load=()=>api.get(`/doubts/${id}`).then(r=>setD(r.data.doubt)).catch(e=>setError(e.response?.data?.message||"Unable to load doubt"));
  useEffect(()=>{load()},[id]);
  const post=async e=>{e.preventDefault();try{await api.post(`/doubts/${id}/answers`,{content:answer});setAnswer("");load();}catch(e){setError(e.response?.data?.message||"Unable to post answer")}};
  if(!d)return <div className="loading">{error||"Loading..."}</div>;
  return <><Link to="/doubts" className="back">← Back to doubts</Link><section className="detail"><span className="tag">{d.subject}</span><h1>{d.title}</h1><p className="lead">{d.description}</p><small>Asked by {d.author?.name} • {d.author?.college}</small></section>
    <div className="section-head"><h2>Peer Answers</h2><span>{d.answers?.length||0} responses</span></div>
    <div className="answers">{d.answers?.map(a=><div className="answer" key={a._id}><div className="avatar">{a.user?.name?.[0]||"S"}</div><div><b>{a.user?.name}</b><p>{a.content}</p><small>{a.user?.skills?.join(" • ")||"Student"}</small></div></div>)}</div>
    <section className="panel"><h3>Share your answer</h3><form onSubmit={post} className="form-grid"><textarea placeholder="Explain the concept in your own words..." value={answer} onChange={e=>setAnswer(e.target.value)} required/><button className="primary">Post Answer</button></form></section>
  </>
}

function Tutors(){
  const [tutors,setTutors]=useState([]); const [search,setSearch]=useState(""); const [error,setError]=useState(""); const [selected,setSelected]=useState(null);
  const load=()=>api.get("/tutors",{params:search?{search}:undefined}).then(r=>setTutors(r.data.tutors)).catch(e=>setError(e.response?.data?.message||"Unable to load tutors"));
  useEffect(()=>{load()},[]);
  return <><div className="page-head"><div><span className="eyebrow">PEER TUTORS</span><h1>Find a Tutor</h1><p>Discover students who can help with your subjects and skills.</p></div></div>
    <div className="searchbar"><Search size={18}/><input placeholder="Search by name, subject or skill..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load()}/><button className="secondary" onClick={load}>Search</button></div>
    {error&&<div className="alert">{error}</div>}
    <div className="tutor-grid">{tutors.map(t=><div className="tutor-card" key={t._id}><div className="avatar big">{t.name?.[0]}</div><h3>{t.name}</h3><small>{t.course} • {t.college}</small><p>{t.bio||"Peer tutor ready to help fellow students."}</p><div className="chips">{[...(t.subjects||[]),...(t.skills||[])].slice(0,5).map(x=><span className="tag" key={x}>{x}</span>)}</div><div className="tutor-foot"><span>★ {t.reputation||0} pts</span><button className="primary small" onClick={()=>setSelected(t)}>Request Session</button></div></div>)}</div>
    {!tutors.length&&<div className="empty">No tutors found yet. Add subjects and skills in your profile.</div>}
    {selected&&<BookingModal tutor={selected} close={()=>setSelected(null)}/>}
  </>
}

function BookingModal({tutor,close}){
  const [form,setForm]=useState({subject:tutor.subjects?.[0]||"",mode:"offline",date:"",time:"",location:"College Library",notes:""}); const [msg,setMsg]=useState("");
  const submit=async e=>{e.preventDefault();try{await api.post("/bookings",{...form,tutor:tutor._id});setMsg("Tutoring request sent successfully.");setTimeout(close,900)}catch(e){setMsg(e.response?.data?.message||"Unable to send request")}};
  return <div className="modal-backdrop"><section className="modal"><button className="close" onClick={close}>×</button><span className="eyebrow">REQUEST PEER TUTORING</span><h2>{tutor.name}</h2><p className="muted">{tutor.subjects?.join(" • ")||"Academic support"}</p>{msg&&<div className="alert success">{msg}</div>}<form onSubmit={submit} className="form-grid"><input placeholder="Subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} required/><select value={form.mode} onChange={e=>setForm({...form,mode:e.target.value})}><option value="offline">Offline</option><option value="online">Online</option></select><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required/><input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} required/><input placeholder="Campus location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/><textarea placeholder="Optional notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/><button className="primary">Send Request</button></form></section></div>
}

function Bookings({user}){
  const [items,setItems]=useState([]); const [error,setError]=useState("");
  const load=()=>api.get("/bookings").then(r=>setItems(r.data.bookings)).catch(e=>setError(e.response?.data?.message||"Unable to load sessions"));
  useEffect(()=>{load()},[]);
  const act=async(id,type)=>{try{await api.put(`/bookings/${id}/${type}`);load()}catch(e){setError(e.response?.data?.message||"Action failed")}};
  return <><div className="page-head"><div><span className="eyebrow">TUTORING SESSIONS</span><h1>My Sessions</h1><p>Manage your incoming requests and scheduled peer sessions.</p></div></div>{error&&<div className="alert">{error}</div>}
    <div className="booking-list">{items.map(b=><div className="booking" key={b._id}><div><span className={`status ${b.status}`}>{b.status}</span><h3>{b.subject}</h3><p>{String(b.learner?._id)===String(user.id)?"Tutor: ":"Learner: "}<b>{String(b.learner?._id)===String(user.id)?b.tutor?.name:b.learner?.name}</b></p><small>{b.date} • {b.time} • {b.mode} • {b.location||"Online"}</small></div><div className="booking-actions">{String(b.tutor?._id)===String(user.id)&&b.status==="pending"&&<><button className="secondary" onClick={()=>act(b._id,"reject")}>Reject</button><button className="primary" onClick={()=>act(b._id,"accept")}>Accept</button></>}{["accepted"].includes(b.status)&&<button className="primary" onClick={()=>act(b._id,"complete")}><CheckCircle2 size={16}/>Complete</button>}</div></div>)}{!items.length&&<div className="empty">No tutoring sessions yet.</div>}</div>
  </>
}

function Notifications(){
  const [items,setItems]=useState([]); const [unread,setUnread]=useState(0); const [error,setError]=useState("");
  const load=()=>api.get("/notifications").then(r=>{setItems(r.data.notifications);setUnread(r.data.unread)}).catch(e=>setError(e.response?.data?.message||"Unable to load notifications"));
  useEffect(()=>{load()},[]);
  const markRead=async(id)=>{try{await api.put(`/notifications/${id}/read`);load()}catch(e){}};
  const markAll=async()=>{try{await api.put("/notifications/read-all");load()}catch(e){}};
  return <><div className="page-head"><div><span className="eyebrow">ACTIVITY</span><h1>Notifications {unread>0&&<span className="notification-count">{unread}</span>}</h1><p>Stay updated about answers and tutoring sessions.</p></div><button className="secondary" onClick={markAll}><Bell size={16}/>Mark all as read</button></div>
    {error&&<div className="alert">{error}</div>}
    <div className="notification-list">{items.map(n=><div className={`notification ${n.read?"read":""}`} key={n._id} onClick={()=>!n.read&&markRead(n._id)}><span className="notification-icon"><Bell size={17}/></span><div><b>{n.title}</b><p>{n.message}</p><small>{new Date(n.createdAt).toLocaleString()}</small></div>{!n.read&&<span className="unread-dot"/>}</div>)}{!items.length&&<div className="empty">You're all caught up.</div>}</div>
  </>
}

function Profile({user,setUser}){
  const [form,setForm]=useState({...user,skills:(user.skills||[]).join(", "),subjects:(user.subjects||[]).join(", ")}); const [msg,setMsg]=useState("");
  const save=async e=>{e.preventDefault();try{const {data}=await api.put("/auth/profile",{...form,skills:form.skills.split(",").map(x=>x.trim()).filter(Boolean),subjects:form.subjects.split(",").map(x=>x.trim()).filter(Boolean)});setUser(data.user);setMsg("Profile updated");}catch(e){setMsg(e.response?.data?.message||"Unable to update profile")}};
  return <><div className="page-head"><div><span className="eyebrow">YOUR PROFILE</span><h1>Profile & Skills</h1><p>Tell your college peers what you can learn and teach.</p></div></div><section className="panel"><form onSubmit={save} className="form-grid two"><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" required/><input value={form.college} disabled/><input value={form.course} onChange={e=>setForm({...form,course:e.target.value})} placeholder="Course"/><input value={form.semester} onChange={e=>setForm({...form,semester:e.target.value})} placeholder="Semester"/><input value={form.subjects} onChange={e=>setForm({...form,subjects:e.target.value})} placeholder="Subjects (comma separated)"/><input value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})} placeholder="Skills (comma separated)"/><input value={form.availability||""} onChange={e=>setForm({...form,availability:e.target.value})} placeholder="Availability"/><textarea value={form.bio||""} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Short bio"/><button className="primary">Save Profile</button>{msg&&<span className="success-text">{msg}</span>}</form></section></>
}

export default function App(){
  const [user,setUser]=useState(null); const [loading,setLoading]=useState(true);
  useEffect(()=>{const token=localStorage.getItem("edubridge_token"); if(!token){setLoading(false);return;} api.get("/auth/profile").then(r=>setUser(r.data.user)).catch(()=>localStorage.removeItem("edubridge_token")).finally(()=>setLoading(false));},[]);
  if(loading)return <div className="loading">Loading EduBridge...</div>;
  return <Layout user={user} setUser={setUser}/>;
}
