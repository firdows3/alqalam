export default function Head() {
  return (
    <>
      <title>Al-Qalam App</title>
      <meta name="description" content="Official Al-Qalam site" />

      <link rel="icon" href="/favicon.ico" />
      {/* Open Graph / Social sharing tags */}
      <meta property="og:title" content="Al-Qalam App" />
      <meta property="og:description" content="Official Al-Qalam site" />
      <meta property="og:image" content="https://yourdomain.com/preview.png" />
      <meta
        property="og:url"
        content="https://alqalam-production.up.railway.app/"
      />

      {/* Optional: Twitter cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Al-Qalam App" />
      <meta name="twitter:description" content="Official Al-Qalam site" />
      <meta name="twitter:image" content="https://yourdomain.com/preview.png" />
    </>
  );
}
