import React from "react";

const createSitemap = () => {
  const site_root = "https://lighthour.app";

  let eventsXML = `
    <url>
      <loc>${site_root}/</loc>
      <lastmod>2020-10-04</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.00</priority>
    </url>

  `;

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${eventsXML}
    </urlset>`;
};

class Sitemap extends React.Component {}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap());
  res.end();
  return { props: { status: 200 } };
}

export default Sitemap;
