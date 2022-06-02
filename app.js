const url = 'https://course-api.com/javascript-store-products'

const productsDOM = document.querySelector('.products-center');

const fetchProducts = async () => {
    productsDOM.innerHTML = `<div class="loading"></div>`
    try {
        const resp = await fetch(url)
        const data = await resp.json();
        console.log(data);
        return data;
    } catch (error) {   
        productsDOM.innerHTML = `<p class="error">there was an error</p>`
    }
}


const displayProducts = (list) => {
    const productList = list.map((product)=> {
        const {id, fields:{name, price}} = product;
        const {url: img} = product.fields.image[0]
        const formatPrice = price/100
        // const {url: img} = product.fields.image[0]
        return `
        <a href="product.html?id=${id}" key=${id} class="single-product">
                <img src=${img} alt=${name} class="single-product-img img"/>
                <footer>
                <h5 class="name">${name}</h5>
                <span class="price">${formatPrice}</span>
                </footer>
            </a>
        
        `
    }).join('')
    productsDOM.innerHTML = `<div class="products-container">${productList}</div>`
}

const start = async () => {
    const data = await fetchProducts()
    displayProducts(data)
}

start()