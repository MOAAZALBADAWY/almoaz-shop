let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const counter = document.getElementById("cart-counter");

  cartItems.innerHTML = "";
  let total = 0;
  const grouped = {};

  cart.forEach(item => {
    if (grouped[item.name]) {
      grouped[item.name].count += 1;
    } else {
      grouped[item.name] = { ...item, count: 1 };
    }
    total += item.price;
  });

  for (const key in grouped) {
    const li = document.createElement("li");
    li.textContent = `${grouped[key].count} × ${key} (${grouped[key].price} جنيه)`;
    cartItems.appendChild(li);
  }

  totalPrice.textContent = `الإجمالي: ${total} جنيه`;
  counter.textContent = `🛒 السلة: ${cart.length}`;
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function toggleCart() {
  document.getElementById("cart-section").classList.toggle("active");
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartUI();
}

function sendOrder() {
  if (cart.length === 0) {
    alert("السلة فارغة!");
    return;
  }

  let grouped = {};
  cart.forEach(item => {
    if (grouped[item.name]) {
      grouped[item.name].count++;
    } else {
      grouped[item.name] = { price: item.price, count: 1 };
    }
  });

  let msg = "طلب جديد:\n";
  for (let key in grouped) {
    msg += `${grouped[key].count} × ${key} (${grouped[key].price} جنيه)\n`;
  }

  msg += `\nالإجمالي: ${cart.reduce((sum, item) => sum + item.price, 0)} جنيه`;

  let phone = "201228408475";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

window.onload = updateCartUI;


