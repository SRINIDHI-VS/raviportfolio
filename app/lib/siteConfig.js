export const SITE_URL = "https://raviportfolio-smoky.vercel.app";

export const CONTACT = {
  whatsappNumber: "919902269943", // no "+" — this is the format wa.me links expect
  phoneE164: "+919902269943", // for structured data (schema.org telephone)
  phoneDisplay: "9902269943",
  email: "ravindragym2000@gmail.com",
  instagramHandle: "@ravindramb",
  instagramUrl: "https://www.instagram.com/ravindramb/",
  enrollUrl: "https://ravindrafitness.netlify.app",
};

export function whatsappLink(message) {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
