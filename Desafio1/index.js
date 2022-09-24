const productos = [];
const carrito = [];


class Item{
    constructora(producto){
        this.imagen = producto.imagen;
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.categoria = producto.categoria;
        this.stock = producto.stock;
    }
}

const logitechG29 = {
    imagen: "../resources/g29.png",
    nombre: "Logitech G29",
    precio: 30000,
    categoria: "Volantes",
    stock: 4,
}
productos.push(logitechG29);

const trusthmasterT300 = {
    imagen: "../resources/t300.png",
    nombre: "Trusthmaster T300",
    precio: 50000,
    categoria: "Volantes",
    stock: 5,
}
productos.push(trusthmasterT300);

const fanatecCsl = {
    imagen: "../resources/fanatec.png",
    nombre: "Fanatec Csl",
    precio: 85000,
    categoria: "Volantes",
    stock: 2,
}
productos.push(fanatecCsl);

const heusinkveldSps = {
    imagen: "../resources/heusinkveldSrc.png",
    nombre: "Heusinkveld SIM PEDALS SPRINT",
    precio: 30000,
    categoria: "Pedaleras",
    stock: 4,
}
productos.push(heusinkveldSps);



const tienda = document.getElementById("tienda")
tienda.className = "card";

productos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "card__styles"
    div.innerHTML = `
    <img class = "imagen" src = ${producto.imagen} alt = ""> 
    <h3> ${producto.nombre}</h3>
    <p> Precio: $ ${producto.precio}</p>
    <p> Stock: ${producto.stock}</p>
    <button class = "boton">Agregar</button>
    `
    tienda.appendChild(div)
});

function miCarrito(){
    carrito.forEach(item => {
        let mensaje = `
            ${item.nombre} 
            $ ${item.precio}
        `
        alert(mensaje);
    })
}

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