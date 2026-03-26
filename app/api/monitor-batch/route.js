import { scrapeNaverBatchRanks } from "../../../lib/naverSearchScraper";

export async function POST(req) {
  const { keywords, domains } = await req.json();

  const rows = await scrapeNaverBatchRanks(keywords, domains);

  return Response.json({ rows });
}
