export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function formatNumber(number, locale = "ko-KR") {
  return new Intl.NumberFormat(locale).format(number);
}

export function formatCurrency(amount, currency = "KRW", locale = "ko-KR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
