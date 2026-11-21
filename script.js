
/* =========================================================
   SAHIM S TAMBADI PORTFOLIO
   Main JavaScript
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const PORTFOLIO_CONFIG = {

    email: "sahimtambadi278@gmail.com",

    phone: "+918296453064",

    linkedin: "https://www.linkedin.com/in/sahim-tambadi-6a3b79370/",

    github: "https://github.com/SahimTambadi",

    emailjs: {
        serviceId: "service_sahim278",
        templateId: "template_g3tovdv",
        publicKey: "xvTU4gXw7riD-oSW0"
    },

    projects: {

        weapon: {
            github: "",
            demo: ""
        },

        chatbot: {
            github: "",
            demo: ""
        },

        vaxcare: {
            github: "",
            demo: ""
        },

        event: {
            github: "",
            demo: ""
        }

    }

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const body = document.body;

const preloader =
    document.getElementById("preloader");

const header =
    document.getElementById("header");

const navMenu =
    document.getElementById("navMenu");

const menuBtn =
    document.getElementById("menuBtn");

const themeBtn =
    document.getElementById("themeBtn");

const mobileThemeBtn =
    document.getElementById("mobileThemeBtn");

const scrollTopBtn =
    document.getElementById("scrollTop");

const modal =
    document.getElementById("projectModal");

const modalClose =
    document.getElementById("modalClose");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalBody =
    document.getElementById("modalBody");

const contactForm =
    document.getElementById("contactForm");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 500);

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function closeMobileMenu() {

    if (navMenu) {
        navMenu.classList.remove("open");
    }

    body.classList.remove("no-scroll");

    if (menuBtn) {

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        menuBtn.setAttribute("aria-expanded", "false");
    }

}


if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");

        body.classList.toggle("no-scroll", isOpen);

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);

        }

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

}


document.querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", closeMobileMenu);

    });


/* =========================================================
   THEME
========================================================= */

function setThemeIcon() {

    const icons = document.querySelectorAll(
        "#themeBtn i, #mobileThemeBtn i"
    );

    icons.forEach(icon => {

        if (body.classList.contains("light-theme")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    });

}


function toggleTheme() {

    body.classList.toggle("light-theme");

    const isLight =
        body.classList.contains("light-theme");

    localStorage.setItem(
        "portfolioTheme",
        isLight ? "light" : "dark"
    );

    setThemeIcon();

}


if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
}

if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener("click", toggleTheme);
}


/* Load saved theme */

try {

    const savedTheme =
        localStorage.getItem("portfolioTheme");

    if (savedTheme === "light") {
        body.classList.add("light-theme");
    }

} catch (error) {

    console.warn("Theme preference could not be loaded.", error);

}

setThemeIcon();


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function handleHeader() {

    if (!header) return;

    header.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );

}

