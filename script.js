let opportunities = [];

/*
 * Safely display text from the opportunities JSON.
 * This prevents text containing HTML characters from being
 * interpreted as actual HTML.
 */
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

const grid = document.getElementById("opportunityGrid");
const search = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const provinceFilter = document.getElementById("provinceFilter");
const count = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

// Apply the current search and filter controls, then rebuild the card grid.
function render() {
  const term = search.value.toLowerCase().trim();
  const type = typeFilter.value;
  const province = provinceFilter.value;

  const filtered = opportunities.filter(o => {
    //Hide opportunities that are more than 7 days past closing.
    if(!shouldShowOpportunity(o)) {
      return false;
    }
    // Build searchable text from all relevant opportunity details.
    const searchableText = [
      o.title,
      o.company,
      o.province,
      o.field,
      o.type,
      o.experience,
      o.description,
      ...(Array.isArray(o.requirements)
        ? o.requirements
        : [o.requirements])
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    // Match "IT" as a standalone abbreviation, not inside words like "retail".
    const matchesText = !term ||
      (term === "it"
        ? /\bit\b/i.test(searchableText) ||
          searchableText.includes("information technology")
        : searchableText.includes(term));

    return (
      matchesText &&
      (type === "all" || o.type === type) &&
      (province === "all" || o.province === province)
    );
  });

  count.textContent =
    `${filtered.length} opportunit${filtered.length === 1 ? "y" : "ies"}`;

  
grid.innerHTML = filtered.map(o => {
  const status = getOpportunityStatus(o.closingDate);

  const statusLabel =
    status === "open" ? "OPEN" :
    status === "closing-passed" || status === "expired" ? "CLOSED" :
    status === "date-not-specified" ? "DATE NOT SPECIFIED" :
    "CHECK CLOSING DATE";

  const statusClass =
    status === "open" ? "status-open" :
    status === "closing-passed" || status === "expired" 
    ? "status-closed" :
    "status-unknown";

  return `
    <article class="opportunity-card">
      <div class="card-badges">
        <span class="badge">${escapeHTML(o.type)}</span>
        <span class="status-badge ${statusClass}">
          ${statusLabel}
        </span>
      </div>

      <h3>${escapeHTML(o.title)}</h3>
      <p class="company">${escapeHTML(o.company)}</p>

      <p class="meta">
        📍 ${escapeHTML(o.province)}
        &nbsp; • &nbsp;
        Closing: ${escapeHTML(o.closingDate || "Not specified")}
      </p>

      ${status === "closing-passed" ? `
        <p class="closing-notice">
          The closing date has passed. Late applications may still be accepted.
        </p>
      ` : ""}

      <p>${escapeHTML(o.description)}</p>

      <a class="apply-btn"
         href="opportunity.html?id=${encodeURIComponent(o.id)}">
        View Details →
      </a>
    </article>
  `;
}).join("");

  noResults.classList.toggle("hidden", filtered.length !== 0);
}

async function loadOpportunities() {
  try {
    // Fetch once on page load; later input changes only re-filter this array.
    const response = await fetch("data/opportunities.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    opportunities = await response.json();

    console.log("Opportunities loaded:", opportunities);

    render();

  } catch (error) {
    console.error("Error loading opportunities:", error);

    grid.innerHTML = `
      <div class="error-message">
        <h3>Unable to load opportunities</h3>
        <p>Please make sure the website is running through a local server.</p>
      </div>
    `;
  }
}

[search, typeFilter, provinceFilter].forEach(el => {
  el.addEventListener("input", render);
});

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const selectedType = card.dataset.type;

    window.location.href =
      `category.html?type=${encodeURIComponent(selectedType)}`;
  });
});

loadOpportunities();