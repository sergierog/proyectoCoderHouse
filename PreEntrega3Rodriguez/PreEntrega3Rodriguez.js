// Primera version
// let menu = prompt(`Elija su producto ?
// \n 1. Cargador - $30000
// \n 2. Adaptador - $25000
// \n 3. Funda Celular - $15000
// \n 4. Vidrio 3D - $12000`)

const listaProd = [
  {
    nombre: "Cargador",
    codigo: 1,
    precio: 30000,
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT85oEMmOWdaj5qTEcoNlDs5wBASSRCzIyfQ&usqp=CAU",
  },
  {
    nombre: "Adaptador",
    codigo: 2,
    precio: 25000,
    imagen:
      "https://www.imtecnologia.co/wp-content/uploads/2022/09/11311001-400x400.png",
  },
  {
    nombre: "Funda Celular",
    codigo: 3,
    precio: 15000,
    imagen:
      "https://static.wixstatic.com/media/fbee12_0480c708e6c544f48733fa898bfb793a~mv2.png/v1/fill/w_342,h_342,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Dise%C3%B1o%20case%20izquierdo_webp.png",
  },
  {
    nombre: "Vidrio 3D",
    codigo: 4,
    precio: 12000,
    imagen: "https://www.toptecnouy.com/imgs/productos/productos31_31374.jpg",
  },
];

let carrito = {};

// let cargarCarrito = () => {
//   let seguir;
//   while (seguir != "no") {
//     let menu = prompt(`Elija su producto ? 
//          \n 1. Cargador - $30000
//          \n 2. Adaptador - $25000
//          \n 3. Funda Celular - $15000 
//          \n 4. Vidrio 3D - $12000`);
//     //  carrito.push(menu)
//     seguir = prompt("Desea agregar otro producto ? Si / No");
//     for (let i = 0; i < listaProd.length; i++) {
//       if (menu == listaProd[i].codigo) {
//         carrito.push(listaProd[i]);
//       }
//     }
//   }
//   return carrito;
// };

// const sumaProductos = (array) => {
//   let costoTotal = 0;
//   array.forEach((element) => {
//     costoTotal += element.precio;
//   });
//   return costoTotal;
// };
// /// PRODUCTOS FILTRADOS POR PRECIO
// // const filtroPrecios = (array, precioLimite)=>{
// //     let filtrados = [];
// //     for(let i = 0; i < array.length; i++) {
// //     if(array[i].precio< precioLimite){
// //      filtrados.push(array[i])
// //     }
// //     }
// //     return filtrados
// // }
// const filtro = (array, precioLimit) => {
//   let filtrados = [];
//   filtrados = array.filter((prod) => prod.precio <= precioLimit);
//   return filtrados;
// };
// let ordenDescendente = [];
// const preciosMayorMenor = (array) => {
//   ordenDescendente = array.sort((a, b) => b.precio - a.precio);
//   return ordenDescendente;
// };

// console.log(cargarCarrito());
// console.log(filtro(listaProd,25000 ))
// console.log(preciosMayorMenor(listaProd));
// alert(`El costo total es : $ ${sumaProductos(carrito)}`)

/// FUNCIONES DOM
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        renderizarCarrito()
    }
}
)

const contenedorProductos = document.querySelector("#contenedor-productos");
const renderizarProductos = (data) => {
  const template = document.querySelector("#template-productos").content;
  const fragment = document.createDocumentFragment();
  data.forEach((producto) => {
    template.querySelector("img").setAttribute("src", producto.imagen);
    template.querySelector("h5").textContent = producto.nombre;
    template.querySelector("span").textContent = producto.precio;
    template.querySelector("button").dataset.id = producto.codigo;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  contenedorProductos.appendChild(fragment);
};

const detectarBtonoes = (data) => {
  const botones = document.querySelectorAll(".card button");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.dataset.id);
      const producto = data.find(
        (item) => item.codigo === parseInt(btn.dataset.id)
      );
      producto.cantidad = 1;
      if (carrito.hasOwnProperty(producto.codigo)) {
        producto.cantidad = carrito[producto.codigo].cantidad + 1;
      }
      carrito[producto.codigo] = { ...producto };
      console.log(carrito);
      renderizarCarrito();
    });
  });
};
const items = document.querySelector("#items");
const renderizarCarrito = () => {
  // Limpiar carrito coninner
  items.innerHTML = "";
  const template = document.querySelector("#template-carrito").content;
  const fragment = document.createDocumentFragment();
  Object.values(carrito).forEach((producto) => {
    template.querySelector("th").textContent = producto.codigo;
    template.querySelectorAll("td")[0].textContent = producto.nombre;
    template.querySelectorAll("td")[1].textContent = producto.cantidad;
    template.querySelectorAll("td")[3].textContent =
      producto.precio * producto.cantidad;

   // botones
   template.querySelector(".btn-info").dataset.id = producto.codigo;
   template.querySelector(".btn-danger").dataset.id = producto.codigo;
   
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  renderizarFooter();
  accionarBotones();
  localStorage.setItem("carrito",JSON.stringify(carrito))
};


const footer = document.querySelector("#footer-carrito");
const renderizarFooter = () => {
  footer.innerHTML = "";
  const template = document.querySelector("#template-footer").content;
  const fragment = document.createDocumentFragment();
  // Sumas precio y cantidades totales
  const nCantidad = Object.values(carrito).reduce(
    (acum, { cantidad }) => acum + cantidad,
    0
  );
  const sumaPrecio = Object.values(carrito).reduce(
    (acum, { cantidad, precio }) => acum + cantidad * precio,
    0
  );
  template.querySelectorAll("td")[0].textContent = nCantidad;
  template.querySelector("span").textContent = sumaPrecio;
  const clone = template.cloneNode(true);
  fragment.appendChild(clone);

  footer.appendChild(fragment);

  const boton = document.querySelector("#vaciar-carrito")
  boton.addEventListener("click",()=>{
    carrito = {}
    renderizarCarrito()
  })
};

const accionarBotones = ()=>{
    const botonesAgregar = document.querySelectorAll("#items .btn-info")
    const botonesEliminar = document.querySelectorAll("#items .btn-danger")

    botonesAgregar.forEach( boton =>{
        boton.addEventListener("click", ()=>{
       
            carrito[boton.dataset.id]
            const producto =  carrito[boton.dataset.id]
            producto.cantidad ++
            carrito[boton.dataset.id] = {...producto}
            renderizarCarrito()

        })
    })
    botonesEliminar.forEach( boton =>{
        boton.addEventListener("click", ()=>{
            const producto =  carrito[boton.dataset.id]
            producto.cantidad --
            if(producto.cantidad === 0){
               delete carrito[boton.dataset.id]
            }else{
                carrito[boton.dataset.id] = {...producto}
            
            } renderizarCarrito ()
            
        })
    })

}

renderizarProductos(listaProd);
detectarBtonoes(listaProd);

// const template = document.querySelector("#template-footer")
// console.log(template.querySelectorAll("td"))
