
const btnConsultar = document.getElementById("btnConsultar");
const campoPlaca = document.getElementById("placa");
const resultado = document.getElementById("resultado");


// Evento de clique
btnConsultar.addEventListener("click", consultarPlaca);

// Função para consultar a API
async function consultarPlaca() {

    const placa = campoPlaca.value.trim().toUpperCase();

    if (!placa) {
        resultado.textContent = "Informe uma placa!";
        return;
    }

    resultado.textContent = "Consultando veículo...";

    try {
       
        // Requisição para o nosso servidor
        const resposta = await fetch(
            `http://localhost:8080/v1/sistema/veiculo/placa/${placa}`,
        )

        // Converte a resposta para JSON
        const dados = await resposta.json();

        // Verifica se ocorreu algum erro
        if (!resposta.ok) {
            throw new Error(
                dados.message || dados.erro || "Erro na consulta."
            );
        }

        // Exibe os dados retornados
        resultado.textContent = JSON.stringify(
            dados,
            null,
            2
        );

    } catch (erro) {

        resultado.textContent = erro.message;

    }
}
