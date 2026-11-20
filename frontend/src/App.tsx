import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("schemeta_language", language);
  };

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
          <NavLink to="/schemes">{t("nav.schemes")}</NavLink>
          <NavLink to="/eligibility">{t("nav.eligibility")}</NavLink>
          <NavLink to="/academy">{t("nav.academy")}</NavLink>
          <NavLink to="/assistant">{t("nav.assistant")}</NavLink>
          <NavLink to="/community">{t("nav.community")}</NavLink>
        </nav>

        <div className="nav-actions">
          <select
            className="language-select"
            value={i18n.language}
            onChange={(event) => changeLanguage(event.target.value)}
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>

          {user ? (
            <>
              <Link to="/dashboard" className="user-pill">
                {user.name}
              </Link>

              <button
                className="icon-button"
                onClick={logout}
                title={t("nav.logout")}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-link">
                {t("nav.login")}
              </Link>

              <Link to="/register" className="button small">
                {t("nav.getStarted")}
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
  const { t } = useTranslation();

  return (
    <>
      <section className="hero home-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Leaf size={15} />
            {t("home.eyebrow")}
          </span>

          <h1>
            {t("home.title")}
            <br />
            <em>{t("home.subtitle")}</em>
          </h1>

          <p>{t("home.description")}</p>

          <div className="hero-actions">
            <Link className="button" to="/schemes">
              {t("home.explore")} <ArrowRight size={17} />
            </Link>

            <Link className="button secondary" to="/academy">
              {t("home.learn")}
            </Link>
          </div>

          <div className="trust-line">
            <ShieldCheck size={16} />
            {t("home.trust")}
          </div>
        </div>

        <div className="hero-art home-hero-art">
          <div className="art-circle"></div>

          <div className="floating-card card-one">
            <Compass />
            <div>
              <b>{t("home.findTitle")}</b>
              <small>{t("home.findDescription")}</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <BookOpen />
            <div>
              <b>{t("home.skillsTitle")}</b>
              <small>{t("home.skillsDescription")}</small>
            </div>
          </div>

          <div className="plant-illustration">
            <Sprout size={120} />
          </div>

          <div className="home-art-caption">
            <span>✦</span>
            {t("home.artCaption")}
          </div>
        </div>
      </section>

      <section className="home-benefit-strip">
        {["discover", "learnBenefit", "connect", "progress"].map((item, index) => (
          <div key={item}>
            <span className="benefit-symbol">
              {["⌕", "▤", "◎", "↗"][index]}
            </span>
            <div>
              <strong>{t(`home.benefits.${item}.title`)}</strong>
              <small>{t(`home.benefits.${item}.description`)}</small>
            </div>
          </div>
        ))}
      </section>

      <section className="section home-features">
        <div className="section-heading">
          <span className="eyebrow">{t("home.featuresEyebrow")}</span>
          <h2>{t("home.featuresTitle")}</h2>
          <p>{t("home.featuresDescription")}</p>
        </div>

        <div className="feature-grid">
          <Feature
            icon={<Compass />}
            title={t("home.feature1Title")}
            body={t("home.feature1Description")}
          />

          <Feature
            icon={<BookOpen />}
            title={t("home.feature2Title")}
            body={t("home.feature2Description")}
          />

          <Feature
            icon={<MessageCircle />}
            title={t("home.feature3Title")}
            body={t("home.feature3Description")}
          />
        </div>

        <div className="home-extra-features">
          <Link to="/eligibility" className="home-extra-card">
            <span className="home-extra-icon">✓</span>
            <div>
              <h3>{t("home.eligibilityTitle")}</h3>
              <p>{t("home.eligibilityDescription")}</p>
              <strong>{t("home.eligibilityLink")} <ArrowRight size={15} /></strong>
            </div>
          </Link>

          <Link to="/community" className="home-extra-card">
            <span className="home-extra-icon">◎</span>
            <div>
              <h3>{t("home.communityTitle")}</h3>
              <p>{t("home.communityDescription")}</p>
              <strong>{t("home.communityLink")} <ArrowRight size={15} /></strong>
            </div>
          </Link>

          <Link to="/dashboard" className="home-extra-card">
            <span className="home-extra-icon">▦</span>
            <div>
              <h3>{t("home.dashboardTitle")}</h3>
              <p>{t("home.dashboardDescription")}</p>
              <strong>{t("home.dashboardLink")} <ArrowRight size={15} /></strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="home-how-section">
        <div className="section-heading">
          <span className="eyebrow">{t("home.stepsEyebrow")}</span>
          <h2>{t("home.stepsTitle")}</h2>
          <p>{t("home.stepsDescription")}</p>
        </div>

        <div className="home-steps">
          {["explore", "understand", "action"].map((step, index) => (
            <div className="home-step" key={step}>
              <span className="home-step-number">0{index + 1}</span>
              <div className="home-step-icon">
                {["⌕", "▤", "↗"][index]}
              </div>
              <h3>{t(`home.steps.${step}.title`)}</h3>
              <p>{t(`home.steps.${step}.description`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="eyebrow">{t("home.ctaEyebrow")}</span>
          <h2>{t("home.ctaTitle")}</h2>
          <p>{t("home.ctaDescription")}</p>
        </div>

        <Link className="button home-cta-button" to="/schemes">
          {t("home.ctaButton")} <ArrowRight size={17} />
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
  const { t } = useTranslation();

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
          setError(t("schemes.error"));
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [query, t]);

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
            {t("schemes.eyebrow")}
          </span>

          <h1>
            {t("schemes.heroTitle")}
            <br />
            <em>{t("schemes.heroSubtitle")}</em>
          </h1>

          <p>{t("schemes.heroDescription")}</p>

          <div className="schemes-trust">
            <span>{t("schemes.trust1")}</span>
            <span className="trust-separator">·</span>
            <span>{t("schemes.trust2")}</span>
            <span className="trust-separator">·</span>
            <span>{t("schemes.trust3")}</span>
          </div>
        </div>

        <div className="schemes-hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-center">
            <span className="visual-leaf">✳</span>
            <strong>{t("schemes.grow")}</strong>
            <small>{t("schemes.growDescription")}</small>
          </div>
          <div className="visual-note note-top">
            <span>✦</span>
            <div>
              <b>{t("schemes.explore")}</b>
              <small>{t("schemes.newOpportunities")}</small>
            </div>
          </div>
          <div className="visual-note note-bottom">
            <span>↗</span>
            <div>
              <b>{t("schemes.moveForward")}</b>
              <small>{t("schemes.oneStep")}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="schemes-toolbar">
        <div className="schemes-toolbar-heading">
          <div>
            <span className="eyebrow">{t("schemes.opportunities")}</span>
            <h2>{t("schemes.exploreSchemes")}</h2>
            <p>{t("schemes.toolbarDescription")}</p>
          </div>

          <div className="scheme-count">
            <strong>{filteredItems.length}</strong>
            <span>{t("schemes.schemesFound")}</span>
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
            placeholder={t("schemes.searchPlaceholder")}
          />
          {query && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setQuery("")}
              aria-label={t("schemes.clearSearch")}
            >
              ×
            </button>
          )}
        </label>

        <div className="scheme-filters">
          <span className="filter-label">{t("schemes.categories")}</span>
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
                {category === "All" ? t("schemes.all") : category}
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

            <span className="scheme-category">{scheme.category}</span>

            <h3>{scheme.name}</h3>

            <p>{scheme.summary}</p>

            <div className="enhanced-card-footer">
              <span>{t("schemes.exploreScheme")}</span>
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
          <h3>{t("schemes.noResults")}</h3>
          <p>{t("schemes.noResultsDescription")}</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
          >
            {t("schemes.clearFilters")}
          </button>
        </div>
      )}

      <div className="schemes-disclaimer">
        <span>ⓘ</span>
        <p>{t("schemes.disclaimer")}</p>
      </div>
    </section>
  );
}



// ==========================================
// SCHEME DETAILS
// ==========================================



function SchemeDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [item, setItem] = useState<Scheme | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItem(null);
    setMessage("");

    api
      .get(`/api/schemes/${id}`)
      .then((response) => setItem(response.data))
      .catch(() => setMessage(t("schemeDetail.notFound")));
  }, [id, t]);

  const save = async () => {
    if (saving) return;

    setSaving(true);
    setMessage("");

    try {
      await api.post(`/api/schemes/${id}/save`);
      setMessage(t("schemeDetail.saved"));
    } catch {
      setMessage(t("schemeDetail.loginRequired"));
    } finally {
      setSaving(false);
    }
  };

  if (message && !item) {
    return (
      <section className="page">
        <div className="detail-error">
          <h2>{t("schemeDetail.unavailable")}</h2>
          <p>{message}</p>
          <Link to="/schemes" className="button">
            {t("schemeDetail.backToSchemes")}
          </Link>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="page">
        <div className="detail-loading">
          {t("schemeDetail.loading")}
        </div>
      </section>
    );
  }

  const sections = [
    {
      number: "01",
      title: t("schemeDetail.eligibility"),
      subtitle: t("schemeDetail.eligibilitySubtitle"),
      icon: "✓",
      value: item.eligibility,
    },
    {
      number: "02",
      title: t("schemeDetail.benefits"),
      subtitle: t("schemeDetail.benefitsSubtitle"),
      icon: "₹",
      value: item.benefits,
    },
    {
      number: "03",
      title: t("schemeDetail.documents"),
      subtitle: t("schemeDetail.documentsSubtitle"),
      icon: "▤",
      value: item.documents,
    },
    {
      number: "04",
      title: t("schemeDetail.process"),
      subtitle: t("schemeDetail.processSubtitle"),
      icon: "↗",
      value: item.application_steps,
    },
  ];

  return (
    <section className="page scheme-detail-page">
      <Link to="/schemes" className="detail-back">
        <span>←</span> {t("schemeDetail.back")}
      </Link>

      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-labels">
            <span className="detail-category">{item.category}</span>
            <span className="detail-status">
              {item.verification_status}
            </span>
          </div>

          <span className="eyebrow">
            {t("schemeDetail.overview")}
          </span>

          <h1>{item.name}</h1>

          <p className="detail-summary">{item.summary}</p>

          <div className="detail-hero-bottom">
            <span>{t("schemeDetail.exploreBelow")}</span>
            <span>↓</span>
          </div>
        </div>

        <div className="detail-hero-art">
          <div className="detail-art-circle">
            <span>✳</span>
            <strong>{t("schemeDetail.opportunity")}</strong>
            <small>{t("schemeDetail.startWithInfo")}</small>
          </div>
          <div className="detail-art-tag">
            <span>✓</span>
            <div>
              <b>{t("schemeDetail.understand")}</b>
              <small>{t("schemeDetail.beforeApplying")}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-verification">
        <ShieldCheck size={20} />
        <div>
          <strong>{t("schemeDetail.verificationTitle")}</strong>
          <p>
            {t("schemeDetail.verificationDescription")}{" "}
            <b>{item.verification_status}</b>.{" "}
            {t("schemeDetail.verificationReminder")}
          </p>
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-section-heading">
            <span className="eyebrow">
              {t("schemeDetail.understanding")}
            </span>
            <h2>{t("schemeDetail.everythingToKnow")}</h2>
            <p>{t("schemeDetail.reviewInformation")}</p>
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

                <p>
                  {section.value || t("schemeDetail.notProvided")}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="detail-action-card">
            <span className="eyebrow">
              {t("schemeDetail.keepOpportunity")}
            </span>
            <h3>{t("schemeDetail.saveTitle")}</h3>
            <p>{t("schemeDetail.saveDescription")}</p>

            <button
              className="button detail-save-button"
              onClick={save}
              disabled={saving}
            >
              {saving
                ? t("schemeDetail.saving")
                : `♡  ${t("schemeDetail.saveButton")}`}
            </button>

            {message && (
              <p className="detail-feedback" role="status">
                {message}
              </p>
            )}
          </div>

          <div className="detail-source-card">
            <span className="eyebrow">
              {t("schemeDetail.sourceInfo")}
            </span>
            <h3>{t("schemeDetail.sourceTitle")}</h3>

            <div className="detail-source-row">
              <span>{t("schemeDetail.source")}</span>
              <strong>
                {item.source_name || t("schemeDetail.notProvided")}
              </strong>
            </div>

            <div className="detail-source-row">
              <span>{t("schemeDetail.recordStatus")}</span>
              <strong>{item.verification_status}</strong>
            </div>

            {item.official_url ? (
              <a
                className="detail-official-link"
                href={item.official_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("schemeDetail.visitOfficial")} <span>↗</span>
              </a>
            ) : (
              <p className="detail-no-link">
                {t("schemeDetail.noOfficialLink")}
              </p>
            )}
          </div>

          <div className="detail-help-card">
            <span>✦</span>
            <div>
              <strong>{t("schemeDetail.takeYourTime")}</strong>
              <p>{t("schemeDetail.takeYourTimeDescription")}</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="detail-bottom-note">
        <ShieldCheck size={18} />
        <p>{t("schemeDetail.finalNotice")}</p>
      </div>
    </section>
  );
}




