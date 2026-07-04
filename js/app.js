document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navRegister = document.getElementById('nav-register');
    const navDashboard = document.getElementById('nav-dashboard');
    const viewRegistration = document.getElementById('view-registration');
    const viewDashboard = document.getElementById('view-dashboard');

    navRegister.addEventListener('click', (e) => {
        e.preventDefault();
        navRegister.classList.add('active');
        navDashboard.classList.remove('active');
        viewRegistration.classList.add('active');
        viewDashboard.classList.remove('active');
    });

    navDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        navDashboard.classList.add('active');
        navRegister.classList.remove('active');
        viewDashboard.classList.add('active');
        viewRegistration.classList.remove('active');
        loadDashboardData();
    });

    // Registration Form
    const form = document.getElementById('registration-form');
    const modal = document.getElementById('success-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate AI Validation & processing delay
        const btn = document.getElementById('btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Processing (AI)...</span><i data-lucide="loader" class="spin"></i>';
        lucide.createIcons();
        
        setTimeout(() => {
            const name = document.getElementById('reg-name').value;
            const eventSelect = document.getElementById('reg-event');
            const eventText = eventSelect.options[eventSelect.selectedIndex].text;
            
            // Generate mock ID
            const id = 'EVT-2026-' + Math.floor(Math.random() * 9000 + 1000);
            
            document.getElementById('ticket-name').textContent = name;
            document.getElementById('ticket-event').textContent = eventText;
            document.getElementById('ticket-id').textContent = id;
            
            modal.classList.add('active');
            btn.innerHTML = originalText;
            lucide.createIcons();
            
            // Reset form
            form.reset();
        }, 1500);
    });

    btnCloseModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Chatbot Simulator
    const chatInput = document.getElementById('chat-input-field');
    const btnChatSend = document.getElementById('btn-chat-send');
    const chatMessages = document.getElementById('chat-messages');

    const aiResponses = {
        "status": "You can check your registration status in the Organizer Dashboard or by providing your email.",
        "seats": "Currently, there are 352 seats available for the AI Innovation Workshop.",
        "location": "The AI Innovation Workshop will be held in the Main Auditorium.",
        "start": "The event starts at 10:00 AM on July 20, 2026.",
        "cancel": "You can cancel your registration by clicking the link in your confirmation email.",
        "default": "I'm an AI assistant. I can help with event details, registration status, or venue information!"
    };

    function processChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        // User message
        appendMessage(text, 'user');
        chatInput.value = '';

        // Simulate thinking delay
        setTimeout(() => {
            let response = aiResponses["default"];
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes("status") || lowerText.includes("registered")) response = aiResponses["status"];
            else if (lowerText.includes("seat") || lowerText.includes("capacity")) response = aiResponses["seats"];
            else if (lowerText.includes("where") || lowerText.includes("location")) response = aiResponses["location"];
            else if (lowerText.includes("when") || lowerText.includes("start")) response = aiResponses["start"];
            else if (lowerText.includes("cancel")) response = aiResponses["cancel"];

            appendMessage(response, 'ai');
        }, 1000);
    }

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    btnChatSend.addEventListener('click', processChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processChat();
    });

    // Load Mock Dashboard Data
    function loadDashboardData() {
        const tbody = document.getElementById('participant-table-body');
        if (tbody.children.length > 0) return; // Already loaded

        const mockData = [
            { id: 'EVT-1001', name: 'Nivethasri T', event: 'AI Innovation Workshop', status: 'Confirmed', risk: 'Low Risk' },
            { id: 'EVT-1002', name: 'Alex Johnson', event: 'Global Tech Summit', status: 'Pending', risk: 'Duplicate Flag' },
            { id: 'EVT-1003', name: 'Sarah Connor', event: 'CodeRed Hackathon', status: 'Confirmed', risk: 'Low Risk' },
            { id: 'EVT-1004', name: 'Michael Smith', event: 'AI Innovation Workshop', status: 'Waitlisted', risk: 'High Churn' },
        ];

        mockData.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.event}</td>
                <td><span class="badge ${p.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}">${p.status}</span></td>
                <td>${p.risk}</td>
            `;
            tbody.appendChild(tr);
        });
    }
});
