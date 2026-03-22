// Cart Sidebar Toggle
function toggleCartSidebar() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

// AJAX Add to Cart
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart-form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then(response => response.json())
            .then(data => {
                // Update cart count
                document.getElementById('cart-count').textContent = data.count;

                // Show notification
                showNotification(data.message);

                // Open cart sidebar briefly
                document.getElementById('cart-sidebar').classList.add('active');
                document.getElementById('cart-overlay').classList.add('active');

                // Reload to update sidebar contents
                setTimeout(() => location.reload(), 800);
            })
            .catch(() => {
                // Fallback to normal form submit
                form.submit();
            });
        });
    });

    // Auto-dismiss alerts
    document.querySelectorAll('.alert').forEach(function(alert) {
        setTimeout(() => {
            alert.style.animation = 'slideIn .3s ease reverse';
            setTimeout(() => alert.remove(), 300);
        }, 4000);
    });
});

function showNotification(message) {
    const container = document.querySelector('.messages-container') || createMessagesContainer();
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = message + '<button class="alert-close" onclick="this.parentElement.remove()">&times;</button>';
    container.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideIn .3s ease reverse';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

function createMessagesContainer() {
    const container = document.createElement('div');
    container.className = 'messages-container';
    document.body.appendChild(container);
    return container;
}
