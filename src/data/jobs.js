const COMPANY_LIST = [
  "Infosys",
  "TCS",
  "Wipro",
  "Accenture",
  "Capgemini",
  "Cognizant",
  "IBM",
  "Oracle",
  "SAP Labs",
  "Dell Technologies",
  "Amazon",
  "Flipkart",
  "Swiggy",
  "Razorpay",
  "PhonePe",
  "Paytm",
  "Zoho",
  "Freshworks",
  "Juspay",
  "CRED",
  "CloudSpring Labs",
  "DataMosaic AI",
  "ByteNest Systems",
  "CodeVerve Tech",
  "NovaStack Labs"
];

const LOCATIONS = [
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Chennai, Tamil Nadu",
  "Gurugram, Haryana",
  "Noida, Uttar Pradesh",
  "Mumbai, Maharashtra",
  "Kochi, Kerala",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan"
];

const ROLE_PROFILES = [
  {
    title: "SDE Intern",
    experience: "Fresher",
    salaryRange: "₹15k–₹40k/month Internship",
    skills: ["DSA", "JavaScript", "React", "Git"],
    focus: "product features and clean frontend-backend integrations"
  },
  {
    title: "Graduate Engineer Trainee",
    experience: "Fresher",
    salaryRange: "3–5 LPA",
    skills: ["Java", "SQL", "OOP", "Unit Testing"],
    focus: "core service modules and production support automation"
  },
  {
    title: "Junior Backend Developer",
    experience: "0-1",
    salaryRange: "6–10 LPA",
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
    focus: "resilient APIs and database-backed microservices"
  },
  {
    title: "Frontend Intern",
    experience: "Fresher",
    salaryRange: "₹15k–₹40k/month Internship",
    skills: ["HTML", "CSS", "React", "Figma"],
    focus: "responsive interfaces and reusable design components"
  },
  {
    title: "QA Intern",
    experience: "Fresher",
    salaryRange: "₹15k–₹40k/month Internship",
    skills: ["Manual Testing", "Selenium", "Jira", "Postman"],
    focus: "test cases, defect triage, and release readiness checks"
  },
  {
    title: "Data Analyst Intern",
    experience: "Fresher",
    salaryRange: "₹15k–₹40k/month Internship",
    skills: ["SQL", "Excel", "Python", "Power BI"],
    focus: "reporting pipelines and decision-ready business dashboards"
  },
  {
    title: "Java Developer (0-1)",
    experience: "0-1",
    salaryRange: "6–10 LPA",
    skills: ["Java", "Spring Boot", "MySQL", "Docker"],
    focus: "enterprise backend services and API reliability"
  },
  {
    title: "Python Developer (Fresher)",
    experience: "0-1",
    salaryRange: "3–5 LPA",
    skills: ["Python", "Django", "REST APIs", "Git"],
    focus: "automation tools and scalable internal web platforms"
  },
  {
    title: "React Developer (1-3)",
    experience: "1-3",
    salaryRange: "10–18 LPA",
    skills: ["React", "TypeScript", "Redux", "Jest"],
    focus: "high-quality UI workflows and performant user journeys"
  },
  {
    title: "DevOps Engineer (1-3)",
    experience: "1-3",
    salaryRange: "10–18 LPA",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    focus: "deployment pipelines, observability, and cloud efficiency"
  },
  {
    title: "QA Engineer (1-3)",
    experience: "1-3",
    salaryRange: "6–10 LPA",
    skills: ["Cypress", "Playwright", "API Testing", "Jira"],
    focus: "automation coverage and quality gates for fast releases"
  },
  {
    title: "Data Engineer (3-5)",
    experience: "3-5",
    salaryRange: "10–18 LPA",
    skills: ["Python", "Spark", "Airflow", "SQL"],
    focus: "batch and streaming data pipelines for analytics teams"
  }
];

const MODE_LIST = ["Remote", "Hybrid", "Onsite"];
const SOURCE_LIST = ["LinkedIn", "Naukri", "Indeed"];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildDescription(profile, company, location, experience) {
  return [
    `Join ${company} as a ${profile.title} and contribute from day one in ${location}.`,
    `You will build ${profile.focus} with a team that values ownership and thoughtful engineering.`,
    "Work closely with product, QA, and senior developers during planning, implementation, and release cycles.",
    `This role is ideal for ${experience} candidates who are comfortable with ${profile.skills[0]} and ${profile.skills[1]}.`
  ].join("\n");
}

function createJob(index) {
  const profile = ROLE_PROFILES[index % ROLE_PROFILES.length];
  const company = COMPANY_LIST[index % COMPANY_LIST.length];
  const location = LOCATIONS[index % LOCATIONS.length];
  const postedDaysAgo = index % 11;
  const mode = MODE_LIST[index % MODE_LIST.length];
  const source = SOURCE_LIST[index % SOURCE_LIST.length];
  const id = `job-${String(index + 1).padStart(3, "0")}`;

  return {
    id,
    title: profile.title,
    company,
    location,
    mode,
    experience: profile.experience,
    skills: [...profile.skills],
    source,
    postedDaysAgo,
    salaryRange: profile.salaryRange,
    applyUrl: `https://careers.${slugify(company)}.in/jobs/${slugify(profile.title)}-${1200 + index}`,
    description: buildDescription(profile, company, location, profile.experience)
  };
}

export const jobs = Array.from({ length: 60 }, (_, index) => createJob(index));
