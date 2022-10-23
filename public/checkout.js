let orderForm = document.getElementById("order-form");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateOrderForm = () => {
  return (orderForm.innerHTML = `
  <form class="px-16 grid grid-cols-cartgrid justify-center  items-center gap-2 " action="">
        <h1 class=" font-bold text-Orange">CONTACT FORM</h1>
        <input class="focus:outline-green-600 rounded"   type="text" name=" Name" placeholder="Full Name" required>
        <input class="focus:outline-green-600 rounded" type="text" name=" Email" placeholder="Email" required>
        <input class="focus:outline-green-600 rounded" type="text" name=" Phone Number" placeholder="Phone Number" required>
        <h3 class=" font-bold text-green-600">My Order</h3>
        <textarea id = "ordertext" class="focus:outline-green-600 rounded" name="Order" id="" placeholder="" cols="30" rows="10" required></textarea>
        <h3 id ="totalbill" class=" font-bold text-green-600"></h3>
        <button onclick= "submitCart() "  class="focus:outline-none focus-visible:ring ... bg-green-600 text-White p-1.5 rounded pointer" type="submit">Place Order</button>
      </form>
  `);
};

generateOrderForm();

let generateCartingList = () => {
  let orderText = document.getElementById("ordertext");
  return (orderText.innerHTML = basket
    .map((x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      let { img, name, price } = search;
      return `
       ${name}  ${item} * $${price}
      `;
    })
    .join(""));
};

generateCartingList();

let generateTotalBill = () => {
  let totalBill = document.getElementById("totalbill");
  console.log(totalBill);
  let amount = basket
    .map((x) => {
      let { item, id } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return item * search.price;
    })
    .reduce((x, y) => x + y, 0);
  return (totalBill.innerHTML = `Total : $${amount}`);
};

generateTotalBill();

let clearCart = () => {
  basket = [];

  calculation();
  generateCartingList();
  generateOrderForm();
  localStorage.setItem("data", JSON.stringify(basket));
};

let submitCart = () => {
  basket = [];

  calculation();
  generateCartingList();
  generateOrderForm();
  localStorage.setItem("data", JSON.stringify(basket));
  document.location.href = "completedorder.html";
};
