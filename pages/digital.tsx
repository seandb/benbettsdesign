import Layout from "../components/Layout";
import Slideshow from "../components/Slideshow";
import { client, urlFor } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "portfolioPage" && slug.current == "digital"][0]`);
  return { props: { page: page || null }, revalidate: 30 };
}

export default function Digital({ page }: { page: any }) {
  if (!page) return <Layout title="Digital"><div /></Layout>;
  const images = (page.images || []).map((img: any) => ({
    src: urlFor(img.image).width(1200).url(),
    alt: img.alt || "",
  }));

  return (
    <Layout title={page.title || "Digital - Ben Betts Design"}>
      <section className="page-banner" style={{ backgroundImage: page.bannerImage ? `url(${urlFor(page.bannerImage).width(1600).url()})` : undefined }}>
        <div className="hero-content">
          <h2>{page.bannerTitle}</h2>
        </div>
      </section>
      <section className="content-section">
        {page.headerImage && <img src={urlFor(page.headerImage).width(1200).url()} alt="Digital" className="page-header-img" />}
        <h2 className="section-title">Ads</h2>
        <h3 style={{ textAlign: "center", fontFamily: "'Montserrat',sans-serif", fontSize: "18px", marginBottom: "20px", color: "#3e3e3e" }}>
          Home Page Take over Ads
        </h3>
        <Slideshow images={images} />
      </section>
    </Layout>
  );
}
