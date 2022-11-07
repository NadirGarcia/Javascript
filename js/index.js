let carrito = [];
let carritoLS = JSON.parse(localStorage.getItem("enCarrito"));
let usuarios = [];
let usuariosLS = JSON.parse(localStorage.getItem("usuarioLS"));
let usuarioSS = JSON.parse(sessionStorage.getItem("usuarioEnLinea"));
const inputBuscar = document.getElementById("inputBuscar");
const botonBuscar = document.getElementById("btnBuscar");
const botonQuitarFiltro = document.getElementById("botonQuitarFiltro");
const volantes = document.getElementById("volantes");
const volantesFooter = document.getElementById("volantesFooter");
const pedaleras = document.getElementById("pedaleras");
const pedalerasFooter = document.getElementById("pedalerasFooter");
const handbrake = document.getElementById("frenoDeMano");
const handbrakeFooter = document.getElementById("frenoDeManoFooter");
const shifters = document.getElementById("shifters");
const shiftersFooter = document.getElementById("shiftersFooter");
const btnComprar = document.getElementById("btnComprar");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const contenedorTienda = document.getElementById("contenedorTienda");
const contenedorLogin = document.getElementById("contenedorLogin");
const btnCarrito = document.getElementById("btnCarrito");
const email = document.getElementById("inputEmail");
const pass = document.getElementById("inputPass");
const btnLogin = document.getElementById("btnLogin");
const btnRegistrarse = document.getElementById("btnRegistro");
const contenedorCompra = document.getElementById("contenedorCompra");

//TRAER ARRAY DE productos.json
const imprimirProductos = async () => {
    try {
        let response = await fetch("./dataBase/productos.json");
        let data = await response.json();
        return data;
    } catch {
        console.log("Error");
    };
};
let productos = await imprimirProductos();

