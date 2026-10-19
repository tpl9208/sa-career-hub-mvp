
async function loadOpportunityDetails() {
  const container = document.getElementById("opportunityDetails");
  const params = new URLSearchParams(window.location.search);
  const opportunityId = params.get("id");

  if (!opportunityId) {
    setPageMetadata({
      title: "Opportunity Not Found | SA Career Hub",
      description: "No opportunity was selected.",
      canonicalUrl: `${SITE_ORIGIN}/opportunity.html`
    });
    setPageRobots("noindex,follow");
    container.innerHTML = `
      <h1>Opportunity not found</h1>
      <p>No opportunity was selected.</p>
      <a href="/#opportunities">Browse opportunities</a>
    `;
    return;
  }

  try {
    const response = await fetch("/data/opportunities.json");

    if (!response.ok) {
      throw new Error("Could not load opportunities.");
    }

    const opportunities = await response.json();

    const opportunity = opportunities.find(
      item => item.id === opportunityId
    );

    if (!opportunity) {
      setPageMetadata({
        title: "Opportunity Not Found | SA Career Hub",
        description: "This opportunity may have been removed or the link is incorrect.",
        canonicalUrl: `${SITE_ORIGIN}/opportunity.html`
      });
      setPageRobots("noindex,follow");
      container.innerHTML = `
        <h1>Opportunity not found</h1>
        <p>This opportunity may have been removed or the link is incorrect.</p>
        <a href="/#opportunities">Browse opportunities</a>
      `;
      return;
    }

    const requirements = Array.isArray(opportunity.requirements)
      ? opportunity.requirements
      : [];

    const pageDescription = String(opportunity.description || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155);
    const lastVerified = String(opportunity.lastVerified || "").trim();
    const verifiedDate = getDaysSinceClosing(lastVerified) === null
      ? ""
      : new Date(`${lastVerified}T00:00:00`).toLocaleDateString("en-ZA", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });

    setPageMetadata({
      title: `${opportunity.title} | SA Career Hub`,
      description: pageDescription || `View requirements and application details for ${opportunity.title}.`,
      canonicalUrl: `${SITE_ORIGIN}/opportunity.html?id=${encodeURIComponent(opportunity.id)}`
    });
    setPageRobots("index,follow");

    const closingDate = opportunity.closingDate
      ? new Date(opportunity.closingDate + "T00:00:00")
          .toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
      : "Not specified";

      // Determine the current status of the opportunity.
        const status = getOpportunityStatus(opportunity.closingDate);

        const statusLabel =
        status === "open" ? "OPEN" :
        status === "closing-passed" ? "CLOSED" :
        status === "expired" ? "CLOSED" :
        "CHECK CLOSING DATE";

        const statusClass =
        status === "open" ? "status-open" :
        status === "closing-passed" || status === "expired"
        ? "status-closed"
        : "status-unknown";

    const safeText = value =>
      String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]);

    // Accept only web URLs for portals, or validated addresses for email applications.
    const applicationUrl = String(opportunity.applicationUrl || "").trim();

    const validApplicationUrl = (() => {
      try {
        const url = new URL(applicationUrl);
        return ["https:", "http:"].includes(url.protocol)
          ? url.href
          : "";
      } catch {
        return "";
      }
    })();

    const sourceUrl = String(opportunity.sourceUrl || "").trim();
    const validSourceUrl = (() => {
      try {
        const url = new URL(sourceUrl);
        return ["https:", "http:"].includes(url.protocol) ? url.href : "";
      } catch {
        return "";
      }
    })();

    const applicationEmail = String(opportunity.applicationEmail || "").trim();
    const validApplicationEmail =
      /^[a-z0-9.!$%&'*+/=_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i
        .test(applicationEmail)
        ? applicationEmail
        : "";

    // Prefer an application portal when both destinations are supplied.
    const applicationAction = validApplicationUrl
      ? `<a class="apply-btn"
           href="${safeText(validApplicationUrl)}"
           target="_blank"
           rel="noopener noreferrer">
           Apply on Employer Website →
         </a>`
      : validApplicationEmail
        ? `<a class="apply-btn" href="mailto:${safeText(validApplicationEmail)}">
             Apply by Email →
           </a>
           <p>Application email: <a href="mailto:${safeText(validApplicationEmail)}">${safeText(validApplicationEmail)}</a></p>`
        : `<p>Official application instructions have not been added yet.</p>`;

    container.innerHTML = `
  <div class="card-badges">
    <span class="badge">
      ${safeText(opportunity.type)}
    </span>

    <span class="status-badge ${statusClass}">
      ${statusLabel}
    </span>
  </div>

  <h1 style="margin-top: 15px;">
      ${safeText(opportunity.title)}
    </h1>

      <p class="company">${safeText(opportunity.company)}</p>

      <div class="opportunity-card" style="margin-top: 25px;">
        <p><strong>Opportunity type:</strong> ${safeText(opportunity.type)}</p>
        <p><strong>Province:</strong> ${safeText(opportunity.province)}</p>
        <p><strong>Career field:</strong> ${safeText(opportunity.field || "Not specified")}</p>
        <p><strong>Experience:</strong> ${safeText(opportunity.experience || "Not specified")}</p>
        <p><strong>Closing date:</strong> ${safeText(closingDate)}</p>
        ${verifiedDate ? `<p><strong>Listing checked:</strong> ${safeText(verifiedDate)}</p>` : ""}
            ${
                status === "closing-passed"
                    ? `
                    <p class="closing-notice">
                        The closing date has passed. Check with the employer
                        to confirm whether late applications are still accepted.
                    </p>
                    `
                    : ""
                }

                ${
                status === "expired"
                    ? `
                    <p class="closing-notice">
                        This opportunity is more than 7 days past its closing date
                        and is no longer shown in our active opportunity listings.
                        Check the employer's website for current opportunities.
                    </p>
                    `
                    : ""
                }

                ${
                status === "unknown"
                    ? `
                    <p class="closing-notice">
                        Check the employer's official advert for the current
                        closing date.
                    </p>
                    `
                    : ""
                }

        <hr>

        <h2>About this opportunity</h2>
        <p>${safeText(opportunity.description)}</p>

        <h2>Requirements</h2>
        ${
          requirements.length
            ? `<ul>${requirements.map(item =>
                `<li>${safeText(item)}</li>`
              ).join("")}</ul>`
            : "<p>Check the employer's official advert for requirements.</p>"
        }

        ${validSourceUrl ? `
          <p class="source-link">
            <strong>Original listing:</strong>
            <a href="${safeText(validSourceUrl)}" target="_blank" rel="noopener noreferrer">
              View the listing source
            </a>
          </p>
        ` : ""}

        ${applicationAction}
      </div>
    `;

  } catch (error) {
    console.error("Error loading opportunity:", error);

    setPageRobots("noindex,follow");
    container.innerHTML = `
      <h1>Unable to load opportunity</h1>
      <p>Please refresh the page and try again.</p>
    `;
  }
}

loadOpportunityDetails();
