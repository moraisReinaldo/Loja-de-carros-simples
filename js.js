let espaco = document.getElementById('Prateleira');

class Carro {
    constructor(imagem, modelo, ano, preco) {
        this.imagem = imagem;
        this.modelo = modelo;
        this.ano = ano;
        this.preco = preco;
    }

    printCar() {
        return `
            <div class="carro-info">
                <h3>${this.modelo}</h3>
                <img src="${this.imagem}" alt="${this.modelo}" onclick="mostrarInfo('${this.modelo}')">
                <div id="${this.modelo}-info" class="carro-info" style="display:none;">
                    <h5>${this.ano}</h5>
                    <h4>Valor: R$ ${this.preco.toFixed(2)}</h4>
                    <div id="${this.modelo}-parcelamento" class="parcelamento"></div>
                </div>
            </div>
        `;
    }
}

function mostrarInfo(modelo) {
    let infoDiv = document.getElementById(`${modelo}-info`);
    let parcelamentoDiv = document.getElementById(`${modelo}-parcelamento`);

    if (infoDiv.style.display === 'none') {
        infoDiv.style.display = 'block';
        mostrarParcelamento(parcelamentoDiv, modelo);
    } else {
        infoDiv.style.display = 'none';
    }
}

function mostrarParcelamento(div, modelo) {
    let preco = getCarro(modelo).preco; 
    div.innerHTML = `
        <h5>Parcelamento:</h5>
        <select id="${modelo}-parcelas" onchange="atualizarParcelamento('${modelo}')">
            ${Array.from({ length: 10 }, (_, i) => i + 1).map(p => 
                `<option value="${p}" ${p === 12 ? 'selected' : ''}>${p} parcela(s)</option>`
            ).join('')}
        </select>
        <div id="${modelo}-parcelamento-info"></div>
    `;
    atualizarParcelamento(modelo);
}

function atualizarParcelamento(modelo) {
    let parcelasSelect = document.getElementById(`${modelo}-parcelas`);
    let parcelas = parseInt(parcelasSelect.value);
    let preco = getCarro(modelo).preco; 
    let valorParcela = preco / parcelas; 
    let parcelaDiv = document.getElementById(`${modelo}-parcelamento-info`);

    parcelaDiv.innerHTML = `
        <p>Valor da parcela (${parcelas}x): R$ ${valorParcela.toFixed(2)}</p>
    `;
}

function getCarro(modelo) {
    return carros.find(carro => carro.modelo === modelo);
}

let carros = [
    new Carro("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdRSXoUXoSkoewzTZQ4JPZYb_lomSkZt9Sbg&s", "Opala", 1999, 15000),
    new Carro("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJSEymIbf6U3ll_X38cR5M5-Wjsq6IiaxApDroh0B_wzt2hEoVIWzGeLrpFSynIEc9EM&usqp=CAU", "Fusca", 1980, 12000),
    new Carro("https://cdn.autopapo.com.br/box/uploads/2020/08/08223052/volkswagen_gol_bx-732x488.jpg", "Gol", 1984, 8000),
    new Carro("https://upload.wikimedia.org/wikipedia/commons/e/e4/Meukadett.jpg", "Kadett", 1990, 9000),
    new Carro("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0DrYMFfv1PQgOOmwk98-VMW0HxV1yhhda1Q&s", "Celta", 2000, 17000),

];

espaco.innerHTML = carros.map(carro => carro.printCar()).join('');