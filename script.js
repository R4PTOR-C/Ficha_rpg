document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nivel').forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const current = event.target;
            const parent = current.parentElement;
            const allCheckboxes = Array.from(parent.querySelectorAll('.nivel'));
            const index = allCheckboxes.indexOf(current);

            if (current.checked) {
                for (let i = 0; i <= index; i++) {
                    allCheckboxes[i].checked = true;
                }
            } else {
                for (let i = index + 1; i < allCheckboxes.length; i++) {
                    allCheckboxes[i].checked = false;
                }
            }

            allCheckboxes.forEach((cb, i) => {
                const label = cb.nextElementSibling;
                if (cb.checked) {
                    const colors = allCheckboxes.length === 5
                        ? ["#000000", "#400000", "#800000", "#bf0000", "#ff0000"]
                        : ["#000000", "#190000", "#330000", "#4c0000", "#660000",
                            "#7f0000", "#990000", "#b20000", "#cc0000", "#e50000", "#ff0000"];
                    const color = colors[i] || "#ff0000";
                    label.style.backgroundColor = color; // Cor interna
                    label.style.borderColor = color; // Cor da borda
                } else {
                    label.style.backgroundColor = ""; // Reseta a cor interna
                    label.style.borderColor = ""; // Reseta a cor da borda
                }
            });
        });
    });

    console.log('Script carregado e funcional.');
});


document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-pdf');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

            const pageWidth = 210; // Largura da página A4 em mm
            const pageHeight = 297; // Altura da página A4 em mm
            const backgroundColor = '#f9f3e9'; // Cor de fundo desejada
            const borderColor = '#75021C'; // Cor das bordas
            const borderWidth1 = 0.5; // Espessura da borda interna
            const borderWidth2 = 0.5; // Espessura da borda externa
            const borderOuterMargin = 5; // Margem externa para a borda externa
            const borderInnerSpacing = 1; // Espaçamento entre bordas
            const contentPadding = 10; // Espaçamento entre a borda interna e o conteúdo

            // Função para preencher o fundo do PDF
            const fillBackground = (pdf) => {
                pdf.setFillColor(backgroundColor);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F'); // 'F' para preencher
            };

            // Função para desenhar as bordas duplas
            const drawBorders = (pdf) => {
                pdf.setDrawColor(borderColor);

                // Borda externa
                pdf.setLineWidth(borderWidth2);
                pdf.rect(
                    borderOuterMargin,
                    borderOuterMargin,
                    pageWidth - 2 * borderOuterMargin,
                    pageHeight - 2 * borderOuterMargin
                );

                // Borda interna
                pdf.setLineWidth(borderWidth1);
                pdf.rect(
                    borderOuterMargin + borderInnerSpacing,
                    borderOuterMargin + borderInnerSpacing,
                    pageWidth - 2 * (borderOuterMargin + borderInnerSpacing),
                    pageHeight - 2 * (borderOuterMargin + borderInnerSpacing)
                );
            };

            // Captura a primeira página
            const firstPageElement = document.querySelector('.primeira-pagina');
            const firstCanvas = await html2canvas(firstPageElement, {
                scale: 3, // Aumenta a precisão para capturar bordas finas
                backgroundColor: null, // Usa a cor de fundo do CSS
                useCORS: true, // Garante que imagens externas sejam carregadas
            });
            const firstImgData = firstCanvas.toDataURL('image/png');
            const imgWidth = pageWidth - 2 * (borderOuterMargin + borderInnerSpacing + contentPadding);
            const imgHeight = (firstCanvas.height * imgWidth) / firstCanvas.width;

            // Preenche o fundo, adiciona as bordas e a primeira imagem
            fillBackground(pdf);
            drawBorders(pdf);
            pdf.addImage(
                firstImgData,
                'PNG',
                borderOuterMargin + borderInnerSpacing + contentPadding,
                borderOuterMargin + borderInnerSpacing + contentPadding,
                imgWidth,
                imgHeight
            );

            // Captura a segunda página
            const secondPageElement = document.querySelector('.segunda-pagina');
            const secondCanvas = await html2canvas(secondPageElement, {
                scale: 3, // Aumenta a precisão para capturar bordas finas
                backgroundColor: null,
                useCORS: true,
            });
            const secondImgData = secondCanvas.toDataURL('image/png');
            const secondImgHeight = (secondCanvas.height * imgWidth) / secondCanvas.width;

            // Adiciona a segunda página
            pdf.addPage();
            fillBackground(pdf);
            drawBorders(pdf);

            // Adiciona a logo antes do conteúdo
            const logoUrl = 'logo.png'; // Substitua pelo caminho da sua logo
            const logoX = borderOuterMargin + borderInnerSpacing + contentPadding;
            const logoY = borderOuterMargin + borderInnerSpacing + contentPadding;
            const logoWidth = 50;
            const logoHeight = 20;

            const logoImage = new Image();
            logoImage.src = logoUrl;

            logoImage.onload = () => {
                pdf.addImage(logoImage, 'PNG', logoX, logoY, logoWidth, logoHeight);

                // Adiciona o conteúdo da segunda página
                pdf.addImage(
                    secondImgData,
                    'PNG',
                    borderOuterMargin + borderInnerSpacing + contentPadding,
                    logoY + logoHeight + 10,
                    imgWidth,
                    secondImgHeight
                );

                // Salva o PDF
                pdf.save('Ficha.pdf');
            };
        });
    } else {
        console.error("Botão de download não encontrado!");
    }
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