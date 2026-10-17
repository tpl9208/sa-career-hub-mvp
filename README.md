# SA Career Hub

**SA Career Hub** is a responsive South African career-opportunities website that helps visitors discover jobs, learnerships, internships, graduate programmes, bursaries, training opportunities and career advice.

The website is built with HTML, CSS, vanilla JavaScript and JSON. It is hosted on Cloudflare Pages and maintained in a GitHub repository.

**Live website:** https://sacareerhub.pages.dev/  
**GitHub repository:** https://github.com/tpl9208/sa-career-hub-mvp

---

## Table of Contents

1. Project Overview
2. Technologies Used
3. Project Structure
4. How the Website Works
5. HTML Pages
6. JavaScript Architecture
7. Opportunity Data Structure
8. CSS and Responsive Design
9. Shared Components
10. Search and Category Filtering
11. Opportunity Details and Closing Dates
12. Google AdSense Integration
13. SEO and Website Metadata
14. Security and Safe Rendering
15. Running the Project Locally
16. Deployment with GitHub and Cloudflare Pages
17. Updating Opportunities
18. Troubleshooting
19. Future Improvements

---

## 1. Project Overview

SA Career Hub provides a central place for South African job seekers to discover career opportunities and access practical career guidance.

The website separates its responsibilities into three main areas:

- **HTML:** Defines the structure and content of each page.
- **CSS:** Controls the visual appearance, layout, colours, typography and responsive behaviour.
- **JavaScript:** Loads opportunity data, handles search and filtering, displays opportunity cards, builds shared page components and renders individual opportunity details.

Opportunity listings are stored in a JSON file rather than being written directly into every HTML page. This makes it easier to maintain and update listings without redesigning the website.

The current project is a static website. It does not require a custom application server or a database for its basic functionality.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic content |
| CSS3 | Styling, layouts and responsive design |
| Vanilla JavaScript | Dynamic behaviour and page interaction |
| JSON | Structured opportunity data |
| Git and GitHub | Source control and code storage |
| Cloudflare Pages | Hosting and deployment |
| Google AdSense | Advertising and potential revenue |
| Google Search Console | Website indexing and SEO monitoring |

The site uses browser-native technologies without requiring a JavaScript framework such as React or Vue.

## 3. Project Structure

The main project files are organised as follows:

```text
sa-career-hub-mvp/
│
├── index.html
├── category.html
├── opportunity.html
├── career-tips.html
│
├── style.css
├── components.js
├── script.js
├── category.js
├── opportunity.js
├── opportunity-utils.js
│
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── README.md
│
└── data/
    └── opportunities.json
```

This tree describes the main files used by the project. Additional files or folders may be added as the website grows.

### File responsibilities at a glance

| File | Responsibility |
|---|---|
| `index.html` | Homepage, search interface, filters and opportunity grid |
| `category.html` | Displays opportunities belonging to a selected category |
| `opportunity.html` | Provides the layout for one opportunity's details |
| `career-tips.html` | Contains career guidance articles |
| `style.css` | Shared styles and responsive layouts |
| `components.js` | Shared website components, including navigation and footer |
| `script.js` | Homepage opportunity loading, search, filtering and rendering |
| `category.js` | Category-specific opportunity filtering and display |
| `opportunity.js` | Loads and displays an individual opportunity |
| `opportunity-utils.js` | Shared opportunity-related helper functions, including closing-date status |
| `data/opportunities.json` | Structured listings used by the JavaScript files |
| `favicon.svg` | Website tab icon |
| `robots.txt` | Provides crawling instructions to search engines |
| `sitemap.xml` | Lists important website URLs for search engines |
| `README.md` | Project documentation |

## 4. How the Website Works

The website follows a data-driven approach.

Instead of creating a separate HTML page for every job or learnership, the project stores listings in `data/opportunities.json`. JavaScript reads the data and generates the relevant content.

The general process is:

1. A visitor opens a page.
2. The browser reads the HTML.
3. The browser loads the shared CSS stylesheet.
4. The browser loads the JavaScript files referenced by that page.
5. JavaScript retrieves the opportunity JSON when required.
6. The code processes the records and renders the relevant content.
7. The visitor can search, filter, browse categories or open an individual opportunity.
8. Shared components provide consistent navigation and footer content across pages.

