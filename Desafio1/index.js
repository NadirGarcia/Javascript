const productos = [];
const carrito = [];
const carritoLS = JSON.parse(localStorage.getItem("enCarrito"));
const inputBuscar = document.getElementById("inputBuscar");
const botonBuscar = document.getElementById("btnBuscar");
const volantes = document.getElementById("volantes");
const pedaleras = document.getElementById("pedaleras");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const btnCarrito = document.getElementById("btnCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const contenedorTienda = document.getElementById("contenedorTienda");
contenedorTienda.className = "contenedor";

//CONSTRUCTOR PRODUCTOS
class Item{
    constructora(producto){
        this.id = producto.id;
        this.imagen = producto.imagen;
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.categoria = producto.categoria;
        this.stock = producto.stock;
    }
}

//PRODUCTOS
const logitechG29 = {
    id: 1,
    imagen: "../resources/g29.png",
    nombre: "Logitech G29",
    precio: 30000,
    categoria: "Volantes",
    stock: 4,
}
productos.push(logitechG29);

const trusthmasterT300 = {
    id: 2,
    imagen: "../resources/t300.png",
    nombre: "Trusthmaster T300",
    precio: 50000,
    categoria: "Volantes",
    stock: 5,
}
productos.push(trusthmasterT300);

const fanatecCsl = {
    id: 3,
    imagen: "../resources/fanatec.png",
    nombre: "Fanatec Csl",
    precio: 85000,
    categoria: "Volantes",
    stock: 2,
}
productos.push(fanatecCsl);

const heusinkveldSps = {
    id: 4,
    imagen: "../resources/heusinkveldSrc.png",
    nombre: "Heusinkveld SPS",
    precio: 30000,
    categoria: "Pedaleras",
    stock: 4,
}
productos.push(heusinkveldSps);

//CARRITO
const agregarCarrito = (producto) => {
    let productoEnCarrito = carrito.find(existe => existe.id === producto.id)
    if(productoEnCarrito === undefined){
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        })
    }else{
        productoEnCarrito.precio = productoEnCarrito.precio + producto.precio;
        productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
    }
    imprimirCarrito()
    localStorage.setItem("enCarrito", JSON.stringify(carrito))
}

const imprimirCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach( item => {
        const itemCarrito = document.createElement("div")
        itemCarrito.className = "card__carrito"
        itemCarrito.innerHTML = `
            <h5>${item.nombre}</h5>
            <span> $ ${item.precio}</span>
            <span>${item.cantidad}</span>
        `
        contenedorCarrito.append(itemCarrito)
    });
}

if(carritoLS){
    const carrito = carritoLS
    carrito.forEach( item => {
        const itemCarrito = document.createElement("div")
        itemCarrito.className = "card__carrito"
        itemCarrito.innerHTML = `
            <h5>${item.nombre}</h5>
            <span> $ ${item.precio}</span>
            <span>${item.cantidad}</span>
        `
        contenedorCarrito.append(itemCarrito)
    })
}

//CARDS
productos.forEach(producto => {
    const card = document.createElement("div")
    card.className = "card"
    card.innerHTML =`
        <img class = "card__imagen" src="${producto.imagen}" alt="">
        <div class= "card__info">
            <h3> ${producto.nombre}</h3>
            <span> Precio: $ ${producto.precio}</span>
            <p> Stock: ${producto.stock}</p>
            <button id = ${producto.id} class = "btn" >Agregar</button>
        </div>
    `
    contenedorTienda.append(card)
    const botonAgregar = document.getElementById(producto.id);
    botonAgregar.addEventListener("click", () => agregarCarrito(producto))
});

// BOTON VACIAR CARRITO
vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: 'Vaciar Carrito',
        text: "Estas seguro que quieres vaciar el carrito?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar!'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            imprimirCarrito()
            localStorage.clear()
        Swal.fire(
            'Tu carrito fue vaciado',
        )
        }
    })

})

//BUSCADOR
const buscador = (item) => {
    console.log(item);
    let encontrado = productos.filter(producto => producto.categoria === "Volantes")
    console.log(encontrado);
    inputBuscar.value = "";
}

botonBuscar.addEventListener("click", () => buscador(inputBuscar.value));

const botonVolantes = () => {
    let volantesEncontrados = productos.filter(producto => producto.categoria === "Volantes")
    console.log(volantesEncontrados);
}

volantes.addEventListener("click", botonVolantes)

const botonPedaleras = () => {
    let pedalerasEncontrados = productos.filter(producto => producto.categoria === "Pedaleras")
    console.log(pedalerasEncontrados);
}

pedaleras.addEventListener("click", botonPedaleras)



