document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('marksForm');
    const subjectContainer = document.getElementById('subjectContainer');
    const addSubjectBtn = document.getElementById('addSubject');

    // Add settings button to the UI
    const settingsBtn = document.createElement('button');
    settingsBtn.id = 'settingsBtn';
    settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
    document.querySelector('.container').appendChild(settingsBtn);

    // Create settings panel
    const settingsPanel = document.createElement('div');
    settingsPanel.className = 'settings-panel';
    // Update the settings panel HTML structure
    settingsPanel.innerHTML = `
        <div class="settings-header">
            <h3><i class="fas fa-cog"></i> Settings</h3>
            <button class="close-settings"><i class="fas fa-times"></i></button>
        </div>
        <div class="settings-content">
            <div class="profiles-section">
                <h4><i class="fas fa-user-circle"></i> Profiles</h4>
                <div class="profile-selector">
                    <button class="profile-btn active" data-profile="1">
                        <i class="fas fa-user"></i> Profile 1
                    </button>
                    <button class="profile-btn" data-profile="2">
                        <i class="fas fa-user"></i> Profile 2
                    </button>
                </div>
            </div>
            <div class="ui-customization">
                <h4><i class="fas fa-paint-brush"></i> Appearance</h4>
                <div class="theme-selector">
                    <label><i class="fas fa-palette"></i> Theme:</label>
                    <select id="themeSelect">
                        <option value="light"><i class="fas fa-sun"></i> Light</option>
                        <option value="dark"><i class="fas fa-moon"></i> Dark</option>
                        <option value="blue"><i class="fas fa-water"></i> Blue</option>
                    </select>
                </div>
                <div class="font-selector">
                    <label><i class="fas fa-text-height"></i> Font Size:</label>
                    <select id="fontSelect">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.container').appendChild(settingsPanel);

    // Settings functionality
    const profiles = {
        1: { theme: 'light', fontSize: 'medium', grades: [] },
        2: { theme: 'light', fontSize: 'medium', grades: [] }
    };

    let currentProfile = 1;

    // Settings Panel Controls
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.querySelector('.settings-panel');
    const closeSettings = document.querySelector('.close-settings');

    // Toggle settings panel
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
        settingsBtn.classList.toggle('active');
    });
    
    // Close settings panel
    closeSettings.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
        settingsBtn.classList.remove('active');
    });
    
    // Close settings when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && 
            !settingsBtn.contains(e.target) && 
            settingsPanel.classList.contains('active')) {
            settingsPanel.classList.remove('active');
            settingsBtn.classList.remove('active');
        }
    });
    
    // Escape key to close settings
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsPanel.classList.contains('active')) {
            settingsPanel.classList.remove('active');
            settingsBtn.classList.remove('active');
        }
    });

    // Profile switching
    document.querySelectorAll('.profile-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.profile-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentProfile = parseInt(btn.dataset.profile);
            loadProfile(currentProfile);
        });
    });

    // Theme and font size changes
    document.getElementById('themeSelect').addEventListener('change', (e) => {
        applyTheme(e.target.value);
        profiles[currentProfile].theme = e.target.value;
    });

    document.getElementById('fontSelect').addEventListener('change', (e) => {
        applyFontSize(e.target.value);
        profiles[currentProfile].fontSize = e.target.value;
    });

    function applyTheme(theme) {
        document.body.className = `theme-${theme}`;
    }

    function applyFontSize(size) {
        document.body.style.fontSize = {
            small: '14px',
            medium: '16px',
            large: '18px'
        }[size];
    }

    function loadProfile(profileId) {
        const profile = profiles[profileId];
        document.getElementById('themeSelect').value = profile.theme;
        document.getElementById('fontSelect').value = profile.fontSize;
        applyTheme(profile.theme);
        applyFontSize(profile.fontSize);
    }

    // Add new subject row
    addSubjectBtn.addEventListener('click', function() {
        const subjectRow = document.createElement('div');
        subjectRow.className = 'subject-row';
        subjectRow.innerHTML = `
            <input type="text" placeholder="Subject Name" class="subject-name">
            <input type="number" placeholder="Marks Obtained" class="marks-obtained" min="0">
            <input type="number" placeholder="Total Marks" class="total-marks" min="0">
            <button type="button" class="remove-btn">×</button>
        `;
        subjectContainer.appendChild(subjectRow);
    });

    // Remove subject row
    subjectContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            e.target.parentElement.remove();
        }
    });

    // Calculate results
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let totalObtained = 0;
        let totalMarks = 0;
        
        const subjectRows = document.querySelectorAll('.subject-row');
        
        subjectRows.forEach(row => {
            const obtained = parseFloat(row.querySelector('.marks-obtained').value) || 0;
            const total = parseFloat(row.querySelector('.total-marks').value) || 0;
            
            totalObtained += obtained;
            totalMarks += total;
        });

        const percentage = (totalObtained / totalMarks) * 100;
        const grade = calculateGrade(percentage);

        document.getElementById('totalMarks').textContent = totalMarks;
        document.getElementById('marksObtained').textContent = totalObtained;
        document.getElementById('percentage').textContent = percentage.toFixed(2) + '%';
        document.getElementById('grade').textContent = grade;
    });

    // Calculate grade based on percentage
    function calculateGrade(percentage) {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B';
        if (percentage >= 60) return 'C';
        if (percentage >= 50) return 'D';
        return 'F';
    }
});

// Add this to your existing JavaScript
document.getElementById('settingsBtn').addEventListener('click', function() {
    document.querySelector('.settings-panel').classList.add('active');
});

document.querySelector('.close-settings').addEventListener('click', function() {
    document.querySelector('.settings-panel').classList.remove('active');
});

// Close settings when clicking outside
document.addEventListener('click', function(e) {
    const settingsPanel = document.querySelector('.settings-panel');
    const settingsBtn = document.getElementById('settingsBtn');
    if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
        settingsPanel.classList.remove('active');
    }
});

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (element.id === 'percentage') {
            element.textContent = value.toFixed(2) + '%';
        } else {
            element.textContent = value;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Update your form submit handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let totalObtained = 0;
    let totalMarks = 0;
    
    const subjectRows = document.querySelectorAll('.subject-row');
    
    subjectRows.forEach(row => {
        const obtained = parseFloat(row.querySelector('.marks-obtained').value) || 0;
        const total = parseFloat(row.querySelector('.total-marks').value) || 0;
        
        totalObtained += obtained;
        totalMarks += total;
    });

    const percentage = (totalObtained / totalMarks) * 100;
    const grade = calculateGrade(percentage);

    // Delay the results animation
    setTimeout(() => {
        // Animate numbers
        animateNumber(document.getElementById('totalMarks'), 0, totalMarks, 1000);
        animateNumber(document.getElementById('marksObtained'), 0, totalObtained, 1000);
        animateNumber(document.getElementById('percentage'), 0, percentage, 1000);
        
        // Animate grade
        const gradeElement = document.getElementById('grade');
        gradeElement.style.opacity = '0';
        setTimeout(() => {
            gradeElement.textContent = grade;
            gradeElement.style.opacity = '1';
        }, 800);
    }, 200);
});


function createStars() {
    // Remove existing stars container if any
    const existingContainer = document.querySelector('.stars-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    
    for(let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
}

// Add this to your theme change handler
document.getElementById('themeSelect').addEventListener('change', function(e) {
    if(e.target.value === 'dark') {
        createStars();
    } else {
        const starsContainer = document.querySelector('.stars-container');
        if(starsContainer) starsContainer.remove();
    }
});