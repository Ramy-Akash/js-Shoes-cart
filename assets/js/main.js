let searchInput = document.querySelector(".Input")
const container = document.querySelector(".grid-container")

let newSearchArray = [];

searchInput.addEventListener('input', search);

function search(){
    if (searchInput.value =='') {
        products.forEach(element => {
            
            let discountedPrice = 0;
            let finalPrice = 0;
        
            if (element.discount == 0){
                finalPrice = element.price;
        
                container.innerHTML += `<div class="cards"><div class="cards-img"><img src="${element.image}" alt="Shoes"></div>
                 <div class="cards-typ"><p>${element.title}</p>
                  <div class="cards-price"><h3>${finalPrice}$</h3>
                   </div></div>
                  <div class="cards-btn"><button id="addBtn" onclick="addToCart(${element.id})">Add to Cart</button></div></div>`
            }
            else{
                discountedPrice = element.price * ((100 - element.discount)/100);
                finalPrice =discountedPrice;
        
                container.innerHTML += `<div class="cards"><div class="cards-img"><img src="${element.image}" alt="Shoes"></div>
                 <div class="cards-typ"><p>${element.title}</p> 
                 <div class="cards-price"><h3>${finalPrice}$</h3> 
                 <del>${element.price}$</del></div></div>
                  <div class="cards-btn"><button id="addBtn" onclick="addToCart(${element.id})">Add to Cart</button></div></div>`
            }
        
        })
        }
    else{        
        container.innerHTML = " "; 
        newSearchArray = products.filter((x)=>
        x.title.toUpperCase().toLowerCase().includes(searchInput.value)
    );
    // console.log(newSearchArray);
    newSearchArray.forEach(element => {
            
        let discountedPrice = 0;
        let finalPrice = 0;
    
        if (element.discount == 0){
            finalPrice = element.price;
    
            container.innerHTML += `<div class="cards"><div class="cards-img"><img src="${element.image}" alt="Shoes"></div>
             <div class="cards-typ"><p>${element.title}</p>
              <div class="cards-price"><h3>${finalPrice}$</h3>
               </div></div>
              <div class="cards-btn"><button id="addBtn" onclick="addToCart(${element.id})">Add to Cart</button></div></div>`
        }
        else{
            discountedPrice = element.price * ((100 - element.discount)/100);
            finalPrice =discountedPrice;
    
            container.innerHTML += `<div class="cards"><div class="cards-img"><img src="${element.image}" alt="Shoes"></div>
             <div class="cards-typ"><p>${element.title}</p> 
             <div class="cards-price"><h3>${finalPrice}$</h3> 
             <del>${element.price}$</del></div></div>
              <div class="cards-btn"><button id="addBtn" onclick="addToCart(${element.id})">Add to Cart</button></div></div>`
        }
    
    })
}
    }
    

   function displayAllProducts(){ 
    container.innerHTML = " ";

products.forEach(element => {
    let discountedPrice = 0;
    let finalPrice = 0;

    if (element.discount == 0){
        finalPrice = element.price;

        container.innerHTML += `<div class="cards"><div class="cards-img"><img src="${element.image}" alt="Shoes"></div>
         <div class="cards-typ"><p>${element.title}</p>
          <div class="cards-price"><h3>${finalPrice}$</h3>
           </div></div>
          <div class="cards-btn"><button id="addBtn" onclick="addToCart(${element.id})">Add to Cart</button></div></div>`
    }
    else{
        discountedPrice = element.price * ((100 - element.discount)/100);
        finalPrice =discountedPrice;

        container.innerHTML += `<div class="cards"><div class="cards-img"><img src="${element.image}" alt="Shoes"></div>
         <div class="cards-typ"><p>${element.title}</p> 
         <div class="cards-price"><h3>${finalPrice}$</h3> 
         <del>${element.price}$</del></div></div>
          <div class="cards-btn"><button id="addBtn" onclick="addToCart(${element.id})">Add to Cart</button></div></div>`
    }

});
   }
   displayAllProducts();

   
