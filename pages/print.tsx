import Link from "next/link";
import Layout from "../components/Layout";
import { client, urlFor } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "portfolioPage" && slug.current == "print"][0]`);
  const projects = await client.fetch(`*[_type == "project" && parentPage == "print"] | order(_createdAt asc)`);
  return { props: { page: page || null, projects: projects || [] }, revalidate: 30 };
}

export default function Print({ page, projects }: { page: any; projects: any[] }) {
  return (
    <Layout title={page?.title || "Print - Ben Betts Design"}>
      {page?.bannerImage && (
        <section className="page-banner" style={{ backgroundImage: `url(${urlFor(page.bannerImage).width(1600).url()})` }}>
          {page?.headerImage && <img src={urlFor(page.headerImage).width(600).url()} alt="" className="page-header-img" />}
        </section>
      )}
      <section className="content-section">
        <div className="portfolio-grid">
          {projects.map((project: any) => (
            <Link key={project._id} href={`/project/${project.slug.current}`} className="portfolio-item">
              {project.thumbnail && (
                <img src={urlFor(project.thumbnail).width(600).url()} alt={project.title} />
              )}
              <div className="label">{project.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
