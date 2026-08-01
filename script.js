const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_lEmISJ9d03gsDjrkkfnN-mzp8CkOWgsaYw19Us_FEPiknlJvnL9DzWv_bYVCk5A98f6Qpp0m65Y0/pub?gid=0&single=true&output=csv";

let products = [];
let currentCategory = "All Products";
let searchTerm = "";


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


        if (!values) return null;


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

            <img 
                src="${imageUrl}" 
                alt="${product.Name}"
                onerror="this.style.display='none'"
            >

            <h2>${product.Name}</h2>

            <p>${product.Description}</p>

            <p class="category-label">
                ${product.Category}
            </p>

            <button>
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


// Start
loadProducts();
        let values = line
            .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
            ?.map(v => v.replace(/^"|"$/g, "").trim());


        let product = {};


        headers.forEach((header, index) => {

            product[header] = values?.[index] || "";

        });


        return product;
    });

}

// Create category buttons
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


// Display products
function displayProducts() {

    const productBox = document.getElementById("products");

    productBox.innerHTML = "";


    let filtered = products.filter(product => {

        return (
            product.Available === "TRUE" &&
            (
                currentCategory === "All Products" ||
                product.Category === currentCategory
            )
        );

    });


    filtered.forEach(product => {


        let card = document.createElement("div");

        card.className = "product-card";


card.innerHTML = `

    <img 
        src="${imageUrl}" 
        alt="${product.Name}"
        onerror="this.style.display='none'"
    >

    <h2>${product.Name}</h2>

    <p>${product.Description}</p>

    <p class="category-label">
        ${product.Category}
    </p>

    <button>
        Add to Bag
    </button>

`;


        productBox.appendChild(card);


    });

}

// Search products
document.getElementById("search").addEventListener("input", function() {

    let searchTerm = this.value.toLowerCase();


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


        let card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <img src="${product.Images}" alt="${product.Name}">

            <h2>${product.Name}</h2>

            <p>${product.Description}</p>

            <button>
                Add to Bag
            </button>

        `;


        productBox.appendChild(card);
        
let imageUrl = `images/${product.ID}-1.jpg`;

    });

});
function getImages(id) {

    let images = [];

    for (let i = 1; i <= 5; i++) {

        let image = `images/${id}-${i}.jpg`;

        images.push(image);

    }

    return images;

}

// Start website
loadProducts();