const modal = document.getElementById("cartModal");


const cartIcon = document.getElementById("cart-icon");


const closeModal = document.getElementsByClassName("close")[0];


cartIcon.onclick = function () {
  modal.style.display = "block";
};


closeModal.onclick = function () {
  modal.style.display = "none";
};


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


const addBtn = document.getElementById("addBtn");
const cartItemsContainer = document.getElementById("cart-items");
const modalMyCart = document.getElementById("modal-mycart");
let Total = parseFloat(localStorage.getItem('cartTotal')) || 0;

function addToCart(id) {
    // let cartItems = []
    // console.log(id);
    products.forEach(element => {
                
        if (element.id == id) {
            let discountedPrice = 0;
            let finalPrice = 0;
            
            
            if (element.discount == 0){
                finalPrice = element.price;
        
                cartItemsContainer.innerHTML += `
                <div class="items">
                <img src="${element.image}" alt="Shoeeee">
                <span>${element.title}</span>
                <p>${element.price} $</p>
                <button onclick="deleteItem(${element.id})"><i class="fa-regular fa-trash-can"></i></button>
              </div>
              `;
            }
            else{
                discountedPrice = element.price * ((100 - element.discount)/100);
                finalPrice =discountedPrice;
        
                cartItemsContainer.innerHTML += `
                <div class="items">
                <img src="${element.image}" alt="Shoeeee">
                <span>${element.title}</span>
                <p>${discountedPrice} $</p>
                <button onclick="deleteItem(${element.id})"><i class="fa-regular fa-trash-can"></i></button>
              </div>
              `;
            }
            Total +=finalPrice;
              modalMyCart.innerHTML =`<h2>My Cart</h2><h3>Total: $ ${Total.toFixed(2)}</h3>`
        }
        
    });
}

function deleteItem(id) {
    products = products.filter(element => element.id != id)

}




let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


function loadCartItems() {
    cartItemsContainer.innerHTML = ''; 
    cartItems.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div class="items" id="cart-item-${item.id}">
                <img src="${item.image}" alt="Shoeeee">
                <span>${item.title}</span>
                <p>${item.discountedPrice} $</p>
                <button onclick="removeFromCart(${item.id})">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;
    });

    updateCartTotal();
}


function addToCart(id) {
    const selectedItem = products.find(product => product.id === id);
    if (selectedItem) {
        let discountedPrice = selectedItem.discount > 0 ? 
                              selectedItem.price * ((100 - selectedItem.discount) / 100) : 
                              selectedItem.price;

        
        cartItems.push({ ...selectedItem, discountedPrice });

        
        cartItemsContainer.innerHTML += `
            <div class="items" id="cart-item-${selectedItem.id}">
                <img src="${selectedItem.image}" alt="Shoeeee">
                <span>${selectedItem.title}</span>
                <p>${discountedPrice} $</p>
                <button onclick="removeFromCart(${selectedItem.id})">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;

        
        Total += discountedPrice;
        updateCartTotal();

        
        saveCartToLocalStorage();
    }
}


function removeFromCart(id) {
    const selectedItemIndex = cartItems.findIndex(item => item.id === id);

    if (selectedItemIndex !== -1) {
        
        Total -= cartItems[selectedItemIndex].discountedPrice;

        
        cartItems.splice(selectedItemIndex, 1);

        
        const itemElement = document.getElementById(`cart-item-${id}`);
        if (itemElement) {
            cartItemsContainer.removeChild(itemElement);
        }


        updateCartTotal();

        
        saveCartToLocalStorage();
    }
}


function updateCartTotal() {
    modalMyCart.innerHTML = `<h2>My Cart</h2><h3>Total: $${Total.toFixed(2)}</h3>`;
}


function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', Total.toString());
}


window.onload = function () {
    loadCartItems(); 
};