The relationship can be represented as:

```text
                 index.html
                      |
                      v
                  script.js
                      |
                      v
            opportunities.json
                      |
                      v
             Search and filters
                      |
                      v
              Opportunity cards
                      |
                      v
                category.html
                      |
                      v
               opportunity.html

Shared across applicable pages:
components.js + style.css
```

The diagram shows the main responsibilities and navigation relationships. The pages do not all need to execute the same JavaScript files; each page loads the scripts required for its functionality.

## 5. HTML Pages

### `index.html` — Homepage

The homepage is the main entry point.

It contains the hero section, search and filtering controls, opportunity grid, category links, career tips and advertising placements.

Important page elements include:

- `#site-header` — location where the shared header is inserted.
- `#opportunities` — main opportunities section.
- `#opportunityGrid` — container populated with opportunity cards.
- `#site-footer` — location where the shared footer is inserted.

The page loads `components.js`, `opportunity-utils.js` and `script.js`.

### `category.html` — Category Listings

The category page displays listings for a selected opportunity type.

The selected category is passed through a URL query parameter. For example:

```text
category.html?type=Learnership
category.html?type=Internship
category.html?type=Job
category.html?type=Bursary
```

JavaScript reads the selected type and uses it to determine which opportunities to display.

Important elements include:

- `#categoryTitle` — selected category heading.
- `#categoryDescription` — category introduction.
- `#listingHeading` — opportunity listing heading.
- `#resultCount` — loading message or result count.
- `#opportunityGrid` — filtered opportunity cards.
- `#noResults` — message displayed when no matching opportunities are available.

### `opportunity.html` — Opportunity Details

This page provides a reusable layout for individual listings.

The selected record is identified by an ID in the URL, for example:

```text
opportunity.html?id=business-administration-learnership-2026
```

The `opportunity.js` file reads the ID, retrieves the opportunity data and displays the matching record.

The page can show the title, employer, category, location, field, experience requirements, closing date, description, requirements and official application link.

It also includes a reminder encouraging visitors to verify opportunities through the employer's official website.

### `career-tips.html` — Career Advice

This is the informational section of the website.

It provides guidance on:

- Writing a CV with little or no experience.
- Preparing job applications.
- Preparing for interviews using the STAR method.
- Understanding learnerships and internships.
- Applying for graduate programmes.
- Avoiding recruitment scams.

The page uses HTML for its article content, `style.css` for presentation and `components.js` for the shared navigation and footer.

## 6. JavaScript Architecture

The JavaScript files have separate responsibilities. Keeping these responsibilities separate makes the code easier to maintain.

### `components.js`

This file is responsible for reusable website components, including the common header/navigation and footer.

The HTML pages provide containers such as:

```html
<div id="site-header"></div>
<div id="site-footer"></div>
```

The shared component code uses these locations to insert the common interface.

This approach means that changes to shared navigation or footer content can be maintained centrally rather than independently in every page.

### `script.js`

This is the main homepage behaviour file.

Its responsibilities include loading opportunity records, rendering cards and handling the homepage's search and filtering interface.

The general workflow is:

1. Request `data/opportunities.json`.
2. Read the returned opportunity records.
3. Apply the visitor's search and filter selections.
4. Generate the matching opportunity cards.
5. Display the cards in `#opportunityGrid`.
6. Update the interface when the visitor changes the search or filters.

The homepage's HTML defines the containers and controls, while `script.js` supplies the dynamic behaviour.

### `category.js`

This file controls the category listing page.

It uses the category selected in the URL to determine which records match the requested category. It then updates the category heading and description and displays the matching opportunities.

It also works with the result count and no-results message.

For example, selecting Learnerships should display records whose data type is `Learnership`, rather than unrelated internships or jobs.

### `opportunity.js`

This file powers the individual opportunity details page.

Its main responsibilities are to:

- Read the opportunity ID from the URL.
- Load `data/opportunities.json`.
- Find the matching opportunity.
- Format relevant information for display.
- Render the opportunity description and requirements.
- Display the application link when it passes the expected URL validation.
- Set a relevant document title for the selected opportunity.
- Show an appropriate message when the record cannot be found or loaded.

