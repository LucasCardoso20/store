const productDOM = document.querySelector('.product')
const url = 'https://course-api.com/javascript-store-single-product'

const fetchProduct = async () => {
    try {
        productDOM.innerHTML = '<h4 class="product-loading">Loading...</h4>'
        
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id')
        console.log(id);
        
        const response = await fetch(`${url}?id=${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        productDOM.innerHTML = '<p class="error">There was a problem loading the product. Please try again later.</p>'
    }
    
}

const displayProducts = (product) => {
    console.log(product);
    const {fields:{name, price, company, description, colors}} = product;
    const {url: img} = product.fields.image[0]
    document.title = name.toUpperCase()

    const colorsList = colors.map((color)=> {
        return `<span class="product-color" style="background: ${color}"></span>`
    }).join('')
    
    productDOM.innerHTML = `
    <div class="product-wrapper">
        <img src=${img} class="img" alt=""/>
        <div class="product-info">
            <h3>${name}</h3>
            <h5>${company}</h5>
            <span>${price}</span>
            <div class="colors">
                ${colorsList}
            </div>
            <p>${description}</p>
            <button class="btn">add to cart</button>
        </div>
    </div>
    `
}

const start = async () => {
    const data = await fetchProduct()
    displayProducts(data)
}

start()