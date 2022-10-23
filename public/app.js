let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="w-52 border-2 border-Purple rounded">
           <img class="" src= ${img} alt="item image" />
           <div class="flex flex-col p-2.5 gap-2.5">
             <h3 class="font-bold">${name}</h3>
             <p class="text-sm">
               ${desc}
             </p>
             <div class="flex flex-row justify-between">
               <h2 class="font-bold">$ ${price}</h2>
               <div class="flex flex-row gap-2">
                 <i onclick="decrement(${id})" class="bi bi-dash-lg text-red-600 cursor-pointer"></i>
                 <div id=${id}>${
        search.item === undefined ? 0 : search.item
      }</div>
                 <i onclick="increment(${id})" class="bi bi-plus-lg text-green-600 cursor-pointer"></i>
               </div>
             </div>
           </div>
         </div>`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  
  document.getElementById(id).innerHTML = search.item;
 
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
