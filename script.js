
const container = document.getElementById('container');
const registerBtn = document.getElementById('showRegister');
const loginBtn = document.getElementById('showLogin');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function getUsers() {
    let users = localStorage.getItem("users");

    if (users) {
        users = JSON.parse(users);
    } else {
        users = [];
    }

    return users;
}

function register() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!name.value || !email.value || !password.value) {
        Swal.fire("All fields are required!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        Swal.fire("Please enter a valid email address.");
        return;
    }
    
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;

    if (!passwordRegex.test(password.value)) {
        Swal.fire("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.");
        return;
    }

    const users = getUsers();
    const userExists = users.some(user => user.email === email.value);

    if (userExists) {
        Swal.fire("User with this email already exists!");
        return;
    }

    const user = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    Swal.fire("Registration Successful!");
    name.value = "";
    email.value = "";
    password.value = "";

    container.classList.remove("active");
}


function login() {
    const email = document.getElementById("s-email");
    const password = document.getElementById("s-password");

    if (!email.value || !password.value) {
        Swal.fire("Please enter both email and password!");
        return;
    }

    const users = getUsers();
    const user = users.find(user => user.email === email.value && user.password === password.value);

    if (user) {
        console.log('Successfully logged in');
        location.href = './homee.html'; 
    } else {
        Swal.fire("Invalid email or password!");
    }
}

