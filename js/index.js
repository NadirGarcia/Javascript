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
let renderizarProductos = () => {
    productos.forEach((producto) => {
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

renderizarProductos()






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

const sumarCantidadCarrito = (item) => {
    let productoOriginal = productos.find(existe => existe.id === item.id)
    let productoModificar = carrito.find(existe => existe.id === item.id)
    productoModificar.precio = productoModificar.precio + productoOriginal.precio
    productoModificar.cantidad = productoModificar.cantidad + 1
    imprimirCarrito()
    localStorage.setItem("enCarrito", JSON.stringify(carrito));
};

const restarCantidadCarrito = (item) => {
    let productoOriginal = productos.find(existe => existe.id === item.id);
    let productoModificar = carrito.find(existe => existe.id === item.id);
    let indice = carrito.indexOf(productoModificar);
    productoModificar.precio = productoModificar.precio - productoOriginal.precio
    productoModificar.cantidad = productoModificar.cantidad - 1
    productoModificar.cantidad < 1 ? carrito.splice(indice, 1) : false;
    imprimirCarrito()
    totalCompra();
    contadorCarrito();
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

//RENDERIZACION DE CARRITO DESDE LOCALSTORAGE
let renderizarLS = carritoLS ? true : false;
renderizarLS ? carrito = carritoLS : false;
imprimirCarrito();

//CATEGORIA VOLANTES
volantes.addEventListener("click", () => {
    let volantesEncontrados = productos.filter(producto => producto.categoria === "Volantes");
    contenedorTienda.innerHTML = "";
    volantesEncontrados.forEach(producto => {
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
});

//CATEGORIA PEDALERAS
pedaleras.addEventListener("click",() => {
    let pedalesEncontrados = productos.filter(producto => producto.categoria === "Pedaleras");
    contenedorTienda.innerHTML = "";
    pedalesEncontrados.forEach(producto => {
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
});

//CATEGORIA HANBRAKE
handbrake.addEventListener("click",() => {
    let pedalesEncontrados = productos.filter(producto => producto.categoria === "Handbrake");
    contenedorTienda.innerHTML = "";
    pedalesEncontrados.forEach(producto => {
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
});

//CATEGORIA SHIFTERS
shifters.addEventListener("click",() => {
    let pedalesEncontrados = productos.filter(producto => producto.categoria === "Shifters");
    contenedorTienda.innerHTML = "";
    pedalesEncontrados.forEach(producto => {
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
});


//BUSCADOR  
botonBuscar.addEventListener("click", () => {
    let buscado = inputBuscar.value.toLowerCase()
    let encontrado = productos.filter(item => item.categoria.includes(buscado))
    inputBuscar.value = "";
    encontrado.length === 0 ? console.log("Producto no encontrado"): console.log(encontrado);
});


/* //QUITAR FILTROS
botonQuitarFiltro.addEventListener("click", () => {
    contenedorTienda.innerHTML = "";
    renderizarProductos();
});
 */
