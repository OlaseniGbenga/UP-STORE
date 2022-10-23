let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let {img,name,price} = search;
        return `
        <div class="flex  border-black border-2 border-solid rounded mb-5">
        <img class="w-28" src="${img}" alt="" />
        <div class=" p-2">
          <div class="w-52 items-center justify-between flex">
            <h4 class= "flex gap-2 align-middle">
              <p>${name}</p>
              <p class = "py-0.5 px-1 bg-Orange rounded">$ ${price}</p>
              
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg  text-red-600 bold"></i>
          </div>

          <div class="flex flex-row gap-2">
                 <i onclick="decrement(${id})" class="bi bi-dash-lg text-red-600 cursor-pointer"></i>
                 <div id=${id}> ${item}</div>
                 <i onclick="increment(${id})" class="bi bi-plus-lg text-green-600 cursor-pointer"></i>
               </div>

          <h3 class = "mt-4 font-bold">$ ${item * search.price}</h3>
        </div>
      </div>
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2 class="font-bold text-2xl ">Cart is Empty</h2>
      <a href="index.html"><button class="bg-Orange text-White p-1.5 rounded pointer mt-2.5">Back to Home</button></a>
        `;
  }
};

generateCartItems();

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
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;

  calculation();
  totalAmount();
  
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  calculation();

  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
  if (basket.length !==0) {
let amount = basket.map((x)=>{
  let {item,id} =x;
  let search = shopItemsData.find((y) => y.id === id) || [];
  return item * search.price
}).reduce((x,y)=>x+y,0);
label.innerHTML = `
<h2> Total Bill : $ ${amount} </h2>
<a href="checkout.html" class = "bg-green-600 text-White p-2 rounded pointer mt-2.5 mr-2">Checkout </a>
<button onclick="clearCart()" class = "bg-red-600 text-White p-1.5 rounded pointer mt-2.5">Clear Cart </button>
`
  }
  else return
}

totalAmount();