### `opportunity-utils.js`

This file contains shared opportunity-related helper logic.

One important responsibility is determining closing-date status. The status values used by the project include:

- `open`
- `closing-passed`
- `expired`
- `unknown`

The interface can use these statuses to display an open, closed or date-checking indicator.

Keeping shared logic in a utility file avoids duplicating the same date-related rules in multiple scripts.

**Script loading order matters.** When another JavaScript file depends on a helper function, the helper must be available before the dependent code executes. The HTML uses deferred scripts to avoid blocking initial HTML parsing, but dependencies still need to be ordered correctly.

## 7. Opportunity Data Structure

Opportunity records are stored in:

```text
data/opportunities.json
```

The file contains a JSON array of opportunity objects.

A record follows this general structure:

```json
{
  "id": "example-learnership-2026",
  "type": "Learnership",
  "title": "Example Business Administration Learnership",
  "company": "Example Employer",
  "province": "Gauteng",
  "field": "Business Administration",
  "experience": "Entry level",
  "closingDate": "2026-11-30",
  "description": "Description of the opportunity.",
  "requirements": [
    "Meet the advertised eligibility requirements",
    "Submit the required supporting documents"
  ],
  "applicationUrl": "https://example.com/apply"
}
```

This is an illustrative example, not a claim that the example vacancy exists.

### Field descriptions

| Field | Purpose |
|---|---|
| `id` | Unique identifier used to find the opportunity |
| `type` | Category used for filtering |
| `title` | Opportunity title |
| `company` | Employer or organisation |
| `province` | Province or location |
| `field` | Career or study field |
| `experience` | Experience level or eligibility information |
| `closingDate` | Closing date in `YYYY-MM-DD` format |
| `description` | Opportunity description |
| `requirements` | Array of requirements |
| `applicationUrl` | Official application destination |

### Important category values

The `type` field is used by the filtering logic. Values must match the values expected by the website.

Examples include:

- `Learnership`
- `Internship`
- `Graduate`
- `Job`
- `Training`
- `Bursary`

**Bursaries use the singular data value `Bursary`.** The website may display the plural label “Bursaries” to visitors, but the underlying filter value remains `Bursary`.

Similarly, the display label “Jobs” can use the underlying type value `Job`.

### Adding an opportunity

To add a new listing:

1. Open `data/opportunities.json`.
2. Add a new object to the JSON array.
3. Give it a unique `id`.
4. Use a supported category value.
5. Include the required fields.
6. Use a valid date format.
7. Check that the application URL is correct and trustworthy.
8. Validate the JSON syntax.
9. Save, commit and push the change to GitHub.

JSON does not allow trailing commas after the final property or array item. A syntax error can prevent the website from loading the data.

Always verify an opportunity's existence, eligibility conditions, closing date and application link before publishing it.

## 8. CSS and Responsive Design

The shared stylesheet is:

```text
style.css
```

It controls the presentation of the website's HTML elements and reusable classes.

The project uses classes and IDs to apply consistent styling to common interface elements, including:

- The site header and navigation.
- Main content containers.
- Hero sections.
- Search and filter controls.
- Opportunity cards and grids.
- Category cards.
- Buttons and links.
- Career guide articles.
- Footer content.
- Advertisement containers.
- Opportunity status indicators.

### Responsive layout

The website is designed to adapt to different screen sizes, including desktop computers and mobile phones.

CSS responsive techniques such as flexible layouts, grid or flexbox, and media queries can be used to adjust the arrangement of content as the available screen width changes.

The mobile layout is particularly important because visitors may search for opportunities using a phone.

When changing the stylesheet, test the homepage, category pages and opportunity details at both mobile and desktop widths.

### Shared styling

Because multiple pages load `style.css`, a change to a shared class can affect several pages at once.

For example, changing the appearance of a common button or container may affect both the homepage and opportunity details page.

After modifying shared CSS, inspect all relevant pages to check for unintended changes.

## 9. Shared Components

The shared header and footer help maintain a consistent brand and navigation experience.

The header gives visitors access to the website's main sections, while the footer provides supporting navigation and other site information.

