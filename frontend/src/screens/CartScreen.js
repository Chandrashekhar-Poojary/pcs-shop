/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/newline-after-import */
/* eslint-disable arrow-body-style */
import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";
const addToCart = ( item, forceUpdate = false)=>{
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        if(forceUpdate){
            cartItems = cartItems.map((x) => 
            x.product === existItem.product ? item : x);
        }
    }
    else{
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems); // update local storage
    if(forceUpdate){
        rerender(CartScreen);
    }

};
// item remove from the shopping cart
const removeFromCart = (id) =>{
    setCartItems(getCartItems().filter(x => x.product !== id));
    if(id === parseRequestUrl().id){
        document.location.hash = '/cart';
    }else{
        rerender(CartScreen);
    }
};

const CartScreen = {
    after_render: () => {

        // increase qty
        const qtySelects = document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach( qtySelect =>{
            qtySelect.addEventListener('change',(e) =>{
                const item = getCartItems().find((x) => x.product === qtySelect.id);
                addToCart({...item, qty: Number(e.target.value)}, true)
            });
        });

        // delete product from the cart
        const deleteButtons = document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach(deleteButton =>{
            deleteButton.addEventListener('click',() =>{
                removeFromCart(deleteButton.id);
            });
        });
        document.getElementById('checkout-button').addEventListener('click', () => {
            document.location.hash = '/signin';
        });
    },
    render: async () =>{
        const request = parseRequestUrl();
        if(request.id){
            const product = await getProduct(request.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            });
        }
        const cartItems = getCartItems();
        return `
        
        <div class="content cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <h3>Price</h3>
                    </li>
                    ${
                        cartItems.length === 0
                        ? '<div><h1>Cart is Empty.</h1> <h3><a class="reshop" href="/#/">Click Here To Shopping Again</a></h3></div>':
                        cartItems.map(item => `
                            <li>
                                <div class="cart-image">
                                    <img src="${item.image}" alt="${item.name}"/>
                                </div>
                                <div class="cart-name">
                                    <div>
                                        <a href="/#/product/${item.product}">
                                            ${item.name}
                                        </a>
                                    </div>
                                    <div>
                                        Qty: <select class="qty-select" id="${item.product}">
                                                ${
                                                    [...Array(item.countInStock).keys()].map(x => item.qty === x+1?
                                                        `<option selected value="${x+1}">${x+1}</option>`: 
                                                        `<option value="${x+1}">${x+1}</option>` 
                                                    )
                                                }
                                            </select>
                                            <button type="button" class="delete-button" id="${item.product}">Delete</button>
                                    </div>
                                </div>
                                <div class="cart-price">
                                    &#x20B9;${item.price}
                                </div>
                            </li>
                        `).join('\n')
                    }
                </ul>
            </div>
            <div class="cart-action">
                    <h3>
                        SubTotal (${cartItems.reduce((a, c) =>
                                a + c.qty, 0)} items)
                                : 
                                &#x20B9;${cartItems.reduce((a, c)=>
                                    a + c.price*c.qty, 0)}
                    </h3>
                    <button id="checkout-button" class="primary fw">
                        Proceed to Checkout
                    </button>
            </div>
        </div>
        `;
    },
};
export default CartScreen;
