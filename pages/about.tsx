import Layout from "../components/Layout";
import { client, urlFor } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "aboutPage"][0]`);
  return { props: { page: page || null }, revalidate: 30 };
}

export default function About({ page }: { page: any }) {
  if (!page) return <Layout title="About"><div /></Layout>;

  return (
    <Layout title={page.title || "About - Ben Betts Design"}>
      <div className="about-content">
        {page.photo && (
          <img src={urlFor(page.photo).width(400).url()} alt="Ben Betts" className="about-photo" />
        )}
        {(page.bio || []).map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
        <div className="resume-section">
          <h3>RESUME</h3>
          {page.resumeImage && (
            <img src={urlFor(page.resumeImage).width(800).url()} alt="Ben Betts Resume" />
          )}
          {page.resumePdf?.asset?.url && (
            <a href={page.resumePdf.asset.url} className="resume-link" target="_blank" rel="noreferrer">
              Click to Download My Resume
            </a>
          )}
        </div>
      </div>
    </Layout>
  );
}
