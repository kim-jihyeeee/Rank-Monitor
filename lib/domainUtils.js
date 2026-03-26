export function normalizeDomain(value = "") {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
}

export function matchesDomain(targetDomains, url) {
  const domain = normalizeDomain(url);

  return targetDomains.some((d) => {
    const t = normalizeDomain(d);
    return domain === t || domain.endsWith("." + t);
  });
}
