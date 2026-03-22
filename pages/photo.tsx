import Layout from "../components/Layout";
import ImageGallery from "../components/ImageGallery";
import { client, urlFor } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "portfolioPage" && slug.current == "photo"][0]`);
  return { props: { page: page || null }, revalidate: 30 };
}

export default function Photo({ page }: { page: any }) {
  if (!page) return <Layout title="Photo"><div /></Layout>;
  const images = (page.images || []).map((img: any) => ({
    src: urlFor(img.image).width(1200).url(),
    alt: img.alt || "",
  }));

  return (
    <Layout title={page.title || "Photo - Ben Betts Design"}>
      <section className="page-banner" style={{ backgroundImage: page.bannerImage ? `url(${urlFor(page.bannerImage).width(1600).url()})` : undefined }}>
        <div className="hero-content">
          <h2>{page.bannerTitle}</h2>
        </div>
      </section>
      <section className="content-section">
        {page.headerImage && <img src={urlFor(page.headerImage).width(1200).url()} alt="Photo" className="page-header-img" />}
        <ImageGallery images={images} columns="3" />
      </section>
    </Layout>
  );
}
