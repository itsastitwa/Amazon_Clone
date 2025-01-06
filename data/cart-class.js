class Cart{
	//export let cart = undefined; //this is equal to export let cart;
	//cartItems = undefined; === cartItems;
	cartItems;
	#localStorageKey; //making localStorageKey Private(#) so that it can't be changed by anyone

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.#loadFromStorage();
	}

	//Making loadFromStorage a private method(#), so that it can't be used outside
	#loadFromStorage() { //created this loadFromStorage extra function to use in cartTest.js in Jasmine
		//initially Line 1 is:- export let cart = JSON.parse(localStorage.getItem('cart'));
		this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); //using this.cartItems instead of cart.cartItems--> bcz, if we change the name of the object const cart = {...} (the whole inside function will not work[as it is named as cart.carItems, previous name])
	
		if (!this.cartItems) {
			this.cartItems = [{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptionId: '1'
			}, {
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptionId: '2'
			}]; 
		}
	}

	saveToStorage() {
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
	}

	addToCart(productId) {
		let matchingItem;
	
		this.cartItems.forEach((cartItem) => {
			if(productId === cartItem.productId){
				matchingItem = cartItem;
			}
		});
	
		if(matchingItem){
			matchingItem.quantity += 1;
		} else {
			this.cartItems.push({
				productId: productId,
				quantity: 1,
				deliveryOptionId: '1'
			});
		}
	
		this.saveToStorage(); //to access savetToStorage() func, we have to use this. inside object
	
	}

	removeFromCart(productId) {
		const newCart = [];
	
		this.cartItems.forEach((cartItem) => {
			if(cartItem.productId != productId){
				newCart.push(cartItem);
			}
		});
	
		this.cartItems = newCart; //After removing that cart element, we have to update our new cart to original cart
	
		this.saveToStorage();
	}

	updateDeliveryOption(productId, deliveryOptionId){
		let matchingItem;
	
		this.cartItems.forEach((cartItem) => {
			if(productId === cartItem.productId){
				matchingItem = cartItem;
			}
		});
	
		matchingItem.deliveryOptionId = deliveryOptionId;
	
		this.saveToStorage();
	}
}

//To access class we use 'new' 
const cart = new Cart('cart-oop'); //'cart-oop' is for constructor
const businessCart = new Cart('cart-business');
//After class created --> constructor is called

//Now let's try to access private(#) localStorageKey outside the class
//cart.#localStorageKey = 'test'; //We go SyntaxError

console.log(cart);
console.log(businessCart); 

//Each object that we generate from a class is called 'instance'--> To check
console.log(businessCart instanceof Cart); //will give us True as Output



