import type { APIRoute } from "astro";

const user_descriptions = [
  "First-time homebuyer",
  "Upsizing",
  "Downsizing",
  "Luxury homebuyer",
  "Investor",
  "Renter",
  "Fixer/flipper",
];
export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      descriptions: user_descriptions,
    })
  );
};
