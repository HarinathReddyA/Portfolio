const text = (value) => document.createTextNode(value);

function addContactLink(parent, label, href) {
  const link = document.createElement("a");
  link.href = href;
  link.append(text(label));
  parent.append(link);
}

function renderPortfolio(data) {
  document.title = `${data.name} — ${data.headline}`;
  document.getElementById("hero-intro").textContent = data.intro;
  document.getElementById("footer-name").textContent = `${data.name} · ${new Date().getFullYear()}`;

  const contact = document.getElementById("hero-contact");
  addContactLink(contact, data.contact.email, `mailto:${data.contact.email}`);
  addContactLink(contact, data.contact.phone, `tel:${data.contact.phone.replace(/[^\d+]/g, "")}`);
  if (data.contact.linkedin) {
    addContactLink(contact, "LinkedIn ↗", data.contact.linkedin);
  }

  const projects = document.getElementById("project-grid");
  data.experience.flatMap((role) => role.projects).slice(0, 6).forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const top = document.createElement("div");
    top.className = "project-topline";
    const number = document.createElement("span");
    number.className = "project-number";
    number.textContent = `PROJECT / ${String(index + 1).padStart(2, "0")}`;
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
  Object.entries(data.skills).forEach(([category, items]) => {
    const group = document.createElement("section");
    group.className = "skill-group";
    const heading = document.createElement("h3");
    heading.textContent = category;
    const values = document.createElement("p");
    values.textContent = items.join(" · ");
    group.append(heading, values);
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
    notice.textContent = "Portfolio content could not be loaded. Please try again later.";
    document.body.append(notice);
  });