//RENDERIZACION DE PRODUCTOS
let renderizarProductos = (array) => {
    array.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class = "card__imagen">    
                <img class = "card__imagen--img" src="${producto.imagen}" alt="imagen">
            </div>   
            <div class= "card__info">
                <h3> ${producto.nombre}</h3>
                <span> Precio: $ ${producto.precio}</span>
                <span id = "stock${producto.id}">${producto.stock}</span>
                <button id = ${producto.id} class = "btnAgregar" >Agregar</button>
            </div>
        `;
        contenedorTienda.append(card);
        contenedorTienda.className = "contenedor";
        const botonAgregar = document.getElementById(producto.id);
        botonAgregar.addEventListener("click", () => agregarCarrito(producto));
        let stock = document.getElementById(`stock${producto.id}`);
        if (producto.stock < 1) {
            stock.innerHTML = "SIN STOCK";
            stock.className = "sin__stock";
            botonAgregar.className = "btnAgregar__off"
        } else if (producto.stock < 3) {
            stock.innerHTML = "STOCK BAJO";
            stock.className = "stock__bajo";
        } else {
            stock.innerHTML = "DISPONIBLE";
            stock.className = "stock__disponible";
        };
    });
};
renderizarProductos(productos);

//AGREGAR PRODUCTOS AL CARRITO
const agregarCarrito = (producto) => {
    let productoEnCarrito = carrito.find(existe => existe.id === producto.id);
    if (productoEnCarrito === undefined) {
        carrito.push({
            ...producto,
            precioUnitario: producto.precio,
            cantidad: 1
        });
    } else {
        productoEnCarrito.precio = productoEnCarrito.precio + producto.precio;
        productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
    };
    imprimirCarrito();
    localStorage.setItem("enCarrito", JSON.stringify(carrito));
};

//RENDERIZACION DE PRODUCTO EN CARRITO
const imprimirCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(item => {
        const itemCarrito = document.createElement("tr");
        itemCarrito.classList = "carrito";
        itemCarrito.innerHTML = `
            <td><img class = "carrito__imagen" src="${item.imagen}" alt=""></td>
            <td><h5>${item.nombre}</h5></td>
            <td><span> $ ${item.precioUnitario}</span></td>
            <td><span class = "carrito__cantidad--num"> ${item.cantidad}</span></td>
            <td>
                <button id ="sumar${item.id}" class = "btn__sumres">▲</button>
                <button id ="restar${item.id}" class = "btn__sumres">▼</button>
            </td>
            <td><span> $ ${item.precio}</span></td>
            <td><button id = "eliminar${item.id}" class = "btn__eliminar"> <img src ="../resources/trash.png"></button></td>
            `;
        contenedorCarrito.append(itemCarrito);
        const botonEliminar = document.getElementById(`eliminar${item.id}`);
        botonEliminar.addEventListener("click", () => eliminarItem(item));
        const btnSumar = document.getElementById(`sumar${item.id}`);
        btnSumar.addEventListener("click", () => sumarCantidadCarrito(item));
        const btnRestar = document.getElementById(`restar${item.id}`);
        btnRestar.addEventListener("click", () => restarCantidadCarrito(item));
        totalCompra();
        contadorCarrito();
    });
};

//BOTON SUMAR CARRITO
const sumarCantidadCarrito = (item) => {
    let productoOriginal = productos.find(existe => existe.id === item.id);
    let productoModificar = carrito.find(existe => existe.id === item.id);
    productoModificar.precio = productoModificar.precio + productoOriginal.precio;
    productoModificar.cantidad = productoModificar.cantidad + 1;
    imprimirCarrito();
    localStorage.setItem("enCarrito", JSON.stringify(carrito));
};

//BOTON RESTAR CARRITO
const restarCantidadCarrito = (item) => {
    let productoOriginal = productos.find(existe => existe.id === item.id);
    let productoModificar = carrito.find(existe => existe.id === item.id);
    let indice = carrito.indexOf(productoModificar);
    productoModificar.precio = productoModificar.precio - productoOriginal.precio;
    productoModificar.cantidad = productoModificar.cantidad - 1;
    productoModificar.cantidad < 1 ? carrito.splice(indice, 1) : false;
    imprimirCarrito();
    contadorCarrito();
    totalCompra();
    botonCarrito();
    localStorage.setItem("enCarrito", JSON.stringify(carrito));
};

//CONTADOR PRODUCTOS EN CARRITO
const contadorCarrito = () => {
    let contador = document.getElementById("contador");
    if (carrito.length === 0) {
        contador.className = "btn__carrito--contadoroff";
    } else {
        contador.className = "btn__carrito--contador";
        contador.innerHTML = `
        <span>${carrito.length}</span>
        `;
    };
};

//TOTAL DE LA COMPRA
const totalCompra = () => {
    const total = document.getElementById("total");
    total.innerHTML = `
        TOTAL: $ ${carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, 0)}
    `;
};

//BOTON ELIMINAR ITEM DE CARRITO
const eliminarItem = (item) => {
    let productoEliminar = carrito.find(existe => existe.id === item.id);
    let indice = carrito.indexOf(productoEliminar);
    carrito.splice(indice, 1);
    imprimirCarrito();
    totalCompra();
    Toastify({
        text: `Eliminaste ${productoEliminar.nombre} del carrito`,
        duration: 4000,
        position: "center",
        gravity: "bottom",
        style: {
            background: "linear-gradient(to bottom, #00b09b, #96c93d)",
        }
    }).showToast();
    contadorCarrito();
    botonCarrito();
    //Eliminar Item de carrito en LocalStorage
    let carritoLS = JSON.parse(localStorage.getItem("enCarrito"));
    carritoLS = carrito.filter(existe => existe.id !== item.id);
    localStorage.setItem("enCarrito", JSON.stringify(carritoLS));
};

// BOTON VACIAR CARRITO
vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: 'Vaciar Carrito',
        text: "Estas seguro que quieres vaciar el carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar!'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            imprimirCarrito();
            totalCompra();
            contadorCarrito();
            botonCarrito();
            localStorage.removeItem("enCarrito");
            Swal.fire(
                'Tu carrito fue vaciado',
            )
        };
    });
});

//BOTON CARRITO
const botonCarrito = () => {
    if (carrito.length !== 0) {
        contenedorCarrito.classList = "carrito";
        imprimirCarrito();
    } else {
        contenedorCarrito.innerHTML = `<h2>Su carrito esta vacio!</h2>`;
        contenedorCarrito.classList = "carrito__vacio";
    };
};
btnCarrito.addEventListener("click", botonCarrito);

//CONTINUAR COMPRA
const comprar = () => {
    contenedorTienda.innerHTML = "";
    contenedorTienda.classList = "contenedor__compra";
    contenedorTienda.innerHTML = `<p class="contenedor__compra--titulo">Carrito de compras</p>`;
    carrito.forEach(item => {
        const itemCarrito = document.createElement("div");
        itemCarrito.className = "carrito__compra";
        itemCarrito.innerHTML = `
            <img class = "carrito__imagen" src="${item.imagen}" alt="">
            <h5>${item.nombre}</h5>
            <span class = "carrito__cantidad--num"> ${item.cantidad}x $ ${item.precio}</span>
            `;
        contenedorTienda.append(itemCarrito);
    });
    const footerCompra = document.createElement("div");
    footerCompra.className = "compra__footer";
    footerCompra.innerHTML = `
        <span class="compra__footer--total">TOTAL COMPRA: $ ${carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, 0)}</span>
        <button id ="btnFinalizarCompra" class = "btn compra__footer--btn">Finalizar la Compra</button>
        `;
        contenedorTienda.append(footerCompra);
        const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
        btnFinalizarCompra.addEventListener("click", terminarCompra);
};

//BOTON CONTINUAR COMPRA
btnComprar.addEventListener("click", () => {
    usuarioSS = JSON.parse(sessionStorage.getItem("usuarioEnLinea"));
    if(carrito.length !== 0 && usuarioSS){
        comprar();
    }else if(carrito.length === 0){
        contenedorTienda.innerHTML = `
        <p>No tiene productos en su carrito</p>
        <button id="continuarComprando" class="contenedor__mensaje--btn">Continuar Comprando</button>
        `;
        contenedorTienda.className = "contenedor__mensaje";
        const continuarComprando = document.getElementById("continuarComprando")
        continuarComprando.addEventListener("click", () => {window.location = "http://127.0.0.1:5500/index.html"});
    }else{
        contenedorTienda.innerHTML = "Debe estar logueado para finalizar la compra";
        contenedorTienda.className = "contenedor__mensaje";
    };
});


//FINALIZAR LA COMPRA
const terminarCompra = () => {
    carrito.length = 0;
    contadorCarrito();
    totalCompra();
    localStorage.removeItem("enCarrito");
    contenedorTienda.innerHTML = "";
    contenedorTienda.classList = "finalizacion__compra";
    contenedorTienda.innerHTML = `
        <p>FELICITACIONES!! tu compra se realizo con exito</p>
        <p>Gracias por confiar en NGSimracing!!!</p>
    `;
}

//RENDERIZACION DE CARRITO DESDE LOCALSTORAGE
let renderizarLS = carritoLS ? true : false;
renderizarLS ? carrito = carritoLS : false;
imprimirCarrito();


//CATEGORIA VOLANTES
const btnVolantes = () => {
    let volantesEncontrados = productos.filter(producto => producto.categoria === "volantes");
    contenedorTienda.innerHTML = "";
    renderizarProductos(volantesEncontrados);
};
volantes.addEventListener("click", btnVolantes);

//CATEGORIA VOLANTES FOOTER
const btnVolantesFooter = () => {
    let volantesEncontrados = productos.filter(producto => producto.categoria === "volantes");
    contenedorTienda.innerHTML = "";
    renderizarProductos(volantesEncontrados);
};
volantesFooter.addEventListener("click", btnVolantesFooter);

//CATEGORIA PEDALERAS
const btnPedaleras = () => {
    let pedalesEncontrados = productos.filter(producto => producto.categoria === "pedaleras");
    contenedorTienda.innerHTML = "";
    renderizarProductos(pedalesEncontrados);
};
pedaleras.addEventListener("click", btnPedaleras);

//CATEGORIA PEDALERAS FOOTER
const btnPedalerasFooter = () => {
    let pedalesEncontrados = productos.filter(producto => producto.categoria === "pedaleras");
    contenedorTienda.innerHTML = "";
    renderizarProductos(pedalesEncontrados);
};
pedalerasFooter.addEventListener("click", btnPedalerasFooter);

//CATEGORIA HANBRAKE
const btnHandbrake = () => {
    let handbrakeEncontrados = productos.filter(producto => producto.categoria === "handbrake");
    contenedorTienda.innerHTML = "";
    renderizarProductos(handbrakeEncontrados);
};
handbrake.addEventListener("click", btnHandbrake);

//CATEGORIA HANBRAKE FOOTER
const btnHandbrakeFooter = () => {
    let handbrakeEncontrados = productos.filter(producto => producto.categoria === "handbrake");
    contenedorTienda.innerHTML = "";
    renderizarProductos(handbrakeEncontrados);
};
handbrakeFooter.addEventListener("click", btnHandbrakeFooter);

//CATEGORIA SHIFTERS
const btnShifters = () => {
    let shiftersEncontrados = productos.filter(producto => producto.categoria === "shifters");
    contenedorTienda.innerHTML = "";
    renderizarProductos(shiftersEncontrados);
};
shifters.addEventListener("click", btnShifters);

//CATEGORIA SHIFTER FOOTER
const btnShiftersFooter = () => {
    let shiftersEncontrados = productos.filter(producto => producto.categoria === "shifters");
    contenedorTienda.innerHTML = "";
    renderizarProductos(shiftersEncontrados);
};
shiftersFooter.addEventListener("click", btnShiftersFooter);

//BUSCADOR INPUT
let buscador = () => {
    let buscado = inputBuscar.value.toLowerCase();
    inputBuscar.value = "";
    if ((buscado !== "") && (buscado.length > 1)) {
        contenedorTienda.innerHTML = "";
        let encontrado = productos.filter(item => (item.categoria.includes(buscado)) || (item.marca.includes(buscado)));
        encontrado.length === 0 ? (
            (contenedorTienda.innerHTML = "Producto no encontrado")
            (contenedorTienda.className = "contenedor__mensaje")
        ) :
            renderizarProductos(encontrado);
    } else {
        contenedorTienda.innerHTML = "Ingrese el producto que desea buscar!!";
        contenedorTienda.className = "contenedor__mensaje";
    };
};
inputBuscar.addEventListener("change", buscador);

//REGISTRAR USUARIO LOCALSTORAGE
const generarUsuario = () => {
    class Usuario{
        constructor(correo,password){
        this.correo = correo;
        this.password = password;
        }
    };
    const usuarioNuevo = new Usuario(email.value, pass.value);
    usuarios.push(usuarioNuevo);
    localStorage.setItem("usuarioLS", JSON.stringify(usuarios));
};
btnRegistrarse.addEventListener("click", generarUsuario);

//LOGUEAR USUARIO SESSIONSTORAGE
const login = () => {
    let usuarioEncontrado = usuariosLS.find(user => user.correo === email.value);
    if(usuarioEncontrado.password !== pass.value){
        Swal.fire('Contraseña incorrecta');
    }else{
        email.value = "";
        pass.value = "";
        contenedorLogin.innerHTML = `Hola ${usuarioEncontrado.correo}`;
        const cerrarSession = document.createElement("button");
        cerrarSession.className = "div__login--btn";
        cerrarSession.innerHTML = "Cerrar sesion";
        contenedorLogin.append(cerrarSession);
        cerrarSession.addEventListener("click", sessionClear);
        sessionStorage.setItem("usuarioEnLinea",JSON.stringify(usuarioEncontrado));
        window.location = "http://127.0.0.1:5500/index.html";
    };
}; 
btnLogin.addEventListener("click", login);

//BOTON CERRAR SESION
const sessionClear = () => {
    contenedorLogin.innerHTML = "";
    sessionStorage.clear();
};

//RENDERIZAR LOGIN DESDE SESSIONSTORAGE
if(usuarioSS){
    contenedorLogin.innerHTML = `Hola ${usuarioSS.correo}`;
    const cerrarSession = document.createElement("button");
    cerrarSession.className = "div__login--btn";
    cerrarSession.innerHTML = "Cerrar sesion";
    contenedorLogin.append(cerrarSession);
    cerrarSession.addEventListener("click", sessionClear);
};
