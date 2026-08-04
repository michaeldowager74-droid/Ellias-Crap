const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_lEmISJ9d03gsDjrkkfnN-mzp8CkOWgsaYw19Us_FEPiknlJvnL9DzWv_bYVCk5A98f6Qpp0m65Y0/pub?gid=0&single=true&output=csv";

let products = [];
let currentCategory = "All Products";
let searchTerm = "";
let bag = [];


// Load products
async function loadProducts() {

    const response = await fetch(SHEET_URL);

    const data = await response.text();

    products = parseCSV(data);

    displayCategories();

    displayProducts();

}


// Parse CSV
function parseCSV(csv) {

    let lines = csv.split(/\r?\n/).filter(line => line.trim() !== "");

    let headers = lines[0]
        .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
        .map(h => h.replace(/^"|"$/g, "").trim());


    return lines.slice(1).map(line => {

        let values = line
            .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
            ?.map(v => v.replace(/^"|"$/g, "").trim());


        if (!values) {
            return null;
        }


        let product = {};


        headers.forEach((header, index) => {

            product[header] = values[index] || "";

        });


        return product;


    }).filter(product => product !== null);

}

// Categories
function displayCategories() {

    const categoryBox = document.getElementById("categories");

    let categories = [
        "All Products",
        ...new Set(products.map(product => product.Category))
    ];


    categoryBox.innerHTML = "";


    categories.forEach(category => {

        let button = document.createElement("button");

        button.className = "category";

        button.textContent = category;


        button.onclick = () => {

            currentCategory = category;

            displayProducts();

        };


        categoryBox.appendChild(button);

    });

}


// Products
function displayProducts() {

    const productBox = document.getElementById("products");

    productBox.innerHTML = "";


    let filtered = products.filter(product => {

        let matchesCategory =
            currentCategory === "All Products" ||
            product.Category === currentCategory;


        let matchesSearch =
            product.Name.toLowerCase().includes(searchTerm) ||
            product.Description.toLowerCase().includes(searchTerm) ||
            product.Category.toLowerCase().includes(searchTerm);


        return (
            product.Available === "TRUE" &&
            matchesCategory &&
            matchesSearch
        );

    });


    filtered.forEach(product => {

        let imageUrl = `images/${product.ID}-1.jpg`;


        let card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            card.innerHTML = `

    <img
        src="${imageUrl}"
        alt="${product.Name}"
        data-id="${product.ID}"
        data-image="1"
        onclick="nextImage(this)"
        onerror="this.style.display='none'"
    >
            
<div class="image-dots" id="dots-${product.ID}">
    <span class="active-dot"></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
            
    <h2>${product.Name}</h2>

    <p>${product.Description}</p>

    <p class="category-label">
        ${product.Category}
    </p>

    <button onclick="addToBag('${product.ID}')">
        Add to Bag
    </button>

`;

            <h2>${product.Name}</h2>

            <p>${product.Description}</p>

            <p class="category-label">
                ${product.Category}
            </p>

           <button onclick="addToBag('${product.ID}')">
    Add to Bag
</button>

        `;


        productBox.appendChild(card);

    });

}


// Search
document.getElementById("search").addEventListener("input", function() {

    searchTerm = this.value.toLowerCase();

    displayProducts();

});

function addToBag(id) {

    let product = products.find(item => item.ID === id);

    if (!bag.includes(product)) {

        bag.push(product);

    }

    updateBag();

}


function removeFromBag(id) {

    bag = bag.filter(item => item.ID !== id);

    updateBag();

}


function updateBag() {

    const bagButton = document.querySelector(".bag");

    bagButton.textContent = `🛍️ Bag (${bag.length})`;

}
function openBag() {

    const bagWindow = document.getElementById("bag-window");
    const bagItems = document.getElementById("bag-items");

    bagWindow.style.display = "block";

    bagItems.innerHTML = "";


    if (bag.length === 0) {

        bagItems.innerHTML = "<p>Your bag is empty.</p>";

        return;

    }


    bag.forEach(product => {

        let item = document.createElement("div");

        item.innerHTML = `

            <p>
                ${product.Name}

                <button onclick="removeFromBag('${product.ID}')">
                    Remove
                </button>
            </p>

        `;

        bagItems.appendChild(item);

    });

}

function nextImage(img) {

    const id = img.dataset.id;
    let current = Number(img.dataset.image);
    let next = current + 1;

    const test = new Image();

    test.onload = function () {

        img.src = `images/${id}-${next}.jpg`;
        img.dataset.image = next;
         updateDots(id, next);
        
    };

    test.onerror = function () {

        img.src = `images/${id}-1.jpg`;
        img.dataset.image = 1;
         updateDots(id, 1);
      
    };

    test.src = `images/${id}-${next}.jpg`;

}

function updateDots(id, active) {

    const dots = document.querySelectorAll(`#dots-${id} span`);

    dots.forEach((dot, index) => {

        dot.classList.remove("active-dot");

        if (index === active - 1) {

            dot.classList.add("active-dot");

        }

    });

}

// Start
loadProducts();
        
