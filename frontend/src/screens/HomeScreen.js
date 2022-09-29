/* eslint-disable no-underscore-dangle */
/* eslint-disable import/newline-after-import */

import { getProducts } from "../api";
import Rating from "../components/Rating";
import { parseRequestUrl } from "../utils";
const HomeScreen = {
    render: async () =>{

        const { value } = parseRequestUrl();
        const products = await getProducts({ searchKeyword: value });
        if (products.error) {
            return `<div class="error">${products.error}</div>`;
        }
        return `
        <ul class="products">
            ${products.map(
                (product) =>`
                <li>
                    <div class="product">
                        <a href="/#/product/${product._id}">
                            <img src="${product.image}" alt="${product.name}"/>
                        </a>
                    
                        <div class="product-name">
                            <a href="/#/product/1">
                                ${product.name}
                            </a>
                        </div>
                        <div class="product-rating">
                            ${Rating.render({
                                value: product.rating, 
                                text: `${product.numReviews} reviews`,
                            })}
                        </div>

                        <div class="product-brand">
                            ${product.brand}
                       <!-- <div class="product-price">-->
                           <h3 class="product-price"> &#x20B9;${product.price}</h3>
                        </div>
                    </div>
                </li>
            `
            ).join('\n')}
        `;
    },
};

export default HomeScreen;