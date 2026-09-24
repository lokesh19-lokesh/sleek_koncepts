/**
 * SLEEK KONCEPTS — MASTER JAVASCRIPT
 * High-End Interior Architecture & Design Website
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- 0. INTERNAL NAVIGATION TRACKER (PREVENTS PRELOADER WHEN NAVIGATING FROM OTHER PAGES) ---
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href')) {
            const rawHref = link.getAttribute('href');
            const cleanHref = rawHref.split('?')[0].split('#')[0];
            const currentFile = window.location.pathname.split('/').pop() || 'index.html';

            // If user is clicking a link to index.html from ANY other page
            if ((cleanHref === 'index.html' || cleanHref === './' || cleanHref === '') && currentFile !== 'index.html' && currentFile !== '') {
                try {
                    sessionStorage.setItem('sleek_from_internal', '1');
                } catch(err) {}
            }
        }
    });

    window.addEventListener('beforeunload', () => {
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        if (currentFile !== 'index.html' && currentFile !== '') {
            try {
                sessionStorage.setItem('sleek_from_internal', '1');
            } catch(err) {}
        }
    });

    // --- 1. STICKY NAVBAR ON SCROLL ---
    const navbar = document.querySelector('.navbar-sleek');
    const backToTopBtn = document.querySelector('.back-to-top-btn');

    const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;

        if (navbar) {
            if (scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollY > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Back to top action
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 2. ACTIVE NAVIGATION ITEM DETECTION ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-sleek .nav-link, .navbar-sleek .dropdown-item');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
            const parentDropdown = link.closest('.nav-item.dropdown');
            if (parentDropdown) {
                const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                if (dropdownToggle) dropdownToggle.classList.add('active');
            }
        }
    });

    // --- 3. SCROLL REVEAL OBSERVER ---
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- 4. PORTFOLIO FILTERING (projects.html) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-grid-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // --- 5. DYNAMIC CASE STUDY LOADER (project-details.html) ---
    const projectDetailContainer = document.getElementById('project-detail-container');
    if (projectDetailContainer) {
        const projectsData = {
            'emerald-villa': {
                name: 'The Emerald Villa',
                location: 'Karimnagar, Telangana',
                type: 'Complete 4BHK Residential Villa',
                style: 'Modern Contemporary Luxury',
                client: 'Private Residence',
                year: '2026',
                heroImg: 'images/projects/project-emerald-villa.jpg',
                description: 'A 4,200 sq.ft contemporary home characterized by seamless spatial transitions, bespoke fluted acoustic paneling, and warm architectural cove lighting. Our objective was to balance timeless elegance with pragmatic space utilization.',
                spaces: [
                    { title: 'Living Lounge', desc: 'Custom floating Italian marble TV credenza paired with fluted acoustic backing and concealed indirect LED cove lighting.', img: 'images/living-room/living-modern.jpg' },
                    { title: 'Modular Chef Kitchen', desc: 'Island kitchen with matte slate-grey acrylic finishes, quartz countertop, and soft-close Blum lift-up wall cabinets.', img: 'images/kitchens/kitchen-island.jpg' },
                    { title: 'Master Retreat', desc: 'Floor-to-ceiling upholstered velvet headboard wall with integrated bedside floating ledges and warm reading lamps.', img: 'images/bedrooms/bedroom-master.jpg' },
                    { title: 'Walk-In Wardrobe', desc: 'Tinted glass sliding wardrobe system with internal aluminum profiles, dedicated accessory drawers, and auto-sensor illumination.', img: 'images/wardrobes/wardrobe-glass.jpg' }
                ],
                palette: ['#284180', '#E52027', '#E5DFD7', '#2A2E39'],
                materials: ['Matte Acrylic Cabinets', 'Quartz Countertop', 'Natural Oak Veneer', 'Fluted Charcoal Louvers', 'Hafele Soft-Close Hardware']
            },
            'sky-penthouse': {
                name: 'Sky View Penthouse',
                location: 'Telangana',
                type: 'Luxury Penthouse Suite',
                style: 'Minimalist Architectural Luxury',
                client: 'Modern Executive Family',
                year: '2025 - 2026',
                heroImg: 'images/projects/project-sky-penthouse.jpg',
                description: 'An expansive penthouse designed around panoramic natural light and minimalist luxury. The design integrates frameless floor-to-ceiling doors, concealed storage partitions, and a serene monochromatic palette.',
                spaces: [
                    { title: 'Open-Plan Living', desc: 'Double-height volume with acoustic micro-slat paneling, integrated home theater acoustic walls, and plush low-profile seating.', img: 'images/living-room/living-luxury.jpg' },
                    { title: 'Minimalist Linear Kitchen', desc: 'Streamlined handle-less cabinetry with integrated appliances, anti-fingerprint surfaces, and seamless island breakfast bar.', img: 'images/kitchens/kitchen-minimal.jpg' },
                    { title: 'Executive Master Suite', desc: 'Warm oak timber flooring, custom wooden wall cladding, and walk-through dressing area.', img: 'images/bedrooms/bedroom-luxury.jpg' },
                    { title: 'Sliding Mirror Wardrobe', desc: 'Floor-to-ceiling sliding wardrobe in bronze tinted mirror and dark walnut carcass.', img: 'images/wardrobes/wardrobe-sliding.jpg' }
                ],
                palette: ['#1C2E5C', '#3778B6', '#F5F5F7', '#8C92A4'],
                materials: ['Anti-Fingerprint Laminate', 'Italian Statuario Marble', 'Fluted Glass', 'Bronze Anodized Aluminum', 'Smart Automation Hub']
            },
            'minimal-apartment': {
                name: 'Urban Minimalist Apartment',
                location: 'Chaitanyapuri, Karimnagar',
                type: '3BHK Premium Apartment',
                style: 'Scandinavian Functional Modern',
                client: 'Young Working Couple',
                year: '2026',
                heroImg: 'images/projects/project-minimal-apartment.jpg',
                description: 'A study in space optimization for modern urban living. Every square foot was engineered with multi-functional modular furniture, hidden utility alcoves, and a clean Scandinavian aesthetic.',
                spaces: [
                    { title: 'Functional Living Room', desc: 'Space-saving modular entertainment center with concealed cord conduits and floating display shelves.', img: 'images/living-room/living-minimal.jpg' },
                    { title: 'Parallel Modular Kitchen', desc: 'High-efficiency parallel layout maximizing the golden kitchen triangle, complete with spice pull-outs and tandem drawers.', img: 'images/kitchens/kitchen-parallel.jpg' },
                    { title: 'Serene Bedroom', desc: 'Minimalist platform bed with hydraulic under-bed storage and integrated study desk nook.', img: 'images/bedrooms/bedroom-minimal.jpg' },
                    { title: 'Hinged Loft Wardrobe', desc: 'Floor-to-ceiling hinged wardrobe with integrated overhead lofts for seasonal luggage storage.', img: 'images/wardrobes/wardrobe-hinged.jpg' }
                ],
                palette: ['#284180', '#E52027', '#F2EFE9', '#5B6272'],
                materials: ['BWR Marine Grade Plywood', 'Soft-Matte Laminates', 'Brushed Brass Knobs', 'German Drawer Slides']
            },
            'serene-oak': {
                name: 'Serene Oak Residence',
                location: 'Karimnagar, Telangana',
                type: 'Duplex Residential Project',
                style: 'Warm Contemporary & Natural Wood',
                client: 'Multi-Generational Family',
                year: '2025',
                heroImg: 'images/projects/project-serene-oak.jpg',
                description: 'Designed around warmth, family comfort, and durability. Natural wood grains, fluted surfaces, and earthy neutral tones combine to create an inviting, timeless home atmosphere.',
                spaces: [
                    { title: 'Family Gathering Living', desc: 'Expansive family seating zone with custom wooden divider screen separating the pooja alcove.', img: 'images/living-room/living-tv-unit.jpg' },
                    { title: 'L-Shaped Family Kitchen', desc: 'Durable acrylic shutters with wicker basket units, chimney enclosure, and breakfast counter.', img: 'images/kitchens/kitchen-lshape.jpg' },
                    { title: 'Guest Bedroom', desc: 'Soothing beige tones, upholstered headboard, and compact 3-door wardrobe with vanity mirror.', img: 'images/bedrooms/bedroom-kids.jpg' },
                    { title: 'Master Walk-In Closet', desc: 'Organized walk-in closet with modular open shelving, shoe carousel, and jewelry tray organizers.', img: 'images/wardrobes/wardrobe-walkin.jpg' }
                ],
                palette: ['#284180', '#A87D56', '#FAF8F5', '#3D414D'],
                materials: ['Natural Oak Veneer', 'High-Gloss Acrylic', 'Durable Quartz Surfaces', 'Telescopic Soft-Close Channels']
            },
            'nordic-haven': {
                name: 'Nordic Haven Living',
                location: 'Telangana',
                type: '3BHK Contemporary Villa',
                style: 'Nordic Minimalist Architecture',
                client: 'Doctor & Architect Duo',
                year: '2026',
                heroImg: 'images/projects/project-nordic-haven.jpg',
                description: 'A tranquil home flooded with daylight, pale oak woodwork, and pristine white surfaces that create an airy sanctuary away from urban hustle.',
                spaces: [
                    { title: 'Sunlit Living Room', desc: 'Clean lines, recessed track lights, and low-profile textured boucle sofa framing the garden view.', img: 'images/living-room/living-lighting.jpg' },
                    { title: 'All-White Modular Kitchen', desc: 'Seamless white PU lacquer cabinets with brushed nickel handles and Calacatta quartz splashback.', img: 'images/kitchens/kitchen-matte.jpg' },
                    { title: 'Tranquil Master Suite', desc: 'Minimalist platform bed with ribbed wooden paneling and ambient bedside sconces.', img: 'images/bedrooms/bedroom-headboard.jpg' },
                    { title: 'Internal Organizer Wardrobe', desc: 'Smart pull-out organizers, illuminated clothing rails, and built-in laundry hamper.', img: 'images/wardrobes/wardrobe-internal.jpg' }
                ],
                palette: ['#284180', '#3778B6', '#FFFFFF', '#4A5568'],
                materials: ['White PU Polish', 'Calacatta Quartz', 'Light Oak Slats', 'Hettich Sensys Hinges']
            },
            'contemporary-duplex': {
                name: 'Contemporary Duplex',
                location: 'Chaitanyapuri, Karimnagar',
                type: '4BHK Duplex Residence',
                style: 'Bold Modern Luxury',
                client: 'Entrepreneur Family',
                year: '2026',
                heroImg: 'images/projects/project-contemporary-duplex.jpg',
                description: 'A striking residence showcasing bold contrasts, rich stone textures, customized ceiling profiles, and intelligent modular utility throughout.',
                spaces: [
                    { title: 'Grand Double-Height Living', desc: 'Book-matched marble feature wall with floating fireplace credenza and dramatic pendant lighting.', img: 'images/living-room/living-modern.jpg' },
                    { title: 'Luxury Island Kitchen', desc: 'Island counter with breakfast bar seating, wine rack storage, and premium Blum Aventos lift systems.', img: 'images/kitchens/kitchen-luxury.jpg' },
                    { title: 'Master Bed Suite', desc: 'Acoustic padded wall panels, floating side tables, and integrated study console.', img: 'images/bedrooms/bedroom-master.jpg' },
                    { title: 'Tinted Glass Wardrobe', desc: 'Walk-in dressing zone with smoked glass shutters, brass trim, and velvet-lined jewelry drawers.', img: 'images/wardrobes/wardrobe-glass.jpg' }
                ],
                palette: ['#284180', '#E52027', '#1F2937', '#E2E8F0'],
                materials: ['Smoked Glass & Aluminum', 'High-Pressure Laminate', 'Keva Italian Hinges', 'Kalinga Stone Quartz']
            }
        };

        const urlParams = new URLSearchParams(window.location.search);
        const projectKey = urlParams.get('project') || 'emerald-villa';
        const project = projectsData[projectKey] || projectsData['emerald-villa'];

        // Populate Case Study Content
        document.title = `${project.name} | Sleek Koncepts Portfolio Case Study`;

        const nameEls = document.querySelectorAll('.project-dynamic-name');
        nameEls.forEach(el => el.textContent = project.name);

        const locEls = document.querySelectorAll('.project-dynamic-location');
        locEls.forEach(el => el.textContent = project.location);

        const typeEls = document.querySelectorAll('.project-dynamic-type');
        typeEls.forEach(el => el.textContent = project.type);

        const styleEls = document.querySelectorAll('.project-dynamic-style');
        styleEls.forEach(el => el.textContent = project.style);

        const descEls = document.querySelectorAll('.project-dynamic-desc');
        descEls.forEach(el => el.textContent = project.description);

        const heroImg = document.getElementById('project-dynamic-hero');
        if (heroImg) heroImg.style.backgroundImage = `url('${project.heroImg}')`;

        // Spaces Container
        const spacesContainer = document.getElementById('project-spaces-container');
        if (spacesContainer && project.spaces) {
            spacesContainer.innerHTML = project.spaces.map((sp, idx) => `
                <div class="col-lg-6 mb-4">
                    <div class="service-card h-100">
                        <div class="service-card-img-wrap" style="height: 280px;">
                            <img src="${sp.img}" alt="${sp.title}" loading="lazy">
                            <span class="service-badge">Space 0${idx + 1}</span>
                        </div>
                        <div class="service-card-body">
                            <h4 class="service-card-title">${sp.title}</h4>
                            <p class="service-card-text">${sp.desc}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Palette Container
        const paletteContainer = document.getElementById('project-palette-container');
        if (paletteContainer && project.palette) {
            paletteContainer.innerHTML = project.palette.map(c => `
                <div class="d-flex align-items-center gap-2 mb-2 me-3">
                    <span style="width: 28px; height: 28px; border-radius: 4px; background-color: ${c}; display: inline-block; border: 1px solid rgba(0,0,0,0.1);"></span>
                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-dark);">${c}</span>
                </div>
            `).join('');
        }

        // Materials Container
        const materialsContainer = document.getElementById('project-materials-container');
        if (materialsContainer && project.materials) {
            materialsContainer.innerHTML = project.materials.map(m => `
                <li class="mb-2 d-flex align-items-center gap-2">
                    <i class="bi bi-check2-circle text-primary" style="color: var(--sky-blue) !important;"></i>
                    <span>${m}</span>
                </li>
            `).join('');
        }
    }

    // --- 6. LEAD CONSULTATION FORM VALIDATION & FEEDBACK ---
    const consultationForms = document.querySelectorAll('.consultation-form-validate');

    consultationForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = form.querySelector('input[name="fullName"]');
            const phoneInput = form.querySelector('input[name="phone"]');
            const emailInput = form.querySelector('input[name="email"]');

            if (!nameInput || !phoneInput) return;

            if (nameInput.value.trim().length < 2) {
                alert('Please enter your full name.');
                nameInput.focus();
                return;
            }

            if (phoneInput.value.trim().length < 10) {
                alert('Please enter a valid 10-digit mobile number for design consultation.');
                phoneInput.focus();
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Confirming Appointment...';
            }

            setTimeout(() => {
                form.innerHTML = `
                    <div class="text-center py-5">
                        <div class="mb-3">
                            <i class="bi bi-check-circle-fill text-success" style="font-size: 3.5rem;"></i>
                        </div>
                        <h3 class="h3 mb-3" style="color: var(--deep-koncept-blue);">Consultation Booked Successfully!</h3>
                        <p class="lead mb-4" style="color: var(--text-body); font-size: 1.05rem;">
                            Thank you, <strong>${nameInput.value.trim()}</strong>! Our Senior Interior Architect has received your request.
                        </p>
                        <div class="p-3 mb-4 rounded" style="background-color: var(--deep-blue-surface); border-left: 4px solid var(--sleek-red);">
                            <p class="mb-1 fw-bold" style="color: var(--deep-koncept-blue);">Next Steps:</p>
                            <p class="small mb-0" style="color: var(--text-muted);">
                                We will reach out to <strong>${phoneInput.value.trim()}</strong> within 24 hours to schedule your 1-on-1 space design session.
                            </p>
                        </div>
                        <a href="projects.html" class="btn-sleek">Explore Our Projects</a>
                    </div>
                `;
            }, 1200);
        });
    });

    // --- 7. NUMBER COUNTER ANIMATION ---
    const counterElements = document.querySelectorAll('.stat-counter');
    if ('IntersectionObserver' in window && counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endVal = parseInt(target.getAttribute('data-target'), 10);
                    if (!isNaN(endVal)) {
                        let current = 0;
                        const step = Math.ceil(endVal / 40);
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= endVal) {
                                target.textContent = endVal + '+';
                                clearInterval(timer);
                            } else {
                                target.textContent = current;
                            }
                        }, 30);
                    }
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(counter => counterObserver.observe(counter));
    }

    // --- 8. "THE BUBBLES MEDIA" INTERACTIVE BUBBLE EMITTER ON HOVER ---
    const creditLinks = document.querySelectorAll('.footer-credit-link');
    creditLinks.forEach(link => {
        let bubbleInterval = null;

        const spawnBubble = () => {
            const bubble = document.createElement('span');
            bubble.classList.add('dynamic-bubble');

            const size = Math.floor(Math.random() * 10) + 7; // 7px to 17px
            const rect = link.getBoundingClientRect();
            const left = Math.random() * (link.offsetWidth - 8);
            const drift = (Math.random() - 0.5) * 30; // -15px to +15px horizontal drift

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}px`;
            bubble.style.setProperty('--drift', `${drift}px`);

            link.appendChild(bubble);

            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, 1500);
        };

        link.addEventListener('mouseenter', () => {
            // Spawn an initial burst of 3 bubbles
            spawnBubble();
            setTimeout(spawnBubble, 100);
            setTimeout(spawnBubble, 200);

            // Continuously emit bubbles while hovered
            bubbleInterval = setInterval(spawnBubble, 220);
        });

        link.addEventListener('mouseleave', () => {
            if (bubbleInterval) {
                clearInterval(bubbleInterval);
                bubbleInterval = null;
            }
        });
    });

    // --- 9. HERO 3D INTERIOR DESIGN STUDIO INTERACTION ---
    const heroDesignerCard = document.getElementById('heroDesignerCard');
    if (heroDesignerCard) {
        const modeButtons = heroDesignerCard.querySelectorAll('.hud-mode-btn');

        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const mode = btn.getAttribute('data-mode');
                heroDesignerCard.classList.remove('mode-render', 'mode-cad');

                if (mode === 'render') {
                    heroDesignerCard.classList.add('mode-render');
                } else if (mode === 'cad') {
                    heroDesignerCard.classList.add('mode-cad');
                }
                // 'auto' mode leaves both classes off, letting CSS keyframe animations sweep continuously
            });
        });

        // Mobile tap and click toggle support for hotspots
        const hotspots = heroDesignerCard.querySelectorAll('.design-hotspot');
        hotspots.forEach(spot => {
            const pin = spot.querySelector('.hotspot-pin');
            if (pin) {
                pin.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const wasActive = spot.classList.contains('active');
                    hotspots.forEach(s => s.classList.remove('active'));
                    if (!wasActive) {
                        spot.classList.add('active');
                    }
                });
            }
        });

        document.addEventListener('click', (e) => {
            if (!heroDesignerCard.contains(e.target)) {
                hotspots.forEach(s => s.classList.remove('active'));
            }
        });
    }

    // --- 10. SIMPLE FULL-IMAGE HERO SLIDER ---
    const heroSlider = document.getElementById('heroSliderSection');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        const dots = heroSlider.querySelectorAll('.hero-dot');
        const prevBtn = document.getElementById('heroPrevBtn');
        const nextBtn = document.getElementById('heroNextBtn');

        const SLIDE_DURATION = 4500; // 4.5 seconds per slide
        let currentSlide = 0;
        let isPaused = false;
        let startTime = Date.now();
        let animationFrameId = null;
        let elapsedBeforePause = 0;

        const updateSlide = (index) => {
            currentSlide = (index + slides.length) % slides.length;

            // Update slide classes
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });

            // Reset timers
            startTime = Date.now();
            elapsedBeforePause = 0;
        };

        const tick = () => {
            if (!isPaused) {
                const now = Date.now();
                const elapsed = (now - startTime) + elapsedBeforePause;

                if (elapsed >= SLIDE_DURATION) {
                    updateSlide(currentSlide + 1);
                }
            }

            animationFrameId = requestAnimationFrame(tick);
        };

        // Navigation button listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateSlide(currentSlide + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateSlide(currentSlide - 1);
            });
        }

        // Direct dot click listeners
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                updateSlide(idx);
            });
        });

        // Pause on mouse hover (desktop)
        heroSlider.addEventListener('mouseenter', () => {
            if (!isPaused) {
                elapsedBeforePause += Date.now() - startTime;
                isPaused = true;
            }
        });

        heroSlider.addEventListener('mouseleave', () => {
            if (isPaused) {
                startTime = Date.now();
                isPaused = false;
            }
        });

        // Mobile touch swipe gesture support
        let touchStartX = 0;
        let touchStartY = 0;

        heroSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            if (!isPaused) {
                elapsedBeforePause += Date.now() - startTime;
                isPaused = true;
            }
        }, { passive: true });

        heroSlider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX < 0) {
                    updateSlide(currentSlide + 1);
                } else {
                    updateSlide(currentSlide - 1);
                }
            }

            startTime = Date.now();
            isPaused = false;
        }, { passive: true });

        // Keyboard arrow navigation
        document.addEventListener('keydown', (e) => {
            const rect = heroSlider.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                if (e.key === 'ArrowRight') {
                    updateSlide(currentSlide + 1);
                } else if (e.key === 'ArrowLeft') {
                    updateSlide(currentSlide - 1);
                }
            }
        });

        // Initialize slider
        updateSlide(0);
        animationFrameId = requestAnimationFrame(tick);
    }

    // --- 11. FROM DESIGN TO DELIVERY: 6-STEP WORKFLOW STEPPER ---
    const deliverySection = document.getElementById('designToDelivery');
    if (deliverySection) {
        const stepBtns = deliverySection.querySelectorAll('.step-bullet-btn');
        const slides = deliverySection.querySelectorAll('.process-slide');
        const progressBar = document.getElementById('processProgressBar');
        const prevBtn = document.getElementById('processPrevBtn');
        const nextBtn = document.getElementById('processNextBtn');
        const sliderWrapper = deliverySection.querySelector('.process-slider-wrapper');
        const totalSteps = stepBtns.length; // 6
        let currentStep = 0;

        function goToStep(index) {
            if (index < 0) index = totalSteps - 1;
            if (index >= totalSteps) index = 0;
            currentStep = index;

            // Update Bullets
            stepBtns.forEach((btn, idx) => {
                btn.classList.remove('active', 'completed');
                if (idx === currentStep) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-current', 'step');
                } else if (idx < currentStep) {
                    btn.classList.add('completed');
                    btn.removeAttribute('aria-current');
                } else {
                    btn.removeAttribute('aria-current');
                }
            });

            // Update Progress Line Fill
            if (progressBar && totalSteps > 1) {
                const percentage = (currentStep / (totalSteps - 1)) * 100;
                progressBar.style.width = `${percentage}%`;
            }

            // Update Active Slide
            slides.forEach((slide, idx) => {
                if (idx === currentStep) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }

        // Click on bullet numbers
        stepBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const stepIdx = parseInt(btn.getAttribute('data-step'), 10);
                if (!isNaN(stepIdx)) {
                    goToStep(stepIdx);
                }
            });
        });

        // Click next / prev chevrons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToStep(currentStep - 1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToStep(currentStep + 1);
            });
        }

        // Mobile touch swipe gestures
        if (sliderWrapper) {
            let touchStartX = 0;
            let touchStartY = 0;

            sliderWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            sliderWrapper.addEventListener('touchend', (e) => {
                const deltaX = e.changedTouches[0].screenX - touchStartX;
                const deltaY = e.changedTouches[0].screenY - touchStartY;

                if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX < 0) {
                        goToStep(currentStep + 1);
                    } else {
                        goToStep(currentStep - 1);
                    }
                }
            }, { passive: true });
        }

        // Keyboard arrow navigation when section is in view
        document.addEventListener('keydown', (e) => {
            const rect = deliverySection.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25) {
                if (e.key === 'ArrowRight') {
                    goToStep(currentStep + 1);
                } else if (e.key === 'ArrowLeft') {
                    goToStep(currentStep - 1);
                }
            }
        });

        // Initialize at Step 0
        goToStep(0);
    }

    // =========================================================================
    // 9.1 HASSLE-FREE PAYMENT EXPERIENCE INTERACTIVE TIMELINE
    // =========================================================================
    const paymentSection = document.getElementById('paymentExperience');
    if (paymentSection) {
        const stepNodes = paymentSection.querySelectorAll('.payment-step-node');
        const trackFill = document.getElementById('paymentTrackFill');
        const sliderThumb = document.getElementById('paymentSliderThumb');
        const activePill = document.getElementById('paymentActiveStagePill');
        const stagePanes = paymentSection.querySelectorAll('.payment-stage-pane');
        const autoplayBtn = document.getElementById('paymentAutoplayBtn');
        const autoplayIcon = document.getElementById('autoplayIcon');
        const autoplayText = document.getElementById('autoplayText');

        const stagePillTitles = [
            'Stage 1: Design & 3D Visualization',
            'Stage 2: Factory Production & Civil Prep',
            'Stage 3: Site Delivery & Carcass Assembly',
            'Stage 4: Finishing, Snag Audit & Handover'
        ];

        let currentPaymentStage = 0;
        const totalPaymentStages = stepNodes.length;
        let paymentAutoplayInterval = null;
        let isPaymentAutoplayActive = false;
        const AUTOPLAY_DELAY = 4500;

        function setPaymentStage(stageIndex, triggeredByUser = false) {
            if (stageIndex < 0) stageIndex = 0;
            if (stageIndex >= totalPaymentStages) stageIndex = totalPaymentStages - 1;
            currentPaymentStage = stageIndex;

            // Pause autoplay if user clicks or drags
            if (triggeredByUser && isPaymentAutoplayActive) {
                stopPaymentAutoplay();
            }

            // 1. Update Stepper Node States
            stepNodes.forEach((node, idx) => {
                if (idx === currentPaymentStage) {
                    node.classList.add('active');
                    node.classList.remove('completed');
                    node.setAttribute('aria-current', 'step');
                } else if (idx < currentPaymentStage) {
                    node.classList.remove('active');
                    node.classList.add('completed');
                    node.removeAttribute('aria-current');
                } else {
                    node.classList.remove('active');
                    node.classList.remove('completed');
                    node.removeAttribute('aria-current');
                }
            });

            // 2. Update Track Fill & Slider Thumb
            const percentage = totalPaymentStages > 1 ? (currentPaymentStage / (totalPaymentStages - 1)) * 100 : 0;
            if (trackFill) {
                trackFill.style.width = `${percentage}%`;
            }
            if (sliderThumb) {
                sliderThumb.style.left = `${percentage}%`;
            }

            // 3. Update Active Stage Pill
            if (activePill && stagePillTitles[currentPaymentStage]) {
                activePill.innerHTML = `<span class="pill-dot"></span> ${stagePillTitles[currentPaymentStage]}`;
            }

            // 4. Update Stage Panes
            stagePanes.forEach((pane) => {
                const paneStage = parseInt(pane.getAttribute('data-stage'), 10);
                if (paneStage === currentPaymentStage) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        }

        // Node Click Events
        stepNodes.forEach((node) => {
            node.addEventListener('click', () => {
                const targetStage = parseInt(node.getAttribute('data-stage'), 10);
                if (!isNaN(targetStage)) {
                    setPaymentStage(targetStage, true);
                }
            });
        });

        // Autoplay Logic
        function startPaymentAutoplay() {
            isPaymentAutoplayActive = true;
            if (autoplayBtn) autoplayBtn.classList.add('playing');
            if (autoplayIcon) {
                autoplayIcon.classList.remove('bi-play-circle');
                autoplayIcon.classList.add('bi-pause-circle');
            }
            if (autoplayText) autoplayText.textContent = 'Pause Autoplay';

            if (paymentAutoplayInterval) clearInterval(paymentAutoplayInterval);
            paymentAutoplayInterval = setInterval(() => {
                const nextStage = (currentPaymentStage + 1) % totalPaymentStages;
                setPaymentStage(nextStage, false);
            }, AUTOPLAY_DELAY);
        }

        function stopPaymentAutoplay() {
            isPaymentAutoplayActive = false;
            if (autoplayBtn) autoplayBtn.classList.remove('playing');
            if (autoplayIcon) {
                autoplayIcon.classList.remove('bi-pause-circle');
                autoplayIcon.classList.add('bi-play-circle');
            }
            if (autoplayText) autoplayText.textContent = 'Autoplay';

            if (paymentAutoplayInterval) {
                clearInterval(paymentAutoplayInterval);
                paymentAutoplayInterval = null;
            }
        }

        if (autoplayBtn) {
            autoplayBtn.addEventListener('click', () => {
                if (isPaymentAutoplayActive) {
                    stopPaymentAutoplay();
                } else {
                    startPaymentAutoplay();
                }
            });
        }

        // Swipe gestures on stage card container
        const stageContainer = paymentSection.querySelector('.payment-card-stage-container');
        if (stageContainer) {
            let touchStartX = 0;
            let touchStartY = 0;

            stageContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            stageContainer.addEventListener('touchend', (e) => {
                const deltaX = e.changedTouches[0].screenX - touchStartX;
                const deltaY = e.changedTouches[0].screenY - touchStartY;

                if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX < 0) {
                        setPaymentStage(currentPaymentStage + 1, true);
                    } else {
                        setPaymentStage(currentPaymentStage - 1, true);
                    }
                }
            }, { passive: true });
        }

        // Initialize Stage 0
        setPaymentStage(0);
    }
});