The HTML pages contain placeholder elements for these components. `components.js` is responsible for inserting the shared content into the appropriate locations.

This arrangement reduces repeated markup and makes future navigation changes easier.

If a navigation link is added, renamed or removed, check the shared component code and verify that the destination page exists.

## 10. Search and Category Filtering

Search and filtering allow visitors to narrow the opportunity list.

The general process is:

1. The JavaScript loads the opportunity records.
2. The visitor enters a search term or selects a filter.
3. The code compares the selections with the available records.
4. Matching records are rendered as cards.
5. The result count and empty-results interface are updated.

Category links can direct visitors to `category.html` with a URL parameter specifying the requested type.

For the filters to work reliably, the HTML option values, URL parameters and JSON `type` values must agree.

The visible label can be plural while the underlying data value is singular. For example, the visible label “Bursaries” uses the filter value `Bursary`.

## 11. Opportunity Details and Closing Dates

Opportunity cards link to the details page using the record's unique ID.

This means the project can reuse one details template for many opportunities instead of creating a separate HTML file for each vacancy.

Closing-date logic helps visitors understand whether an opportunity appears to be open or whether its deadline has passed.

Dates should be stored consistently in ISO-style `YYYY-MM-DD` format. Date comparisons should be handled consistently to avoid timezone-related off-by-one errors.

A displayed status is a guide based on the stored information. Visitors should still verify that a vacancy remains available on the employer's official website.

## 12. Google AdSense Integration

Google AdSense is being integrated to support potential website revenue.

The publisher ID used by the project is:

```text
ca-pub-6800037475940294
```

HTML pages include the AdSense account meta tag and the external AdSense loader script in their `<head>` sections.

Manual ad placements use an ad unit containing an element similar to:

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6800037475940294"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

`YOUR_AD_SLOT_ID` is a placeholder. Each ad unit must use its own actual numeric slot ID supplied by Google AdSense.

### Planned ad placement structure

| Page | Planned placements |
|---|---:|
| Homepage | 2 |
| Category page | 2 |
| Opportunity details | 2 |
| Career tips | 3 |
| **Total** | **9** |

The loader script should not be duplicated inside every ad slot. Each slot needs its own correct configuration and initialization.

Ad code should be positioned so it does not mislead visitors, resemble application controls or encourage accidental clicks.

Ad placement alone does not guarantee that advertisements will appear or generate revenue. Serving depends on AdSense account and site status, ad availability and other factors.

## 13. SEO and Website Metadata

The project includes several files and HTML elements that support search-engine discovery.

### HTML metadata

Each page should have an appropriate title and meta description describing its content.

The viewport meta tag supports mobile rendering, while the favicon link provides the browser tab icon.

### `robots.txt`

This file provides instructions to compliant web crawlers about which parts of the website they may crawl.

It should be checked to ensure important public pages and assets are not unintentionally blocked.

### `sitemap.xml`

The sitemap lists important URLs that can be submitted through Google Search Console.

It should contain the canonical public URLs of the website's important pages. Update it when adding new standalone pages or changing the website's URL structure.

### Google Search Console

Search Console helps monitor indexing, sitemap processing and search performance.

Submitting a sitemap does not guarantee that every URL will be indexed. Google determines which pages to crawl and index.

## 14. Security and Safe Rendering

Because opportunity information is loaded from JSON and may contain external links, data should be handled carefully.

### Text rendering

Untrusted text should not be inserted into HTML in a way that allows it to execute as markup or script.

The project's opportunity rendering logic uses HTML-escaping techniques when constructing output. Keep these protections in place when modifying the rendering functions.

Where practical, use safe DOM APIs such as `textContent` for plain text.

### Application URLs

Application links should point to the intended employer or a legitimate application platform.

The details-page logic validates application URLs against the expected HTTP or HTTPS protocols. Continue validating URLs before rendering clickable links.

### Data accuracy

Only publish opportunities that can be checked against credible sources. Incorrect closing dates or fraudulent application links can harm visitors and the website's reputation.

Never promise a job, request payment to secure employment, or present an unverified listing as officially confirmed.

## 15. Running the Project Locally

The project can be edited using Visual Studio Code.

For local testing:

