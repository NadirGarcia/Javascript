let carrito = [];
let carritoLS = JSON.parse(localStorage.getItem("enCarrito"));
const inputBuscar = document.getElementById("inputBuscar");
const botonBuscar = document.getElementById("btnBuscar");
const botonQuitarFiltro = document.getElementById("botonQuitarFiltro");
const volantes = document.getElementById("volantes");
const pedaleras = document.getElementById("pedaleras");
const vaciarCarrito = document.getElementById("vaciarCarrito");

const contenedorCarrito = document.getElementById("contenedorCarrito");
const contenedorTienda = document.getElementById("contenedorTienda");


const imprimirProductos = async () => {
    try{
        const productos = await fetch("./productos.json")
            .then( res => res.json())
            .then(data => {
                data.forEach(producto => {
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
            })
    }catch{
        console.log("Error");
    }
}

imprimirProductos()

/* //CONSTRUCTOR PRODUCTOS
class Item {
    constructora(producto) {
        this.id = producto.id;
        this.imagen = producto.imagen;
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.categoria = producto.categoria;
        this.stock = producto.stock;
    }
}; */


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
            <td><input id = "inputCantidad" class = "btn__cantidad" type = "number" value = ${item.cantidad}></td>
            <td><span> $ ${item.precio}</span></td>
            <td><button id = ${item.id} class = "btn__eliminar"> <img src ="../resources/trash.png"></button></td>
        `;
        contenedorCarrito.append(itemCarrito);
        totalCompra();
        contadorCarrito();
        const botonEliminar = document.getElementById(item.id);
        botonEliminar.addEventListener("click", () => eliminarItem(item));
    });
}

//CONTADOR PRODUCTOS EN CARRITO
const contadorCarrito = () => {
    let contador = document.getElementById("contador");
    if(carrito.length === 0){
        contador.className = "btn__carrito--contadoroff"; 
    }else{
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