import Layout from "../components/Layout";
import { client } from "../lib/sanity";

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "contactPage"][0]`);
  return { props: { page: page || null }, revalidate: 30 };
}

export default function Contact({ page }: { page: any }) {
  return (
    <Layout title={page?.title || "Contact - Ben Betts Design"}>
      <div className="contact-content">
        <div className="contact-form">
          <h3>Get at Me!</h3>
          <form>
            <label>Name *</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input type="text" placeholder="First" required />
              <input type="text" placeholder="Last" required />
            </div>
            <label>Email *</label>
            <input type="email" required />
            <label>Comment *</label>
            <textarea required />
            <button type="submit">Click Me</button>
          </form>
        </div>
        <div className="contact-info">
          <h3>Contact Info</h3>
          {page?.phone && <p>Phone: {page.phone}</p>}
          {page?.email && <p>Email: {page.email}</p>}
        </div>
      </div>
      <div className="map-section">
        <iframe
          src="https://maps.google.com/maps?q=39.2903848,-76.6121893&z=12&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Layout>
  );
}
