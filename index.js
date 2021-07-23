const formularioNotas = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const comentarioInput = document.getElementById('inputComentario');
const categoriaInput = document.getElementById('inputCategorias');
const notasCard = document.getElementById('cardNotas')
const json = localStorage.getItem('notas');
let notas = JSON.parse(json) || [];


function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioNotas.onsubmit = function () {
    const nota = {
        id : generarID(),
        titulo : tituloInput.value,
        comentario : comentarioInput.value,
        categoria : categoriaInput.value,
        registro: Date.now(),
        
    };
    notas.push(nota);
    const json = JSON.stringify(notas);
    localStorage.setItem('notas', json);
}

function mostrarNotas() {
    const notasMap = notas.map(function (nota) {
        const fecha = new Date(nota.registro);
        return `
        <div class="col-6 border border-primary p-3 mb-2 bg-dark text-white m-auto w-100">
        <h3>Titulo: ${nota.titulo}</h3>
        <p class="text-break"> ${nota.comentario}</p>
        <p> Categoria: ${nota.categoria}</p>
        <button onclick="eliminarNota('${nota.id}')" class="btn btn-danger btn-sm" >Eliminar nota</button>

        </div>
        `;
    } );
    notasCard.innerHTML = notasMap.join('')
}

mostrarNotas();

function eliminarNota(id) {
    const notasFiltradas = notas.filter((nota) => nota.id !== id);
    const json = JSON.stringify(notasFiltradas); 
    localStorage.setItem('notas', json); 
    notas = notasFiltradas;
    mostrarNotas();
    };
