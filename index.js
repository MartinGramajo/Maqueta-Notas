const formularioNotas = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const comentarioInput = document.getElementById('inputComentario');
const categoriaInput = document.getElementById('inputCategorias');

const json = localStorage.getItem('notas')
const notas = JSON.parse(json) || [];


function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioNotas.onsubmit = function (event) {
    event.preventDefault();
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