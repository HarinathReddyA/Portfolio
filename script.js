const svgNamespace = "http://www.w3.org/2000/svg";

const skillIconShapes = {
  "AI & Machine Learning": [
    ["path", { d: "M7 32V20m9 12V9m9 23V16m9 16V5M6 14l9-7 9 5 10-8" }],
    ["circle", { cx: "6", cy: "14", r: "2" }],
    ["circle", { cx: "15", cy: "7", r: "2" }],
    ["circle", { cx: "24", cy: "12", r: "2" }],
    ["circle", { cx: "34", cy: "4", r: "2" }],
  ],
  "Generative AI": [
    ["path", { d: "M20 5v30M5 20h30M9 9l22 22m0-22L9 31" }],
    ["circle", { cx: "20", cy: "20", r: "5" }],
    ["circle", { cx: "20", cy: "5", r: "2" }],
    ["circle", { cx: "35", cy: "20", r: "2" }],
    ["circle", { cx: "20", cy: "35", r: "2" }],
    ["circle", { cx: "5", cy: "20", r: "2" }],
  ],
  "Cloud & DevOps": [
    ["path", { d: "M11 30h19a7 7 0 0 0 .4-14A10 10 0 0 0 11 14a8 8 0 0 0 0 16Z" }],
    ["path", { d: "M15 22h10m-5-5 5 5-5 5" }],
  ],
  "Versioning & Delivery": [
    ["circle", { cx: "10", cy: "9", r: "3" }],
    ["circle", { cx: "30", cy: "30", r: "3" }],
    ["circle", { cx: "10", cy: "30", r: "3" }],
    ["path", { d: "M10 12v15a3 3 0 0 0 3 3h14M10 12a8 8 0 0 0 8 8h4a8 8 0 0 1 8 8" }],
  ],
  "Data Engineering": [
    ["ellipse", { cx: "20", cy: "9", rx: "13", ry: "5" }],
    ["path", { d: "M7 9v22c0 3 6 5 13 5s13-2 13-5V9M7 20c0 3 6 5 13 5s13-2 13-5" }],
  ],
  "Model Training & Inference": [
    ["rect", { x: "7", y: "6", width: "26", height: "10", rx: "2" }],
    ["rect", { x: "7", y: "24", width: "26", height: "10", rx: "2" }],
    ["path", { d: "M12 11h.1M12 29h.1M18 11h10M18 29h10M20 17v6m-3-3 3 3 3-3" }],
  ],
};

function createSkillIcon(category) {
  const icon = document.createElementNS(svgNamespace, "svg");
  icon.setAttribute("viewBox", "0 0 40 40");
  icon.setAttribute("aria-hidden", "true");
  (skillIconShapes[category] || []).forEach(([tagName, attributes]) => {
    const shape = document.createElementNS(svgNamespace, tagName);
    Object.entries(attributes).forEach(([name, value]) => shape.setAttribute(name, value));
    icon.append(shape);
  });
  return icon;
}

function renderPortfolio(data) {
  document.title = `${data.name} — ${data.headline}`;
  document.getElementById("hero-intro").textContent = data.intro;
  document.getElementById("footer-name").textContent = `${data.name} · ${new Date().getFullYear()}`;

  const projects = document.getElementById("project-grid");
  [...data.remoteProjects, ...data.experience.flatMap((role) => role.projects)].slice(0, 6).forEach((project) => {
    const card = document.createElement("article");
    card.className = project.remote ? "project-card remote-project" : "project-card";

    const top = document.createElement("div");
    top.className = "project-topline";
    const number = document.createElement("span");
    number.className = "project-number";
    number.textContent = project.remote ? "REMOTE PROJECT" : "SELECTED WORK";
    const company = document.createElement("span");
    company.className = "project-company";
    company.textContent = project.client || project.company || "";
    top.append(number, company);

    const title = document.createElement("h3");
    title.textContent = project.name;
    const description = document.createElement("p");
    description.textContent = project.summary;
    const tags = document.createElement("div");
    tags.className = "project-tags";
    project.technologies.slice(0, 4).forEach((technology) => {
      const tag = document.createElement("span");
      tag.textContent = technology;
      tags.append(tag);
    });

    card.append(top, title, description, tags);
    projects.append(card);
  });

  const experience = document.getElementById("experience-list");
  data.experience.forEach((role) => {
    const item = document.createElement("article");
    item.className = "experience-item";
    const organization = document.createElement("div");
    const title = document.createElement("div");
    title.className = "experience-role";
    title.textContent = role.title;
    const company = document.createElement("div");
    company.className = "experience-company";
    company.textContent = role.company;
    organization.append(title, company);
    const summary = document.createElement("p");
    summary.className = "experience-summary";
    summary.textContent = role.summary;
    const dates = document.createElement("span");
    dates.className = "experience-dates";
    dates.textContent = role.dates;
    item.append(organization, summary, dates);
    experience.append(item);
  });

  const skills = document.getElementById("skills-grid");
  Object.entries(data.skills).forEach(([category, items], index) => {
    const group = document.createElement("section");
    group.className = "skill-group";
    group.style.setProperty("--skill-index", index);
    const top = document.createElement("div");
    top.className = "skill-group-top";
    const icon = document.createElement("span");
    icon.className = "skill-icon";
    icon.append(createSkillIcon(category));
    const count = document.createElement("span");
    count.className = "skill-count";
    count.textContent = `${String(items.length).padStart(2, "0")} SKILLS`;
    top.append(icon, count);
    const heading = document.createElement("h3");
    heading.textContent = category;
    const values = document.createElement("div");
    values.className = "skill-tags";
    items.forEach((skill) => {
      const tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.textContent = skill;
      values.append(tag);
    });
    group.append(top, heading, values);
    skills.append(group);
  });

  const education = data.education;
  document.getElementById("education").textContent =
    `${education.degree} · ${education.institution}, ${education.location} · ${education.dates} · CGPA ${education.cgpa}`;
  const publications = document.getElementById("publications");
  data.publications.forEach((publication) => {
    const item = document.createElement("li");
    item.textContent = `${publication.title} — ${publication.venue} (${publication.year})`;
    publications.append(item);
  });

  setupScrollAnimations();
}

function setupScrollAnimations() {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const targets = document.querySelectorAll(
    ".hero-copy, .hero-art, .services-section .section-heading, .service-card, .capabilities-heading, .capability-card, .evaluation-section .section-heading, .evaluation-card, .recruiter-fit, .project-card, .experience-item, .skills-section .section-heading, .skill-group, .about-section > *",
  );
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
  );

  targets.forEach((target, index) => {
    target.classList.add("reveal-on-scroll");
    target.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
    observer.observe(target);
  });
  document.body.classList.add("motion-ready");
}

fetch("data/portfolio.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load portfolio data (${response.status}).`);
    }
    return response.json();
  })
  .then(renderPortfolio)
  .catch((error) => {
    console.error("Portfolio content failed to load:", error);
    const notice = document.createElement("p");
    notice.className = "noscript-message";
    notice.textContent = `Portfolio content could not be loaded (${error.message}). Check that data/portfolio.json is included in the published GitHub Pages files.`;
    document.body.append(notice);
  });
