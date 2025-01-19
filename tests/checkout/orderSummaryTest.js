import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
//Our tests are failing--> bcz, now we are loading products from the backend. So we have to loadProducts here too for renderOrderSummary() in beforeEach
import { loadProducts, loadProductsFetch } from "../../data/products.js";

//2 things to test
describe('test suite: renderOrderSummary', () => {
	const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
	const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'; //declared outside of all functions--> so that can use in every function

	/*
	//We will loadProducts once beforeAll our tests
	beforeAll((done) => {
		loadProducts(() => {
			done();
		}); //It didn't work as backend takes time to get response... That's why our product array is still empty.
		// As we know loadProducts() is asynchronous function--> It will not wait for response to come(and directly go on next line for execution)--> To solve that jasmine has a 'done'--> which will wait till the function is executed completeley to go for next line
	});
	*/

	beforeAll((done) => {
		loadProductsFetch().then(() =>{
			done();
		});
	});

	//beforEach hook function ---> it will run this function before each of our test
	beforeEach(() => {
		//here we gonna write the whole set-up code--> which will be used by both the function
		spyOn(localStorage, 'setItem'); //why mock setItem ---> Go Line 106

		//jasmine ---> tests.html Line 27 ('js-test-container')
		document.querySelector('.js-test-container').innerHTML = ` 
			<div class="js-order-summary"></div>  
			<div class="js-payment-summary"></div>
		`; // Line 119 orderSummary.js file ("js-order-summary")

		//As in orderSummar.js file, in Line no. 13 you can see the cart is used, which is loaded from localStorage which can create problem(hence use mock, like you did in cartTest.js)

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: productId1,
				quantity: 2,
				deliveryOptionId: '1'
			}, {
				productId: productId2,
				quantity: 1,
				deliveryOptionId: '2'
			}]);
		});

		loadFromStorage();  //Re-load the cart

		renderOrderSummary(); //It will show how cart looks on screen without CSS
	});
	
	//1. How the page looks

	it('displays the cart', () => {

		//For each product of the cart, we have created 'js-cart-item-container', Here it should be equal to 2
		expect (
			document.querySelectorAll('.js-cart-item-container').length  // Line 33 orderSummar.js file
		).toEqual(2);

		expect (
			document.querySelector(`.js-product-quantity-${productId1}`).innerText //Line 51 orderSummary.js
		).toContain('Quantity: 2'); // Here we use innerText, bcz we just need quantity 2 not innerHTML whole; inside the 'js-product-quantity class we have "update-quantity-link", "delete-quantity-link"..., but we just need 'Quantity; that is why we use new property of 'expect' which is 'contain'---> to see is there any thing linke Quantity: 2

		expect (
			document.querySelector(`.js-product-quantity-${productId2}`).innerText 
		).toContain('Quantity: 1');


		//Now after the test passed:- Our page looks bad as at top there are multiple line of HTML and then we have Jasmine test 
		//box--> which says it passed....
		//So, now we are gonna remove the HTML--> by making it empty string ''.

		document.querySelector('.js-test-container').innerHTML = '';
	});

	//2. How the page behaves
	//(For example, in this page we can click the delete-link to remove a product from the page)

	it('removes a product', ()=> {
		document.querySelector(`.js-delete-link-${productId1}`).click();

		expect (
			document.querySelectorAll('.js-cart-item-container').length
		).toEqual(1);

		expect(
			document.querySelector(`.js-cart-item-container-${productId1}`)
		).toEqual(null); // As we have deleted this product

		expect(
			document.querySelector(`.js-cart-item-container-${productId2}`)
		).not.toEqual(null); //.not will check the opposite of whatever is next (here it will check opp fo NULL)
		

		//After deleting, IS the cart arry updated ? (We have to import the cart)

		expect (cart.length).toEqual(1);
		expect (cart[0].productId).toEqual(productId2);

		document.querySelector('.js-test-container').innerHTML = ''; //To remove HTML from page after succesfully completing the test

	});
});

/*
Line 55 --> need ? When we create Line 77, error is occuring in orderSummary.js file Line 133[renderPayemntSummary()], 
As when we try to delete it just not affect the delete but the payement is also affected, as both are connected.
If you see paymentSummary.js file--> after we generate HTML, we try to put the HTML in element with class'.js-payement-summary[Line 58]
And this element does not exist in our test, so one way to fix this is to add this element in the test
*/

/*
why spyOn setItem for 'remove a product' ?
when we did :- document.querySelector(`.js-delete-link-${productId1}`).click(); in the .js-delete-link class , there is also 
'removeFromCart' function used (orderSummary.js Line 126)----> Now if we go deeper into the function at 'cart.js file' where we have
removeFromCart function, we can clearly see that there is 'saveToStorage()' function (at Line 61).... 
And we don't want our test to do any changes or save the things we did with our test..., that is why we mock localStorage setItem
	export function saveToStorage() {
		localStorage.setItem('cart', JSON.stringify(cart));
	} 
*/