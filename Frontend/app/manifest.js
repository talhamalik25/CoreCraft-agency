export default function manifest() {
  return {
    name: 'CoreCraft Agency',
    short_name: 'CoreCraft',
    description: 'CoreCraft Agency is a multidisciplinary creative studio based in Karachi, specializing in digital experiences, custom web applications, AI automation, and e-commerce solutions built with architectural precision.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0D0D',
    theme_color: '#0D0D0D',
    icons: [
      {
        src: '/icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}