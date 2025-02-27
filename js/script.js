document.getElementById('orderForm').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const product = document.getElementById('product').value;

    if (!name || !email || !product) {
        alert('Por favor, preencha todos os campos.');
        event.preventDefault