// ==========================================
// DIGITAL SKILLS ACADEMY
// ==========================================




function Academy() {
  const { t } = useTranslation();
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
        setCompletedIds(progressResponse.data.completed_lesson_ids || []);
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
        previous.includes(lessonId) ? previous : [...previous, lessonId]
      );

      setActionMessage(t("academy.progressUpdated"));
    } catch {
      setActionMessage(t("academy.loginRequired"));
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
    ...Array.from(new Set(items.map((lesson) => lesson.category).filter(Boolean))),
  ];

  const filteredLessons = items.filter((lesson) => {
    const matchesCategory =
      activeCategory === "All" || lesson.category === activeCategory;

    const searchText =
      `${lesson.title} ${lesson.category} ${lesson.level}`.toLowerCase();

    return matchesCategory && searchText.includes(query.toLowerCase());
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
            ← {t("academy.back")}
          </button>

          <div className="academy-reader-hero">
            <span className="eyebrow">
              {selectedLesson.category} · {selectedLesson.level}
            </span>

            <h1>{selectedLesson.title}</h1>

            <p>{t("academy.readerDescription")}</p>

            <div className="academy-reader-meta">
              <span><BookOpen size={15} /> {t("academy.module")}</span>
              <span>
                {completedIds.includes(selectedLesson.id)
                  ? t("academy.completed")
                  : t("academy.inProgress")}
              </span>
            </div>
          </div>

          <article className="academy-reader-content">
            <div className="academy-reader-content-heading">
              <span className="eyebrow">{t("academy.lessonContent")}</span>
              <h2>{t("academy.whatLearn")}</h2>
            </div>

            <div className="lesson-reader-content">
              {selectedLesson.content}
            </div>

            <div className="academy-reader-footer">
              {completedIds.includes(selectedLesson.id) ? (
                <span className="completed-label">
                  <CheckCircle2 size={17} />
                  {t("academy.lessonCompleted")}
                </span>
              ) : (
                <button
                  className="button"
                  onClick={() => markComplete(selectedLesson.id)}
                >
                  {t("academy.markComplete")}
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
                {t("academy.eyebrow")}
              </span>

              <h1>
                {t("academy.heroTitle")}
                <br />
                <em>{t("academy.heroSubtitle")}</em>
              </h1>

              <p>{t("academy.heroDescription")}</p>

              <div className="academy-hero-points">
                <span>✓ {t("academy.point1")}</span>
                <span>✓ {t("academy.point2")}</span>
                <span>✓ {t("academy.point3")}</span>
              </div>
            </div>

            <div className="academy-hero-visual">
              <div className="academy-hero-ring academy-ring-one" />
              <div className="academy-hero-ring academy-ring-two" />

              <div className="academy-hero-center">
                <BookOpen size={34} />
                <strong>{t("academy.learn")}</strong>
                <small>{t("academy.oneLesson")}</small>
              </div>

              <div className="academy-floating-note">
                <CheckCircle2 size={18} />
                <div>
                  <b>{t("academy.keepProgressing")}</b>
                  <small>{t("academy.learningJourney")}</small>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="academy-loading">
              <div className="academy-loading-icon">
                <BookOpen size={25} />
              </div>
              <h3>{t("academy.preparing")}</h3>
              <p>{t("academy.loading")}</p>
            </div>
          ) : (
            <>
              <div className="academy-progress">
                <div className="academy-progress-top">
                  <div>
                    <span className="eyebrow">{t("academy.journey")}</span>
                    <h3>{t("academy.everyLesson")}</h3>
                    <p>{t("academy.progressDescription")}</p>
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
                  <span>{completedCount} {t("academy.completedCount")}</span>
                  <span>
                    {Math.max(items.length - completedCount, 0)} {t("academy.remaining")}
                  </span>
                  <span>{items.length} {t("academy.totalLessons")}</span>
                </div>
              </div>

              <div className="academy-library-heading">
                <div>
                  <span className="eyebrow">{t("academy.exploreLearn")}</span>
                  <h2>{t("academy.library")}</h2>
                  <p>{t("academy.libraryDescription")}</p>
                </div>

                <div className="academy-total-count">
                  <strong>{filteredLessons.length}</strong>
                  <span>{t("academy.lessons")}</span>
                </div>
              </div>

              <label className="academy-search">
                <Search size={19} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("academy.searchPlaceholder")}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label={t("academy.clearSearch")}
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
                    {category === "All" ? t("academy.all") : category}
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
                      <article className="academy-lesson-card" key={lesson.id}>
                        <div className="academy-lesson-card-top">
                          <span className="academy-lesson-icon">
                            <BookOpen size={21} />
                          </span>

                          {isCompleted ? (
                            <span className="completed-badge">
                              <CheckCircle2 size={14} />
                              {t("academy.completed")}
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
                            {t("academy.readLesson")} <ArrowRight size={14} />
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
                  <h3>{t("academy.noLessonsFound")}</h3>
                  <p>{t("academy.noLessonsDescription")}</p>
                  <button
                    className="button secondary"
                    onClick={() => {
                      setQuery("");
                      setActiveCategory("All");
                    }}
                  >
                    {t("academy.clearFilters")}
                  </button>
                </div>
              )}

              {!items.length && (
                <div className="academy-no-results">
                  <BookOpen size={30} />
                  <h3>{t("academy.noLessonsAvailable")}</h3>
                  <p>{t("academy.noLessonsYet")}</p>
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
  const { t } = useTranslation();

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
        error: t("eligibility.apiError"),
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

  const categories = [
    ["Small business", "smallBusiness"],
    ["Entrepreneurship", "entrepreneurship"],
    ["Food Processing", "foodProcessing"],
    ["Manufacturing", "manufacturing"],
    ["Agriculture", "agriculture"],
    ["Retail", "retail"],
    ["Services", "services"],
    ["Women entrepreneur", "womenEntrepreneur"],
    ["Other", "other"],
  ];

  const states = [
    "Maharashtra", "Gujarat", "Goa", "Madhya Pradesh",
    "Karnataka", "Rajasthan", "Uttar Pradesh", "Other",
  ];

  const selectedCategoryKey =
  categories.find(([value]) => value === category)?.[1] || "other";

  return (
    <section className="page eligibility-page">
      <div className="eligibility-hero">
        <div className="eligibility-hero-copy">
          <span className="eyebrow">
            <span className="live-dot" />
            {t("eligibility.eyebrow")}
          </span>

          <h1>
            {t("eligibility.heroTitle")}
            <br />
            <em>{t("eligibility.heroSubtitle")}</em>
          </h1>

          <p>{t("eligibility.heroDescription")}</p>

          <div className="eligibility-points">
            <span>✓ {t("eligibility.point1")}</span>
            <span>✓ {t("eligibility.point2")}</span>
            <span>✓ {t("eligibility.point3")}</span>
          </div>
        </div>

        <div className="eligibility-hero-visual">
          <div className="eligibility-visual-ring ring-one" />
          <div className="eligibility-visual-ring ring-two" />
          <div className="eligibility-visual-center">
            <span>✓</span>
            <strong>{t("eligibility.discover")}</strong>
            <small>{t("eligibility.opportunities")}</small>
          </div>
          <div className="eligibility-floating-note">
            <span>✦</span>
            <div>
              <b>{t("eligibility.personalised")}</b>
              <small>{t("eligibility.basedOnDetails")}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="eligibility-workspace">
        <div className="eligibility-form-panel">
          <div className="eligibility-panel-heading">
            <span className="eyebrow">{t("eligibility.profile")}</span>
            <h2>{t("eligibility.formTitle")}</h2>
            <p>{t("eligibility.formDescription")}</p>
          </div>

          <form className="eligibility-form" onSubmit={submit}>
            <div className="eligibility-field">
              <label htmlFor="eligibility-state">
                <span className="field-icon">⌖</span>
                {t("eligibility.state")}
              </label>

              <select
                id="eligibility-state"
                value={state}
                onChange={(event) => setState(event.target.value)}
                required
              >
                {states.map((value) => (
                  <option value={value} key={value}>
                    {t(`eligibility.states.${value}`)}
                  </option>
                ))}
              </select>

              <small>{t("eligibility.stateHelp")}</small>
            </div>

            <div className="eligibility-field">
              <label htmlFor="eligibility-category">
                <span className="field-icon">▦</span>
                {t("eligibility.category")}
              </label>

              <select
                id="eligibility-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                {categories.map(([value, translationKey]) => (
                  <option value={value} key={value}>
                    {t(`eligibility.categories.${translationKey}`)}
                  </option>
                ))}
              </select>

              <small>{t("eligibility.categoryHelp")}</small>
            </div>

            <button
              className="button eligibility-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                t("eligibility.finding")
              ) : (
                <>
                  {t("eligibility.checkButton")} <span>→</span>
                </>
              )}
            </button>

            <p className="eligibility-form-note">
              <ShieldCheck size={15} />
              {t("eligibility.formNote")}
            </p>
          </form>
        </div>

        <aside className="eligibility-side-panel">
          <div className="eligibility-side-icon">✳</div>
          <span className="eyebrow">{t("eligibility.howItWorks")}</span>
          <h3>{t("eligibility.sideTitle")}</h3>

          <div className="eligibility-steps">
            {["share", "explore", "verify"].map((step, index) => (
              <div className="eligibility-step" key={step}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{t(`eligibility.steps.${step}.title`)}</strong>
                  <p>{t(`eligibility.steps.${step}.description`)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="eligibility-side-note">
            <ShieldCheck size={17} />
            <span>{t("eligibility.sideNote")}</span>
          </div>
        </aside>
      </div>

      {result && (
        <div className="eligibility-results" aria-live="polite">
          <div className="eligibility-results-heading">
            <div>
              <span className="eyebrow">{t("eligibility.assessment")}</span>
              <h2>{t("eligibility.matchesTitle")}</h2>
              <p>
               {t("eligibility.resultsFor")}{" "}
               {t(`eligibility.categories.${selectedCategoryKey}`)}{" "}
               {t("eligibility.in")}{" "}
               {t(`eligibility.states.${state}`)}.
              </p>
            </div>

            <button
              type="button"
              className="eligibility-reset"
              onClick={reset}
            >
              {t("eligibility.startAgain")} ↗
            </button>
          </div>

          {result.error ? (
            <div className="eligibility-error">
              <strong>{t("eligibility.unavailable")}</strong>
              <p>{result.error}</p>
            </div>
          ) : (
            <>
              <div className="eligibility-result-notice">
                <ShieldCheck size={19} />
                <p>
                  {result.disclaimer || t("eligibility.resultDisclaimer")}
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
                          {t("eligibility.potentialMatch")}
                        </span>
                      </div>

                      <h3>{match.name}</h3>

                      <div className="match-reason">
                        <strong>{t("eligibility.whyAppeared")}</strong>
                        <p>{match.reason}</p>
                      </div>

                      <Link
                        to={`/schemes/${match.id}`}
                        className="match-view-link"
                      >
                        {t("eligibility.exploreScheme")} <span>→</span>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="eligibility-no-matches">
                  <span>⌕</span>
                  <h3>{t("eligibility.noMatches")}</h3>
                  <p>{t("eligibility.noMatchesDescription")}</p>
                  <button
                    type="button"
                    className="button secondary"
                    onClick={reset}
                  >
                    {t("eligibility.tryAgain")}
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
  const { t, i18n } = useTranslation();

  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    t("assistant.suggestion1"),
    t("assistant.suggestion2"),
    t("assistant.suggestion3"),
    t("assistant.suggestion4"),
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
        language: i18n.language,
      });

      setAnswer(
        response.data.answer || t("assistant.noResponse")
      );
      setMode(response.data.mode || "SCHEMETA Assistant");
    } catch {
      setAnswer(t("assistant.serviceUnavailable"));
      setMode(t("assistant.unavailable"));
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
            {t("assistant.eyebrow")}
          </span>

          <h1>
            {t("assistant.heroTitle")}
            <br />
            <em>{t("assistant.heroSubtitle")}</em>
          </h1>

          <p>{t("assistant.heroDescription")}</p>

          <div className="assistant-hero-points">
            <span>✓ {t("assistant.point1")}</span>
            <span>✓ {t("assistant.point2")}</span>
            <span>✓ {t("assistant.point3")}</span>
          </div>
        </div>

        <div className="assistant-hero-visual">
          <div className="assistant-orbit assistant-orbit-one" />
          <div className="assistant-orbit assistant-orbit-two" />

          <div className="assistant-visual-center">
            <span>✳</span>
            <strong>{t("assistant.askAway")}</strong>
            <small>{t("assistant.companion")}</small>
          </div>

          <div className="assistant-floating-note">
            <span>✦</span>
            <div>
              <b>{t("assistant.hereToHelp")}</b>
              <small>{t("assistant.oneQuestion")}</small>
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
            <span>{t("assistant.chatDescription")}</span>
          </div>

          <button
            type="button"
            className="assistant-new-chat"
            onClick={startNewChat}
          >
            ↻ {t("assistant.newChat")}
          </button>
        </div>

        <div className="assistant-chat-body">
          {!question && !answer && !loading ? (
            <div className="assistant-welcome">
              <div className="assistant-welcome-icon">
                <Sparkles size={27} />
              </div>

              <h2>{t("assistant.welcomeTitle")}</h2>
              <p>{t("assistant.welcomeDescription")}</p>

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
                  <span>{t("assistant.you")}</span>
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
                      <small>{t("assistant.preparing")}</small>
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

                    <div className="assistant-answer">{answer}</div>
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
            placeholder={t("assistant.placeholder")}
            rows={2}
            required
            disabled={loading}
          />

          <div className="assistant-composer-bottom">
            <span>
              <ShieldCheck size={14} />
              {t("assistant.verifyNotice")}
            </span>

            <button
              className="button assistant-send-button"
              type="submit"
              disabled={loading || !message.trim()}
            >
              {loading ? t("assistant.thinking") : t("assistant.send")}
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>

      <div className="assistant-disclaimer">
        <ShieldCheck size={17} />
        <p>{t("assistant.disclaimer")}</p>
      </div>
    </section>
  );
}



// ==========================================
// ENTREPRENEUR COMMUNITY
// ==========================================



function Community() {
  const { t } = useTranslation();

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
      alert(t("community.loginRequired"));
    } finally {
      setPublishing(false);
    }
  };

  return (
    <section className="page community-page">
      <div className="community-hero">
        <div className="community-hero-content">
          <span className="eyebrow">{t("community.eyebrow")}</span>
          <h1>{t("community.heroTitle")}</h1>
          <p>{t("community.heroDescription")}</p>

          <div className="community-hero-stats">
            <div>
              <strong>{posts.length}</strong>
              <span>{t("community.discussions")}</span>
            </div>
            <div>
              <strong>{t("community.oneGoal")}</strong>
              <span>{t("community.growTogether")}</span>
            </div>
          </div>
        </div>

        <div className="community-hero-visual">
          <div className="community-visual-icon">✦</div>
          <h3>{t("community.shareKnowledge")}</h3>
          <h3>{t("community.buildConnections")}</h3>
          <p>{t("community.visualDescription")}</p>
          <div className="community-visual-decoration">
            {t("community.visualDecoration")}
          </div>
        </div>
      </div>

      <div className="community-section-heading">
        <div>
          <span className="eyebrow">{t("community.startConversation")}</span>
          <h2>{t("community.shareTitle")}</h2>
          <p>{t("community.shareDescription")}</p>
        </div>
      </div>

      <form className="community-composer" onSubmit={create}>
        <div className="community-composer-top">
          <div className="community-avatar">S</div>
          <div>
            <strong>{t("community.newDiscussion")}</strong>
            <span>{t("community.newDiscussionDescription")}</span>
          </div>
        </div>

        <label htmlFor="community-title">
          {t("community.discussionTitle")}
        </label>
        <input
          id="community-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={t("community.titlePlaceholder")}
          maxLength={150}
          required
        />

        <label htmlFor="community-body">{t("community.yourMessage")}</label>
        <textarea
          id="community-body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder={t("community.messagePlaceholder")}
          rows={5}
          required
        />

        <div className="community-composer-footer">
          <span>{t("community.postingCategory")}</span>
          <button className="button" type="submit" disabled={publishing}>
            {publishing
              ? t("community.publishing")
              : t("community.publish")}
          </button>
        </div>
      </form>

      <div className="community-feed-heading">
        <div>
          <span className="eyebrow">{t("community.theCommunity")}</span>
          <h2>{t("community.recentDiscussions")}</h2>
        </div>
        <span className="community-post-count">
          {posts.length}{" "}
          {posts.length === 1
            ? t("community.post")
            : t("community.posts")}
        </span>
      </div>

      {loading ? (
        <div className="community-empty">
          <div className="community-empty-icon">◌</div>
          <h3>{t("community.loading")}</h3>
          <p>{t("community.loadingDescription")}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="community-empty">
          <div className="community-empty-icon">✦</div>
          <h3>{t("community.firstConversation")}</h3>
          <p>{t("community.noDiscussions")}</p>
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
                  <strong>{post.author || t("community.member")}</strong>
                  <span>{t("community.entrepreneurCommunity")}</span>
                </div>
                <span className="community-category">
                  {post.category || "General"}
                </span>
              </div>

              <h3>{post.title}</h3>
              <p className="community-post-body">{post.body}</p>

              <div className="community-post-footer">
                <span>✦ {t("community.sharedWithCommunity")}</span>
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
