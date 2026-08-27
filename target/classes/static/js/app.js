/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       YEAR
    ====================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Close menu after clicking link */

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav a");

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       SKILL TABS
    ====================================================== */

    const skillTabs =
        document.querySelectorAll(".skill-tab");

    const skillPanels =
        document.querySelectorAll(".skill-panel");


    skillTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.target;


            skillTabs.forEach(item => {

                item.classList.remove("active");

            });


            skillPanels.forEach(panel => {

                panel.classList.remove("active");

            });


            tab.classList.add("active");


            const panel =
                document.querySelector(
                    `[data-panel="${target}"]`
                );


            if (panel) {

                panel.classList.add("active");

            }

        });

    });


    /* =====================================================
       THEME TOGGLE
    ====================================================== */

    const themeToggle =
        document.getElementById("themeToggle");


    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    }


    const updateThemeIcon = () => {

        if (!themeToggle) return;

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );

        themeToggle.textContent =
            isLight ? "☀" : "☾";

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    };


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-mode"
                );


                const isLight =
                    document.body.classList.contains(
                        "light-mode"
                    );


                localStorage.setItem(
                    "portfolio-theme",
                    isLight
                        ? "light"
                        : "dark"
                );


                updateThemeIcon();

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       CURSOR GLOW
    ====================================================== */

    const cursorGlow =
        document.querySelector(".cursor-glow");


    if (
        cursorGlow &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       CONTACT FORM
    ====================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formStatus =
        document.getElementById(
            "formStatus"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (formStatus) {

                    formStatus.textContent =
                        "Sending message...";

                }


                const formData =
                    new FormData(contactForm);


                try {

                    /*
                     * IMPORTANT:
                     *
                     * Replace this URL with
                     * your Spring Boot endpoint.
                     *
                     * Example:
                     * /api/contact
                     */

                    const response =
                        await fetch(
                            "/api/contact",
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Request failed"
                        );

                    }


                    if (formStatus) {

                        formStatus.textContent =
                            "Message sent successfully!";

                    }


                    contactForm.reset();


                } catch (error) {

                    console.error(error);


                    /*
                     * If backend endpoint is not
                     * configured yet, show a
                     * helpful message.
                     */

                    if (formStatus) {

                        formStatus.textContent =
                            "Unable to send message. Please email me directly.";

                    }

                }

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const offset =
                        header
                            ? header.offsetHeight
                            : 0;


                    const position =
                        target.offsetTop -
                        offset -
                        10;


                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ====================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.style.opacity = "0.35";

            }
        );

    });


    /* =====================================================
       PREVENT DOUBLE SUBMISSION
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            () => {

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    setTimeout(() => {

                        submitButton.disabled =
                            false;

                    }, 3000);

                }

            }
        );

    }

});