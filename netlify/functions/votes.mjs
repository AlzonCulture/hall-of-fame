// Votes du Hall of Fame : un vote par visiteur, stocké dans Netlify Blobs.
import { getStore } from "@netlify/blobs";

const okVoter = v => typeof v === "string" && /^[A-Za-z0-9-]{8,64}$/.test(v);
const okCard = c => c === null || (Number.isInteger(c) && c >= 1 && c <= 1000);

function reply(ballots, voter) {
  const counts = {};
  for (const c of Object.values(ballots)) counts[c] = (counts[c] || 0) + 1;
  const mine = voter && ballots[voter] != null ? ballots[voter] : null;
  return Response.json({ counts, mine }, { headers: { "cache-control": "no-store" } });
}

export default async (req) => {
  const store = getStore("hof-votes");
  const load = async () => (await store.get("ballots", { type: "json" })) || {};

  if (req.method === "GET") {
    const voter = new URL(req.url).searchParams.get("voter");
    return reply(await load(), okVoter(voter) ? voter : null);
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return new Response("JSON invalide", { status: 400 }); }
    const { voter, card } = body || {};
    if (!okVoter(voter) || !okCard(card)) return new Response("Vote invalide", { status: 400 });
    const ballots = await load();
    if (card === null) delete ballots[voter]; else ballots[voter] = card;
    await store.setJSON("ballots", ballots);
    return reply(ballots, voter);
  }

  return new Response("Méthode non autorisée", { status: 405 });
};

export const config = { path: "/api/votes" };
