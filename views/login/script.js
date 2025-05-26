async function onLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const message = document.getElementById('message');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: user,
                password: pass,
            }),
        });

        if (response.redirected) {
            window.location.href = response.url;
        } else {
            const text = await response.text();
            message.style.color = 'red';
            message.textContent = text;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        message.style.color = 'red';
        message.textContent = 'Erro ao tentar fazer login.';
    }
}