import { chromium } from "playwright";
import { normalizeDomain, matchesDomain } from "./domainUtils";

export async function scrapeNaverBatchRanks(keywords, domains) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const results = [];

  for (const keyword of keywords) {
    const url = `https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`;

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const ads = await page.evaluate(() => {
      const list = [];
      document.querySelectorAll("a").forEach((a, i) => {
        const href = a.href || "";
        const text = a.innerText || "";

        if (href.includes("ad") || href.includes("shopping")) {
          list.push({
            rank: i + 1,
            href,
            text
          });
        }
      });
      return list.slice(0, 10);
    });

    ads.forEach((ad) => {
      if (matchesDomain(domains, ad.href)) {
        results.push({
          keyword,
          checked_at: new Date(),
          rank: ad.rank,
          ad_type: "파워링크",
          domain: normalizeDomain(ad.href),
          ad_title: ad.text,
          matched: true
        });
      }
    });

    if (!ads.length) {
      results.push({
        keyword,
        checked_at: new Date(),
        rank: "-",
        ad_type: "-",
        domain: "-",
        ad_title: "미발견",
        matched: false
      });
    }
  }

  await browser.close();
  return results;
}