window.addEventListener("scroll", handleHeader);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            current &&
            link.getAttribute("href") === `#${current}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText =
    document.getElementById("typingText");

const typingWords = [

    "Full-Stack Developer",
    "AI/ML Enthusiast",
    "Computer Vision Developer",
    "Python Developer"

];

let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    if (!typingText) return;

    const currentWord =
        typingWords[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % typingWords.length;

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 85
    );

}

if (typingText) {
    typeEffect();
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* =========================================================
   SCROLL TO TOP
========================================================= */

function handleScrollTop() {

    if (!scrollTopBtn) return;

    scrollTopBtn.classList.toggle(
        "show",
        window.scrollY > 500
    );

}

window.addEventListener("scroll", handleScrollTop);


if (scrollTopBtn) {

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   SKILL FILTER
========================================================= */

const skillFilters =
    document.querySelectorAll(".skill-filter");

const skillCards =
    document.querySelectorAll(".skill-card");


skillFilters.forEach(filter => {

    filter.addEventListener("click", () => {

        skillFilters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const selected =
            filter.dataset.filter;

        skillCards.forEach(card => {

            const category =
                card.dataset.category;

            card.classList.toggle(
                "hidden",
                selected !== "all" && selected !== category
            );

        });

    });

});


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

    /* =====================================================
       1. AI WEAPON AND VIOLENCE DETECTION
    ===================================================== */

    weapon: {

        title:
            "AI-Based Weapon & Violence Detection System",

        type:
            "Major Project | Team Lead",

        description:
            "An AI-powered surveillance and monitoring system designed to identify people and potential weapons from camera feeds and video streams. The system focuses on Person, Gun and Knife detection and supports incident monitoring through a web-based dashboard.",

        technologies: [

            "Python",
            "Flask",
            "YOLOv8",
            "OpenCV",
            "HTML",
            "CSS",
            "JavaScript",
            "SQLite",
            "SQLAlchemy",
            "Git",
            "GitHub"

        ],

        features: [

            "Real-time camera and video monitoring",
            "Person detection",
            "Gun detection",
            "Knife detection",
            "Automatic screenshot capture and saving when a weapon is detected",
            "Camera monitoring dashboard",
            "Detection alerts",
            "Incident reporting",
            "User management",
            "Database integration",
            "Full-stack Flask web dashboard"

        ],

        contribution:
            "As the team lead, coordinated project development and worked on integrating YOLOv8 and OpenCV for computer vision-based Person, Gun and Knife detection. Also contributed to the Flask web application, camera monitoring dashboard, database integration and detection workflow, including automatic screenshot capture when a weapon is detected.",

        achievement: {

            title:
                "🏆 Selected for Startup Incubation",

            organization:
                "Maratha Mandal Engineering College (MMEC), Belagavi",

            details: [

                "Successfully developed and presented an innovative technology-based project selected for the college's incubation initiative.",

                "Received recognition and support from college leadership, including the President of MMEC.",

                "Presented the project before potential investors and discussed its future development and commercialization.",

                "Explored opportunities for startup development, investment and transforming the project into a real-world solution."

            ],

            highlights:
                "Project Selection | Incubation Opportunity | Investor Interaction | Startup Development"

        }

    },


    /* =====================================================
       2. AI CHATBOT QUALITY EVALUATION FRAMEWORK
    ===================================================== */

    chatbot: {

        title:
            "AI Chatbot Quality Evaluation Framework",

        type:
            "AI/ML Project | Quality Evaluation",

        description:
            "A Python-based framework designed to evaluate chatbot response quality through configurable test cases and evaluation criteria. The prototype uses predefined chatbot responses to demonstrate automated testing, quality analysis and evaluation reporting.",

        technologies: [

            "Python",
            "Streamlit",
            "SQLite",
            "Pandas",
            "Pytest",
            "AI Evaluation",
            "Prompt Engineering",
            "Data Analysis"

        ],

        features: [

            "Automated chatbot response evaluation",
            "Accuracy and relevance evaluation",
            "Safety evaluation",
            "Response similarity analysis",
            "Prompt-injection test cases",
            "Automated test execution using Pytest",
            "Evaluation history and result tracking",
            "Streamlit evaluation dashboard",
            "Failed-test analysis",
            "Evaluation summaries and analytics"

        ],

        contribution:
            "Developed a prototype evaluation framework using Python, with a Streamlit dashboard and SQLite-based evaluation history. Worked on evaluation criteria, automated test cases, prompt-injection testing, result analysis and test reporting. The current prototype uses simulated chatbot responses rather than a live LLM integration."

    },


    /* =====================================================
       3. VAXCARE VACCINE INFORMATION PORTAL
    ===================================================== */

    vaxcare: {

        title:
            "VaxCare – Vaccine Information Portal",

        type:
            "Full-Stack Web Development Project",

        description:
            "A React-based vaccine information portal that organizes vaccine-related information into searchable listings and individual detail pages. The application uses Supabase for database integration and supports authentication and administrative vaccine management.",

        technologies: [

            "React",
            "JavaScript",
            "Vite",
            "React Router",
            "Supabase",
            "PostgreSQL",
            "HTML",
            "CSS",
            "Git",
            "GitHub"

        ],

        features: [

            "Vaccine listing and browsing",
            "Vaccine search functionality",
            "Individual vaccine detail pages",
            "Supabase database integration",
            "PostgreSQL vaccine data storage",
            "User authentication",
            "Protected administrative access",
            "Admin vaccine management",
            "Vaccine information and reference sections",
            "Responsive user interface"

        ],

        contribution:
            "Worked on building the React frontend, configuring application routing and integrating Supabase with the vaccine information database. Developed vaccine listing and detail views, authentication-related functionality and administrative management features. Organized vaccine information in a structured database for easier browsing and management."

    },


    /* =====================================================
       4. COLLEGE EVENT MANAGEMENT SYSTEM
    ===================================================== */

    event: {

        title:
            "College Event Management System",

        type:
            "Mini Project",

        description:
            "A web-based platform designed to simplify the management of college events, registrations and participants through a centralized application.",

        technologies: [

            "HTML",
            "CSS",
            "JavaScript",
            "Python",
            "Flask",
            "SQLite"

        ],

        features: [

            "User authentication",
            "Event registration",
            "Participant management",
            "Database integration",
            "Event dashboard",
            "Responsive user interface"

        ],

        contribution:
            "Developed a responsive full-stack application using Flask, HTML, CSS, JavaScript and SQLite while collaborating with a team to build the project."

    }

};


/* =========================================================
   OPEN PROJECT MODAL
========================================================= */

let lastFocusedElement = null;


function openProject(projectId) {

    const project =
        projectData[projectId];

    if (!project || !modal || !modalBody) {
        return;
    }

    lastFocusedElement = document.activeElement;


    /* Generate technology tags */

    const technologies =
        project.technologies
            .map(tech => `<span>${tech}</span>`)
            .join("");


    /* Generate feature list */

    const features =
        project.features
            .map(feature => `
                <li>
                    <i class="fa-solid fa-check"></i>
                    ${feature}
                </li>
            `)
            .join("");


    /* Generate startup achievement */

    let achievementHTML = "";

    if (project.achievement) {

        const achievement =
            project.achievement;

        const details =
            achievement.details
                .map(detail => `<li>${detail}</li>`)
                .join("");

        achievementHTML = `

            <div class="modal-section project-achievement">

                <span class="achievement-badge">
                    ${achievement.title}
                </span>

                <h4>
                    Startup Incubation Recognition
                </h4>

                <p class="modal-description">
                    <strong>
                        ${achievement.organization}
                    </strong>
                </p>

                <ul>
                    ${details}
                </ul>

                <p>
                    <strong>Key Highlights</strong>
                </p>

                <p class="modal-description">
                    ${achievement.highlights}
                </p>

            </div>

        `;

    }


    /* GitHub profile/repository link */

    const projectConfig =
        PORTFOLIO_CONFIG.projects[projectId];

    const githubURL =
        projectConfig?.github ||
        PORTFOLIO_CONFIG.github;

    const githubHTML = `

        <div class="modal-section">

            <a
                href="${githubURL}"
                class="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer">

                <i class="fa-brands fa-github"></i>
                View GitHub

            </a>

        </div>

    `;


    /* Generate modal content */

    modalBody.innerHTML = `

        <span class="project-type">
            ${project.type}
        </span>

        <h2 class="modal-title">
            ${project.title}
        </h2>

        <p class="modal-description">
            ${project.description}
        </p>

        <div class="modal-section">

            <h4>Technologies Used</h4>

            <div class="project-tags">
                ${technologies}
            </div>

        </div>

        <div class="modal-section">

            <h4>Key Features</h4>

            <ul>
                ${features}
            </ul>

        </div>

        <div class="modal-section">

            <h4>My Contribution</h4>

            <p class="modal-description">
                ${project.contribution}
            </p>

        </div>

        ${achievementHTML}

        ${githubHTML}

    `;


    /* Show modal */

    modal.classList.add("active");

    body.classList.add("no-scroll");

    if (modalClose) {
        modalClose.focus();
    }

}


window.openProject = openProject;


/* =========================================================
   CLOSE PROJECT MODAL
========================================================= */

function closeModal() {

    if (!modal) return;

    modal.classList.remove("active");

    body.classList.remove("no-scroll");

    if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus === "function"
    ) {

        lastFocusedElement.focus();

    }

}


if (modalClose) {

    modalClose.addEventListener("click", closeModal);

}


if (modalOverlay) {

    modalOverlay.addEventListener("click", closeModal);

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeMobileMenu();

        if (
            modal &&
            modal.classList.contains("active")
        ) {

            closeModal();

        }

    }

});


/* =========================================================
   PROJECT GITHUB BUTTONS AND LINKS
========================================================= */

document.querySelectorAll(".project-link")
    .forEach(element => {

        const projectId =
            element.dataset.project;

        const project =
            PORTFOLIO_CONFIG.projects[projectId];

        /*
           Use the individual repository URL when supplied.
           Otherwise, use the main GitHub profile.
        */

        const githubURL =
            project?.github ||
            PORTFOLIO_CONFIG.github;


        if (element.tagName === "A") {

            element.href = githubURL;

            element.target = "_blank";

            element.rel = "noopener noreferrer";

            element.addEventListener("click", event => {
                event.stopPropagation();
            });

        } else {

            element.addEventListener("click", event => {

                event.preventDefault();

                event.stopPropagation();

                window.open(
                    githubURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            });

        }

    });


/* =========================================================
   SOCIAL LINKS
========================================================= */

function configureSocialLinks() {

    const socialLinks = document.querySelectorAll(
        ".external-link, .social-links a, a[aria-label='LinkedIn'], a[aria-label='GitHub']"
    );

    socialLinks.forEach(link => {

        const label =
            (link.getAttribute("aria-label") || "").toLowerCase();

        const existingURL =
            link.dataset.url ||
            link.getAttribute("href") ||
            "";

        let finalURL = existingURL;

        if (
            label.includes("linkedin") ||
            existingURL.includes("linkedin.com")
        ) {

            finalURL = PORTFOLIO_CONFIG.linkedin;

            /* Add LinkedIn icon if the anchor is empty */

            if (!link.children.length && !link.textContent.trim()) {

                link.innerHTML =
                    '<i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>';

            }

        } else if (
            label.includes("github") ||
            existingURL.includes("github.com")
        ) {

            finalURL = PORTFOLIO_CONFIG.github;

            if (!link.children.length && !link.textContent.trim()) {

                link.innerHTML =
                    '<i class="fa-brands fa-github" aria-hidden="true"></i>';

            }

        }

        if (finalURL) {

            link.href = finalURL;

            link.dataset.url = finalURL;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

        }

    });

}

configureSocialLinks();


/* =========================================================
   EMAILJS INITIALIZATION
========================================================= */

let emailJSReady = false;


function initializeEmailJS() {

    if (typeof emailjs === "undefined") {

        console.error(
            "EmailJS library not found. Check the EmailJS script in index.html."
        );

        return false;

    }

    try {

        emailjs.init({
            publicKey: PORTFOLIO_CONFIG.emailjs.publicKey
        });

        emailJSReady = true;

        return true;

    } catch (error) {

        console.error("EmailJS initialization failed:", error);

        return false;

    }

}


initializeEmailJS();


/* =========================================================
   CONTACT FORM - EMAILJS
========================================================= */

if (contactForm) {

    contactForm.addEventListener("submit", async event => {

        event.preventDefault();

        const name =
            document.getElementById("name")?.value.trim();

        const email =
            document.getElementById("email")?.value.trim();

        const message =
            document.getElementById("message")?.value.trim();


        /* Validate required fields */

        if (!name || !email || !message) {

            showToast("Please fill in all fields.");

            return;

        }


        /* Validate email format */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showToast("Please enter a valid email address.");

            return;

        }


        /* Check EmailJS availability */

        if (!emailJSReady || typeof emailjs === "undefined") {

            showToast(
                "Email service is unavailable. Please try again later."
            );

            console.error(
                "EmailJS is not initialized. Check the SDK script in index.html."
            );

            return;

        }


        /* Find submit button */

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        const originalButtonHTML =
            submitButton?.innerHTML;

        const originalButtonText =
            submitButton?.value;


        if (submitButton) {

            submitButton.disabled = true;

            if (submitButton.tagName === "INPUT") {
                submitButton.value = "Sending...";
            } else {
                submitButton.textContent = "Sending...";
            }

        }


        /*
           These parameter names must match your EmailJS template:

           {{from_name}}
           {{from_email}}
           {{message}}
        */

        const templateParams = {

            from_name: name,

            from_email: email,

            message: message

        };


        try {

            const response = await emailjs.send(

                PORTFOLIO_CONFIG.emailjs.serviceId,

                PORTFOLIO_CONFIG.emailjs.templateId,

                templateParams

            );


            console.log(
                "EmailJS success:",
                response.status,
                response.text
            );


            showToast(
                "Your message has been sent successfully!"
            );

            contactForm.reset();


        } catch (error) {

            console.error(
                "EmailJS sending error:",
                error
            );

            showToast(
                "Message could not be sent. Please try again."
            );

        } finally {

            if (submitButton) {

                submitButton.disabled = false;

                if (submitButton.tagName === "INPUT") {

                    submitButton.value =
                        originalButtonText || "Send Message";

                } else {

                    submitButton.innerHTML =
                        originalButtonHTML || "Send Message";

                }

            }

        }

    });

}


/* =========================================================
   TOAST NOTIFICATION
========================================================= */

let toastTimer;


function showToast(message) {

    if (!toast || !toastMessage) {

        console.log(message);

        return;

    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


window.showToast = showToast;


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   PHONE LINK
========================================================= */

document.querySelectorAll('a[href^="tel:"]')
    .forEach(link => {

        link.href =
            `tel:${PORTFOLIO_CONFIG.phone}`;

    });


/* =========================================================
   PREVENT EMPTY LINKS
========================================================= */

document.querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            if (
                !link.classList.contains("external-link") &&
                !link.classList.contains("nav-link")
            ) {

                event.preventDefault();

            }

        });

    });


/* =========================================================
   INITIALIZE SCROLL-BASED FEATURES
========================================================= */

handleHeader();

handleScrollTop();

updateActiveNav();


/* =========================================================
   END OF PORTFOLIO JAVASCRIPT
========================================================= */
