// Coffee: price_1LnUTFDM1jwCEz8OGoOSXiSM
// Sunglasses: price_1LnUTxDM1jwCEz8OAqHYTwKQ
// Camera: price_1LnUUoDM1jwCEz8OvxIcJ7to

const productsArray = [
    {
        id: "price_1N2hGKSDWIdOcoieqDwghiK2",
        title: "tp",
        price: 10
    },
    {
        id: "price_1N1xyNSDWIdOcoieDGXsub6U",
        title: "Pro",
        price: 99
    },
    {
        id: "price_1N1y0kSDWIdOcoieayJKdt4n",
        title: "Premium",
        price: 199
    }
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };