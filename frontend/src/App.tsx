
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Globe2,
  Leaf,
  LogOut,
  MessageCircle,
  Search,
  ShieldCheck,
  Sprout,
  Sparkles,
} from "lucide-react";

import { api } from "./api";
import { useAuth } from "./auth";
import type { Lesson, Scheme } from "./types";

// ==========================================
// MAIN APPLICATION LAYOUT
// ==========================================

function Shell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <>
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">
            <Sprout size={22} />
          </span>
          SCHEMETA
        </Link>

        <nav>
          <NavLink to="/schemes">Schemes</NavLink>
          <NavLink to="/eligibility">Eligibility</NavLink>
          <NavLink to="/academy">Academy</NavLink>
          <NavLink to="/assistant">Assistant</NavLink>
          <NavLink to="/community">Community</NavLink>
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="user-pill">
                {user.name}
              </Link>

              <button
                className="icon-button"
                onClick={logout}
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-link">
                Log in
              </Link>

              <Link to="/register" className="button small">
                Get started
              </Link>
            </>
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <div className="brand">
          <span className="brand-mark">
            <Sprout size={20} />
          </span>
          SCHEMETA
        </div>

        <p>Knowledge and digital confidence for entrepreneurs.</p>

        <small>
          Verify government scheme details with the official source before
          applying.
        </small>
      </footer>
    </>
  );
}

// ==========================================
// HOME PAGE
// ==========================================


