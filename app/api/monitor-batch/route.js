import { scrapeNaverBatchRanks } from "../../../lib/naverSearchScraper";

export async function POST(req) {
  try {
    const { keywords = [], domains = [] } = await req.json();

    const rows = await scrapeNaverBatchRanks(keywords, domains);

    return Response.json({ success: true, rows });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error?.message || "monitor-batch error"
      },
      { status: 500 }
    );
  }
}
