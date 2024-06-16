
import type { APIRoute } from "astro";

const referral_sources = [
  "Search engine(Google, Bing, etc)",
  "My real estate agent",
  "Social media(Facebook, Instagram, etc)",
  "YouTube",
  "Review Site",
  "Friend/colleague",
  "Podcast, Spotify",
  "Other",
];

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      sources: referral_sources,
    })
  );
};
