import Link from "next/link";
import Layout from "../components/Layout";
import { client, urlFor } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "homePage"][0]`);
  return { props: { page: page || null }, revalidate: 30 };
}

export default function Home({ page }: { page: any }) {
  if (!page) return <Layout title="Ben Betts Design"><div /></Layout>;
  const items: any[] = page.portfolioItems || [];

  return (
    <Layout title={page.title || "Ben Betts Design"}>
      <section
        className="hero-banner"
        style={{ backgroundImage: page.bannerImage ? `url(${urlFor(page.bannerImage).width(1600).url()})` : undefined }}
      >
        <div className="hero-content">
          <h2>{page.heroHeading}</h2>
          <p className="subtitle">{page.heroSubtitle}</p>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">My Things</h2>
        <div className="portfolio-grid">
          {items.slice(0, 3).map((item, i) => (
            <Link key={i} href={item.href || "#"} className="portfolio-item">
              {item.image && <img src={urlFor(item.image).width(600).url()} alt={item.alt || ""} />}
              <div className="label">{item.label}</div>
            </Link>
          ))}
        </div>
        {items.length > 3 && (
          <div className="portfolio-grid">
            {items.slice(3).map((item, i) => (
              <Link key={i} href={item.href || "#"} className="portfolio-item">
                {item.image && <img src={urlFor(item.image).width(600).url()} alt={item.alt || ""} />}
                <div className="label">{item.label}</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
