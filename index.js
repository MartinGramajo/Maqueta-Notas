const formularioNotas = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const comentarioInput = document.getElementById('inputComentario');
const categoriaInput = document.getElementById('inputCategorias');
const notasCard = document.getElementById('cardNotas')
const json = localStorage.getItem('notas');
const notas = JSON.parse(json) || [];


function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioNotas.onsubmit = function (event) {
    const nota = {
        id : generarID(),
        titulo : tituloInput.value,
        comentario : comentarioInput.value,
        categoria : categoriaInput.value,
    };
    notas.push(nota);
    const json = JSON.stringify(notas);
    localStorage.setItem('notas', json);
}

function mostrarCards() {
    const cardMap = notas.map(function (card) {
        return `
        <div class="col-6 border border-primary p-3 mb-2 bg-light text-dark m-auto w-100">
        <h3>Titulo: ${card.titulo}</h3>
        <p class="text-break"> ${card.comentario}</p>
        <p>Categoria: ${card.categoria}</p>
        </div>
        `;
    } );
    notasCard.innerHTML = cardMap.join('')
}

mostrarCards();