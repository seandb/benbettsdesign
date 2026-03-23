import { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Slideshow from "../components/Slideshow";
import { client, urlFor } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "portfolioPage" && slug.current == "digital"][0]`);
  return { props: { page: page || null }, revalidate: 30 };
}

function EmbedAd({ code, width, height }: { code: string; width: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    container.innerHTML = "";
    const temp = document.createElement("div");
    temp.innerHTML = code;
    // Re-create script elements so they actually execute
    Array.from(temp.childNodes).forEach((node) => {
      if (node.nodeName === "SCRIPT") {
        const s = node as HTMLScriptElement;
        const script = document.createElement("script");
        script.type = s.type || "text/javascript";
        if (s.src) script.src = s.src;
        else script.textContent = s.textContent;
        container.appendChild(script);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    });
  }, [code]);
  return <div ref={ref} style={{ width, height, overflow: "hidden" }} />;
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
        {page.embeds && page.embeds.length > 0 && (
          <>
            <h3 style={{ textAlign: "center", fontFamily: "'Montserrat',sans-serif", fontSize: "18px", margin: "40px 0 20px", color: "#3e3e3e" }}>
              300x250 Display Ads
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "40px" }}>
              {page.embeds.map((embed: any) => (
                <EmbedAd key={embed._key} code={embed.code} width={embed.width || 300} height={embed.height || 250} />
              ))}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
