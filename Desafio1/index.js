const productos = [];
const carrito = [];
const inputBuscar = document.getElementById("inputBuscar")
const botonBuscar = document.getElementById("btnBuscar");
const volantes = document.getElementById("volantes")
const pedaleras = document.getElementById("pedaleras")



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


const contenedorTienda = document.getElementById("contenedorTienda")
contenedorTienda.className = "contenedor";

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
    botonAgregar.addEventListener("click", () => console.log(producto))
});


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


/* function miCarrito(){
    carrito.forEach(item => {
        let mensaje = `
            ${item.nombre} 
            $ ${item.precio}
        `
        console.log(mensaje);
    })
}
 */
/* function compra(comprar){
    switch(comprar){
        case "1":
            carrito.push(logitechG29);
            break;
        case "2":
            carrito.push(trusthmasterT300);
            break;
        case "3":
            carrito.push(fanatecCsl);
            break;
        case "4":
            carrito.push(heusinkveldSps);
            break;
        default:
            alert("Error")
            break
    }
}
 */

/* let bienvenida = prompt("Bienvenido a la tienda de NGsimracing \n 1. Volantes \n 2. Pedaleras \n 3. Salir" );

while (bienvenida !== "3"){
if (bienvenida === "1") {
    let volantes = productos.filter(item => item.categoria === "Volantes");
    volantes.forEach(item =>{
        let mensaje = `
        Nombre: ${item.nombre} 
        Precio: ${item.precio} 
        Stock: ${item.stock}`;
        alert(mensaje);
})
let comprar = prompt("Seleccione el producto \n 1. Logitech G29 \n 2. Trusthmaster T300 \n 3. Fanatec Csl");
compra(comprar);
} else if(bienvenida === "2"){
    let pedaleras = productos.filter(item => item.categoria === "Pedaleras");
    pedaleras.forEach(item =>{
    let mensaje = `
    Nombre: ${item.nombre} 
    Precio: ${item.precio} 
    Stock: ${item.stock}`;
    alert(mensaje);
})
comprar = prompt("Seleccione el producto \n 4. Heusinkveld SIM PEDALS SPRINT");
compra(comprar);
} else if(bienvenida === "3"){
    alert("Gracias por visitar nuestra tienda");
}else{
    alert("Ustes a ingresado una opcion incorrecta")
}
bienvenida = prompt("Bienvenido a la tienda de NGsimracing \n 1. Volantes \n 2. Pedaleras \n 3. Salir" )
}

miCarrito(); */