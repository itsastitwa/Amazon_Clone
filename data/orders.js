//SAVE THE ORDER

//Let's create an array to conatain all of our orders
export const orders = JSON.parse(localStorage.getItem('orders') || '[]'); //parse --> to convert string back to array.
//Now in the beginning we're not going to have any orders save into the localStorage. So default value will be empty array by using OR(||) '[]'.

//Let's create a function for adding an order to this array.
export function addOrder(order) {
  //Now for orders we usually want the 'most recent order at the top'. So, we're gonna add this order to the front of the array.
	orders.unshift(order); //So, this will add the order to the front of the array.
	saveToStorage();
}

//Finally let's save our orders into localStorage
function saveToStorage() {
	localStorage.setItem('orders', JSON.stringify(orders)); //loaclStorage.setItem(key(name of the item you want to store(in string)), value in string)
}