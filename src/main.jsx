import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Check,
  ChevronDown,
  X,
  LayoutGrid,
  Route,
  Bookmark,
  Settings,
  Menu,
  Download,
  Upload,
  ExternalLink,
  BookOpen,
  CheckCheck,
  Clock,
  Flag,
  Plus,
  Trash2,
} from "lucide-react";
import { topics, tracks, prerequisites } from "./curriculum";
import "./style.css";
const KEY = "waypoint-progress-v1";
const empty = { done: {}, notes: {}, bookmarks: [], custom: {}, activity: [] };
function validate(v) {
  return (
    v &&
    typeof v === "object" &&
    v.done &&
    typeof v.done === "object" &&
    !Array.isArray(v.done) &&
    Object.values(v.done).every((x) => typeof x === "boolean") &&
    v.notes &&
    typeof v.notes === "object" &&
    Object.values(v.notes).every((x) => typeof x === "string") &&
    Array.isArray(v.bookmarks) &&
    v.bookmarks.every((x) => topics.some((t) => t.id === x)) &&
    v.custom &&
    typeof v.custom === "object" &&
    Object.values(v.custom).every(
      (x) =>
        Array.isArray(x) &&
        x.every(
          (y) => y && typeof y.id === "string" && typeof y.title === "string",
        ),
    ) &&
    Array.isArray(v.activity) &&
    v.activity.every(
      (x) => typeof x === "string" && !Number.isNaN(Date.parse(x)),
    )
  );
}
function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return validate(v) ? v : empty;
  } catch {
    return empty;
  }
}
function App() {
  const [data, setData] = useState(load),
    [view, setView] = useState("My learning path"),
    [phase, setPhase] = useState("All topics"),
    [status, setStatus] = useState("All progress"),
    [search, setSearch] = useState(""),
    [selected, setSelected] = useState(null),
    [notice, setNotice] = useState(""),
    [mobile, setMobile] = useState(false),
    [newTask, setNewTask] = useState(""),
    [track, setTrack] = useState("All tracks"),
    [limit, setLimit] = useState(24),
    [stepSearch, setStepSearch] = useState(""),
    [difficulty, setDifficulty] = useState("All difficulties"),
    [profile, setProfile] = useState(() => {
      try {
        return (
          JSON.parse(localStorage.getItem("waypoint-profile-v1"))?.name || ""
        );
      } catch {
        return "";
      }
    }),
    [editingName, setEditingName] = useState(
      () => !localStorage.getItem("waypoint-profile-v1"),
    ),
    [draftName, setDraftName] = useState("");
  const category = (t) =>
    track === "All tracks" ? `${t.track} · ${t.phase}` : t.phase;
  const phases = [
    ...new Set(
      topics
        .filter((t) => track === "All tracks" || t.track === track)
        .map(category),
    ),
  ];
  const initial = (Array.from(profile.trim())[0] || "?").toLocaleUpperCase();
  useEffect(() => {
    setLimit(24);
  }, [track, phase, status, search, view]);
  useEffect(() => {
    setStepSearch("");
    setDifficulty("All difficulties");
    setNewTask("");
  }, [selected]);
  function saveName(e) {
    e.preventDefault();
    const name = draftName.trim().slice(0, 60);
    if (!name) return;
    setProfile(name);
    localStorage.setItem("waypoint-profile-v1", JSON.stringify({ name }));
    setEditingName(false);
  }
  const input = useRef(),
    dialog = useRef(),
    lastFocus = useRef(),
    reduce = useReducedMotion();
  const tasks = (t) => [...t.tasks, ...(data.custom[t.id] || [])];
  const complete = (t) => tasks(t).filter((x) => data.done[x.id]).length;
  const allTasks = topics.flatMap(tasks),
    done = allTasks.filter((t) => data.done[t.id]).length,
    finished = topics.filter((t) => complete(t) === tasks(t).length).length,
    percent = Math.round((done / allTasks.length) * 100);
  const next =
    topics.find(
      (t) =>
        (track === "All tracks" || t.track === track) &&
        complete(t) < tasks(t).length,
    ) ||
    topics.find((t) => track === "All tracks" || t.track === track) ||
    topics[0];
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      setNotice(
        "Your browser could not save progress. Export a backup to keep it.",
      );
    }
  }, [data]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 6000);
    return () => clearTimeout(id);
  }, [notice]);
  useEffect(() => {
    if (selected) {
      lastFocus.current = document.activeElement;
      dialog.current?.showModal();
      dialog.current?.querySelector("button")?.focus();
    } else {
      dialog.current?.close();
      lastFocus.current?.focus();
    }
  }, [selected]);
  const update = (fn) =>
    setData((d) => ({
      ...fn(d),
      activity: [...d.activity, new Date().toISOString()].slice(-1000),
    }));
  function toggle(id) {
    update((d) => ({ ...d, done: { ...d.done, [id]: !d.done[id] } }));
  }
  function bookmark(id) {
    setData((d) => ({
      ...d,
      bookmarks: d.bookmarks.includes(id)
        ? d.bookmarks.filter((x) => x !== id)
        : [...d.bookmarks, id],
    }));
  }
  function navigate(name) {
    setView(name);
    setMobile(false);
    setSearch("");
    setPhase("All topics");
    setStatus("All progress");
  }
  function exportData() {
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            { version: 1, ...data, profile: { name: profile } },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "waypoint-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    setNotice("Your progress backup has been exported.");
  }
  async function importData(e) {
    try {
      const v = JSON.parse(await e.target.files[0].text());
      if (!validate(v)) throw Error();
      if (window.confirm("Replace current progress with this backup?")) {
        setData(v);
        if (typeof v.profile?.name === "string") {
          setProfile(v.profile.name.slice(0, 60));
          localStorage.setItem(
            "waypoint-profile-v1",
            JSON.stringify({ name: v.profile.name.slice(0, 60) }),
          );
        }
        setNotice("Your learning progress has been restored.");
      }
    } catch {
      setNotice(
        "This backup is not valid. Please choose a Waypoint JSON export.",
      );
    }
    e.target.value = "";
  }
  const filtered = topics.filter(
    (t) =>
      (track === "All tracks" || t.track === track) &&
      (phase === "All topics" || category(t) === phase) &&
      (view !== "Saved topics" || data.bookmarks.includes(t.id)) &&
      `${t.title} ${t.description} ${t.tasks.map((x) => x.title).join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All progress" ||
        (status === "Completed" && complete(t) === tasks(t).length) ||
        (status === "In progress" &&
          complete(t) > 0 &&
          complete(t) < tasks(t).length) ||
        (status === "Not started" && complete(t) === 0)),
  );
  const active = topics.find((t) => t.id === selected);
  const visibleTasks = active
    ? tasks(active).filter(
        (t) =>
          t.title.toLowerCase().includes(stepSearch.toLowerCase()) &&
          (difficulty === "All difficulties" || t.difficulty === difficulty),
      )
    : [];
  const scopedTopics = topics.filter(
    (t) => track === "All tracks" || t.track === track,
  );
  function chooseTrack(value) {
    setTrack(value);
    setPhase("All topics");
    setMobile(false);
    setLimit(24);
  }
  const days = new Set(
    data.activity.map((x) => new Date(x).toLocaleDateString()),
  ).size;
  return (
    <div className="app">
      <aside inert={editingName} className={`sidebar ${mobile ? "open" : ""}`}>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("My learning path");
          }}
        >
          <span className="brand-icon">
            w<span>✷</span>
          </span>
          waypoint<span className="brand-dot">®</span>
        </a>
        <button
          className="mobile-close icon-btn"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        >
          <X size={20} />
        </button>
        <div className="workspace">
          <span className="avatar">{initial}</span>
          <div>
            My workspace<small>Personal learning space</small>
          </div>
          <ChevronDown size={14} />
        </div>
        <div className="nav-label">YOUR SPACE</div>
        <nav>
          {[
            [LayoutGrid, "My learning path"],
            [Route, "Roadmap"],
            [Bookmark, "Saved topics"],
          ].map(([Icon, name]) => (
            <button
              key={name}
              className={view === name ? "active" : ""}
              onClick={() => navigate(name)}
            >
              <Icon size={18} />
              {name}
              {name === "My learning path" && (
                <span className="nav-count">{topics.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="nav-label phase-label">LEARNING TRACKS</div>
        <div className="track-nav">
          {["All tracks", ...tracks].map((p, i) => (
            <button
              key={p}
              className={track === p ? "selected" : ""}
              onClick={() => {
                setView("My learning path");
                chooseTrack(p);
              }}
            >
              <span className={`dot dot-${i % 5}`} />
              {p}
              <span>
                {p === "All tracks"
                  ? topics.length
                  : topics.filter((t) => t.track === p).length}
              </span>
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="little-card">
            <span className="spark">✷</span>
            <strong>
              Small steps.
              <br />
              Big possibilities.
            </strong>
            <p>Your future self will thank you for showing up today.</p>
            <span className="little-line" />
          </div>
          <button
            className={view === "Settings" ? "settings active" : "settings"}
            onClick={() => navigate("Settings")}
          >
            <Settings size={18} />
            Settings & backups
          </button>
          <div className="profile">
            <button
              className="avatar profile-avatar"
              aria-label="Edit your name"
              onClick={() => {
                setDraftName(profile);
                setEditingName(true);
              }}
            >
              {initial}
            </button>
            <div>
              {profile || "Your space"}
              <small>Curiosity is your superpower.</small>
            </div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>
      {mobile && (
        <div className="nav-backdrop" onClick={() => setMobile(false)} />
      )}
      <main inert={editingName}>
        <header>
          <div className="breadcrumb">
            <button
              className="icon-btn"
              aria-label="Open navigation"
              onClick={() => setMobile((v) => !v)}
            >
              <Menu size={18} />
            </button>
            <span>My workspace</span>
            <span className="slash">/</span>
            <strong>{view}</strong>
          </div>
          <div className="header-right">
            <span className="saved-dot" />
            Saved on this device
            <span className="header-divider" />
            <button
              className="mini-avatar"
              aria-label="Edit your name"
              onClick={() => {
                setDraftName(profile);
                setEditingName(true);
              }}
            >
              {initial}
            </button>
          </div>
        </header>
        <div className="content">
          <section className="intro">
            <div>
              <span className="eyebrow">
                <span className="tiny-spark">✷</span> THE NEXT VERSION OF YOU
              </span>
              <h1>
                {view === "Roadmap" ? (
                  "One step leads to the next."
                ) : view === "Saved topics" ? (
                  "Keep your curiosity close."
                ) : view === "Settings" ? (
                  "Make yourself at home."
                ) : (
                  <>
                    A little progress,
                    <br />
                    every day<span className="orange-period">.</span>
                  </>
                )}
              </h1>
              <p>
                {view === "Roadmap"
                  ? "A thoughtful sequence, from strong foundations to systems that scale."
                  : view === "Saved topics"
                    ? "Your bookmarked topics, ready whenever you are."
                    : view === "Settings"
                      ? "Your learning belongs to you. Keep a backup of your progress."
                      : "Big ambitions, small steps. Your personal path to becoming a better builder."}
              </p>
            </div>
            <div className="intro-art" aria-hidden="true">
              <div className="art-orbit" />
              <span className="art-star">✷</span>
              <div className="art-stair">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="art-label">KEEP GOING ↗</span>
              <span className="art-dot" />
            </div>
          </section>
          {view !== "Settings" && (
            <>
              <section className="stats">
                <div className="progress-stat">
                  <div
                    className="progress-ring"
                    style={{ "--progress": `${percent * 3.6}deg` }}
                  >
                    <span>
                      {percent}
                      <small>%</small>
                    </span>
                  </div>
                  <div>
                    <span className="stat-label">Your overall progress</span>
                    <strong>
                      {done} <span>/ {allTasks.length} steps</span>
                    </strong>
                    <small>A little closer to your goals.</small>
                  </div>
                </div>
                <div className="stat">
                  <span className="stat-label">
                    Topics completed <Flag size={16} />
                  </span>
                  <strong>
                    {String(finished).padStart(2, "0")}
                    <span> / {topics.length}</span>
                  </strong>
                  <small>Building your knowledge, piece by piece.</small>
                </div>
                <div className="stat">
                  <span className="stat-label">
                    Active learning days <span>✷</span>
                  </span>
                  <strong>
                    {String(days).padStart(2, "0")}
                    <span> days</span>
                  </strong>
                  <small>
                    {days
                      ? "Every session counts. Keep showing up."
                      : "Your first step starts something great."}
                  </small>
                </div>
              </section>
              <section className="continue-banner">
                <div className="continue-symbol">
                  <BookOpen size={23} />
                </div>
                <div>
                  <span className="eyebrow">
                    {done
                      ? "PICK UP WHERE YOU LEFT OFF"
                      : "A GOOD PLACE TO BEGIN"}
                  </span>
                  <h3>
                    {next.title} <span>· {next.phase}</span>
                  </h3>
                </div>
                <button onClick={() => setSelected(next.id)}>
                  {done ? "Continue learning" : "Start your journey"}
                  <ArrowUpRight size={17} />
                </button>
              </section>
            </>
          )}
          {view === "Settings" ? (
            <section className="settings-panel">
              <h2>Your progress, safely kept.</h2>
              <div className="name-setting">
                <span>
                  Your name: <strong>{profile || "Not set"}</strong>
                </span>
                <button
                  className="secondary"
                  onClick={() => {
                    setDraftName(profile);
                    setEditingName(true);
                  }}
                >
                  Change name
                </button>
              </div>
              <p>
                Checklists, personal notes, custom steps, and bookmarks are
                saved in this browser. They do not automatically sync between
                devices. Export a backup before changing devices or clearing
                browser data.
              </p>
              <div className="backup-actions">
                <button className="primary" onClick={exportData}>
                  <Download size={18} />
                  Export progress
                </button>
                <button
                  className="secondary"
                  onClick={() => input.current.click()}
                >
                  <Upload size={18} />
                  Import backup
                </button>
              </div>
              <h3>Keep exploring</h3>
              <a href="./genai-tracker.html" target="_blank" rel="noreferrer">
                Open your original GenAI learning tracker{" "}
                <ExternalLink size={15} />
              </a>
              <div className="settings-note">
                The roadmap contains approximately{" "}
                {topics.reduce((s, t) => s + t.hours, 0)} learning hours.
                Estimates include practice and vary with experience. Follow the
                sequence as a guide, and choose either alternative tool when it
                better fits your project.
              </div>
            </section>
          ) : (
            <section className="curriculum">
              <div className="section-heading">
                <div>
                  <h2>
                    {view === "Roadmap"
                      ? "Your roadmap"
                      : view === "Saved topics"
                        ? "Saved for later"
                        : "Your learning path"}{" "}
                    <span>
                      {view === "Saved topics"
                        ? data.bookmarks.length
                        : scopedTopics.length}
                    </span>
                  </h2>
                  <p>
                    {view === "Roadmap"
                      ? `${phases.length} categories. A clear direction. Your own pace.`
                      : "Explore a topic. Learn by doing. Make it yours."}
                  </p>
                </div>
                <button className="export-link" onClick={exportData}>
                  <Download size={15} />
                  Export progress
                </button>
              </div>
              <div className="track-overview">
                {tracks.map((name) => {
                  const group = topics.filter((t) => t.track === name),
                    n = group
                      .flatMap(tasks)
                      .filter((t) => data.done[t.id]).length,
                    total = group.flatMap(tasks).length;
                  return (
                    <button
                      key={name}
                      className={track === name ? "selected" : ""}
                      onClick={() =>
                        chooseTrack(track === name ? "All tracks" : name)
                      }
                    >
                      <strong>{name}</strong>
                      <span>
                        {group.length} topics · {n}/{total} steps
                      </span>
                      <i
                        style={{ "--track-progress": `${(n / total) * 100}%` }}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="toolbar">
                <label className="category-filter">
                  Category
                  <select
                    aria-label="Filter category"
                    value={phase}
                    onChange={(e) => setPhase(e.target.value)}
                  >
                    <option>All topics</option>
                    {phases.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <div className="filters">
                  <label className="search">
                    <Search size={16} />
                    <input
                      placeholder="Find your next skill..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      aria-label="Search topics and subtopics"
                    />
                    {search && (
                      <button
                        className="icon-btn"
                        aria-label="Clear search"
                        onClick={() => setSearch("")}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </label>
                  <label className="status-select">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      aria-label="Filter by progress"
                    >
                      <option>All progress</option>
                      <option>Not started</option>
                      <option>In progress</option>
                      <option>Completed</option>
                    </select>
                    <ChevronDown size={14} />
                  </label>
                  <span className="result-count">{filtered.length} topics</span>
                </div>
              </div>
              {view === "Roadmap" ? (
                <div className="roadmap">
                  {phases
                    .filter((p) => filtered.some((t) => category(t) === p))
                    .map((p, i) => (
                      <div key={p} className="roadmap-stage">
                        <div className="stage-heading">
                          <span>
                            {String(phases.indexOf(p) + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3>{p}</h3>
                            <p>
                              {topics.find((t) => category(t) === p)?.track}
                            </p>
                          </div>
                        </div>
                        <div className="roadmap-topics">
                          {filtered
                            .filter((t) => category(t) === p)
                            .map((t) => (
                              <button
                                key={t.id}
                                onClick={() => setSelected(t.id)}
                              >
                                <span
                                  className="topic-logo small"
                                  style={{ background: t.color }}
                                >
                                  {t.icon}
                                </span>
                                <span>
                                  {t.title}
                                  <small>
                                    {complete(t)}/{tasks(t).length} steps · ~
                                    {t.hours}h
                                  </small>
                                </span>
                                <ArrowRight size={17} />
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="topic-grid">
                  {filtered.slice(0, limit).map((t, i) => {
                    const count = complete(t),
                      total = tasks(t).length,
                      pc = Math.round((count / total) * 100);
                    return (
                      <motion.article
                        key={t.id}
                        initial={reduce ? false : { opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.025, 0.2) }}
                        className="topic-card"
                      >
                        <div className="card-top">
                          <span
                            className="topic-logo"
                            style={{ background: t.color }}
                          >
                            {t.icon}
                          </span>
                          <button
                            className={`bookmark ${data.bookmarks.includes(t.id) ? "bookmarked" : ""}`}
                            aria-label={`${data.bookmarks.includes(t.id) ? "Unsave" : "Save"} ${t.title}`}
                            aria-pressed={data.bookmarks.includes(t.id)}
                            onClick={() => bookmark(t.id)}
                          >
                            <Bookmark size={17} />
                          </button>
                        </div>
                        <span className="card-phase">
                          {t.track} / {t.phase}
                        </span>
                        <button
                          className="card-title"
                          onClick={() => setSelected(t.id)}
                        >
                          <h3>{t.title}</h3>
                          <ArrowUpRight size={20} />
                        </button>
                        <p>{t.description}</p>
                        <div className="card-meta">
                          <span>
                            <LayoutGrid size={13} />
                            {total} steps
                          </span>
                          <span>
                            <Clock size={13} />~{t.hours} hours
                          </span>
                        </div>
                        <div className="card-progress">
                          <div>
                            <i style={{ width: `${pc}%` }} />
                          </div>
                          <span>{pc}%</span>
                        </div>
                        <div className="card-footer">
                          <span
                            className={`badge ${count === total ? "complete" : count ? "in-progress" : ""}`}
                          >
                            <i />
                            {count === total
                              ? "Completed"
                              : count
                                ? "In progress"
                                : "Not started"}
                          </span>
                          <button
                            onClick={() => setSelected(t.id)}
                            aria-label={`Open ${t.title} learning path`}
                          >
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}
              {view !== "Roadmap" && filtered.length > limit && (
                <button
                  className="secondary load-more"
                  onClick={() => setLimit((n) => n + 24)}
                >
                  Show more topics ({filtered.length - limit} remaining)
                  <ArrowRight size={16} />
                </button>
              )}
              {!filtered.length && (
                <div className="empty-state">
                  <Search size={30} />
                  <h3>
                    {view === "Saved topics" && !data.bookmarks.length
                      ? "A home for your next interests."
                      : "No topics match just yet."}
                  </h3>
                  <p>
                    {view === "Saved topics" && !data.bookmarks.length
                      ? "Tap the bookmark on any topic to save it here."
                      : "Try another search or clear your filters."}
                  </p>
                  <button
                    className="secondary"
                    onClick={() => {
                      setSearch("");
                      setPhase("All topics");
                      setStatus("All progress");
                      if (view === "Saved topics") navigate("My learning path");
                    }}
                  >
                    Explore all topics <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </section>
          )}
          <footer>
            <span className="footer-brand">✷ waypoint</span>
            <p>Not a race. A journey worth taking.</p>
            <span>Made for your next chapter ↗</span>
          </footer>
        </div>
      </main>
      {editingName && (
        <div className="name-backdrop">
          <section
            className="name-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="name-title"
          >
            <span className="eyebrow">MAKE THIS SPACE YOURS</span>
            <h2 id="name-title">What should we call you?</h2>
            <p>
              Your name and first initial will appear throughout your learning
              space.
            </p>
            <form onSubmit={saveName}>
              <label>
                Your name
                <input
                  autoFocus
                  maxLength={60}
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  aria-label="Your name"
                />
              </label>
              <button className="primary" type="submit">
                {profile ? "Save name" : "Let’s get learning"}
                <ArrowRight size={16} />
              </button>
            </form>
            <button
              className="skip-name"
              onClick={() => {
                setEditingName(false);
                if (!profile)
                  localStorage.setItem(
                    "waypoint-profile-v1",
                    JSON.stringify({ name: "" }),
                  );
              }}
            >
              Skip for now
            </button>
          </section>
        </div>
      )}
      <input
        ref={input}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={importData}
      />
      <dialog
        ref={dialog}
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setSelected(null);
        }}
        aria-labelledby="topic-dialog-title"
      >
        <AnimatePresence>
          {active && (
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="topic-detail"
            >
              <div className="detail-top">
                <span className="eyebrow">
                  YOUR NEXT CHAPTER / {String(active.order).padStart(2, "0")}
                </span>
                <button
                  className="icon-btn"
                  aria-label="Close topic"
                  onClick={() => setSelected(null)}
                >
                  <X size={22} />
                </button>
              </div>
              <span
                className="topic-logo detail-logo"
                style={{ background: active.color }}
              >
                {active.icon}
              </span>
              <span className="card-phase">
                {active.phase} · ~{active.hours} hours
              </span>
              <h2 id="topic-dialog-title">{active.title}</h2>
              <p>{active.description}</p>
              <div className="detail-progress">
                <strong>
                  {complete(active)} of {tasks(active).length} steps complete
                </strong>
                <span>
                  {Math.round((complete(active) / tasks(active).length) * 100)}%
                </span>
              </div>
              <div className="big-progress">
                <i
                  style={{
                    width: `${(complete(active) / tasks(active).length) * 100}%`,
                  }}
                />
              </div>
              <div className="prereqs">
                <strong>Before you begin</strong>
                {prerequisites[active.id].length ? (
                  <div>
                    {prerequisites[active.id].map((id) => (
                      <button key={id} onClick={() => setSelected(id)}>
                        {topics.find((t) => t.id === id).title}
                        <ArrowUpRight size={12} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p>No topic prerequisites. Start here at your own pace.</p>
                )}
              </div>
              <div className="checklist-heading">
                <h3>
                  {active.track === "DSA practice"
                    ? "Question checklist"
                    : "Your learning checklist"}
                </h3>
                <button
                  onClick={() => {
                    const value = complete(active) !== tasks(active).length;
                    update((d) => ({
                      ...d,
                      done: {
                        ...d.done,
                        ...Object.fromEntries(
                          tasks(active).map((t) => [t.id, value]),
                        ),
                      },
                    }));
                  }}
                >
                  <CheckCheck size={15} />
                  {complete(active) === tasks(active).length
                    ? "Uncheck all"
                    : "Complete all"}
                </button>
              </div>
              {active.track === "Research papers" && (
                <div className="reading-guide">
                  <strong>A repeatable reading routine</strong>
                  <p>
                    Skim the abstract and conclusion. Read the core argument.
                    Write a short summary: problem, key idea, evidence,
                    limitations. Reproduce a result when practical, then mark
                    the paper complete.
                  </p>
                </div>
              )}
              <div className="step-filters">
                <label>
                  Find a step or question
                  <input
                    aria-label="Search learning steps"
                    value={stepSearch}
                    onChange={(e) => setStepSearch(e.target.value)}
                    placeholder="Search within this topic…"
                  />
                </label>
                {active.track === "DSA practice" && (
                  <label>
                    Difficulty
                    <select
                      aria-label="Question difficulty"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      {["All difficulties", "Easy", "Medium", "Hard"].map(
                        (d) => (
                          <option key={d}>{d}</option>
                        ),
                      )}
                    </select>
                  </label>
                )}
              </div>
              <div className="step-count">
                Showing {visibleTasks.length} of {tasks(active).length}{" "}
                {active.track === "DSA practice" ? "questions" : "steps"}
              </div>
              <div className="checklist">
                {visibleTasks.map((task, i) => (
                  <div
                    key={task.id}
                    className={`task ${data.done[task.id] ? "checked" : ""} ${task.project ? "project" : ""}`}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={!!data.done[task.id]}
                        onChange={() => toggle(task.id)}
                      />
                      <span className="custom-check">
                        {data.done[task.id] && <Check size={13} />}
                      </span>
                      <span>
                        {task.group && (
                          <small className="task-group">{task.group}</small>
                        )}
                        {task.project && <small>PUT IT INTO PRACTICE</small>}
                        {task.title}
                        {task.difficulty && (
                          <small
                            className={`difficulty difficulty-${task.difficulty.toLowerCase()}`}
                          >
                            {task.difficulty}
                          </small>
                        )}
                      </span>
                    </label>
                    {task.url && (
                      <div className="question-links">
                        <a
                          href={task.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${task.reading ? "Find paper" : "Practice"}: ${task.title}`}
                        >
                          {task.reading ? "Find paper" : "Practice"}
                          <ExternalLink size={13} />
                        </a>
                        {task.lesson && (
                          <a
                            href={task.lesson}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Lesson
                            <ExternalLink size={13} />
                          </a>
                        )}
                        {task.article && (
                          <a
                            href={task.article}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Article
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    )}
                    {!active.tasks.some((t) => t.id === task.id) && (
                      <button
                        className="icon-btn"
                        aria-label={`Delete ${task.title}`}
                        onClick={() =>
                          setData((d) => ({
                            ...d,
                            custom: {
                              ...d.custom,
                              [active.id]: (d.custom[active.id] || []).filter(
                                (t) => t.id !== task.id,
                              ),
                            },
                          }))
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {!visibleTasks.length && (
                <p className="no-steps">No steps match these filters.</p>
              )}
              <form
                className="add-task"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newTask.trim()) return;
                  const task = {
                    id: `custom-${crypto.randomUUID()}`,
                    title: newTask.trim(),
                  };
                  setData((d) => ({
                    ...d,
                    custom: {
                      ...d.custom,
                      [active.id]: [...(d.custom[active.id] || []), task],
                    },
                  }));
                  setNewTask("");
                }}
              >
                <Plus size={17} />
                <input
                  placeholder="Add a personal learning step..."
                  aria-label="New learning step"
                  maxLength={300}
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button disabled={!newTask.trim()} type="submit">
                  Add
                </button>
              </form>
              <a
                className="resource-link"
                href={active.url}
                target="_blank"
                rel="noreferrer"
              >
                <BookOpen size={19} />
                <span>
                  {active.source === "namaste-dsa"
                    ? "Open the original Namaste DSA sheet"
                    : active.source
                      ? "Read your complete source roadmap"
                      : "Start with the documentation"}
                  <small>
                    {active.source === "namaste-dsa"
                      ? "165 questions, classified by the source sheet"
                      : active.source === "papers"
                        ? "Paper titles are from your reading list; verify editions via Scholar."
                        : "A reference for this topic"}
                  </small>
                </span>
                <ExternalLink size={17} />
              </a>
              <label className="notes">
                <strong>Your notes & takeaways</strong>
                <textarea
                  placeholder="What clicked? What do you want to explore next?"
                  value={data.notes[active.id] || ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setData((d) => ({
                      ...d,
                      notes: { ...d.notes, [active.id]: v },
                    }));
                  }}
                />
              </label>
              <p className="local-note">
                Saved automatically in this browser. Export a backup in
                Settings.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
      {notice && (
        <div role="status" className="toast">
          {notice}
          <button
            className="icon-btn"
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
