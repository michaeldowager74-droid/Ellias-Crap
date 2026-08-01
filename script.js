const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_lEmISJ9d03gsDjrkkfnN-mzp8CkOWgsaYw19Us_FEPiknlJvnL9DzWv_bYVCk5A98f6Qpp0m65Y0/pub?gid=0&single=true&output=csv";

let products = [];

let currentCategory = "All Products";


// Load products from Google Sheet
async function loadProducts() {

    const response = await fetch(SHEET_URL);

    const data = await response.text();

    products = parseCSV(data);

    displayCategories();

    displayProducts();

}


// Convert CSV text into objects
function parseCSV(csv) {

    const rows = csv.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

    let lines = csv.split(/\r?\n/);

    let headers = lines[0]
        .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
        .map(h => h.replace(/^"|"$/g, "").trim());


    return lines.slice(1).map(line => {

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

            <img src="${product.Images}" alt="${product.Name}">

            <h2>${product.Name}</h2>

            <p>${product.Description}</p>

            <button>
                Add to Bag
            </button>

        `;


        productBox.appendChild(card);


    });

}


// Start website
loadProducts();