1. Open the project folder in VS Code.
2. Confirm that the main HTML, JavaScript, CSS and JSON files are present.
3. Use a local development server, such as the Live Server extension, to serve the project.
4. Open the local homepage in a browser.
5. Test navigation, search, category filters and opportunity details.
6. Inspect the browser developer console for JavaScript errors.
7. Check the browser Network panel if JSON files or other resources fail to load.

Serving the project over a local HTTP server is preferable to opening the HTML file directly with a `file://` URL, because browser security restrictions can interfere with `fetch()` requests for JSON.

## 16. Deployment with GitHub and Cloudflare Pages

The project uses GitHub for source control and Cloudflare Pages for public hosting.

The deployment workflow is:

```text
Edit files in VS Code
        |
        v
Test locally
        |
        v
Commit changes to Git
        |
        v
Push changes to GitHub
        |
        v
Cloudflare Pages deployment
        |
        v
Visit the live website
        |
        v
Verify functionality
```

The public repository is:

https://github.com/tpl9208/sa-career-hub-mvp

The live website is:

https://sacareerhub.pages.dev/

Because the project is a static website, its HTML, CSS, JavaScript and JSON files can be served directly by the hosting platform.

After pushing changes, check the Cloudflare Pages deployment status before testing the live site. If the latest version is not visible, confirm that the deployment succeeded and that the browser is not showing a cached version.

## 17. Updating Opportunities

Opportunity updates normally require changes to `data/opportunities.json`.

For a new listing:

1. Verify the opportunity using a credible source.
2. Create a unique ID.
3. Enter the correct type, title, employer and location.
4. Add the description and requirements.
5. Verify the deadline and application link.
6. Check JSON syntax.
7. Test the record on the homepage, relevant category page and details page.
8. Commit and push the change.
9. Verify the deployed result.

When changing category names or adding new types, update the relevant category configuration, homepage filters and category links as needed.

Remember that the underlying type `Bursary` must remain consistent even if the visitor-facing label is “Bursaries”.

## 18. Troubleshooting

### Opportunities do not load

Check the browser console and Network panel. Confirm that `data/opportunities.json` exists at the expected path, returns successfully and contains valid JSON.

### Search or filters do not work

Check that the expected HTML IDs exist and that the JavaScript references the correct element names. Verify that category values match the JSON records.

### An opportunity details page shows no record

Check that the URL contains a valid `id` parameter and that the same ID exists in `data/opportunities.json`.

### A shared header or footer is missing

Confirm that the page contains the expected `site-header` and `site-footer` elements and loads `components.js` successfully.

### The design breaks on mobile

Inspect `style.css`, media queries, grid definitions, fixed widths and overflowing elements. Test the page at narrow screen widths.

### Ads do not appear

Check that the correct AdSense loader, publisher ID, slot ID and initialization code are present. Also check the AdSense account and site status. Blank ad space does not automatically mean the code is broken.

### Changes do not appear on the live website

Confirm that the changes were committed and pushed, that Cloudflare Pages completed the deployment, and that the browser is loading the latest version.

## 19. Future Improvements

Possible future enhancements include:

- More verified jobs, learnerships, bursaries and training opportunities.
- More detailed category pages and career guidance.
- Improved search and additional filters.
- Better automated checks for expired opportunities.
- Stronger SEO metadata and structured data where appropriate.
- Automated JSON validation before deployment.
- Accessibility improvements and further mobile testing.
- Monitoring for broken application links.
- Analytics to understand which categories visitors use most.
- Further performance improvements as the number of listings grows.

Any future changes should preserve the separation between page structure, presentation, application logic and opportunity data.

---

## Project Principles

SA Career Hub is designed around a few core principles:

1. **Keep it maintainable:** Separate HTML, CSS, JavaScript and data.
2. **Keep it consistent:** Reuse shared components and styles.
3. **Keep it accessible:** Make navigation and information usable on mobile and desktop.
4. **Keep it trustworthy:** Verify opportunity details and application destinations.
5. **Keep it lightweight:** Use static hosting and browser-native technologies where practical.
6. **Keep it sustainable:** Improve the website incrementally while protecting the visitor experience.

SA Career Hub aims to make finding career opportunities in South Africa simpler, clearer and safer.
