// Central site configuration.
// When you point your own domain at the site, set NEXT_PUBLIC_SITE_URL in
// Vercel (Project → Settings → Environment Variables) to e.g. https://tourivo.com
// so canonical URLs and the sitemap use the right host.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://sharmgate.net').replace(/\/$/, '');

export const BRAND = {
  name: 'Tourivo',
  legacyName: 'Sharm Gate',
  tagline: 'Tours & Activities in Egypt',
  description: 'Discover the best tours and activities in Egypt. Choose your city: Sharm El Sheikh, Hurghada, or Dahab.',
};

// Booking / contact (carried over from the original site footer).
export const CONTACT = {
  whatsapp: '201006110456',
  whatsappByLang: {
    en: '201006110456', it: '201031719772', tr: '201044003368',
    ru: '201008411023', fr: '201009064198', ar: '201006110456',
  },
  instagram: 'https://www.instagram.com/sharm.gate',
  facebook: 'https://www.facebook.com/share/1FjksSSBNB/?mibextid=wwXIfr',
  telegram: 'https://t.me/+201006110456',
  tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g297555-d13113313-Reviews-Sharm_Gate-Sharm_El_Sheikh_South_Sinai_Red_Sea_and_Sinai.html',
  appStore: 'https://apps.apple.com/eg/app/sharm-gate/id6468103979',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.sharmgate.tours',
};

export function waLink(text) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Rewrite a stored canonical (which points at the old domain) onto the active host.
export function canonical(pathname) {
  return SITE_URL + pathname;
}
