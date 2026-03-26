import { scrapeNaverBatchRanks } from "../../../lib/naverSearchScraper";
import { supabase } from "../../../lib/db";

export async function GET() {
  const keywords = [
    "모두투어서유럽패키지여행",
    "모두투어유럽패키지여행",
    "모두투어동유럽패키지여행"
  ];

  const domains = [
    "modetourgo.com",
    "tnc.modetour.co.kr",
    "modetourholic.com"
  ];

  const rows = await scrapeNaverBatchRanks(keywords, domains);

  await supabase.from("rank_logs").insert(rows);

  return Response.json({ success: true });
}
