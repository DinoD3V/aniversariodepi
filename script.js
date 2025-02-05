document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let dia = document.getElementById("dia").value.padStart(2, '0');
    let mes = document.getElementById("mes").value.padStart(2, '0');
    let ano = document.getElementById("ano").value;

    let dataStr = dia + mes + ano;

    fetch("https://api.pi.delivery/v1/pi?start=0&numberOfDigits=1000000")
        .then(response => response.json())
        .then(data => {
            let piDigits = data.content;
            let posicao = piDigits.indexOf(dataStr);
            let resultado = document.getElementById("resultado");

            if (posicao !== -1) {
                resultado.textContent = `A data ${dataStr} aparece em π na posição ${posicao + 1}.`;
            } else {
                resultado.textContent = `A data ${dataStr} não foi encontrada nos primeiros 1 milhão de dígitos de π.`;
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
            document.getElementById("resultado").textContent = "Erro ao conectar com a API.";
        });
});