
const categories = {
  "Learnership": {
    title: "Learnerships in South Africa",
    description:
      "Explore learnership opportunities to develop practical skills and gain workplace experience."
  },

  "Internship": {
    title: "Internships in South Africa",
    description:
      "Find internships that can help you gain experience and begin your career."
  },

  "Graduate": {
    title: "Graduate Programmes in South Africa",
    description:
      "Explore graduate programmes for recent graduates starting their professional careers."
  },

  "Job": {
    title: "Jobs in South Africa",
    description:
      "Browse job opportunities across different industries and provinces."
  },

  "Training": {
    title: "Training Programmes in South Africa",
    description:
      "Discover skills development programmes, apprenticeships, nursing training, vocational courses and other opportunities to gain practical skills and prepare for employment."
  },

  "Bursaries": {
    title: "Bursaries in South Africa",
    description:
      "Find bursaries, scholarships and study funding opportunities to help South African students pursue their education and achieve their career goals."
  }
};

async function loadCategory() {
  const params = new URLSearchParams(window.location.search);
  const selectedType = params.get("type");

  const category = categories[selectedType];

  const title = document.getElementById("categoryTitle");
  const description = document.getElementById("categoryDescription");
  const heading = document.getElementById("listingHeading");
  const grid = document.getElementById("opportunityGrid");
  const count = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");

  if (!category) {
    title.textContent = "Category not found";
    description.textContent = "Please choose a category from our homepage.";
    heading.textContent = "";
    count.textContent = "";
    noResults.classList.add("hidden");
    return;
  }

  document.title = `${category.title} | SA Career Hub`;
  title.textContent = category.title;
  description.textContent = category.description;
  heading.textContent = `Latest ${selectedType} opportunities`;

  try {
    const response = await fetch("data/opportunities.json");

    if (!response.ok) {
      throw new Error("Unable to load opportunities.");
    }

    const opportunities = await response.json();

    const filtered = opportunities.filter(
      opportunity => opportunity.type === selectedType
    );

    count.textContent =
      `${filtered.length} opportunit${filtered.length === 1 ? "y" : "ies"} found`;

    
    grid.innerHTML = filtered.map(opportunity => {
    // Determine the opportunity's closing status.
    const status = getOpportunityStatus(opportunity.closingDate);

    const statusLabel =
        status === "open" ? "OPEN" :
        status === "closing-passed" || status === "expired" ? "CLOSED" :
        status === "date-not-specified" ? "DATE NOT SPECIFIED" :
        "CHECK CLOSING DATE";

    const statusClass =
        status === "open" ? "status-open" :
        status === "closing-passed" || status === "expired" ? "status-closed" :
        "status-unknown";

    return `
        <article class="opportunity-card">
        <div class="card-badges">
            <span class="badge">
            ${escapeHTML(opportunity.type)}
            </span>

            <span class="status-badge ${statusClass}">
            ${statusLabel}
            </span>
        </div>

        <h3>${escapeHTML(opportunity.title)}</h3>

        <p class="company">
            ${escapeHTML(opportunity.company)}
        </p>

        <p class="meta">
            📍 ${escapeHTML(opportunity.province)}
            &nbsp; • &nbsp;
            Closing: ${escapeHTML(opportunity.closingDate || "Not specified")}
        </p>

        ${status === "closing-passed" ? `
            <p class="closing-notice">
            The closing date has passed. Check with the employer
            to confirm whether late applications are accepted.
            </p>
        ` : ""}

        ${status === "unknown" ? `
            <p class="closing-notice">
            Check the employer's advert for the current closing date.
            </p>
        ` : ""}

        <p>${escapeHTML(opportunity.description)}</p>

        <a
            class="apply-btn"
            href="opportunity.html?id=${encodeURIComponent(opportunity.id)}"
        >
            View Details →
        </a>
        </article>
    `;
    }).join("");

    noResults.classList.toggle("hidden", filtered.length !== 0);

  } catch (error) {
    console.error(error);

    count.textContent = "We couldn't load the opportunities.";
    grid.innerHTML = "";
    noResults.classList.add("hidden");
  }
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

loadCategory();
