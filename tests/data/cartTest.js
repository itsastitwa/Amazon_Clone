import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
		//To understand better, go for second "it statement" first.
		spyOn(localStorage, 'setItem');

		//Here first we have to setup cart(Bcz, we are adding existing product to cart).. So cart should already contain that product
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c',
				quantity: 1,
				deliveryOptionId: '1'
			}]);
		});

		loadFromStorage();  //RE-load the cart

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c');
		expect(cart.length).toEqual(1); //Here the product is same, hence length is 1 but quantity is 2.
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c'); 
		expect(cart[0].quantity).toEqual(2);

	});

	it('adds a new product to the cart', () =>{
		spyOn(localStorage, 'setItem'); //Now setItem() will be replaced with fake version. And now (Line 29 addToCart)this will no longer add this item 'e43638ce-6aa0-4b85-b27f-e1d07eb678c' to our localStorage(as it is just test case)

		spyOn(localStorage, 'getItem').and.callFake(() => {
			//Now we are actually overwritting the original getItem.., with the new one here
			//return []; // but localStorage only return string, that's why return JSON.stringify([]);
			return JSON.stringify([]); //return the empty array
		}); 
		//why we use spyOn---> GO DOWN(AT END OF CODE)
		
		loadFromStorage(); //So the thing is, previously we are not adding this Line 18....But the problem arise as Line 1 exporting cart(so cart is already exported and feeded), that's why spyOn function even after giving empty arry[] it didn't work as cart was alreay loaded(line 1)

		//To solve this problem:-
			//S1) In cart.js file:- we created a function loadFromStorage() and put all the cart ||the 'export let cart = JSON.parse()..........................................deliveryOptionId: '2' }]  } || into it
			//S2) we export this file after:=
			// First we load cart (Line 1)
			// Then we spyOn() to make it empty
			// Then on that empty array of cart--> we re-load the cart from loadFromStorage()

	  //And Now in our test when we add a product to an empty cart --> it will give us 1 (.toEqual(1))

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c');
		expect(cart.length).toEqual(1);


		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		//this will check how many times{localStorage.setItem} has been called
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c'); //checking is the first item(cart[0]) is actually what
		//we add or not.
		expect(cart[0].quantity).toEqual(1); //Is the quantity of cart is 1 or not
	});
});

//addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c');
//expect(cart.length).toEqual(1);  INITIALLY GIVING EROR WITHOUT spyOn()

/*Why spyOn() is use ? ----> The reason is "cart.js" file. As you can see in the cart.js file, that cart is loading from "localStorage".
And localStorage() works like, whatever you have stored in cart. If cart already has multiple items, then "toEqual(1)" will be false, even though we only wanted to check [when we use addToCart('productId') for single item, it should give length 1]. But localStorage changes everything.
That's why we use spyOn() on getItem to fake the localStorage(from where it is taking item)

>>
spyOn(localStorage, 'getItem').and.callFake(() => {
This will replace localStorage.getItem with FAKE version, and we can do this fake version any thing we want. To do that spyOn() gives us an object/property, and this object is "and"--> where it has a method called 'callFake(() => {....}); And inside the callFake we are gonna overwrite our getItem.

>> NOW EVEN THOUGH WE DID ALL THIS, BY MAKING OUR "CART EMPTY" BY MOCKING localStorage getItem..., but it still giving error (Why ??)
The reason is the order in which we have written the code... Look line 1 we import {cart} already..... that means even though we made our cart EMPTY in descibe() by using spyOn() , but still the cart is already LOADED.
ONE WAY TO SOLVE this:- After we mock the cart, we should re-load the cart [by using export func loadFromStorage]... We have shifted all the cart = JSON.parse........--> inside the loadFromStorage function... And by using this function we can re-load the cart.

1) Load the cart (line 1)
2) spyOn(getItem) to make cart empty.
3) loadFromStorage() //re-load this empty cart

>> A new problem arrive --> At addToCart() function in "cart.js" file. Line 46 saveToStorage() is used , which is saving from localStorage... But we don't want our test case to do any changes in localStorage, as it is just test case.
Now we have to mock setItem() as it is used in saveToStorage() [Line 64]

export function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

1) Load the cart (line 1)
2) spyOn(setItem) to make fake of setItem. (Line 68)
3) spyOn(getItem) to empty cart
3) loadFromStorage() //re-load this empty cart
4) addToCart("productId")--> here in cart.js file , inside addToCart() we are using saveToStorage(), which gonna even store the item(productId) we using in our testcase.... To avoid this, we are faking setItem()... So setItem() is replaced with fake version
	

*/