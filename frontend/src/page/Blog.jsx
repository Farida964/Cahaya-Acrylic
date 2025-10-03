import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./blog.module.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet-async";

// ---------- Base URL untuk SEO ----------
const BASE_URL = "https://cahaya-acrylic.com";

// ---------- Utilities ----------
function findPostBySlug(posts, slug) {
  return posts.find((p) => p.slug === slug);
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function useSEO({ title, description, keywords = [], canonical }) {
  useEffect(() => {
    if (title) document.title = title;

    // Meta description
    let metaDesc = document.querySelector("meta[name=description]");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    if (description) metaDesc.setAttribute("content", description);

    // Meta keywords
    let metaKeywords = document.querySelector("meta[name=keywords]");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    if (keywords.length) metaKeywords.setAttribute("content", keywords.join(", "));

    // Canonical link
    if (canonical) {
      let linkCanonical = document.querySelector("link[rel='canonical']");
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonical);
    }
  }, [title, description, keywords, canonical]);
}

// ---------- Blog List ----------
function BlogList({ postsData, onSelectCategory }) {
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const categories = useMemo(() => {
    const set = new Set(postsData.map((p) => p.category));
    return ["Semua", ...Array.from(set)];
  }, [postsData]);

  useSEO({
    title: "Blog - Cahaya Acrylic | Custom Akrilik & Ide Produk",
    description:
      "Temukan ide, panduan, dan tips seputar custom akrilik — plakat, signage, dekorasi, dan banyak lagi.",
    keywords: [
      "akrilik",
      "custom akrilik",
      "akrilik dekorasi",
      "akrilik bogor",
      "akrilik jakarta",
      "plakat akrilik",
      "acrylic cutting",
      "display akrilik",
      "souvenir akrilik",
      "laser cutting acrylic",
    ],
    canonical: `${BASE_URL}/blog`,
  });

  // JSON-LD untuk daftar artikel
  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Cahaya Acrylic Blog",
      url: `${BASE_URL}/blog`,
      description:
        "Tips, inspirasi, dan panduan seputar custom akrilik — plakat, signage, dekorasi, dan banyak lagi.",
      publisher: {
        "@type": "Organization",
        name: "Cahaya Acrylic",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
        },
      },
      blogPost: postsData.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
        image: `${BASE_URL}${post.cover}`,
        description: post.excerpt,
        keywords: post.keywords.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/blog/${post.slug}`,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [postsData]);

  const filteredPosts =
    categoryFilter === "Semua"
      ? postsData
      : postsData.filter((p) => p.category === categoryFilter);

  return (
    <div className={styles.blogContainer}>
      <Helmet>
        <meta property="og:title" content="Cahaya Acrylic Bogor | Akrilik Custom, Cutting Acrylic" />
        <meta
          property="og:description"
          content="Tempat jual akrilik terpercaya: bening, warna, dan custom dengan harga terbaik. Hanya di Cahaya Acrylic."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/blog`} />
      </Helmet>

      <Navbar />

      <header className={styles.blogHeader}>
        <h1 className={styles.blogTitle}>Blog - Cahaya Acrylic</h1>
        <p className={styles.blogSubtitle}>
          Tips, edukasi, dan produk akrilik untuk kebutuhan bisnis dan rumah.
        </p>
      </header>

      <main className={styles.blogList} aria-label="Daftar artikel blog">
        <div className={styles.blogArticles}>
          {filteredPosts.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              {post.cover && (
                <Link to={`/blog/${post.slug}`} className={styles.blogCardImage} aria-label={`Baca artikel ${post.title}`}>
                  <img src={post.cover} alt={post.coverAlt} loading="lazy" className={styles.blogCardThumb} />
                </Link>
              )}

              <div className={styles.blogCardContent}>
                <Link to={`/blog/${post.slug}`} className={styles.blogCardTitle}>
                  {post.title}
                </Link>

                <div className={styles.blogCardMeta}>
                  {formatDate(post.date)} • {post.author} • <span className={styles.catBadge}>{post.category}</span>
                </div>

                <p className={styles.blogCardExcerpt}>{post.excerpt}</p>

                <div className={styles.blogCardFooter} aria-label={`Keywords artikel ${post.title}`}>
                  {post.keywords.map((k) => (
                    <span key={k} className={styles.keyword}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.blogSidebar}>
          <div className={styles.sidebarBox}>
            <h3>Kategori</h3>
            <ul className={styles.categoryList}>
              {categories.map((c) => (
                <li key={c}>
                  <button
                    className={`${styles.categoryBtn} ${c === categoryFilter ? styles.activeCategory : ""}`}
                    onClick={() => {
                      setCategoryFilter(c);
                      if (onSelectCategory) onSelectCategory(c);
                    }}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sidebarBox}>
            <h3>Artikel Populer</h3>
            <ul className={styles.popularList}>
              {postsData.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link to={`/blog/${p.slug}`} className={styles.popularLink}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sidebarBox}>
            <h3>Tentang Kami</h3>
            <p>
              Cahaya Acrylic melayani pembuatan akrilik custom — plakat, signage,
              huruf timbul, dan rak display. Konsultasi desain & produksi.
            </p>
            <a href="https://wa.me/6281113801838" target="_blank" rel="noreferrer" className={styles.ctaBtn}>
              Hubungi via WhatsApp
            </a>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

// ---------- Blog Detail ----------
function BlogDetail({ post }) {
  const location = useLocation();

  useSEO({
    title: `${post.title} | Cahaya Acrylic`,
    description: post.excerpt,
    keywords: post.keywords,
    canonical: `${BASE_URL}${location.pathname}`,
  });

  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
      publisher: { "@type": "Organization", name: "Cahaya Acrylic" },
      image: `${BASE_URL}${post.cover}`,
      description: post.excerpt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${BASE_URL}${location.pathname}`,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [post, location.pathname]);

  return (
    <div className={styles.blogContainer}>
      <Helmet>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${BASE_URL}${location.pathname}`} />
        <meta property="og:image" content={`${BASE_URL}${post.cover}`} />
      </Helmet>

      <Navbar />

      <article className={styles.blogDetail}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/blog" className={styles.breadcrumbLink}>
            Blog
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span aria-current="page">{post.title}</span>
        </nav>

        <header className={styles.detailHeader}>
          <h1 className={styles.detailTitle}>{post.title}</h1>
          <div className={styles.detailMeta}>
            {formatDate(post.date)} • {post.author} • <span className={styles.catBadge}>{post.category}</span>
          </div>
        </header>

        <figure className={styles.detailFigure}>
          <img src={post.cover} alt={post.coverAlt} loading="lazy" className={styles.detailImage} />
          <figcaption className={styles.detailCaption}>{post.coverAlt}</figcaption>
        </figure>

        <section className={styles.detailContent} dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer className={styles.detailFooter}>
          <div>Keywords: {post.keywords.join(", ")}</div>
          <div className={styles.cta}>
            Ingin custom akrilik serupa?{" "}
            <a href="https://wa.me/6281113801838" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              Hubungi kami
            </a>
          </div>
        </footer>
      </article>

      <Footer />
    </div>
  );
}

// ---------- Main Blog Component ----------
function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/json/blogData.json")
      .then((res) => res.json())
      .then((data) => {
        setPostsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data blog:", err);
        setLoading(false);
      });
  }, []);

  const post = slug ? findPostBySlug(postsData, slug) : null;

  useEffect(() => {
    if (slug && !post && !loading) {
      const timeout = setTimeout(() => navigate("/blog"), 1200);
      return () => clearTimeout(timeout);
    }
  }, [slug, post, navigate, loading]);

  if (loading) return <p>Memuat data blog...</p>;
  if (!slug) return <BlogList postsData={postsData} />;
  if (post) return <BlogDetail post={post} />;

  return (
    <div className={styles.notFound}>
      <Navbar />
      <h2 className={styles.notFoundTitle}>Artikel tidak ditemukan</h2>
      <p className={styles.notFoundText}>
        Kembali ke{" "}
        <Link to="/blog" className={styles.backLink}>
          daftar artikel
        </Link>
        .
      </p>
      <Footer />
    </div>
  );
}

export default Blog;
