export async function scrapeNaverBatchRanks(keywords = [], domains = []) {
  return keywords.map((keyword) => ({
    keyword,
    checked_at: new Date().toISOString(),
    rank: "-",
    ad_type: "테스트",
    domain: domains?.[0] || "-",
    ad_title: `${keyword} 테스트 데이터`,
    matched: false
  }));
}
