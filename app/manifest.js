export default function manifest() {
  return {
    name: 'Tot Tracker',
    short_name: 'Tot Tracker',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCF8F3',
    theme_color: '#FCF8F3',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
