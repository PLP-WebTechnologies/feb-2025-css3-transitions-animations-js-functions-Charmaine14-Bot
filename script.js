// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const fullNameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.querySelector('.submit-btn');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const togglePassword = document.getElementById('toggle-password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    const card = document.querySelector('.card');
    const continueBtn = document.getElementById('continue-btn');
    const loginLink = document.getElementById('login-link');

    // Input Animation
    const inputFields = document.querySelectorAll('.input-field input');
    inputFields.forEach(input => {
        // Check if input has value on page load
        if (input.value !== '') {
            input.classList.add('has-value');
        }

        // Add event listener for input changes
        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

    // Toggle Password Visibility
    togglePassword.addEventListener('click', () => {
        togglePasswordVisibility(passwordInput, togglePassword);
    });

    toggleConfirmPassword.addEventListener('click', () => {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword);
    });

    function togglePasswordVisibility(inputField, toggleIcon) {
        if (inputField.type === 'password') {
            inputField.type = 'text';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        } else {
            inputField.type = 'password';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        }
    }

    // Password Strength Checker
    passwordInput.addEventListener('input', checkPasswordStrength);

    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        
        // Check length
        if (password.length >= 8) strength += 25;
        
        // Check lowercase and uppercase
        if (password.match(/[a-z]+/)) strength += 15;
        if (password.match(/[A-Z]+/)) strength += 15;
        
        // Check numbers
        if (password.match(/[0-9]+/)) strength += 15;
        
        // Check special characters
        if (password.match(/[^a-zA-Z0-9]+/)) strength += 30;
        
        // Update strength bar
        strengthBar.style.width = `${strength}%`;
        
        // Update strength text and color
        if (strength < 30) {
            strengthBar.style.backgroundColor = '#FF6B6B';
            strengthText.textContent = 'Weak Password';
            strengthText.style.color = '#FF6B6B';
        } else if (strength < 70) {
            strengthBar.style.backgroundColor = '#FFD166';
            strengthText.textContent = 'Medium Password';
            strengthText.style.color = '#FFD166';
        } else {
            strengthBar.style.backgroundColor = '#6BCB77';
            strengthText.textContent = 'Strong Password';
            strengthText.style.color = '#6BCB77';
        }
    }

    // Form Validation
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset previous errors
        clearErrors();

        // Validate Full Name
        if (fullNameInput.value.trim() === '') {
            displayError(fullNameInput, 'fullname-error', 'Full name is required');
            isValid = false;
        } else if (fullNameInput.value.trim().length < 2) {
            displayError(fullNameInput, 'fullname-error', 'Full name must be at least 2 characters');
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            displayError(emailInput, 'email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            displayError(emailInput, 'email-error', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Password
        if (passwordInput.value === '') {
            displayError(passwordInput, 'password-error', 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            displayError(passwordInput, 'password-error', 'Password must be at least 8 characters');
            isValid = false;
        }

        // Validate Confirm Password
        if (confirmPasswordInput.value === '') {
            displayError(confirmPasswordInput, 'confirm-password-error', 'Please confirm your password');
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            displayError(confirmPasswordInput, 'confirm-password-error', 'Passwords do not match');
            isValid = false;
        }

        // Validate Terms Agreement
        if (!termsCheckbox.checked) {
            displayError(termsCheckbox, 'terms-error', 'You must agree to the terms and conditions');
            isValid = false;
        }

        // If form is valid, submit the form
        if (isValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                // Store user data in localStorage
                saveUserData();
                
                // Flip the card to show success message
                card.classList.add('flipped');
                
                // Remove loading state
                submitBtn.classList.remove('loading');
            }, 1500);
        }
    });

    // Continue button action
    continueBtn.addEventListener('click', () => {
        // Flip card back and reset form
        card.classList.remove('flipped');
        registrationForm.reset();
        
        // Reset password strength
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Password Strength';
        strengthText.style.color = '#8a8a8a';
        
        // Reset input states
        inputFields.forEach(input => {
            input.classList.remove('has-value');
        });
    });

    // Just for demo - login link
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Login functionality would be implemented in a real application.');
    });

    // Helper Functions
    function displayError(inputElement, errorId, message) {
        const errorElement = document.getElementById(errorId);
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add shake animation
        inputElement.classList.add('shake');
        
        // Remove shake animation after it completes
        setTimeout(() => {
            inputElement.classList.remove('shake');
        }, 500);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const inputs = document.querySelectorAll('input');
        
        errorMessages.forEach(element => {
            element.style.display = 'none';
            element.textContent = '';
        });
        
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function saveUserData() {
        // Create user object
        const userData = {
            fullName: fullNameInput.value,
            email: emailInput.value,
            password: passwordInput.value, // In a real app, never store passwords in plain text
            registrationDate: new Date().toISOString()
        };
        
        // Get existing users or create empty array
        let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        
        // Add new user
        users.push(userData);
        
        // Save back to localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        // For demonstration, log the stored users
        console.log('Registered Users:', JSON.parse(localStorage.getItem('registeredUsers')));
    }

    // Add input focus animations
    inputFields.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});