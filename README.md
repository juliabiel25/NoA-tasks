# Task 2

For the second task, I'd like to present two of my react projects listed below. 

As a preface I'd like to say that even though I do think one of them is more robust - it is not perfect by any means and there surely are things I would change, 
were I to pick it back up right now.

## [The fake store app](https://github.com/juliabiel25/fake-store) 
This is the more polished app I'd like to present, although the idea behind it is rather simple.
In it's core design, it is a simple API data fetching app - information about products are fetched from an [API](https://fakestoreapi.com/) endpoint and are then displayed on the main page.
The products can be viewed in more detail on a separate page view, filtered by their respective categories and added or remove to/from cart.
It's a single page application using a react router for page navigation purposes.

### The good
- the project accounts for long API response time with loading animations
- responsive design

### The bad
- the project is not using typescript - something I now deem to be very helpful and would likely make the project more scalable.

### Plans for future improvements
- Proper checkout handling - this project was initially developped as a frontend app for a simple nodejs API I had the chance to implement. After switching to a free public API for presentation purposes, that functionality couldn't really be repurposed in the same form because of implementation differences. Therefore there is still more improvements to come in this department, even though it's likely going to come down to sending a POST request and properly handling the API response.
- Handling the cart state with the backend rather than the frontend - as of right now the state of the cart is handled using react state, which is not ideal for an online store. Not only is the data lost on page refresh but it also doesn't account for products going out of stock once a product is added to the cart all the way until a checkout operation is attempted. 


## [The date selection component](https://github.com/juliabiel25/scheduling-app)
This component in itself is a part of a bigger project I continuously work on in my free time. 

Ultimatlely, it is supposed to allow for easy date-time range selections for any kind of schedule creation, where you assign different sets of time slots to a number of selected days.
As of right now, only the date selection part has been implemented.

## The good
- The date assignment seems to work according to the initial design. 


## The bad
- The biggest issue I've stumbled upon with this project so far is likely the prop drilling. I end up passing quite a lot of information down the component tree with no real use in any of the middleware components, which makes the code much less readable. This is something I know can be fixed with Redux or the react context API but I'm not yet sure if it's the best solution for my (rather small) use case so I'm still at the research stage. 
- 

