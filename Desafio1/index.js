const productos = [];
let carrito = [];
let carritoLS = JSON.parse(localStorage.getItem("enCarrito"));
const inputBuscar = document.getElementById("inputBuscar");
const botonBuscar = document.getElementById("btnBuscar");
const botonQuitarFiltro = document.getElementById("botonQuitarFiltro");
const volantes = document.getElementById("volantes");
const pedaleras = document.getElementById("pedaleras");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const btnCarrito = document.getElementById("btnCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const contenedorTienda = document.getElementById("contenedorTienda");


//CONSTRUCTOR PRODUCTOS
class Item {
    constructora(producto) {
        this.id = producto.id;
        this.imagen = producto.imagen;
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.categoria = producto.categoria;
        this.stock = producto.stock;
    }
};

//PRODUCTOS
const logitechG29 = {
    id: 1,
    imagen: "../resources/g29.png",
    nombre: "Logitech G29",
    precio: 30000,
    categoria: "Volantes",
    stock: 4,
};
productos.push(logitechG29);

const trusthmasterT300 = {
    id: 2,
    imagen: "../resources/t300.png",
    nombre: "Trusthmaster T300",
    precio: 50000,
    categoria: "Volantes",
    stock: 5,
};
productos.push(trusthmasterT300);

const fanatecCsl = {
    id: 3,
    imagen: "../resources/fanatec.png",
    nombre: "Fanatec Csl",
    precio: 85000,
    categoria: "Volantes",
    stock: 2,
};
productos.push(fanatecCsl);

const heusinkveldSps = {
    id: 4,
    imagen: "../resources/heusinkveldSrc.png",
    nombre: "Heusinkveld SPS",
    precio: 30000,
    categoria: "Pedaleras",
    stock: 4,
};
productos.push(heusinkveldSps);

//CARDS
productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img class = "card__imagen" src="${producto.imagen}" alt="">
        <div class= "card__info">
            <h3> ${producto.nombre}</h3>
            <span> Precio: $ ${producto.precio}</span>
            <p> Stock: ${producto.stock}</p>
            <button id = ${producto.id} class = "btn" >Agregar</button>
        </div>
    `;
    contenedorTienda.append(card);
    const botonAgregar = document.getElementById(producto.id);
    botonAgregar.addEventListener("click", () => agregarCarrito(producto));
});

//CARRITO
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
        itemCarrito.className = "card__carrito";
        itemCarrito.innerHTML = `
            <td><img class = "card__imagen--carrito" src="${item.imagen}" alt=""></td>
            <td><h5>${item.nombre}</h5></td>
            <td><span> $ ${item.precioUnitario}</span></td>
            <td><input class = "btn__cantidad" type = "number" value = ${item.cantidad}></input></td>
            <td><span> $ ${item.precio}</span></td>
            <td><button id = ${item.id} class = "btn__eliminar"> x </button></td>
        `;
        totalCompra();
        contenedorCarrito.append(itemCarrito);
        const botonEliminar = document.getElementById(item.id);
        botonEliminar.addEventListener("click", () => eliminarItem(item));
    });
}

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
            localStorage.clear();
            Swal.fire(
                'Tu carrito fue vaciado',
            )
        };
    });
});

//RENDERIZACION DE CARRITO POR LOCALSTORAGE
let renderizarLS = carritoLS ? true : false;
renderizarLS ? carrito = carritoLS : false;
imprimirCarrito();

//FILTRAR POR VOLANTES
const botonVolantes = () => {
    let volantesEncontrados = productos.filter(producto => producto.categoria === "Volantes");
    contenedorTienda.innerHTML = "";
    volantesEncontrados.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img class = "card__imagen" src="${producto.imagen}" alt="">
        <div class= "card__info">
        <h3> ${producto.nombre}</h3>
        <span> Precio: $ ${producto.precio}</span>
        <p> Stock: ${producto.stock}</p>
        <button id = ${producto.id} class = "btn" >Agregar</button>
        </div>
        `;
        contenedorTienda.append(card);
        const botonAgregar = document.getElementById(producto.id);
        botonAgregar.addEventListener("click", () => agregarCarrito(producto));
    });

}
volantes.addEventListener("click", botonVolantes);

//FILTRAR POR PEDALERAS
const botonPedaleras = () => {
    let pedalerasEncontrados = productos.filter(producto => producto.categoria === "Pedaleras");
    contenedorTienda.innerHTML = "";
    pedalerasEncontrados.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img class = "card__imagen" src="${producto.imagen}" alt="">
        <div class= "card__info">
        <h3> ${producto.nombre}</h3>
        <span> Precio: $ ${producto.precio}</span>
        <p> Stock: ${producto.stock}</p>
        <button id = ${producto.id} class = "btn" >Agregar</button>
        </div>
        `;
        contenedorTienda.append(card);
        const botonAgregar = document.getElementById(producto.id);
        botonAgregar.addEventListener("click", () => agregarCarrito(producto));
    });
}
pedaleras.addEventListener("click", botonPedaleras);

//QUITAR FILTROS
botonQuitarFiltro.addEventListener("click", () => {
    contenedorTienda.innerHTML = "";
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img class = "card__imagen" src="${producto.imagen}" alt="">
            <div class= "card__info">
                <h3> ${producto.nombre}</h3>
                <span> Precio: $ ${producto.precio}</span>
                <p> Stock: ${producto.stock}</p>
                <button id = ${producto.id} class = "btn" >Agregar</button>
            </div>
        `;
        contenedorTienda.append(card);
        const botonAgregar = document.getElementById(producto.id);
        botonAgregar.addEventListener("click", () => agregarCarrito(producto));
    });
});



//BUSCADOR
/* const buscador = (item) => {
    console.log(item);
    let encontrado = productos.filter(producto => producto.categoria === "Volantes")
    console.log(encontrado);
    inputBuscar.value = "";
} 

botonBuscar.addEventListener("click", () => buscador(inputBuscar.value)); */