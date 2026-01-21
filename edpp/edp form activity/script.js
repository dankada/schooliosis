// Sign Up Validation
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let valid = true;

    const email = document.getElementById('signupEmail');
    const phone = document.getElementById('signupPhone');
    const password = document.getElementById('signupPassword');

    const emailError = document.getElementById('signupEmailError');
    const phoneError = document.getElementById('signupPhoneError');
    const passwordError = document.getElementById('signupPasswordError');

    // Reset errors
    emailError.textContent = '';
    phoneError.textContent = '';
    passwordError.textContent = '';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.match(emailRegex)) {
      emailError.textContent = 'Invalid email format';
      valid = false;
    }

    // Phone validation
    if (!phone.value.trim()) {
      phoneError.textContent = 'Phone number is required';
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!password.value.match(passwordRegex)) {
      passwordError.textContent = 'Password must be 8+ chars and include a number';
      valid = false;
    }

    if (valid) {
      window.location.href = 'welcome.html';
    }
  });
}

// Sign In Validation
const signinForm = document.getElementById('signinForm');
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    const email = document.getElementById('signinEmail');
    const password = document.getElementById('signinPassword');

    const emailError = document.getElementById('signinEmailError');
    const passwordError = document.getElementById('signinPasswordError');

    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.match(emailRegex)) {
      emailError.textContent = 'Invalid email format';
      valid = false;
    }

    // Password validation
    if (!password.value.trim()) {
      passwordError.textContent = 'Password is required';
      valid = false;
    }

    if (valid) {
      window.location.href = 'welcome.html';
    }
  });
}
