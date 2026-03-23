import Layout from "../../components/Layout";
import Slideshow from "../../components/Slideshow";
import Link from "next/link";
import { client, urlFor } from "../../lib/sanity";

export async function getStaticPaths() {
  const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`);
  return {
    paths: projects.map((p: any) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug: params.slug }
  );
  return { props: { project: project || null }, revalidate: 30 };
}

export default function ProjectPage({ project }: { project: any }) {
  if (!project) return <Layout title="Project"><div /></Layout>;

  const slides = (project.slides || []).map((s: any) => ({
    src: urlFor(s.image).width(1400).url(),
    alt: s.alt || project.title,
  }));

  const backHref = project.parentPage === "print" ? "/print" : "/packaging";
  const backLabel = project.parentPage === "print" ? "Print" : "Packaging";

  return (
    <Layout title={`${project.title} — Ben Betts Design`}>
      <section className="content-section">
        <p className="back-link">
          <Link href={backHref}>← {backLabel}</Link>
        </p>
        <h2 className="section-title">{project.title}</h2>
        {slides.length > 0 && <Slideshow images={slides} />}
      </section>
    </Layout>
  );
}
