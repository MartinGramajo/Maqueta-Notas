const categoriasForm = document.getElementById('formularioCategorias');
const crearCategoriaInput = document.getElementById('nuevaCategoria');
const categoriaUl = document.getElementById('listaCategoria'); 
let categorias = JSON.parse(localStorage.getItem('categorias')) || ['Recodatorio', 'Meta','Tarea','Evento'];

function submitAltaCategoria(e) {
    e.preventDefault();
    const categoria = crearCategoriaInput.value; 
    categorias.push(categoria);
    localStorage.setItem('categorias', JSON.stringify(categorias)); 
    mostrarCategorias();
    categoriasForm.reset();
};

function mostrarCategorias() {
    const categoriasMap = categorias.map((categoria) => `
        <option>${categoria}</option>
    `
    );
    categoriaInput.innerHTML= categoriasMap.join('');
    editarCategoriaNota.innerHTML = categoriasMap.join('');

    const listaCategoriasMap = categorias.map((categoria) => `
    <li> 
    <span style="min-width:100px; display:inline-block">${categoria}</span>
    <button type="button" onclick="eliminarCategoria('${categoria}')" class="btn btn-outline-danger btn-sm "><i class="fas fa-trash-alt"></i></i></button> 
</li>
    `);
    categoriaUl.innerHTML = listaCategoriasMap.join('')
}

function eliminarCategoria(categoria) {
    const categoriasFiltradas = categorias.filter((c) => c !== categoria);
    localStorage.setItem('categorias', JSON.stringify(categoriasFiltradas));
    categorias = categoriasFiltradas;
    mostrarCategorias();
}

mostrarCategorias();
categoriasForm.onsubmit = submitAltaCategoria;