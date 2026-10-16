
const headerHTML = `
  <header class="site-header">
    <div class="container nav">
      
<a class="logo" href="index.html">
  <svg class="logo-icon" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="10" r="7" fill="#14B8A6" />
    <path d="M27 22 C16 19 7 30 9 43 C11 51 19 55 27 57 L31 34 Z" fill="#14B8A6" />
    <path d="M37 22 C48 19 57 30 55 43 C53 51 45 55 37 57 L33 34 Z" fill="#2563A6" />
  </svg>
  <span class="logo-text">SA<span class="logo-career">Career</span><span class="logo-hub">Hub</span></span>
</a>

      <button
        class="menu-btn"
        id="menuBtn"
        aria-label="Open menu"
        aria-expanded="false"
      >☰</button>

      <nav id="navMenu">
        <a href="index.html#opportunities">All Opportunities</a>
        <a href="category.html?type=Learnership">Learnerships</a>
        <a href="category.html?type=Internship">Internships</a>
        <a href="category.html?type=Graduate">Graduate Programmes</a>
        <a href="category.html?type=Job">Jobs</a>
        <a href="career-tips.html">Career Tips</a>
      </nav>
    </div>
  </header>
`;


const footerHTML = `
  <footer class="site-footer">
    <div class="container">

      <div class="footer-main">

        <div class="footer-brand">
            <a class="footer-logo" href="index.html">
            <svg class="logo-icon" viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="10" r="7" fill="#2DD4BF" />
                <path d="M27 22 C16 19 7 30 9 43 C11 51 19 55 27 57 L31 34 Z" fill="#2DD4BF" />
                <path d="M37 22 C48 19 57 30 55 43 C53 51 45 55 37 57 L33 34 Z" fill="#60A5FA" />
            </svg>
            <span class="logo-text">SA<span class="logo-career">Career</span><span class="logo-hub">Hub</span></span>
            </a>

          <p>
            Your next opportunity could be closer than you think.
            Discover jobs, learnerships, internships and graduate
            programmes across South Africa.
          </p>

          <span class="footer-tagline">
            Find your next step.
          </span>
        </div>

        <div class="footer-links">
          <h3>Explore opportunities</h3>
          <a href="index.html#opportunities">All Opportunities</a>
          <a href="category.html?type=Learnership">Learnerships</a>
          <a href="category.html?type=Internship">Internships</a>
          <a href="category.html?type=Graduate">Graduate Programmes</a>
          <a href="category.html?type=Job">Jobs</a>
        </div>

        <div class="footer-links">
          <h3>Career resources</h3>
          <a href="career-tips.html">Career Tips</a>
          <a href="career-tips.html">CV Writing Advice</a>
          <a href="career-tips.html">Interview Preparation</a>
          <a href="career-tips.html">Avoid Recruitment Scams</a>
        </div>

      </div>

      <div class="footer-notice">
        <strong>Stay alert. Apply safely.</strong>
        <p>
          Always verify vacancies on the employer's official website.
          Never pay someone to secure a job or learnership.
        </p>
      </div>

      <div class="footer-bottom">
        <p>
          © 2026 SA Career Hub. All rights reserved.
        </p>

        <a href="index.html">Back to home ↑</a>
      </div>

    </div>
  </footer>
`;

const headerPlaceholder = document.getElementById("site-header");
const footerPlaceholder = document.getElementById("site-footer");

if (headerPlaceholder) {
  headerPlaceholder.innerHTML = headerHTML;
}

if (footerPlaceholder) {
  footerPlaceholder.innerHTML = footerHTML;
}

// Mobile navigation works on every page.
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    // Change the icon when the menu opens or closes
    menuBtn.textContent = isOpen ? "×" : "☰";

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });
}

