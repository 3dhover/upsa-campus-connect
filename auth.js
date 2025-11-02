// Simple user storage (in production, this would be a database)
let users = [];

// User registration function
function registerUser(fullName, email, phone, password) {
    // Check if user already exists
    if (users.find(user => user.email === email)) {
        throw new Error('User already exists');
    }

    // Create new user object
    const user = {
        id: Date.now(),
        fullName,
        email,
        phone,
        password // In production, this should be hashed
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return user;
}

// User login function
function loginUser(email, password) {
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = storedUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Set session
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
}
// Simple client-side auth helpers (localStorage). Use only for demo/testing.
users = JSON.parse(localStorage.getItem('users') || '[]');

function _saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(fullName, email, phone, password) {
    if (!email || !password) throw new Error('Email and password required');
    users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    const user = { id: Date.now(), fullName, email, phone, password };
    users.push(user);
    _saveUsers();
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
}

function loginUser(email, password) {
    users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser'));
    } catch {
        return null;
    }
}

function logoutUser() {
    localStorage.removeItem('currentUser');
}