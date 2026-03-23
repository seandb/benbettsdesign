import Layout from "../components/Layout";
import ImageGallery from "../components/ImageGallery";
import { client, urlFor } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "portfolioPage" && slug.current == "fine-art"][0]`);
  return { props: { page: page || null }, revalidate: 30 };
}

export default function FineArt({ page }: { page: any }) {
  if (!page) return <Layout title="Fine Art"><div /></Layout>;
  const images = (page.images || []).map((img: any) => ({
    src: urlFor(img.image).width(1200).url(),
    alt: img.alt || "",
  }));

  return (
    <Layout title={page.title || "Fine Art - Ben Betts Design"}>
      <section className="page-banner" style={{ backgroundImage: page.bannerImage ? `url(${urlFor(page.bannerImage).width(1600).url()})` : undefined }}>
        {page.headerImage && <img src={urlFor(page.headerImage).width(600).url()} alt="Fine Art" className="page-header-img" />}
      </section>
      <section className="content-section">
        <ImageGallery images={images} columns="2" />
      </section>
    </Layout>
  );
}
