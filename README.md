# MedSpoke React Challenge

## Description

This project is a React application allowing users to query for nice pictures, upvote them and download. The core idea is to build the app where user can find and download any picture he wants, with user-friendly UI and good UX.

This is not a production project, and it's used for purpose of interviewing. Please read everything carefully before starting challenges, as below we will explain in detail how to run the project, what's expected and how to submit the results.

## Getting Started

### Installation
1. Clone the project
2. Install all required technologies using `yarn`
3. Use `yarn start` to run the server on http://localhost:8080/

### Design
- The designs you can find on [invisionapp](https://projects.invisionapp.com/share/6MV1HI4PG45#/395487958_image_List)

### Resetting the API data
- API includes the `resetDatabase` mutation for cleaning the db up. So if you need to remove all the data from db due to testing or something else you can simply send the request on this endpoint.

### LIMITATIONS
- We use UNSPLASH API for loading images data to our local database. If our local images is not enough for getting the response of the query it will load missing images from UNSPLASH API(for example you have 100 images in db but you are requesting 3 page with 50 images per page. So it will load 50 images more from UNSPLASH API).
 Pay attention that UNSPLASH API has limitations of 50 requests per hour and it returns error if the limitation is reached.

## Challenges
1. There is a search bar but it works with a bug. Let's make it work this way:
   - it should send the request when the input loses the focus or user didn't type anything for the last 3 seconds
   - if user deletes search it should immediately send the request to get all the images
2. Currently user can see only 10 images. We need to lazy load images on scroll by sending the request to API when list is finished.
3. User wants to upvote the image he likes. Let's add the button to like / unlike image and number of likes below each image. Make sure you are displaying total likes
4. Every image can be 3 types - raw, small and thumb:
   - Currently it displays raw image in the Image card. If raw image size is missed it should display the image in one of other available sizes.
   - Let's add a button which opens dropdown with the list of available image sizes. When user selects the size of the image it should download the image of selected size.
5. In the top bar you can see `Welcome, stranger` text. Let's create a fake authentication process:
   - Fake login window should be opened when user tries to add a picture or update the picture data, but he is not logged in yet. “Logging in” is just a mock - save username to the redux and display it in the top bar.
   - After user is logged in, the text is changed to `Welcome, *username*` and there is an additional button for logging out.
6. Please add the dropdown with authors to create and edit forms so the user can select the author of the image from our API.
7. The code in Images create/edit forms are almost the same. Can you DRY it somehow?
8. Implement error handling system:
   - it should handle and display validation errors in the forms
   - it should catch the network or other unexpected errors and redirect to 'error page' where user can see some hints how to solve the error(simple text with instructions how to clean up the cache/reload page/contact our support team if problem persists)
   - the error should be displayed when something goes wrong(e.x. images can’t be loaded, image can’t be saved, etc)
9. Color themes:
   - everybody likes the dark theme, right? Not really :) Let's add the color theme switcher and put it somewhere in the top bar so the user can switch to the light theme.
   - the switcher should change the color of top bar and background to the light one and back

## Additional Information
### Tools

Useful tools for development:

- [GraphiQL app](https://electronjs.org/apps/graphiql) (we highly recommend to use this GUI for editing and testing GraphQL queries and mutations )
- [Postman app](https://www.getpostman.com/downloads/)

Please, feel free to use any of the libraries/tools you want and refactor the code when you feel it's done in inappropriate way. You can even change the structure of the project if you want!
## Summary

### What are we looking for?

**Clarity** - We are looking for a code than can be understood right away by every developer in the team

**Simplicity** - We prefer to start from simple, easily-extendable solutions instead of building complex constructions that will never be used

**Attention to detail** - Try to think of all possible real-world use cases to prevent number of bugs and improve user exeperience once feature goes live

### Rules

* We prefer fully-baked, correct solutions that will make our engineer souls happy, so please take your time - there is no strict time limit

* At the same time please don't overdo it - if your solution does what is required, and you're happy with it, most probably we will be too

* Communicating with other developers during the challenge is *strictly forbidden* - we would love to know your personal skills, and don't worry if you can't solve some tasks - nobody knows everything!

* Submit the challenges via [git format-patch](https://git-scm.com/docs/git-format-patch) to our development team (dev@medspoke.com)

### What happens after submission?

Once you submit your solution to us via `git format-patch`, our dev team will review the code. It might take us up to 1 week to get back to you with some feedback. If your solution is accepted, we will invite you for a next step of the recruitment process.

## Have a great time coding, and we're looking forward for your submission!

![force](https://media.giphy.com/media/l49JHz7kJvl6MCj3G/giphy.gif)
