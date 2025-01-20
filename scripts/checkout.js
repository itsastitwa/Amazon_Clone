import { renderOrderSummary } from './checkout/orderSummary.js';

import { renderPaymentSummary } from './checkout/paymentSummary.js';

import { loadProducts, loadProductsFetch } from '../data/products.js';

import { loadCart } from '../data/cart.js'; //For Promsie.all() loadCart()
//Actually in loadCart we have https://supersimplebackend.dev/cart --> which give response of 'load cart' string.

// import '../data/cart-class.js';

// import '../data/backend-practice.js';



//Async wait :- even better way to handle asynchronous code. You can say that async await is a shortcut for promises(and remove all these extra codes).

//async = makes a function return a promise
//await = lets us wait for a promise to finish, before going to the next line. [lets us write asynchronous code like normal code]. 
/*
	function loadPage() {
		return new Promsie((resolve) => {
			console.log('load page');
			resolve('value2');
		});
	} //To make this whole code short--> we use async
*/
async function loadPage() {
	
	//loadProductsFetch() = fetch() code returns a promise
	await loadProductsFetch(); //await gives us another way to finish this promise, instead of using .then(), we are gonna add 'await'

	//async await can only be used with promises, not with callbacks.
	//loadCart() = XHR code XMLHttpRequest()
	await new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});

	renderOrderSummary();
	renderPaymentSummary();

	//return 'value2'; //Like we did in promise--> And this value is gonna be saved in a parameter in the next-step 'then(value)'.
}

loadPage();

/*
>>And because this returns a promise, we can add a "next step" to the promise
loadPage().then((value) => {
	console.log('next step');
	console.log(value);
});

>>One more feature:-
	await new Promise((resolve) => {
		loadCart(() => {
			resolve('value3');
		});
	}).then((value) => {
		//Here we know resolve('value3') is saved in this(parameter).
	});

	== However in await, this(value) just get return and we can save it in a variable like this-
	const var = await new Promise((resolve) => {
					loadCart(() => {
						resolve('value3');
					})
				})
	And this makes our code a lot easier to read.
*/



/*
//Array of Promises
Promise.all([
	loadProductsFetch(),
	new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	})

]).then(() => {
	renderOrderSummary();
	renderPaymentSummary();
});
*/



/*
//Array of Promises
Promise.all([
	new Promise((resolve) => {
		loadProducts(() => {
			resolve(); 
		});
	}),
	new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	})

]).then(() => {
	renderOrderSummary();
	renderPaymentSummary();
});
*/ 



/*
new Promise((resolve) => {
	loadProducts(() => {
		resolve('value1'); //After asynchronous code runs completely--> resolve() will make the code to go to next-step.
	});

}).then((value) => {
	console.log(value); //resolve share value in-between resolve('value1') and 'then(value)'; //value == value1

	return new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});

}).then(() => {
	renderOrderSummary();
	renderPaymentSummary();
});

//Here we are seprating promises like first loadProducts() will load and then in new promise loadCart() will load. To make it efficient and run at the same time, we can use Promise.all()
*/



/*
loadProducts(() => {
	loadCart(() => {
		renderOrderSummary();
		renderPaymentSummary();
	});
	//Problem with callbacks:- Multiple callbacks cause a lot of nesting(code inside code inside code....). The problem is each layer of nesting(code) add some indent at the front(or spaces at the front). Means If we have lots of callbacks, our code will become more and more nested.

	//But in case of Promise:- it flatten the code.
	new Promise((resolve) => {
		loadProducts(() => {
			resolve();
		});
	}).then(() => {
		return new Promise((resolve) => {
			loadCart(() => {
				resolve();
			});
		});
	}).then(() => {
		renderOrderSummary();
		renderPaymentSummary();
	});
	and so on... [It flatten the code]
}); //loadProducts(fun); After the products is loaded--> It will gonna use renderOrder and renderPayment
*/


/* 
Promises(is a Class)
	-better way to handle asynchronous code.
	-similar to done() function of jasmine.
	-let us wait for some code to finish, before going to the next step.

	new Promise((resolve) => {
		Resolve function
			-similar to done() function
			-let us control when to go to next step
	})
*/