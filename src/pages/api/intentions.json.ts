import type { APIRoute } from "astro";

const visit_intentions = [
  "Not buying a home yet, but curious",
  "I'm buying my first home",
  "I'm buying a second home",
  "I'm buying an investment property",
  "I'm refinancing",
];

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      intentions: visit_intentions,
    })
  );
};
