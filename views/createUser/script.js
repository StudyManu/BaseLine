document.getElementById('btnCadastrar').addEventListener('click', async () => {
    debugger;
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const messageEl = document.getElementById('message');

    messageEl.textContent = '';
    messageEl.style.color = '';

    if (!nome || !email || !senha || !confirmarSenha) {
        messageEl.style.color = 'red';
        messageEl.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    if (senha !== confirmarSenha) {
        messageEl.style.color = 'red';
        messageEl.textContent = 'As senhas não coincidem.';
        return;
    }

    try {
        const response = await fetch('/createUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, password: senha }),
        });

        if (response.ok) {
            messageEl.style.color = 'green';
            messageEl.textContent = 'Usuário cadastrado com sucesso!';
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } else {
            const errorText = await response.text();
            messageEl.style.color = 'red';
            messageEl.textContent = errorText || 'Erro ao cadastrar usuário.';
        }
    } catch (error) {
        messageEl.style.color = 'red';
        messageEl.textContent = 'Erro na comunicação com o servidor.';
    }
});