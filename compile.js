const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

const forms = document.querySelectorAll('form');

// Remove error style on input while typing
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function () {
        if (input.value.trim()) {
            input.classList.remove('input-error');
        }
    });
});

// hide and show password
const toggleIcons = document.querySelectorAll('.toggle-password');
toggleIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const passwordInput = icon.previousElementSibling;
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        icon.classList.toggle('fa-eye-slash');
        icon.classList.toggle('fa-eye');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Sign Up
    const signupBtn = document.getElementById('signupBtn');
    const signupInputs = [
        document.getElementById('name'),
        document.getElementById('email'),
        document.getElementById('password')
    ];

    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            validateInputs(signupInputs, "signup");
        });
    }

    // Sign In
    const signInBtn = document.querySelector('.sign-in-container .my-btn');
    const signInInputs = [
        document.querySelector('.sign-in-container input[type="email"]'),
        document.querySelector('.sign-in-container input[type="password"]')
    ];

    if (signInBtn) {
        signInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            validateInputs(signInInputs, "signin");
        });
    }

    // دالة عامة للتحقق من الحقول الفارغة وفحص Email
    function validateInputs(inputsArray, type) {
        let hasEmpty = false;

        inputsArray.forEach(input => {
            if (!input.value.trim()) {
                hasEmpty = true;
                input.classList.add('input-error');
            } else {
                input.classList.remove('input-error');
            }

            if (input.type === "email" && input.value.trim() !== "" && !input.value.includes("@gmail.com")) {
                hasEmpty = true;
                input.classList.add('input-error');
                alert("Email must contain @gmail.com");
            }
        });

        if (!hasEmpty) {
            // بدل الاتصال بالسيرفر نعمل تحويل مباشر
            if (type === "signup") {
                alert("Sign up successful!");
            } else if (type === "signin") {
                
            }
            window.location.href = "Products.HTML"; // تحويل لصفحة المنتجات
        } else {
            alert("Please fill in all fields correctly!");
        }
    }
});