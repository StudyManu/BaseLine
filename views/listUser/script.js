async function fetchUsers() {
    const messageEl = document.getElementById('message');
    const tbody = document.querySelector('#userTable tbody');
    messageEl.textContent = '';

    try {
        const res = await fetch('/listUsers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        const users = await res.json();

        tbody.innerHTML = '';

        if (users.length === 0) {
            messageEl.textContent = 'Nenhum usuário encontrado.';
            return;
        }

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        messageEl.textContent = error.message;
    }
}

window.addEventListener('DOMContentLoaded', fetchUsers);