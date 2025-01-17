//To send the msg to the backend--> we use a classprovided by JS (XMLHttpRequest)
//1st we generate an object using this class
const xhr = new XMLHttpRequest(); //It creates a newHTTP message to send to the backend (message = request)

//2 parameter:- (i)Event we want to listen for(we want to WAIT for), here we are waiting for xhr.response
//for response we use --> 'load', load mean responsehas loaded
//(ii) Function we want to run after this event has happend. Bcz, this function work after the response is loaded, so we gonna use xhr.response to see the response after it finally loaded.
xhr.addEventListener('load', () => {
 console.log(xhr.response); 
});

//To setup this request, here we give 2 parameter(Type of HTTP message, where to send this HTTP msg)
xhr.open('GET', 'https://supersimplebackend.dev');

//To send this message
xhr.send(); //asynchronous code---> Do not wait for this line to finish, it just send the request and then immediate go to the next line
//xhr.response; //intitally we get "undefine" as it takes time to get the response.
//So to get the response in this situation, we need to wait for the response to come back later and then access .response,,,,, in order to wait for the response to come back at the top after we created const xhr, we gonna use the EvenListner.
/*
 Types of HTTP message:-
 GET, POST, PUT, DELETE
 */

/*
AddEventListner--> here also we use brfore we use button.click()..

const button = document.querySelector('button');

button.addEventListner('click', () => {
	alert('Clicked');	
});

button.click();

For the above code--> we setup the evenListner first and then send the request xhr.send();
*/

/*
>> Status Code:-

>>	Starts with 4 or 5 (400, 404, 500) = failed [If starting with 4, it means our problem(like we send a request to a URL Path that is not supported), if it starting with 5 then that means its backend problem]

>> Starts 2(200, 201, 204) = succeeded
*/

//How many types of response can backend send--> simple text, JSON string(which we can later convert to object to send across internet), HTML and image