document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const successMessage = document.getElementById('successMessage');
    const particlesContainer = document.getElementById('particles');
    
    // Create floating particles
    function createParticles() {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            particle.style.width = ${size}px;
            particle.style.height = ${size}px;
            particle.style.left = ${posX}%;
            particle.style.bottom = '0';
            particle.style.animation = float ${duration}s linear ${delay}s infinite;
            particle.style.background = rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Form validation
    function validateUsername() {
        const username = usernameInput.value.trim();
        const errorElement = document.getElementById('username-error');
        
        if (username.length < 4) {
            errorElement.textContent = 'Username must be at least 4 characters';
            errorElement.classList.add('show');
            return false;
        } else if (username.length > 20) {
            errorElement.textContent = 'Username must be less than 20 characters';
            errorElement.classList.add('show');
            return false;
        } else {
            errorElement.classList.remove('show');
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            errorElement.textContent = 'Please enter a valid email address';
            errorElement.classList.add('show');
            return false;
        } else {
            errorElement.classList.remove('show');
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const errorElement = document.getElementById('password-error');
        
        if (password.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters';
            errorElement.classList.add('show');
            return false;
        } else if (!/[A-Z]/.test(password)) {
            errorElement.textContent = 'Password must contain at least one uppercase letter';
            errorElement.classList.add('show');
            return false;
        } else if (!/[0-9]/.test(password)) {
            errorElement.textContent = 'Password must contain at least one number';
            errorElement.classList.add('show');
            return false;
        } else {
            errorElement.classList.remove('show');
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errorElement = document.getElementById('confirmPassword-error');
        
        if (password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            errorElement.classList.add('show');
            return false;
        } else {
            errorElement.classList.remove('show');
            return true;
        }
    }
    
    function validateTerms() {
        const errorElement = document.getElementById('terms-error');
        
        if (!termsCheckbox.checked) {
            errorElement.textContent = 'You must accept the terms and conditions';
            errorElement.classList.add('show');
            return false;
        } else {
            errorElement.classList.remove('show');
            return true;
        }
    }
    
    // Input event listeners for real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    termsCheckbox.addEventListener('change', validateTerms);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsValid = validateTerms();
        
        if (isUsernameValid && isEmailValid && isPasswordValid && 
            isConfirmPasswordValid && isTermsValid) {
            
            // Create user object
            const user = {
                username: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value,
                createdAt: new Date().toISOString()
            };
            
            // Save to local storage
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            form.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
            
            // Create celebration particles
            createCelebrationParticles();
        }
    });
    
    // Create celebration particles on successful submission
    function createCelebrationParticles() {
        const colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe'];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.position = 'fixed';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const animationDuration = Math.random() * 3 + 2;
            
            particle.style.width = ${size}px;
            particle.style.height = ${size}px;
            particle.style.left = ${posX}px;
            particle.style.top = ${posY}px;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
            particle.style.transition = all ${animationDuration}s ease-out;
            
            document.body.appendChild(particle);
            
            // Trigger animation
            setTimeout(() => {
                particle.style.opacity = '0.8';
                particle.style.transform = 'scale(1)';
                
                // Animate out
                setTimeout(() => {
                    particle.style.opacity = '0';
                    particle.style.transform = 'scale(0) translateY(-100px)';
                    
                    // Remove after animation
                    setTimeout(() => {
                        particle.remove();
                    }, animationDuration * 1000);
                }, 500);
            }, i * 50);
        }
    }
    
    // Add floating animation to form inputs on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-5px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});