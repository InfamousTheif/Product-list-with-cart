# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

```js
// I learnt that the reduce method squashes all the values in an array to a single value.
let amountSum = 0; // the total number of products ordered
amountSum = itemAmount.reduce((acc, currentVal) => acc + currentVal, 0);
```

### Continued development

- Container queries
- Style queries
- CSS animations
- JS in general

### Useful resources

- [MDN](https://developer.mozilla.org/en-US/) - The go to for web dev documentation
- [Google](https://www.google.com/) - self explanatory

### AI Collaboration

I used GPT and google's search AI to explain jargon from MDN's docs, and to look look for alternatives to any of my solutions, and compare them.


## Author

- Website - [Product with list cart](https://infamoustheif.github.io/Product-list-with-cart/)
- Frontend Mentor - [@InfamousTheif](https://www.frontendmentor.io/profile/InfamousTheif)

## Acknowledgments

- Myself
