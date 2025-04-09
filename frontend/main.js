const api = 'http://localhost:3000/usuarios';

async function cargarUsuarios() {
  const res = await fetch(api);
  const usuarios = await res.json(); 
  const lista = document.getElementById('usuarios');
  lista.innerHTML = '';
  usuarios.forEach(u => {
    lista.innerHTML += `
      <li>
        ${u.nombre} - ${u.celular}
        <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
        <button onclick="mostrarFormularioActualizar(${u.id}, '${u.nombre}', '${u.celular}')">Actualizar</button>
      </li>
    `;
  });
}

async function crearUsuario() {
  const nombre = document.getElementById('nombre').value; 
  const celular = document.getElementById('celular').value;
  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, celular })
  });
  document.getElementById('nombre').value = '';
  document.getElementById('celular').value = '';
  cargarUsuarios();
}

async function eliminarUsuario(id) {
  await fetch(`${api}/${id}`, { method: 'DELETE' });
  cargarUsuarios();
}

function mostrarFormularioActualizar(id, nombreActual, celularActual) {
  const formulario = document.getElementById('formulario-actualizar');
  formulario.style.display = 'block';
  document.getElementById('actualizar-id').value = id;
  document.getElementById('actualizar-nombre').value = nombreActual;
  document.getElementById('actualizar-celular').value = celularActual;
}

async function actualizarUsuario() {
  const id = document.getElementById('actualizar-id').value;
  const nombre = document.getElementById('actualizar-nombre').value;
  const celular = document.getElementById('actualizar-celular').value;

  await fetch(`${api}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, celular })
  });

  document.getElementById('formulario-actualizar').style.display = 'none';
  cargarUsuarios();
}

function cancelarActualizacion() {
  document.getElementById('formulario-actualizar').style.display = 'none';
}


cargarUsuarios();

