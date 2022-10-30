let carrito = [];
let carritoLS = JSON.parse(localStorage.getItem("enCarrito"));
const inputBuscar = document.getElementById("inputBuscar");
const botonBuscar = document.getElementById("btnBuscar");
const botonQuitarFiltro = document.getElementById("botonQuitarFiltro");
const volantes = document.getElementById("volantes");
const pedaleras = document.getElementById("pedaleras");
const shifters = document.getElementById("shifters");
const handbrake = document.getElementById("frenoDeMano");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const contenedorTienda = document.getElementById("contenedorTienda");
const btnCarrito = document.getElementById("btnCarrito");

const imprimirProductos = async () => {
    try {
        let response = await fetch("./dataBase/productos.json");
        let data = await response.json();
        return data;
    } catch {
        console.log("Error");
    }
}
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
        if(producto.stock < 1){
            stock.innerHTML = "SIN STOCK";
            stock.className = "sin__stock";
            botonAgregar.className = "btnAgregar__off"
        }else if(producto.stock < 3){
            stock.innerHTML = "STOCK BAJO";
            stock.className = "stock__bajo";
        }else{
            stock.innerHTML = "DISPONIBLE";
            stock.className = "stock__disponible";
        }      
    });
};
renderizarProductos(productos)

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
        itemCarrito.className = "card__carrito";
        itemCarrito.innerHTML = `
            <td><img class = "card__imagen--carrito" src="${item.imagen}" alt=""></td>
            <td><h5>${item.nombre}</h5></td>
            <td><span> $ ${item.precioUnitario}</span></td>
            <td><span class = "cantidad"> ${item.cantidad}</span> </td>
            <button id ="sumar${item.id}" class = "btn__sumres">+</button>
            <button id ="restar${item.id}" class = "btn__sumres">-</button>
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
    let productoOriginal = productos.find(existe => existe.id === item.id)
    let productoModificar = carrito.find(existe => existe.id === item.id)
    productoModificar.precio = productoModificar.precio + productoOriginal.precio
    productoModificar.cantidad = productoModificar.cantidad + 1
    imprimirCarrito()
    localStorage.setItem("enCarrito", JSON.stringify(carrito));
};

//BOTON RESTAR CARRITO
const restarCantidadCarrito = (item) => {
    let productoOriginal = productos.find(existe => existe.id === item.id);
    let productoModificar = carrito.find(existe => existe.id === item.id);
    let indice = carrito.indexOf(productoModificar);
    productoModificar.precio = productoModificar.precio - productoOriginal.precio
    productoModificar.cantidad = productoModificar.cantidad - 1
    productoModificar.cantidad < 1 ? carrito.splice(indice, 1) : false;
    imprimirCarrito();
    contadorCarrito();
    totalCompra();
    botonCarrito();
    localStorage.setItem("enCarrito", JSON.stringify(carrito));
}

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
            localStorage.clear();
            Swal.fire(
                'Tu carrito fue vaciado',
            )
        };
    });
});

//BOTON CARRITO

const botonCarrito = () => {
    if(carrito.length !== 0){
        imprimirCarrito();
    }else{
        contenedorCarrito.innerHTML = "Su carrito esta vacio!";
    }
};

btnCarrito.addEventListener("click", botonCarrito)

//RENDERIZACION DE CARRITO DESDE LOCALSTORAGE
let renderizarLS = carritoLS ? true : false;
renderizarLS ? carrito = carritoLS : false;
imprimirCarrito();


//CATEGORIA VOLANTES
volantes.addEventListener("click", () => {
    let volantesEncontrados = productos.filter(producto => producto.categoria === "volantes");
    contenedorTienda.innerHTML = "";
    renderizarProductos(volantesEncontrados);
}); 

const volantesFooter = document.getElementById("volantesFooter");
volantesFooter.addEventListener("click", () => {
    let volantesEncontrados = productos.filter(producto => producto.categoria === "volantes");
    contenedorTienda.innerHTML = "";
    renderizarProductos(volantesEncontrados);
}); 

//CATEGORIA PEDALERAS
pedaleras.addEventListener("click",() => {
    let pedalesEncontrados = productos.filter(producto => producto.categoria === "pedaleras");
    contenedorTienda.innerHTML = "";
    renderizarProductos(pedalesEncontrados);
});

const pedalerasFooter = document.getElementById("pedalerasFooter");
pedalerasFooter.addEventListener("click",() => {
    let pedalesEncontrados = productos.filter(producto => producto.categoria === "pedaleras");
    contenedorTienda.innerHTML = "";
    renderizarProductos(pedalesEncontrados);
});

//CATEGORIA HANBRAKE
handbrake.addEventListener("click",() => {
    let handbrakeEncontrados = productos.filter(producto => producto.categoria === "handbrake");
    contenedorTienda.innerHTML = "";
    renderizarProductos(handbrakeEncontrados);
});

const handbrakeFooter = document.getElementById("frenoDeManoFooter");
handbrakeFooter.addEventListener("click",() => {
    let handbrakeEncontrados = productos.filter(producto => producto.categoria === "handbrake");
    contenedorTienda.innerHTML = "";
    renderizarProductos(handbrakeEncontrados);
});


//CATEGORIA SHIFTERS
shifters.addEventListener("click",() => {
    let shiftersEncontrados = productos.filter(producto => producto.categoria === "shifters");
    contenedorTienda.innerHTML = "";
    renderizarProductos(shiftersEncontrados);
});

const shiftersFooter = document.getElementById("shiftersFooter");
shiftersFooter.addEventListener("click",() => {
    let shiftersEncontrados = productos.filter(producto => producto.categoria === "shifters");
    contenedorTienda.innerHTML = "";
    renderizarProductos(shiftersEncontrados);
});


//BUSCADOR INPUT
let buscador = () => {
    let buscado = inputBuscar.value.toLowerCase();
    inputBuscar.value = "";
    if((buscado !== "") && (buscado.length > 1)){
        contenedorTienda.innerHTML = "";
        let encontrado = productos.filter(item => (item.categoria.includes(buscado)) || (item.marca.includes(buscado)));
        encontrado.length === 0 ? (
            (contenedorTienda.innerHTML = "Producto no encontrado")
            (contenedorTienda.className = "contenedor__mensaje")
            ): 
            renderizarProductos(encontrado);
    }else{
        contenedorTienda.innerHTML = "Ingrese el producto que desea buscar!!";
        contenedorTienda.className = "contenedor__mensaje";
    };
};

inputBuscar.addEventListener("change", buscador);



/* //QUITAR FILTROS
botonQuitarFiltro.addEventListener("click", () => {
    contenedorTienda.innerHTML = "";
    renderizarProductos();
});
 */
