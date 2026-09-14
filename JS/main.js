
/* =========================================================
   SUJIT PORTFOLIO
   Main JavaScript
========================================================= */


/* ==================== DOM READY ==================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==================== ELEMENTS ==================== */

    const body = document.body;
    const header = document.getElementById("header");

    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");

    const themeButton = document.getElementById("theme-button");
    const themeIcon = document.getElementById("theme-icon");

    const scrollProgress = document.getElementById("scroll-progress");
    const backToTop = document.getElementById("back-to-top");

    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        const preloader = document.getElementById("preloader");

        if (preloader) {
            setTimeout(() => {
                preloader.classList.add("hide");
            }, 400);
        }

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (navToggle) {

        navToggle.addEventListener("click", () => {
            navMenu.classList.add("show-menu");
        });

    }

    if (navClose) {

        navClose.addEventListener("click", () => {
            navMenu.classList.remove("show-menu");
        });

    }

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {
            navMenu.classList.remove("show-menu");
        });

    });


    /* =====================================================
       LIGHT / DARK MODE
    ===================================================== */

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {

        body.classList.add("dark-theme");

        if (themeIcon) {
            themeIcon.classList.remove("uil-moon");
            themeIcon.classList.add("uil-sun");
        }

    } else {

        body.classList.remove("dark-theme");

        if (themeIcon) {
            themeIcon.classList.remove("uil-sun");
            themeIcon.classList.add("uil-moon");
        }

    }


    if (themeButton) {

        themeButton.addEventListener("click", () => {

            body.classList.toggle("dark-theme");

            const isDark =
                body.classList.contains("dark-theme");

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

            if (isDark) {

                themeIcon.classList.remove("uil-moon");
                themeIcon.classList.add("uil-sun");

            } else {

                themeIcon.classList.remove("uil-sun");
                themeIcon.classList.add("uil-moon");

            }

        });

    }


    /* =====================================================
       SCROLL EVENTS
    ===================================================== */

    function handleScroll() {

        const scrollTop = window.scrollY;

        /* Header shadow */

        if (scrollTop > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }


        /* Scroll progress */

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        scrollProgress.style.width = `${progress}%`;


        /* Back to top */

        if (scrollTop > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.getElementById("typing-text");

    const roles = [
        "Software Engineer",
        "Python Developer",
        "PyQt5 Developer",
        "Data Analytics Engineer",
        "Application Developer"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function typeRole() {

        if (!typingElement) return;

        const currentRole =
            roles[roleIndex];

        if (!deleting) {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;

            if (characterIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeRole, 1800);

                return;
            }

        } else {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;

            if (characterIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) % roles.length;

            }

        }

        setTimeout(
            typeRole,
            deleting ? 55 : 100
        );

    }

    typeRole();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
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

        revealObserver.observe(element);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    function setActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active-link"
            );

            const target =
                link.getAttribute("href");

            if (target === `#${currentSection}`) {

                link.classList.add(
                    "active-link"
                );

            }

        });

    }

    window.addEventListener(
        "scroll",
        setActiveNav
    );

    setActiveNav();


    /* =====================================================
       QUALIFICATION TABS
    ===================================================== */

    const qualificationButtons =
        document.querySelectorAll(
            ".qualification-button"
        );

    const qualificationContents =
        document.querySelectorAll(
            ".qualification-content"
        );


    qualificationButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.target;


            qualificationButtons.forEach(btn => {
                btn.classList.remove("active-tab");
            });

            qualificationContents.forEach(content => {
                content.classList.remove(
                    "active-content"
                );
            });


            button.classList.add(
                "active-tab"
            );


            const targetContent =
                document.querySelector(target);

            if (targetContent) {

                targetContent.classList.add(
                    "active-content"
                );

            }

        });

    });


    /* =====================================================
       SERVICE MODALS
    ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            ".service-button"
        );

    const serviceModals =
        document.querySelectorAll(
            ".service-modal"
        );


    serviceButtons.forEach(button => {

        button.addEventListener("click", () => {

            const modalId =
                button.dataset.modal;

            const modal =
                document.getElementById(modalId);

            if (modal) {

                modal.classList.add(
                    "active-modal"
                );

                document.body.style.overflow =
                    "hidden";

            }

        });

    });


    serviceModals.forEach(modal => {

        const closeButton =
            modal.querySelector(".modal-close");


        closeButton.addEventListener(
            "click",
            () => {

                modal.classList.remove(
                    "active-modal"
                );

                document.body.style.overflow =
                    "";

            }
        );


        modal.addEventListener(
            "click",
            event => {

                if (event.target === modal) {

                    modal.classList.remove(
                        "active-modal"
                    );

                    document.body.style.overflow =
                        "";

                }

            }
        );

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                serviceModals.forEach(modal => {
                    modal.classList.remove(
                        "active-modal"
                    );
                });

                navMenu.classList.remove(
                    "show-menu"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );


    /* =====================================================
       PROJECT FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".project-filter"
        );

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active-filter"
                );

            });


            button.classList.add(
                "active-filter"
            );


            projectCards.forEach(card => {

                const categories =
                    card.dataset.category || "";


                if (
                    filter === "all" ||
                    categories.includes(filter)
                ) {

                    card.classList.remove(
                        "hidden-project"
                    );

                } else {

                    card.classList.add(
                        "hidden-project"
                    );

                }

            });

        });

    });


    /* =====================================================
       PROJECT IMAGE SLIDERS
    ===================================================== */

    const sliders =
        document.querySelectorAll(
            "[data-slider]"
        );


    sliders.forEach(slider => {

        const track =
            slider.querySelector(
                ".slider-track"
            );

        const slides =
            slider.querySelectorAll(
                ".slider-slide"
            );

        const prevButton =
            slider.querySelector(
                ".slider-prev"
            );

        const nextButton =
            slider.querySelector(
                ".slider-next"
            );

        const dotsContainer =
            slider.querySelector(
                ".slider-dots"
            );


        if (!track || slides.length === 0) {
            return;
        }


        let currentSlide = 0;

        let autoPlay;


        /* Hide controls for one image */

        if (slides.length === 1) {

            if (prevButton) {
                prevButton.style.display = "none";
            }

            if (nextButton) {
                nextButton.style.display = "none";
            }

        }


        /* Create dots */

        slides.forEach((slide, index) => {

            const dot =
                document.createElement("span");

            dot.className = "slider-dot";

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener(
                "click",
                () => {

                    currentSlide = index;

                    updateSlider();

                    restartAutoPlay();

                }
            );

            dotsContainer.appendChild(dot);

        });


        const dots =
            dotsContainer.querySelectorAll(
                ".slider-dot"
            );


        function updateSlider() {

            track.style.transform =
                `translateX(-${currentSlide * 100}%)`;


            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentSlide
                );

            });

        }


        function nextSlide() {

            currentSlide++;

            if (
                currentSlide >= slides.length
            ) {
                currentSlide = 0;
            }

            updateSlider();

        }


        function previousSlide() {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide =
                    slides.length - 1;
            }

            updateSlider();

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                () => {

                    nextSlide();
                    restartAutoPlay();

                }
            );

        }


        if (prevButton) {

            prevButton.addEventListener(
                "click",
                () => {

                    previousSlide();
                    restartAutoPlay();

                }
            );

        }


        function startAutoPlay() {

            if (slides.length > 1) {

                autoPlay =
                    setInterval(
                        nextSlide,
                        4500
                    );

            }

        }


        function stopAutoPlay() {

            clearInterval(autoPlay);

        }


        function restartAutoPlay() {

            stopAutoPlay();

            startAutoPlay();

        }


        slider.addEventListener(
            "mouseenter",
            stopAutoPlay
        );

        slider.addEventListener(
            "mouseleave",
            startAutoPlay
        );


        startAutoPlay();

    });


    /* =====================================================
       COPY EMAIL
    ===================================================== */

    const copyEmail =
        document.getElementById("copy-email");


    if (copyEmail) {

        copyEmail.addEventListener(
            "click",
            async () => {

                const email =
                    "maitysujit32@gmail.com";


                try {

                    await navigator.clipboard.writeText(
                        email
                    );

                    showToast(
                        "Email address copied!"
                    );

                } catch (error) {

                    showToast(
                        "Please copy the email manually."
                    );

                }

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    const formMessage =
        document.getElementById(
            "form-message"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();

                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();

                const phone =
                    document.getElementById(
                        "phone"
                    ).value.trim();

                const project =
                    document.getElementById(
                        "project"
                    ).value.trim();

                const message =
                    document.getElementById(
                        "message"
                    ).value.trim();


                if (!name || !email || !message) {

                    formMessage.textContent =
                        "Please fill in Name, Email and Message.";

                    return;

                }


                const subject =
                    encodeURIComponent(
                        project
                            ? `Portfolio Contact - ${project}`
                            : "Portfolio Contact"
                    );


                const emailBody =
                    encodeURIComponent(
                        `Name: ${name}\n` +
                        `Email: ${email}\n` +
                        `Phone: ${phone}\n` +
                        `Project: ${project}\n\n` +
                        `Message:\n${message}`
                    );


                formMessage.textContent =
                    "Opening your email application...";


                window.location.href =
                    `mailto:maitysujit32@gmail.com?subject=${subject}&body=${emailBody}`;


                showToast(
                    "Opening your email application..."
                );

            }
        );

    }
    /* ==================== MEMORIES SLIDER ==================== */
        const track = document.getElementById('memories-track');
        const slides = document.querySelectorAll('.memory-slide');
        const prevBtn = document.getElementById('memory-prev');
        const nextBtn = document.getElementById('memory-next');
        const dotsContainer = document.getElementById('memory-dots');

        let currentIndex = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('span');

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        });

        // Auto slide every 4 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }, 4000);

    /* =====================================================
       TOAST FUNCTION
    ===================================================== */

    let toastTimer;


    function showToast(message) {

        if (!toast || !toastText) {
            return;
        }


        toastText.textContent =
            message;


        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 3000);

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "current-year"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});

