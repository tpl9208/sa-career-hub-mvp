
/*
 * SA Career Hub — Opportunity expiry rules
 *
 * Rules:
 * 1. An opportunity stays open through its closing date.
 * 2. After the closing date, it remains visible for 7 days.
 * 3. During those 7 days, its application link remains available.
 * 4. After the 7-day grace period, it is hidden from listings.
 *
 * Expected closingDate format: YYYY-MM-DD
 */

// Get the number of calendar days since the closing date.
// Uses South African local calendar dates, not the current time of day.
function getDaysSinceClosing(closingDate) {
  if (!closingDate || typeof closingDate !== "string") {
    return null;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(closingDate);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  // Validate that the supplied date actually exists.
  const closingTimestamp = Date.UTC(year, month - 1, day);
  const closingCheck = new Date(closingTimestamp);

  if (
    closingCheck.getUTCFullYear() !== year ||
    closingCheck.getUTCMonth() !== month - 1 ||
    closingCheck.getUTCDate() !== day
  ) {
    return null;
  }

  // Build today's date using the visitor's local calendar date.
  const now = new Date();
  const todayTimestamp = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  return Math.floor(
    (todayTimestamp - closingTimestamp) / 86400000
  );
}

// Determine how an opportunity should be displayed.
function getOpportunityStatus(closingDate) {
  // A genuinely missing date gets its own status.
  if (
    closingDate === null ||
    closingDate === undefined ||
    (typeof closingDate === "string" && closingDate.trim() === "")
  ) {
    return "date-not-specified";
  }

  const daysSinceClosing = getDaysSinceClosing(closingDate);

  // Invalid dates should not cause accidental removal.
  if (daysSinceClosing === null) {
    return "unknown";
  }

  if (daysSinceClosing <= 0) {
    return "open";
  }

  if (daysSinceClosing <= 7) {
    return "closing-passed";
  }

  return "expired";
}

// Decide whether an opportunity should appear in listings.
function shouldShowOpportunity(opportunity) {
  return getOpportunityStatus(opportunity.closingDate) !== "expired";
}

// Return a notice to display on opportunity cards and detail pages.
function getClosingNotice(closingDate) {
  const status = getOpportunityStatus(closingDate);

  if (status === "closing-passed") {
    return "The closing date has passed. Check with the employer to confirm whether late applications are accepted.";
  }

  if (status === "unknown") {
    return "Check the employer's advert for the current closing date.";
  }

  return "";
}
