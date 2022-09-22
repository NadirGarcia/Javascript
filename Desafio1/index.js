const productos = [];
const carrito = [];

class Item{
    constructora(producto){
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.categoria = producto.categoria;
        this.stock = producto.stock;
    }
}

const logitechG29 = {
    nombre: "Logitech G29",
    precio: 30000,
    categoria: "Volantes",
    stock: 4,
}
productos.push(logitechG29);

const trusthmasterT300 = {
    nombre: "Trusthmaster T300",
    precio: 50000,
    categoria: "Volantes",
    stock: 5,
}
productos.push(trusthmasterT300);

const fanatecCsl = {
    nombre: "Fanatec Csl",
    precio: 85000,
    categoria: "Volantes",
    stock: 2,
}
productos.push(fanatecCsl);

const heusinkveldSps = {
    nombre: "Heusinkveld SIM PEDALS SPRINT",
    precio: 30000,
    categoria: "Pedaleras",
    stock: 4,
}
productos.push(heusinkveldSps);




//productos.forEach(item => console.log(item.nombre));

/* let lg = productos.find(item => item === productos[1]);

console.log(lg);

function producto(item) {
    switch (item) {
        case "1":
            return productos[0];
        case "2":
            return productos[1];
        case "3":
            return productos[2];
        default:
            alert("Error");
            break;
    }
} */

let bienvenida = prompt("Bienvenido a la tienda de NGsimracing \n 1. Volantes \n 2. Pedaleras \n 3. Salir" );

while (bienvenida !== "3") {
    if (bienvenida === "1") {
        let volantes = productos.filter(item => item.categoria === "Volantes");
        volantes.forEach(item =>{
            let mensaje = `
            Nombre: ${item.nombre} 
            Precio: ${item.precio} 
            Stock: ${item.stock}`;
            
            alert(mensaje);
    })
    } else if(bienvenida === "2"){
        let pedaleras = productos.filter(item => item.categoria === "Pedaleras");
        pedaleras.forEach(item =>{
        let mensaje2 = `
        Nombre: ${item.nombre} 
        Precio: ${item.precio} 
        Stock: ${item.stock}`;
        
        alert(mensaje2);
    })
    } else{
        break;
    }
}

if (bienvenida === "3") {
    alert("Gracias por visitar nuestra tienda");
}
