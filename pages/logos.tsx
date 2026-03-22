import Layout from "../components/Layout";
import Slideshow from "../components/Slideshow";
import { client, urlFor } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "portfolioPage" && slug.current == "logos"][0]`);
  return { props: { page: page || null }, revalidate: 30 };
}

export default function Logos({ page }: { page: any }) {
  if (!page) return <Layout title="Logos"><div /></Layout>;
  const images = (page.images || []).map((img: any) => ({
    src: urlFor(img.image).width(1200).url(),
    alt: img.alt || "",
  }));

  return (
    <Layout title={page.title || "Logos - Ben Betts Design"}>
      <section className="page-banner" style={{ backgroundImage: page.bannerImage ? `url(${urlFor(page.bannerImage).width(1600).url()})` : undefined }}>
        <div className="hero-content">
          <h2>{page.bannerTitle}</h2>
          {page.bannerSubtitle && <p className="banner-subtitle">{page.bannerSubtitle}</p>}
        </div>
      </section>
      <section className="content-section">
        <Slideshow images={images} />
      </section>
    </Layout>
  );
}
