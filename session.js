// ...existing code...
// Insert user's name and session links into .dropdown-content / #dropdownMenu
document.addEventListener('DOMContentLoaded', function () {
    // helper
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
    }

    const dropdown = document.getElementById('dropdownMenu') || document.querySelector('.dropdown-content');
    if (!dropdown) return;

    // remove previously injected items
    dropdown.querySelectorAll('[data-session-item]').forEach(n => n.remove());

    const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (user) {
        // greeting (non-clickable)
        const greeting = document.createElement('div');
        greeting.className = 'dropdown-greeting';
        greeting.setAttribute('data-session-item', '1');
        greeting.style.padding = '10px 14px';
        greeting.style.borderBottom = '1px solid rgba(0,0,0,0.06)';
        greeting.innerHTML = `<strong>Hi, ${escapeHtml(user.fullName || user.email)}</strong>`;
        dropdown.insertBefore(greeting, dropdown.firstChild);

        // profile link
        const profile = document.createElement('a');
        profile.href = 'my-profile.html';
        profile.className = 'session-link';
        profile.setAttribute('data-session-item', '1');
        profile.style.display = 'block';
        profile.style.padding = '8px 14px';
        profile.textContent = 'My Profile';
        // ensure navigation works in all cases
        profile.addEventListener('click', function (ev) {
            ev.preventDefault();
            window.location.href = 'my-profile.html';
        });
        dropdown.insertBefore(profile, greeting.nextSibling);

        // bookings link
        const bookings = document.createElement('a');
        bookings.href = 'my-bookings.html';
        bookings.className = 'session-link';
        bookings.setAttribute('data-session-item', '1');
        bookings.style.display = 'block';
        bookings.style.padding = '8px 14px';
        bookings.textContent = 'My Bookings';
        bookings.addEventListener('click', function (ev) {
            ev.preventDefault();
            window.location.href = 'my-bookings.html';
        });
        dropdown.insertBefore(bookings, profile.nextSibling);

        // logout
        const logout = document.createElement('a');
        logout.href = '#';
        logout.className = 'session-link';
        logout.setAttribute('data-session-item', '1');
        logout.style.display = 'block';
        logout.style.padding = '8px 14px';
        logout.style.color = '#E87A64';
        logout.textContent = 'Logout';
        logout.addEventListener('click', function (ev) {
            ev.preventDefault();
            if (typeof logoutUser === 'function') logoutUser();
            else localStorage.removeItem('currentUser');
            // optionally redirect to login
            window.location.href = 'login.html';
        });
        dropdown.insertBefore(logout, bookings.nextSibling);

    } else {
        // not logged in -> ensure login/signup link present at top
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.setAttribute('data-session-item', '1');
        loginLink.style.display = 'block';
        loginLink.style.padding = '8px 14px';
        loginLink.textContent = 'Log In / Sign Up';
        dropdown.insertBefore(loginLink, dropdown.firstChild);
    }
});
// ...existing code...