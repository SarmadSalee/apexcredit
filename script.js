// Credit Repair Landing Page - Enhanced Motion & Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // Scroll Reveal Observer for Motion Animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach reveal animation to key sections & cards
    const animatedElements = document.querySelectorAll('.hero-content, .hero-form-card, .sim-results-grid, .portfolio-card, .step-card, .review-card, .faq-item');
    animatedElements.forEach(el => revealObserver.observe(el));

    // Initialize Simulator
    updateSimulator(540);
});

// Lead Capture Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();

    const fullNameInput = document.getElementById('fullName');
    const name = fullNameInput ? fullNameInput.value.trim() : 'Client';
    
    const form = document.getElementById('leadCaptureForm');
    const successMsg = document.getElementById('formSuccessMessage');
    const nameHolder = document.getElementById('submittedName');

    if (nameHolder) {
        nameHolder.textContent = name;
    }

    if (form && successMsg) {
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
    }
}

// Reset Lead Form
function resetForm() {
    const form = document.getElementById('leadCaptureForm');
    const successMsg = document.getElementById('formSuccessMessage');

    if (form && successMsg) {
        form.reset();
        form.classList.remove('hidden');
        successMsg.classList.add('hidden');
    }
}

// Interactive Credit Simulator Logic with Preset Chips & Goals
function setScorePreset(score) {
    const slider = document.getElementById('scoreSlider');
    if (slider) {
        slider.value = score;
        updateSimulator(score);
    }

    // Update active preset chip button highlight
    document.querySelectorAll('.preset-chip').forEach(chip => {
        chip.classList.remove('active');
        if (chip.textContent.includes(score.toString())) {
            chip.classList.add('active');
        }
    });
}

function selectGoal(button, goalType) {
    document.querySelectorAll('.goal-tab').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');

    // Also sync with hero form goal dropdown if available
    const formGoalSelect = document.getElementById('creditGoal');
    if (formGoalSelect) {
        if (goalType === 'home') formGoalSelect.value = 'home';
        else if (goalType === 'auto') formGoalSelect.value = 'auto';
        else if (goalType === 'card') formGoalSelect.value = 'card';
        else if (goalType === 'loan') formGoalSelect.value = 'business';
    }
}

function updateSimulator(score) {
    const scoreVal = parseInt(score, 10);
    const currentScoreElem = document.getElementById('currentScoreValue');
    const projectedScoreElem = document.getElementById('projectedScoreValue');
    const projectedGainElem = document.getElementById('projectedGain');
    const simItemList = document.getElementById('simItemList');
    const tierBadge = document.getElementById('scoreTierBadge');
    const estTimeText = document.getElementById('estTimeText');

    if (!currentScoreElem || !projectedScoreElem || !projectedGainElem) return;

    currentScoreElem.textContent = scoreVal;

    let projectedScore = scoreVal;
    let pointBoost = 0;
    let itemsHTML = '';
    let tierText = '';
    let tierClass = '';
    let estTime = '60-90 Days';

    if (scoreVal < 520) {
        pointBoost = 195;
        tierText = 'SEVERE DEEP REPAIR';
        tierClass = 'tier-bad';
        estTime = '90-120 Days';
        itemsHTML = `
            <li><i class="fa-solid fa-circle-check text-success"></i> Bankruptcy & Public Record Audits</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Multiple Collection Account Sweeps</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Severe Late Payment Disputing</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Hard Inquiry Expungement</li>
        `;
    } else if (scoreVal < 600) {
        pointBoost = 155;
        tierText = 'POOR CREDIT';
        tierClass = 'tier-poor';
        estTime = '60-90 Days';
        itemsHTML = `
            <li><i class="fa-solid fa-circle-check text-success"></i> Charge-offs & Collection Disputes</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> 30/60/90 Day Late Cleanup</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Medical Debt & Unverified Bills</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Utilization Ratio Re-balancing</li>
        `;
    } else if (scoreVal < 670) {
        pointBoost = 110;
        tierText = 'FAIR CREDIT';
        tierClass = 'tier-fair';
        estTime = '30-60 Days';
        itemsHTML = `
            <li><i class="fa-solid fa-circle-check text-success"></i> Isolated Goodwill Deletions</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> High Card Utilization Restructuring</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Erroneous Personal Info Correction</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Unrecognized Inquiry Removal</li>
        `;
    } else {
        pointBoost = 65;
        tierText = 'GOOD CREDIT';
        tierClass = 'tier-good';
        estTime = '30 Days Expedited';
        itemsHTML = `
            <li><i class="fa-solid fa-circle-check text-success"></i> Prime Credit Score Fine-Tuning</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Authorized User Tradeline Strategy</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Credit Limit Increase Coaching</li>
            <li><i class="fa-solid fa-circle-check text-success"></i> Direct Creditor Goodwill Letters</li>
        `;
    }

    if (tierBadge) {
        tierBadge.textContent = tierText;
        tierBadge.className = `tier-badge ${tierClass}`;
    }

    if (estTimeText) {
        estTimeText.textContent = estTime;
    }

    projectedScore = Math.min(850, scoreVal + pointBoost);

    projectedScoreElem.textContent = projectedScore;
    projectedGainElem.textContent = `+${pointBoost} Points Boost`;

    if (simItemList) {
        simItemList.innerHTML = itemsHTML;
    }

    // Dynamic Conic Gauge Fill Calculation
    const gauge = document.querySelector('.gauge-circle');
    if (gauge) {
        const percent = Math.round(((projectedScore - 300) / 550) * 100);
        gauge.style.background = `conic-gradient(#10B981 0% ${percent}%, rgba(255,255,255,0.12) ${percent}% 100%)`;
    }
}

// FAQ Accordion Toggle
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Toggle clicked item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}
