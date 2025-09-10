const loadCategories = () => { 
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(cats=>displayCats(cats.categories));
}

const displayCats = (categories) => {
    const catContainer = document.getElementById('CatContainer');
    const allBtn = document.getElementById('AllBtn');
    allBtn.addEventListener('click', ()=> {
        removeActive();
        allBtn.classList.add('active');
        loadAllTrees();
    })
    categories.forEach(category => {
        const catDiv = document.createElement('div');
        catDiv.innerHTML=`
            <button id="catBtn-${category.id}" onclick="loadPlants(${category.id})" class="CategoryBtn cursor-pointer py-3 pl-3 w-full text-left rounded-lg">${category.category_name}</button>
        `
        catContainer.appendChild(catDiv);
    });    
}

const manageSpinner = (status) => {
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('wholeSection').classList.add('hidden');
    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('wholeSection').classList.remove('hidden');
    }
}

const  LoadDetailsbyCat = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(details=> displayDetailsbyCat(details.plants));
}

const displayDetailsbyCat = (details) => {
    const detailsBox = document.getElementById('DetailsContainer')
    detailsBox.innerHTML = `
                        <div class="bg-white rounded-lg p-4">
                            <h2 class="font-bold text-2xl my-2 cursor-pointer">${details.name}</h2>
                            <img class="rounded-lg mb-2" src="${details.image}" alt="">
                            <div>
                                <h3 class="text-lg pt-2"><span class="font-semibold">Category: </span> ${details.category}</h3>
                                <p class="text-lg font-semibold py-1">Price: ৳${details.price}</p>
                                <p><span class="font-semibold text-lg">Description: </span> ${details.description}</p>
                            </div>
                        </div>

    `
    document.getElementById('plantModal').showModal();
}

const removeActive =()=>{
    const categoryBtn = document.querySelectorAll('.CategoryBtn');
    categoryBtn.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('inactive');
    })
}

const loadPlants = (id) => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
        const clickedBtn = document.getElementById(`catBtn-${id}`);
        removeActive();
        clickedBtn.classList.add('active');
        clickedBtn.classList.remove('inactive')
        displaybyCat(data.plants)
    });
}

const displaybyCat = (plants) => {
    const plantsCardsContainer = document.getElementById('CardsContainer');
    plantsCardsContainer.innerHTML='';
    plants.forEach(plant => {
        const shortDesc = plant.description.split(".")[0] + ". ...";
        const plantCard = document.createElement('div');
        plantCard.innerHTML =`
            <div class="bg-white rounded-lg p-4">
                            <img class="rounded-lg h-[333px] w-full" src="${plant.image}" alt="">
                            <div>
                                <h2 onclick="LoadDetailsbyCat(${plant.id})" class="font-semibold text-lg my-2 cursor-pointer">${plant.name}</h2>
                                <p>${shortDesc}</p>
                                <div class="flex justify-between items-center pt-3 pb-4">
                                    <span class="bg-[#DCFCE7] font-semibold text-[#15803D] px-4 py-1 rounded-3xl">${plant.category}</span>
                                    <p class="text-lg font-semibold">৳${plant.price}</p>
                                </div>
                                <button class="addToCartBtn bg-[#15803D] text-white text-lg py-3 w-full rounded-3xl hover:bg-emerald-600 cursor-pointer">Add to Cart</button>
                            </div>
                        </div>
        `
        plantsCardsContainer.appendChild(plantCard);
        plantCard.querySelector('.addToCartBtn').addEventListener('click', () => addToCart(plant));
    });  
    manageSpinner(false);
}

const  LoadDetailsAll = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(details=> displayDetailsAll(details.plants));
    
}

const displayDetailsAll = (details) => {
    const AlldetailsBox = document.getElementById('AllDetailsContainer');
    AlldetailsBox.innerHTML = `
        <div class="bg-white rounded-lg p-4">
           <h2 class="font-bold text-2xl my-2 cursor-pointer">${details.name}</h2>
            <img class="rounded-lg mb-2" src="${details.image}" alt="">
            <div>
                <h3 class="text-lg pt-2"><span class="font-semibold">Category: </span> ${details.category}</h3>
                <p class="text-lg font-semibold py-1">Price: ৳${details.price}</p>
                <p><span class="font-semibold text-lg">Description: </span> ${details.description}</p>
            </div>
        </div>
    `
    document.getElementById('AllplantModal').showModal();
}

const loadAllTrees = () => {
    manageSpinner(true);
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(plantsData => {
        const allTreesBtn = document.getElementById("AllBtn");
            removeActive();
            allTreesBtn.classList.add("active");
            allTreesBtn.classList.remove("inactive");
        displayAllPlants(plantsData.plants);
    })
}

const displayAllPlants =(plants) => {
    const plantsCardsContainer = document.getElementById('CardsContainer');
    plantsCardsContainer.innerHTML='';
    plants.forEach(plant => {
        const shortDesc = plant.description.split(".")[0] + ". ...";
        const plantCard = document.createElement('div');
        plantCard.innerHTML =`
            <div class="bg-white rounded-lg p-4">
                            <img class="rounded-lg h-[333px] w-full" src="${plant.image}" alt="">
                            <div>
                                <h2 onclick="LoadDetailsAll(${plant.id})" class="font-semibold text-lg my-2 cursor-pointer">${plant.name}</h2> 
                                <p>${shortDesc}</p>
                                <div class="flex justify-between items-center pt-3 pb-4">
                                    <span class="bg-[#DCFCE7] font-semibold text-[#15803D] px-4 py-1 rounded-3xl">${plant.category}</span>
                                    <p class="text-lg font-semibold">৳${plant.price}</p>
                                </div>
                                <button class="addToCartBtn bg-[#15803D] text-white text-lg py-3 w-full rounded-3xl hover:bg-emerald-600 cursor-pointer">Add to Cart</button>
                            </div>
                        </div>
        `
        plantsCardsContainer.appendChild(plantCard);
        plantCard.querySelector('.addToCartBtn').addEventListener('click', () => addToCart(plant));
    });
    manageSpinner(false);
}

let cart = [];
function addToCart(plant) {
    const existing = cart.find(item => item.id === plant.id);
    if(existing) {
        existing.quantity++;
    } else{
        cart.push({ ...plant, quantity: 1})
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML='';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList = "flex justify-between items-center bg-[#F0FDF4] p-2 my-1 rounded-lg";
        cartItem.innerHTML=`
                            <div>
                                <h1 class="font-semibold text-lg">${item.name}</h1>
                                <p class="text-[#879295]">
                                    ৳${item.price} x ${item.quantity}
                                </p>
                            </div>
                            <i class="fa-solid fa-xmark text-[#879295] cursor-pointer" onclick="removeFromCart(${item.id})"></i>
                        `;
            cartItemsContainer.appendChild(cartItem);
    });
    cartTotalEl.innerText =  `৳${total}`;
}

loadCategories();
loadAllTrees();












