document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os checkboxes com a classe "nivel"
    document.querySelectorAll('.nivel').forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const current = event.target; // O checkbox atual que foi clicado
            const allCheckboxes = Array.from(current.parentElement.querySelectorAll('.nivel')); // Todos os checkboxes no mesmo grupo
            const index = allCheckboxes.indexOf(current); // Índice do checkbox atual no grupo

            if (current.checked) {
                // Marca todas as anteriores, incluindo a atual
                for (let i = 0; i <= index; i++) {
                    allCheckboxes[i].checked = true;
                }
            } else {
                // Desmarca todas as posteriores
                for (let i = index + 1; i < allCheckboxes.length; i++) {
                    allCheckboxes[i].checked = false;
                }
            }
        });
    });

    console.log('Script carregado e funcional.');
});





/*        

    Bolar um sistema que quanto mais "bolinhas" forem 
    selecionadas mais forte fica a cor do vermelho.,

    saindo de um preto para um vermelho tourino 
    nivel 1 #000000
    nivel 2 #400000
    nivel 3 #800000
    nivel 4 #bf0000
    nivel 5 #ff0000





*/

function autoGrow(input) {
    input.style.height = 'auto'; // Reseta a altura
    input.style.height = (input.scrollHeight) + 'px'; // Ajusta a altura conforme o conteúdo
}

/*


Corrijir algoritmo a cima, deixar ele funcional para funcionar como um balão para dijitar
tenho que melhor o css dele tbm, o chat gpt cagou nele todo 





*/