function Home() {
  return (
    <>
      <section className="hero home-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Leaf size={15} />
            GROW YOUR BUSINESS WITH CONFIDENCE
          </span>

          <h1>
            Big opportunities.
            <br />
            <em>Clear guidance.</em>
          </h1>

          <p>
            Discover government schemes, improve your digital skills,
            connect with entrepreneurs and find the guidance you need
            to take your business forward.
          </p>

          <div className="hero-actions">
            <Link className="button" to="/schemes">
              Explore schemes <ArrowRight size={17} />
            </Link>

            <Link className="button secondary" to="/academy">
              Start learning
            </Link>
          </div>

          <div className="trust-line">
            <ShieldCheck size={16} />
            Clear information. Practical learning. Local-first approach.
          </div>
        </div>

        <div className="hero-art home-hero-art">
          <div className="art-circle"></div>

          <div className="floating-card card-one">
            <Compass />
            <div>
              <b>Find opportunities</b>
              <small>Explore support options</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <BookOpen />
            <div>
              <b>Build digital skills</b>
              <small>Learn at your pace</small>
            </div>
          </div>

          <div className="plant-illustration">
            <Sprout size={120} />
          </div>

          <div className="home-art-caption">
            <span>✦</span>
            Your journey. Your growth.
          </div>
        </div>
      </section>

      <section className="home-benefit-strip">
        <div>
          <span className="benefit-symbol">⌕</span>
          <div>
            <strong>Discover</strong>
            <small>Explore opportunities</small>
          </div>
        </div>
        <div>
          <span className="benefit-symbol">▤</span>
          <div>
            <strong>Learn</strong>
            <small>Build practical skills</small>
          </div>
        </div>
        <div>
          <span className="benefit-symbol">◎</span>
          <div>
            <strong>Connect</strong>
            <small>Grow with others</small>
          </div>
        </div>
        <div>
          <span className="benefit-symbol">↗</span>
          <div>
            <strong>Progress</strong>
            <small>Take your next step</small>
          </div>
        </div>
      </section>

      <section className="section home-features">
        <div className="section-heading">
          <span className="eyebrow">
            ONE PLATFORM, MANY POSSIBILITIES
          </span>

          <h2>Everything you need to move forward</h2>

          <p>
            Practical tools designed around the everyday needs of
            entrepreneurs.
          </p>
        </div>

        <div className="feature-grid">
          <Feature
            icon={<Compass />}
            title="Discover schemes"
            body="Explore scheme information, eligibility guidance and application steps."
          />

          <Feature
            icon={<BookOpen />}
            title="Learn digital skills"
            body="Build confidence with practical lessons for running a business online."
          />

          <Feature
            icon={<MessageCircle />}
            title="Get guidance"
            body="Ask questions and find clear next steps in your preferred language."
          />
        </div>

        <div className="home-extra-features">
          <Link to="/eligibility" className="home-extra-card">
            <span className="home-extra-icon">✓</span>
            <div>
              <h3>Check your eligibility</h3>
              <p>Explore schemes that may match your business profile.</p>
              <strong>Check eligibility <ArrowRight size={15} /></strong>
            </div>
          </Link>

          <Link to="/community" className="home-extra-card">
            <span className="home-extra-icon">◎</span>
            <div>
              <h3>Join the community</h3>
              <p>Share experiences, exchange ideas and learn together.</p>
              <strong>Explore community <ArrowRight size={15} /></strong>
            </div>
          </Link>

          <Link to="/dashboard" className="home-extra-card">
            <span className="home-extra-icon">▦</span>
            <div>
              <h3>Your personal dashboard</h3>
              <p>Keep your saved opportunities and learning progress organised.</p>
              <strong>View dashboard <ArrowRight size={15} /></strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="home-how-section">
        <div className="section-heading">
          <span className="eyebrow">GETTING STARTED</span>
          <h2>Your journey starts with three simple steps</h2>
          <p>
            SCHEMETA brings useful information and practical learning
            together in one place.
          </p>
        </div>

        <div className="home-steps">
          <div className="home-step">
            <span className="home-step-number">01</span>
            <div className="home-step-icon">⌕</div>
            <h3>Explore</h3>
            <p>
              Discover government schemes and opportunities relevant
              to your business.
            </p>
          </div>

          <div className="home-step">
            <span className="home-step-number">02</span>
            <div className="home-step-icon">▤</div>
            <h3>Understand</h3>
            <p>
              Learn about eligibility, required documents and practical
              digital business skills.
            </p>
          </div>

          <div className="home-step">
            <span className="home-step-number">03</span>
            <div className="home-step-icon">↗</div>
            <h3>Take action</h3>
            <p>
              Use the information and resources to plan your next
              business step.
            </p>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="eyebrow">YOUR NEXT STEP STARTS HERE</span>
          <h2>Ready to discover what's possible?</h2>
          <p>
            Start exploring opportunities, learn something new and
            take your business forward with SCHEMETA.
          </p>
        </div>

        <Link className="button home-cta-button" to="/schemes">
          Explore SCHEMETA <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}


// ==========================================
// REUSABLE FEATURE CARD
// ==========================================

function Feature({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="feature-card">
      <span className="feature-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

// ==========================================
// SCHEME EXPLORER
// ==========================================


function Schemes() {
  const [items, setItems] = useState<Scheme[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      api
        .get("/api/schemes", {
          params: { search: query },
        })
        .then((response) => {
          setItems(response.data);
          setError("");
        })
        .catch(() => {
          setError(
            "Could not load schemes. Check that the backend and database are running."
          );
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category).filter(Boolean))),
  ];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section className="page schemes-page">
      <div className="schemes-hero">
        <div className="schemes-hero-content">
          <span className="eyebrow">
            <span className="live-dot" />
            SCHEMETA · OPPORTUNITY EXPLORER
          </span>

          <h1>
            Find the right support.
            <br />
            <em>Build your next chapter.</em>
          </h1>

          <p>
            Explore government schemes, financial assistance and
            opportunities that can help your business grow.
          </p>

          <div className="schemes-trust">
            <span>Discover opportunities</span>
            <span className="trust-separator">·</span>
            <span>Understand eligibility</span>
            <span className="trust-separator">·</span>
            <span>Explore benefits</span>
          </div>
        </div>

        <div className="schemes-hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-center">
            <span className="visual-leaf">✳</span>
            <strong>Grow</strong>
            <small>with the right support</small>
          </div>
          <div className="visual-note note-top">
            <span>✦</span>
            <div>
              <b>Explore</b>
              <small>New opportunities</small>
            </div>
          </div>
          <div className="visual-note note-bottom">
            <span>↗</span>
            <div>
              <b>Move forward</b>
              <small>One step at a time</small>
            </div>
          </div>
        </div>
      </div>

      <div className="schemes-toolbar">
        <div className="schemes-toolbar-heading">
          <div>
            <span className="eyebrow">YOUR OPPORTUNITIES</span>
            <h2>Explore schemes</h2>
            <p>Find support that matches your goals.</p>
          </div>

          <div className="scheme-count">
            <strong>{filteredItems.length}</strong>
            <span>schemes found</span>
          </div>
        </div>

        <label className="schemes-search">
          <Search size={20} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveCategory("All");
            }}
            placeholder="Search by scheme name, business need or category..."
          />
          {query && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <div className="scheme-filters">
          <span className="filter-label">CATEGORIES</span>
          <div className="filter-chips">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`filter-chip ${
                  activeCategory === category ? "selected" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="scheme-grid enhanced-scheme-grid">
        {filteredItems.map((scheme, index) => (
          <Link
            className="scheme-card enhanced-scheme-card"
            to={`/schemes/${scheme.id}`}
            key={scheme.id}
          >
            <div className="enhanced-card-top">
              <span className="scheme-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="status">
                {scheme.verification_status}
              </span>
            </div>

            <span className="scheme-category">
              {scheme.category}
            </span>

            <h3>{scheme.name}</h3>

            <p>{scheme.summary}</p>

            <div className="enhanced-card-footer">
              <span>Explore scheme</span>
              <span className="scheme-arrow">
                <ArrowRight size={17} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!filteredItems.length && !error && (
        <div className="schemes-empty">
          <div className="empty-symbol">⌕</div>
          <h3>No matching schemes found</h3>
          <p>Try another search or choose a different category.</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="schemes-disclaimer">
        <span>ⓘ</span>
        <p>
          Scheme information is provided for discovery and learning.
          Always check the official government source for current
          eligibility, benefits and application requirements before applying.
        </p>
      </div>
    </section>
  );
}


// ==========================================
// SCHEME DETAILS
// ==========================================


function SchemeDetail() {
  const { id } = useParams();

  const [item, setItem] = useState<Scheme | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItem(null);
    setMessage("");

    api
      .get(`/api/schemes/${id}`)
      .then((response) => setItem(response.data))
      .catch(() => setMessage("Scheme could not be found."));
  }, [id]);

  const save = async () => {
    if (saving) return;

    setSaving(true);
    setMessage("");

    try {
      await api.post(`/api/schemes/${id}/save`);
      setMessage("Scheme saved to your account successfully.");
    } catch {
      setMessage("Please log in to save this scheme.");
    } finally {
      setSaving(false);
    }
  };

  if (message && !item) {
    return (
      <section className="page">
        <div className="detail-error">
          <h2>Scheme unavailable</h2>
          <p>{message}</p>
          <Link to="/schemes" className="button">
            Back to schemes
          </Link>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="page">
        <div className="detail-loading">Loading scheme details...</div>
      </section>
    );
  }

  const sections = [
    {
      number: "01",
      title: "Eligibility",
      subtitle: "Who can apply",
      icon: "✓",
      value: item.eligibility,
    },
    {
      number: "02",
      title: "Benefits",
      subtitle: "What support is offered",
      icon: "₹",
      value: item.benefits,
    },
    {
      number: "03",
      title: "Required documents",
      subtitle: "Keep these documents ready",
      icon: "▤",
      value: item.documents,
    },
    {
      number: "04",
      title: "Application process",
      subtitle: "Steps to get started",
      icon: "↗",
      value: item.application_steps,
    },
  ];

  return (
    <section className="page scheme-detail-page">
      <Link to="/schemes" className="detail-back">
        <span>←</span> Back to all schemes
      </Link>

      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-labels">
            <span className="detail-category">{item.category}</span>
            <span className="detail-status">
              {item.verification_status}
            </span>
          </div>

          <span className="eyebrow">SCHEME OVERVIEW</span>

          <h1>{item.name}</h1>

          <p className="detail-summary">{item.summary}</p>

          <div className="detail-hero-bottom">
            <span>Explore the scheme details below</span>
            <span>↓</span>
          </div>
        </div>

        <div className="detail-hero-art">
          <div className="detail-art-circle">
            <span>✳</span>
            <strong>Opportunity</strong>
            <small>Start with the right information</small>
          </div>
          <div className="detail-art-tag">
            <span>✓</span>
            <div>
              <b>Understand</b>
              <small>Before you apply</small>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-verification">
        <ShieldCheck size={20} />
        <div>
          <strong>Information and verification notice</strong>
          <p>
            This record is currently marked as{" "}
            <b>{item.verification_status}</b>. Confirm the latest
            eligibility, benefits and application details through an
            official source before relying on this information.
          </p>
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-section-heading">
            <span className="eyebrow">UNDERSTANDING THE SCHEME</span>
            <h2>Everything you need to know</h2>
            <p>
              Review the information below before proceeding with an
              application.
            </p>
          </div>

          <div className="detail-info-grid">
            {sections.map((section) => (
              <article className="detail-info-card" key={section.number}>
                <div className="detail-info-top">
                  <span className="detail-info-icon">{section.icon}</span>
                  <span className="detail-info-number">
                    {section.number}
                  </span>
                </div>

                <h3>{section.title}</h3>
                <span className="detail-info-subtitle">
                  {section.subtitle}
                </span>

                <p>{section.value || "Information not provided."}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="detail-action-card">
            <span className="eyebrow">KEEP THIS OPPORTUNITY</span>
            <h3>Save this scheme</h3>
            <p>
              Keep this scheme in your account so you can revisit its
              information later.
            </p>

            <button
              className="button detail-save-button"
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving..." : "♡  Save scheme"}
            </button>

            {message && (
              <p className="detail-feedback" role="status">
                {message}
              </p>
            )}
          </div>

          <div className="detail-source-card">
            <span className="eyebrow">SOURCE INFORMATION</span>
            <h3>Where to find more</h3>

            <div className="detail-source-row">
              <span>Source</span>
              <strong>{item.source_name || "Not provided"}</strong>
            </div>

            <div className="detail-source-row">
              <span>Record status</span>
              <strong>{item.verification_status}</strong>
            </div>

            {item.official_url ? (
              <a
                className="detail-official-link"
                href={item.official_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit official website <span>↗</span>
              </a>
            ) : (
              <p className="detail-no-link">
                An official website link has not been provided.
              </p>
            )}
          </div>

          <div className="detail-help-card">
            <span>✦</span>
            <div>
              <strong>Take your time</strong>
              <p>
                Review the requirements and verify the information
                before submitting an application.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="detail-bottom-note">
        <ShieldCheck size={18} />
        <p>
          SCHEMETA helps you discover opportunities. Final approval,
          eligibility and programme availability are determined by the
          respective government authorities.
        </p>
      </div>
    </section>
  );
}


// ==========================================
// REUSABLE INFORMATION BLOCK
// ==========================================

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="info-block">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

// ==========================================
// DIGITAL SKILLS ACADEMY
// ==========================================



function Academy() {
  const [items, setItems] = useState<Lesson[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const loadAcademy = async () => {
      try {
        const [lessonsResponse, progressResponse] = await Promise.all([
          api.get("/api/lessons"),
          api.get("/api/lessons/progress").catch(() => ({
            data: { completed_lesson_ids: [] },
          })),
        ]);

        setItems(lessonsResponse.data);
        setCompletedIds(
          progressResponse.data.completed_lesson_ids || []
        );
      } catch (error) {
        console.error("Academy loading error:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadAcademy();
  }, []);

  const markComplete = async (lessonId: number) => {
    setActionMessage("");

    try {
      await api.post(`/api/lessons/${lessonId}/complete`);

      setCompletedIds((previous) =>
        previous.includes(lessonId)
          ? previous
          : [...previous, lessonId]
      );

      setActionMessage("Your learning progress has been updated.");
    } catch {
      setActionMessage("Please log in to save your learning progress.");
    }
  };

  const completedCount = items.filter((lesson) =>
    completedIds.includes(lesson.id)
  ).length;

  const progress = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  const categories = [
    "All",
    ...Array.from(
      new Set(items.map((lesson) => lesson.category).filter(Boolean))
    ),
  ];

  const filteredLessons = items.filter((lesson) => {
    const matchesCategory =
      activeCategory === "All" || lesson.category === activeCategory;

    const searchText = `${lesson.title} ${lesson.category} ${lesson.level}`.toLowerCase();
    const matchesSearch = searchText.includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const openLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setActionMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="page academy-page enhanced-academy">
      {selectedLesson ? (
        <>
          <button
            className="academy-back-button"
            onClick={() => {
              setSelectedLesson(null);
              setActionMessage("");
            }}
          >
            ← Back to all lessons
          </button>

          <div className="academy-reader-hero">
            <span className="eyebrow">
              {selectedLesson.category} · {selectedLesson.level}
            </span>

            <h1>{selectedLesson.title}</h1>

            <p>
              Take your time, learn at your own pace and build skills
              you can use in your business.
            </p>

            <div className="academy-reader-meta">
              <span>
                <BookOpen size={15} /> Learning module
              </span>
              <span>
                {completedIds.includes(selectedLesson.id)
                  ? "Completed"
                  : "In progress"}
              </span>
            </div>
          </div>

          <article className="academy-reader-content">
            <div className="academy-reader-content-heading">
              <span className="eyebrow">LESSON CONTENT</span>
              <h2>What you'll learn</h2>
            </div>

            <div className="lesson-reader-content">
              {selectedLesson.content}
            </div>

            <div className="academy-reader-footer">
              {completedIds.includes(selectedLesson.id) ? (
                <span className="completed-label">
                  <CheckCircle2 size={17} />
                  Lesson completed
                </span>
              ) : (
                <button
                  className="button"
                  onClick={() => markComplete(selectedLesson.id)}
                >
                  Mark lesson complete
                  <CheckCircle2 size={16} />
                </button>
              )}
            </div>

            {actionMessage && (
              <p className="academy-action-message" role="status">
                {actionMessage}
              </p>
            )}
          </article>
        </>
      ) : (
        <>
          <div className="academy-hero">
            <div className="academy-hero-copy">
              <span className="eyebrow">
                <span className="live-dot" />
                SCHEMETA · DIGITAL SKILLS ACADEMY
              </span>

              <h1>
                Learn today.
                <br />
                <em>Grow tomorrow.</em>
              </h1>

              <p>
                Build practical digital skills, strengthen your
                business knowledge and learn at your own pace.
              </p>

              <div className="academy-hero-points">
                <span>✓ Practical lessons</span>
                <span>✓ Self-paced learning</span>
                <span>✓ Track your progress</span>
              </div>
            </div>

            <div className="academy-hero-visual">
              <div className="academy-hero-ring academy-ring-one" />
              <div className="academy-hero-ring academy-ring-two" />

              <div className="academy-hero-center">
                <BookOpen size={34} />
                <strong>Learn</strong>
                <small>One lesson at a time</small>
              </div>

              <div className="academy-floating-note">
                <CheckCircle2 size={18} />
                <div>
                  <b>Keep progressing</b>
                  <small>Your learning journey</small>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="academy-loading">
              <div className="academy-loading-icon">
                <BookOpen size={25} />
              </div>
              <h3>Preparing your learning space</h3>
              <p>Loading available lessons and your progress...</p>
            </div>
          ) : (
            <>
              <div className="academy-progress">
                <div className="academy-progress-top">
                  <div>
                    <span className="eyebrow">YOUR LEARNING JOURNEY</span>
                    <h3>Every lesson is a step forward.</h3>
                    <p>
                      Keep learning and build your digital confidence.
                    </p>
                  </div>

                  <strong>{progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="progress-caption">
                  <span>{completedCount} completed</span>
                  <span>
                    {Math.max(items.length - completedCount, 0)} remaining
                  </span>
                  <span>{items.length} total lessons</span>
                </div>
              </div>

              <div className="academy-library-heading">
                <div>
                  <span className="eyebrow">EXPLORE AND LEARN</span>
                  <h2>Your learning library</h2>
                  <p>
                    Choose a topic and start building practical skills.
                  </p>
                </div>

                <div className="academy-total-count">
                  <strong>{filteredLessons.length}</strong>
                  <span>lessons</span>
                </div>
              </div>

              <label className="academy-search">
                <Search size={19} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search lessons, topics or skill levels..."
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </label>

              <div className="academy-category-filters">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={`academy-filter ${
                      activeCategory === category ? "selected" : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {actionMessage && (
                <p className="academy-action-message" role="status">
                  {actionMessage}
                </p>
              )}

              {filteredLessons.length > 0 ? (
                <div className="academy-lesson-grid">
                  {filteredLessons.map((lesson, index) => {
                    const isCompleted = completedIds.includes(lesson.id);

                    return (
                      <article
                        className="academy-lesson-card"
                        key={lesson.id}
                      >
                        <div className="academy-lesson-card-top">
                          <span className="academy-lesson-icon">
                            <BookOpen size={21} />
                          </span>

                          {isCompleted ? (
                            <span className="completed-badge">
                              <CheckCircle2 size={14} />
                              Completed
                            </span>
                          ) : (
                            <span className="academy-lesson-number">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          )}
                        </div>

                        <div className="academy-lesson-tags">
                          <span>{lesson.category}</span>
                          <span>{lesson.level}</span>
                        </div>

                        <h3>{lesson.title}</h3>

                        <p className="academy-lesson-preview">
                          {lesson.content.replace(/\s+/g, " ").slice(0, 145)}
                          {lesson.content.length > 145 ? "..." : ""}
                        </p>

                        <div className="academy-lesson-footer">
                          <button
                            className="button secondary small"
                            onClick={() => openLesson(lesson)}
                          >
                            Read lesson <ArrowRight size={14} />
                          </button>

                          {isCompleted && (
                            <CheckCircle2
                              size={19}
                              className="academy-complete-icon"
                            />
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="academy-no-results">
                  <BookOpen size={30} />
                  <h3>No lessons found</h3>
                  <p>
                    Try another search or select a different category.
                  </p>
                  <button
                    className="button secondary"
                    onClick={() => {
                      setQuery("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {!items.length && (
                <div className="academy-no-results">
                  <BookOpen size={30} />
                  <h3>No lessons available yet</h3>
                  <p>
                    Learning content will appear here when it becomes
                    available.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}



// ==========================================
// ELIGIBILITY CHECKER
// ==========================================


function Eligibility() {
  const [state, setState] = useState("Maharashtra");
  const [category, setCategory] = useState("Small business");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response = await api.post("/api/eligibility/check", {
        state,
        business_category: category,
      });

      setResult(response.data);
    } catch {
      setResult({
        error:
          "Unable to check eligibility. Please try again when the API is available.",
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setState("Maharashtra");
    setCategory("Small business");
  };

  return (
    <section className="page eligibility-page">
      <div className="eligibility-hero">
        <div className="eligibility-hero-copy">
          <span className="eyebrow">
            <span className="live-dot" />
            SMART ELIGIBILITY ASSISTANT
          </span>

          <h1>
            Find support that
            <br />
            <em>fits your business.</em>
          </h1>

          <p>
            Answer a couple of simple questions and discover government
            scheme records that may be relevant to your business.
          </p>

          <div className="eligibility-points">
            <span>✓ Simple assessment</span>
            <span>✓ Relevant scheme matches</span>
            <span>✓ Clear explanations</span>
          </div>
        </div>

        <div className="eligibility-hero-visual">
          <div className="eligibility-visual-ring ring-one" />
          <div className="eligibility-visual-ring ring-two" />
          <div className="eligibility-visual-center">
            <span>✓</span>
            <strong>Discover</strong>
            <small>Your opportunities</small>
          </div>
          <div className="eligibility-floating-note">
            <span>✦</span>
            <div>
              <b>Personalised search</b>
              <small>Based on your details</small>
            </div>
          </div>
        </div>
      </div>

      <div className="eligibility-workspace">
        <div className="eligibility-form-panel">
          <div className="eligibility-panel-heading">
            <span className="eyebrow">YOUR BUSINESS PROFILE</span>
            <h2>Let's get to know your business.</h2>
            <p>
              Provide the details below to find potentially relevant
              scheme records.
            </p>
          </div>

          <form className="eligibility-form" onSubmit={submit}>
            <div className="eligibility-field">
              <label htmlFor="eligibility-state">
                <span className="field-icon">⌖</span>
                Your state
              </label>

              <select
                id="eligibility-state"
                value={state}
                onChange={(event) => setState(event.target.value)}
                required
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Goa">Goa</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Other">Other</option>
              </select>

              <small>
                Select the state where your business operates.
              </small>
            </div>

            <div className="eligibility-field">
              <label htmlFor="eligibility-category">
                <span className="field-icon">▦</span>
                Business category
              </label>

              <select
                id="eligibility-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="Small business">Small business</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
                <option value="Food Processing">Food processing</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
                <option value="Women entrepreneur">
                  Women entrepreneur
                </option>
                <option value="Other">Other</option>
              </select>

              <small>
                Choose the category that best describes your business.
              </small>
            </div>

            <button
              className="button eligibility-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                "Finding potential matches..."
              ) : (
                <>
                  Check my eligibility <span>→</span>
                </>
              )}
            </button>

            <p className="eligibility-form-note">
              <ShieldCheck size={15} />
              Your answers are used to search available scheme records.
            </p>
          </form>
        </div>

        <aside className="eligibility-side-panel">
          <div className="eligibility-side-icon">✳</div>
          <span className="eyebrow">HOW IT WORKS</span>
          <h3>A simpler way to discover opportunities.</h3>

          <div className="eligibility-steps">
            <div className="eligibility-step">
              <span>01</span>
              <div>
                <strong>Share your details</strong>
                <p>Tell us your state and business category.</p>
              </div>
            </div>

            <div className="eligibility-step">
              <span>02</span>
              <div>
                <strong>Explore potential matches</strong>
                <p>Review scheme records returned by the system.</p>
              </div>
            </div>

            <div className="eligibility-step">
              <span>03</span>
              <div>
                <strong>Verify before applying</strong>
                <p>Check official programme guidelines and requirements.</p>
              </div>
            </div>
          </div>

          <div className="eligibility-side-note">
            <ShieldCheck size={17} />
            <span>
              Results are indicative and do not guarantee eligibility
              or government approval.
            </span>
          </div>
        </aside>
      </div>

      {result && (
        <div className="eligibility-results" aria-live="polite">
          <div className="eligibility-results-heading">
            <div>
              <span className="eyebrow">YOUR ASSESSMENT</span>
              <h2>Potential scheme matches</h2>
              <p>
                Results for {category} in {state}.
              </p>
            </div>

            <button
              type="button"
              className="eligibility-reset"
              onClick={reset}
            >
              Start again ↗
            </button>
          </div>

          {result.error ? (
            <div className="eligibility-error">
              <strong>Assessment unavailable</strong>
              <p>{result.error}</p>
            </div>
          ) : (
            <>
              <div className="eligibility-result-notice">
                <ShieldCheck size={19} />
                <p>
                  {result.disclaimer ||
                    "These are potential matches based on the details provided. Confirm eligibility with the official scheme authority."}
                </p>
              </div>

              {result.matches?.length > 0 ? (
                <div className="eligibility-match-grid">
                  {result.matches.map((match: any) => (
                    <article
                      className="eligibility-match-card"
                      key={match.id}
                    >
                      <div className="match-card-top">
                        <span className="match-icon">✳</span>
                        <span className="match-label">
                          Potential match
                        </span>
                      </div>

                      <h3>{match.name}</h3>

                      <div className="match-reason">
                        <strong>Why it appeared</strong>
                        <p>{match.reason}</p>
                      </div>

                      <Link
                        to={`/schemes/${match.id}`}
                        className="match-view-link"
                      >
                        Explore scheme <span>→</span>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="eligibility-no-matches">
                  <span>⌕</span>
                  <h3>No potential matches found</h3>
                  <p>
                    No matching scheme records were returned for these
                    details. You can try another business category or
                    state.
                  </p>
                  <button
                    type="button"
                    className="button secondary"
                    onClick={reset}
                  >
                    Try another search
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}


// ==========================================
// AI ASSISTANT
// ==========================================


function Assistant() {
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "How can I find government schemes for my small business?",
    "How do digital payments help small businesses?",
    "How can I promote my business online?",
    "How can I protect my business from online fraud?",
  ];

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const currentMessage = message.trim();

    if (!currentMessage || loading) return;

    setQuestion(currentMessage);
    setMessage("");
    setAnswer("");
    setMode("");
    setLoading(true);

    try {
      const response = await api.post("/api/assistant/chat", {
        message: currentMessage,
        language: "en",
      });

      setAnswer(
        response.data.answer || "No response was returned. Please try again."
      );
      setMode(response.data.mode || "SCHEMETA Assistant");
    } catch {
      setAnswer("The assistant service is currently unavailable. Please try again.");
      setMode("Service unavailable");
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setQuestion("");
    setAnswer("");
    setMode("");
    setMessage("");
    setLoading(false);
  };

  return (
    <section className="page assistant-page">
      <div className="assistant-hero">
        <div className="assistant-hero-copy">
          <span className="eyebrow">
            <span className="live-dot" />
            SCHEMETA · AI ASSISTANT
          </span>

          <h1>
            Your business questions.
            <br />
            <em>Clearer answers.</em>
          </h1>

          <p>
            Get help exploring government schemes, understanding digital
            tools and building confidence in your business journey.
          </p>

          <div className="assistant-hero-points">
            <span>✓ Scheme discovery</span>
            <span>✓ Digital business guidance</span>
            <span>✓ Practical answers</span>
          </div>
        </div>

        <div className="assistant-hero-visual">
          <div className="assistant-orbit assistant-orbit-one" />
          <div className="assistant-orbit assistant-orbit-two" />

          <div className="assistant-visual-center">
            <span>✳</span>
            <strong>Ask away</strong>
            <small>Your business companion</small>
          </div>

          <div className="assistant-floating-note">
            <span>✦</span>
            <div>
              <b>Here to help</b>
              <small>One question at a time</small>
            </div>
          </div>
        </div>
      </div>

      <div className="assistant-workspace">
        <div className="assistant-chat-heading">
          <div className="assistant-avatar">
            <Sparkles size={21} />
          </div>

          <div>
            <strong>SCHEMETA Assistant</strong>
            <span>Business guidance and learning support</span>
          </div>

          <button
            type="button"
            className="assistant-new-chat"
            onClick={startNewChat}
          >
            ↻ New chat
          </button>
        </div>

        <div className="assistant-chat-body">
          {!question && !answer && !loading ? (
            <div className="assistant-welcome">
              <div className="assistant-welcome-icon">
                <Sparkles size={27} />
              </div>

              <h2>How can I help you today?</h2>

              <p>
                Ask a question or choose one of the suggestions below
                to get started.
              </p>

              <div className="assistant-suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => setMessage(suggestion)}
                  >
                    <span>✦</span>
                    {suggestion}
                    <ArrowRight size={15} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="assistant-conversation">
              <div className="assistant-user-message">
                <div className="assistant-message-avatar user-avatar">
                  <Globe2 size={16} />
                </div>

                <div className="assistant-message-content">
                  <span>You</span>
                  <p>{question}</p>
                </div>
              </div>

              {loading ? (
                <div className="assistant-bot-message">
                  <div className="assistant-message-avatar bot-avatar">
                    <Sparkles size={16} />
                  </div>

                  <div className="assistant-message-content">
                    <span>SCHEMETA Assistant</span>
                    <div className="assistant-typing">
                      <i />
                      <i />
                      <i />
                      <small>Preparing your answer...</small>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="assistant-bot-message">
                  <div className="assistant-message-avatar bot-avatar">
                    <Sparkles size={16} />
                  </div>

                  <div className="assistant-message-content">
                    <div className="assistant-answer-heading">
                      <span>SCHEMETA Assistant</span>
                      {mode && <small>{mode}</small>}
                    </div>

                    <div className="assistant-answer">
                      {answer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <form className="assistant-composer" onSubmit={submit}>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask about schemes, business growth, digital payments..."
            rows={2}
            required
            disabled={loading}
          />

          <div className="assistant-composer-bottom">
            <span>
              <ShieldCheck size={14} />
              Verify important information with official sources.
            </span>

            <button
              className="button assistant-send-button"
              type="submit"
              disabled={loading || !message.trim()}
            >
              {loading ? "Thinking..." : "Send question"}
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>

      <div className="assistant-disclaimer">
        <ShieldCheck size={17} />
        <p>
          SCHEMETA Assistant provides informational guidance. It does
          not replace official government advice or guarantee scheme
          eligibility.
        </p>
      </div>
    </section>
  );
}


// ==========================================
// ENTREPRENEUR COMMUNITY
// ==========================================


function Community() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const load = () => {
    setLoading(true);

    api
      .get("/api/community/posts")
      .then((response) => setPosts(response.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) return;

    setPublishing(true);

    try {
      await api.post("/api/community/posts", {
        title: title.trim(),
        body: body.trim(),
        category: "General",
      });

      setTitle("");
      setBody("");
      load();
    } catch {
      alert("Please log in before creating a post.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <section className="page community-page">
      <div className="community-hero">
        <div className="community-hero-content">
          <span className="eyebrow">SCHEMETA COMMUNITY</span>
          <h1>Ideas grow better when we share them.</h1>
          <p>
            Connect with entrepreneurs, exchange experiences, ask questions
            and learn from people building businesses just like yours.
          </p>

          <div className="community-hero-stats">
            <div>
              <strong>{posts.length}</strong>
              <span>Community discussions</span>
            </div>
            <div>
              <strong>One goal</strong>
              <span>Grow together</span>
            </div>
          </div>
        </div>

        <div className="community-hero-visual">
          <div className="community-visual-icon">✦</div>
          <h3>Share knowledge.</h3>
          <h3>Build connections.</h3>
          <p>Your next great idea could start with a conversation.</p>
          <div className="community-visual-decoration">COMMUNITY · GROWTH · IDEAS</div>
        </div>
      </div>

      <div className="community-section-heading">
        <div>
          <span className="eyebrow">START A CONVERSATION</span>
          <h2>Share with the community</h2>
          <p>Have a question, experience or idea? Let others learn from it.</p>
        </div>
      </div>

      <form className="community-composer" onSubmit={create}>
        <div className="community-composer-top">
          <div className="community-avatar">S</div>
          <div>
            <strong>Start a new discussion</strong>
            <span>Share something useful with fellow entrepreneurs</span>
          </div>
        </div>

        <label htmlFor="community-title">Discussion title</label>
        <input
          id="community-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What would you like to discuss?"
          maxLength={150}
          required
        />

        <label htmlFor="community-body">Your message</label>
        <textarea
          id="community-body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Share your thoughts, ask a question or tell us about your experience..."
          rows={5}
          required
        />

        <div className="community-composer-footer">
          <span>Posting in General discussion</span>
          <button className="button" type="submit" disabled={publishing}>
            {publishing ? "Publishing..." : "Publish discussion"}
          </button>
        </div>
      </form>

      <div className="community-feed-heading">
        <div>
          <span className="eyebrow">THE COMMUNITY</span>
          <h2>Recent discussions</h2>
        </div>
        <span className="community-post-count">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
      </div>

      {loading ? (
        <div className="community-empty">
          <div className="community-empty-icon">◌</div>
          <h3>Loading discussions...</h3>
          <p>Fetching the latest conversations from the community.</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="community-empty">
          <div className="community-empty-icon">✦</div>
          <h3>Be the first to start a conversation</h3>
          <p>
            There are no discussions yet. Share your first idea and help build
            the SCHEMETA community.
          </p>
        </div>
      ) : (
        <div className="community-post-list">
          {posts.map((post) => (
            <article className="community-post-card" key={post.id}>
              <div className="community-post-top">
                <div className="community-post-avatar">
                  {(post.author || "E").charAt(0).toUpperCase()}
                </div>
                <div className="community-post-author">
                  <strong>{post.author || "Community member"}</strong>
                  <span>Entrepreneur community</span>
                </div>
                <span className="community-category">
                  {post.category || "General"}
                </span>
              </div>

              <h3>{post.title}</h3>
              <p className="community-post-body">{post.body}</p>

              <div className="community-post-footer">
                <span>✦ Shared with the SCHEMETA community</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}


// ==========================================
// LOGIN AND REGISTRATION
// ==========================================

function AuthPage({
  mode,
}: {
  mode: "login" | "register";
}) {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Authentication failed. Check your details and try again."
      );
    }
  };

  return (
    <section className="page narrow auth-page">
      <div className="page-heading">
        <span className="eyebrow">WELCOME TO SCHEMETA</span>

        <h1>
          {mode === "login"
            ? "Welcome back."
            : "Create your account."}
        </h1>
      </div>

      <form className="form-card" onSubmit={submit}>
        {mode === "register" && (
          <label>
            Full name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="button" type="submit">
          {mode === "login" ? "Log in" : "Create account"}
        </button>

        <p>
          {mode === "login"
            ? "New to SCHEMETA? "
            : "Already registered? "}

          <Link
            to={mode === "login" ? "/register" : "/login"}
          >
            {mode === "login"
              ? "Create an account"
              : "Log in"}
          </Link>
        </p>
      </form>
    </section>
  );
}

// ==========================================
// USER DASHBOARD
// ==========================================


function Dashboard() {
  const { user, token } = useAuth();
  const [saved, setSaved] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setSaved([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    api
      .get("/api/schemes/saved")
      .then((response) => setSaved(response.data))
      .catch(() => setSaved([]))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <section className="page dashboard-page">
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-copy">
          <span className="eyebrow">
            <span className="live-dot" />
            YOUR ENTREPRENEUR WORKSPACE
          </span>

          <h1>
            Welcome back,
            <br />
            <em>{user?.name || "Entrepreneur"}.</em>
          </h1>

          <p>
            Your opportunities, saved schemes and business learning
            journey — all in one place.
          </p>

          <div className="dashboard-welcome-actions">
            <Link to="/schemes" className="button">
              Explore schemes <ArrowRight size={16} />
            </Link>

            <Link to="/profile" className="button secondary">
              Edit profile
            </Link>
          </div>
        </div>

        <div className="dashboard-welcome-art">
          <div className="dashboard-art-orbit dashboard-orbit-one" />
          <div className="dashboard-art-orbit dashboard-orbit-two" />

          <div className="dashboard-art-center">
            <span>✳</span>
            <strong>Grow</strong>
            <small>One step at a time</small>
          </div>

          <div className="dashboard-art-note">
            <span>✓</span>
            <div>
              <b>Your journey</b>
              <small>Starts here</small>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section-heading">
        <div>
          <span className="eyebrow">YOUR OVERVIEW</span>
          <h2>Your workspace at a glance</h2>
        </div>
      </div>

      <div className="dashboard-stat-grid">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Compass size={21} />
          </div>
          <div>
            <strong>{loading ? "—" : saved.length}</strong>
            <span>Saved schemes</span>
          </div>
          <small>Opportunities you bookmarked</small>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Globe2 size={21} />
          </div>
          <div>
            <strong className="dashboard-stat-text">
              {user?.district || "Not added"}
            </strong>
            <span>Your district</span>
          </div>
          <small>Your profile location</small>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <BookOpen size={21} />
          </div>
          <div>
            <strong className="dashboard-stat-text">
              {user?.preferred_language || "English"}
            </strong>
            <span>Preferred language</span>
          </div>
          <small>Your learning preference</small>
        </div>
      </div>

      <div className="dashboard-content-heading">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h2>Saved schemes</h2>
          <p>Return to the opportunities you want to explore.</p>
        </div>

        <Link to="/schemes" className="dashboard-view-all">
          Explore all schemes <ArrowRight size={15} />
        </Link>
      </div>

      {loading ? (
        <div className="dashboard-empty">
          <p>Loading your saved schemes...</p>
        </div>
      ) : saved.length > 0 ? (
        <div className="dashboard-saved-grid">
          {saved.map((scheme) => (
            <Link
              className="dashboard-saved-card"
              to={`/schemes/${scheme.id}`}
              key={scheme.id}
            >
              <div className="dashboard-saved-top">
                <span className="dashboard-saved-icon">
                  <Compass size={19} />
                </span>
                <span className="dashboard-saved-category">
                  {scheme.category}
                </span>
              </div>

              <h3>{scheme.name}</h3>

              <p>{scheme.summary}</p>

              <div className="dashboard-saved-footer">
                <span>View scheme details</span>
                <ArrowRight size={17} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">
            <Compass size={27} />
          </div>

          <h3>Your saved schemes will appear here</h3>

          <p>
            Explore government scheme records and save the ones
            you want to revisit later.
          </p>

          <Link to="/schemes" className="button">
            Discover schemes <ArrowRight size={16} />
          </Link>
        </div>
      )}

      <div className="dashboard-quick-section">
        <div className="dashboard-content-heading">
          <div>
            <span className="eyebrow">KEEP MOVING FORWARD</span>
            <h2>Quick actions</h2>
            <p>Continue exploring the SCHEMETA platform.</p>
          </div>
        </div>

        <div className="dashboard-quick-grid">
          <Link to="/schemes" className="dashboard-quick-card">
            <span className="quick-icon"><Compass size={21} /></span>
            <div>
              <strong>Explore schemes</strong>
              <p>Discover government support opportunities.</p>
            </div>
            <ArrowRight size={17} />
          </Link>

          <Link to="/eligibility" className="dashboard-quick-card">
            <span className="quick-icon"><ShieldCheck size={21} /></span>
            <div>
              <strong>Check eligibility</strong>
              <p>Find potentially relevant scheme records.</p>
            </div>
            <ArrowRight size={17} />
          </Link>

          <Link to="/academy" className="dashboard-quick-card">
            <span className="quick-icon"><BookOpen size={21} /></span>
            <div>
              <strong>Visit the academy</strong>
              <p>Build practical digital business skills.</p>
            </div>
            <ArrowRight size={17} />
          </Link>

          <Link to="/profile" className="dashboard-quick-card">
            <span className="quick-icon"><Globe2 size={21} /></span>
            <div>
              <strong>Update your profile</strong>
              <p>Manage your personal preferences.</p>
            </div>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <div className="dashboard-footer-note">
        <ShieldCheck size={18} />
        <p>
          Always verify scheme details and eligibility with the
          respective official government authority before applying.
        </p>
      </div>
    </section>
  );
}


// ==========================================
// USER PROFILE
// ==========================================


function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/api/users/me")
      .then((response) => setProfile(response.data))
      .catch(() => setMessage("Please log in to view your profile."))
      .finally(() => setLoading(false));
  }, []);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await api.patch("/api/users/me", profile);
      setProfile(response.data);
      setMessage("Your profile has been updated successfully.");
    } catch {
      setMessage("Could not update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    {
      title: "Personal information",
      description: "Basic information about you.",
      fields: [
        { key: "name", label: "Full name", placeholder: "Enter your full name" },
        { key: "phone", label: "Phone number", placeholder: "Enter your phone number" },
        { key: "preferred_language", label: "Preferred language", placeholder: "e.g. Marathi, Hindi, English" },
      ],
    },
    {
      title: "Business information",
      description: "Tell us about your business and activities.",
      fields: [
        { key: "business_category", label: "Business category", placeholder: "e.g. Agriculture, Retail, Food" },
      ],
    },
    {
      title: "Location details",
      description: "Help us identify opportunities relevant to your area.",
      fields: [
        { key: "state", label: "State", placeholder: "Enter your state" },
        { key: "district", label: "District", placeholder: "Enter your district" },
        { key: "taluka", label: "Taluka", placeholder: "Enter your taluka" },
        { key: "village", label: "Village / City", placeholder: "Enter your village or city" },
      ],
    },
  ];

  const initials = (profile.name || "E")
    .trim()
    .split(/\s+/)
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (loading) {
    return (
      <section className="page profile-page">
        <div className="profile-empty">
          <h3>Loading your profile...</h3>
          <p>Please wait while we retrieve your account details.</p>
        </div>
      </section>
    );
  }

  if (message === "Please log in to view your profile.") {
    return (
      <section className="page profile-page">
        <div className="profile-empty">
          <div className="profile-empty-icon">♙</div>
          <h2>Login required</h2>
          <p>Please log in to view and manage your entrepreneur profile.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page profile-page">
      <div className="profile-hero">
        <div className="profile-hero-main">
          <span className="eyebrow">YOUR SCHEMETA ACCOUNT</span>
          <h1>Build your entrepreneur profile.</h1>
          <p>
            Keep your information updated to discover opportunities and
            resources that are relevant to your business.
          </p>
        </div>

        <div className="profile-identity">
          <div className="profile-avatar">{initials}</div>
          <div>
            <h3>{profile.name || "Entrepreneur"}</h3>
            <span>SCHEMETA member</span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-form-heading">
          <div>
            <span className="eyebrow">ACCOUNT SETTINGS</span>
            <h2>Your information</h2>
            <p>Update your details whenever something changes.</p>
          </div>
          <span className="profile-edit-label">✎ Editable profile</span>
        </div>

        <form className="profile-form" onSubmit={save}>
          {sections.map((section, index) => (
            <div className="profile-section" key={section.title}>
              <div className="profile-section-heading">
                <div className="profile-section-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
              </div>

              <div className="profile-fields-grid">
                {section.fields.map((field) => (
                  <label className="profile-field" key={field.key}>
                    <span>{field.label}</span>
                    <input
                      value={profile[field.key] || ""}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        setProfile({
                          ...profile,
                          [field.key]: event.target.value,
                        })
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="profile-save-area">
            <div className="profile-save-message" aria-live="polite">
              {message && (
                <span className={message.includes("successfully") ? "success" : "error"}>
                  {message}
                </span>
              )}
            </div>

            <button className="button" type="submit" disabled={saving}>
              {saving ? "Saving changes..." : "Save profile changes"}
            </button>
          </div>
        </form>

        <div className="profile-note">
          <span>✦</span>
          <p>
            Keeping your location and business details accurate can help
            SCHEMETA show you more relevant scheme information.
          </p>
        </div>
      </div>
    </section>
  );
}


// ==========================================
// ADMIN DASHBOARD
// ==========================================


function Admin() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/admin/dashboard")
      .then((response) => setStats(response.data))
      .catch(() =>
        setError("Admin access required, or the API is unavailable.")
      )
      .finally(() => setLoading(false));
  }, []);

  const formatLabel = (key: string) =>
    key.split("_").join(" ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "object") return "Available";
    return String(value);
  };

  const statEntries = stats ? Object.entries(stats) : [];

  return (
    <section className="page admin-page">
      <div className="admin-hero">
        <div>
          <span className="eyebrow">SCHEMETA ADMINISTRATION</span>
          <h1>Platform overview.</h1>
          <p>
            Monitor platform activity and review the key figures that help
            keep the SCHEMETA community running.
          </p>
        </div>

        <div className="admin-hero-mark">
          <span>✦</span>
          <strong>ADMIN</strong>
          <small>CONTROL PANEL</small>
        </div>
      </div>

      <div className="admin-section-heading">
        <div>
          <span className="eyebrow">ANALYTICS</span>
          <h2>Dashboard statistics</h2>
          <p>Live figures returned by your SCHEMETA backend.</p>
        </div>
        <span className="admin-live-label">
          <span className="admin-live-dot"></span>
          API overview
        </span>
      </div>

      {loading ? (
        <div className="admin-state-card">
          <div className="admin-state-icon">◌</div>
          <h3>Loading dashboard...</h3>
          <p>Retrieving platform statistics.</p>
        </div>
      ) : error ? (
        <div className="admin-state-card admin-error-card">
          <div className="admin-state-icon">!</div>
          <h3>Dashboard unavailable</h3>
          <p>{error}</p>
          <button
            className="button"
            type="button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="admin-stat-grid">
            {statEntries.length > 0 ? (
              statEntries.map(([key, value], index) => (
                <div className="admin-stat-card" key={key}>
                  <div className="admin-stat-top">
                    <span className="admin-stat-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="admin-stat-symbol">↗</span>
                  </div>
                  <strong>{formatValue(value)}</strong>
                  <span className="admin-stat-label">
                    {formatLabel(key)}
                  </span>
                </div>
              ))
            ) : (
              <div className="admin-state-card">
                <h3>No statistics available</h3>
                <p>The dashboard API returned no statistics.</p>
              </div>
            )}
          </div>

          <div className="admin-information">
            <div className="admin-information-icon">✓</div>
            <div>
              <strong>Dashboard connected</strong>
              <p>
                Statistics displayed above are fetched from the existing
                SCHEMETA admin dashboard endpoint.
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}


// ==========================================
// 404 PAGE
// ==========================================

function NotFound() {
  return (
    <section className="page narrow">
      <h1>Page not found</h1>

      <Link to="/" className="button">
        Return home
      </Link>
    </section>
  );
}

// ==========================================
// APPLICATION ROUTES
// ==========================================

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/schemes" element={<Schemes />} />
        <Route
          path="/schemes/:id"
          element={<SchemeDetail />}
        />

        <Route
          path="/eligibility"
          element={<Eligibility />}
        />

        <Route path="/academy" element={<Academy />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/community" element={<Community />} />

        <Route
          path="/login"
          element={<AuthPage mode="login" />}
        />

        <Route
          path="/register"
          element={<AuthPage mode="register" />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  );
}
