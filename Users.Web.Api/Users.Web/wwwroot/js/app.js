document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const nameInput = document.getElementById("name");
    const rolInput = document.getElementById("rol");
    const passwordInput = document.getElementById("password");
    const guardarUsuarioBtn = document.getElementById("guardarUsuario");
    const cerrarModalBtn = document.getElementById("cerrarModal");
    let usuarios = [];
    let editingUserId = null;

    
    fetchUsuarios();

    // Función para obtener usuarios
    function fetchUsuarios() {
        fetch('https://localhost:7002/api/Users/lista') // Asegúrate de que esta URL sea correcta
            .then(response => response.json())
            .then(data => {
                usuarios = data;
                renderUsuarios();
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // Función para renderizar usuarios
    function renderUsuarios() {
        const usuariosTableBody = document.querySelector('#usuarios tbody');
        usuariosTableBody.innerHTML = ''; // Limpiar tabla

        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${usuario.name}</td>
                <td>${usuario.rol}</td>
                <td>${usuario.password}</td>
                <td>
                    <button class="editar" data-id="${usuario.id}">Editar</button>
                    <button class="eliminar" data-id="${usuario.id}">Eliminar</button>
                </td>
            `;
            usuariosTableBody.appendChild(fila);
        });

        // Agregar eventos para los botones de editar y eliminar
        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', editUsuario);
        });

        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', deleteUsuario);
        });
    }

    // Abrir modal para crear un nuevo usuario
    document.getElementById("crearUsuario").addEventListener("click", () => {
        modal.style.display = "block";
        modalTitle.innerText = "Crear Usuario";
        editingUserId = null; // Limpiar id de edición
        nameInput.value = '';
        rolInput.value = '';
        passwordInput.value = '';
    });

    // Función para guardar usuario (crear o editar)
    guardarUsuarioBtn.addEventListener("click", () => {
        const name = nameInput.value;
        const rol = rolInput.value;
        const password = passwordInput.value;

        if (editingUserId) {
            // Editar usuario
            fetch(`https://localhost:7002/api/Users/editar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: editingUserId,
                    name: nameInput.value,
                    rol: rolInput.value,
                    password: passwordInput.value
                })
            })
                .then(response => response.json())
                .then(() => {
                    fetchUsuarios(); // Volver a cargar los usuarios
                    modal.style.display = "none";
                })
                .catch(error => console.error('Error editing user:', error));
        } else {
            // Crear nuevo usuario
            fetch(`https://localhost:7002/api/Users/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    rol: rolInput.value,
                    password: passwordInput.value
                })
            })
                .then(response => response.json())
                .then(() => {
                    fetchUsuarios(); // Volver a cargar los usuarios
                    modal.style.display = "none";
                })
                .catch(error => console.error('Error creating user:', error));
        }
    });

    // Función para editar usuario
    function editUsuario(event) {
        const id = event.target.dataset.id;
        const usuario = usuarios.find(u => u.id == id);

        nameInput.value = usuario.name;
        rolInput.value = usuario.rol;
        passwordInput.value = usuario.password;
        editingUserId = id;
        modalTitle.innerText = "Editar Usuario";
        modal.style.display = "block";
    }

    // Función para eliminar usuario
    function deleteUsuario(event) {
        const id = event.target.dataset.id;

        fetch(`https://localhost:7002/api/Users/eliminar?id=${id}`, {
            method: 'DELETE'
        })
            .then(() => fetchUsuarios()) // Volver a cargar los usuarios
            .catch(error => console.error('Error deleting user:', error));
    }

    // Cerrar modal
    cerrarModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });


    // Productos
    const modalProducto = document.getElementById("modalProducto");
    const modalProductoTitle = document.getElementById("modalProductoTitle");
    const nombreInput = document.getElementById("productoName");
    const descripcionInput = document.getElementById("productoDescription");
    const costoInput = document.getElementById("productoCost");
    const guardarProductoBtn = document.getElementById("guardarProducto");
    const cerrarModalProductoBtn = document.getElementById("cerrarModalProducto");

    let productos = [];
    let editingProductoId = null;

    // Obtener productos al cargar la página
    fetchProductos();

    // Función para obtener productos
    function fetchProductos() {
        fetch('https://localhost:7002/api/Products') // Asegúrate de que esta URL sea correcta
            .then(response => response.json())
            .then(data => {
                productos = data;
                renderizarProductos();
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Función para renderizar productos
    function renderizarProductos() {
        const productosTableBody = document.querySelector('#productos tbody');
        productosTableBody.innerHTML = ''; // Limpiar tabla

        productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.name}</td>
                <td>${producto.description}</td>
                <td>${producto.cost}</td>
                <td>
                    <button class="editar" data-id="${producto.id}">Editar</button>
                    <button class="eliminar" data-id="${producto.id}">Eliminar</button>
                </td>
            `;
            productosTableBody.appendChild(fila);
        });

        // Agregar eventos para los botones de editar y eliminar
        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', editProducto);
        });

        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', deleteProducto);
        });
    }

    // Abrir modal para crear un nuevo producto
    document.getElementById("crearProducto").addEventListener("click", () => {
        modalProducto.style.display = "block";
        modalProductoTitle.innerText = "Crear Producto";
        editingProductoId = null; // Limpiar id de edición
        nombreInput.value = '';
        descripcionInput.value = '';
        costoInput.value = '';
    });

    // Función para guardar producto (crear o editar)
    guardarProductoBtn.addEventListener("click", () => {
        const nombre = nombreInput.value;
        const descripcion = descripcionInput.value;
        const costo = parseFloat(costoInput.value);

        if (editingProductoId) {
            // Editar producto
            fetch(`https://localhost:7002/api/Products/editar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: editingProductoId,
                    name: nombre,
                    description: descripcion,
                    cost: costo
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la API');
                    }
                    return response.text(); // Obtener la respuesta como texto
                })
                .then(text => {
                    // Verificar si hay contenido y analizar como JSON solo si es necesario
                    if (text) {
                        const data = JSON.parse(text);
                        console.log(data); // Para depuración
                    }
                    fetchProductos(); // Volver a cargar los productos
                    modalProducto.style.display = "none";
                })
                .catch(error => console.error('Error editing product:', error));
        } else {
            // Crear nuevo producto
            fetch(`https://localhost:7002/api/Products/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nombre,
                    description: descripcion,
                    cost: costo
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la API');
                    }
                    return response.text(); // Obtener la respuesta como texto
                })
                .then(text => {
                    if (text) {
                        const data = JSON.parse(text);
                        console.log(data); // Para depuración
                    }
                    fetchProductos(); // Volver a cargar los productos
                    modalProducto.style.display = "none";
                })
                .catch(error => console.error('Error creating product:', error));
        }
    });

    // Función para editar producto
    function editProducto(event) {
        const id = event.target.dataset.id;
        const producto = productos.find(p => p.id == id);

        nombreInput.value = producto.name;
        descripcionInput.value = producto.description;
        costoInput.value = producto.cost;
        editingProductoId = id;
        modalProductoTitle.innerText = "Editar Producto";
        modalProducto.style.display = "block";
    }

    // Función para eliminar producto
    function deleteProducto(event) {
        const id = event.target.dataset.id;

        fetch(`https://localhost:7002/api/Products/${id}`, {
            method: 'DELETE'
        })
            .then(() => fetchProductos()) // Volver a cargar los productos
            .catch(error => console.error('Error deleting product:', error));
    }

    // Cerrar modal
    cerrarModalProductoBtn.addEventListener("click", () => {
        modalProducto.style.display = "none";
    });
});