# MedSpoke Rails Challenge

## Description

This project is a Rails application allowing users to query for nice pictures that they would like to use in their own app. The core idea is to reuse publicly available Image APIs to curate our own amazing collection of images - and serve them to our users.

This is not a production project, and it's used for purpose of interviewing. Please read everything carefully before starting challenges, as below we will explain in detail how to run the project, what's expected and how to submit the results.

## Getting Started

### Requirements

You need to have following tools installed:

- rails 5.2.3
- ruby 2.5.1
- graphql
- postgresql

### Development

1. Clone the project
2. Install all required technologies
3. Install dependencies: ```gem install bundler && bundle install```
4. Setup database: ```bundle exec rails db:setup```
5. Start the server: ```bundle exec rails s```

*If you using `GraphiQL app` for testing be sure to rather run the server using `rails s -b 127.0.0.1 -p 3000` otherwise you'll see the error in app*

## Challenges

1. Currently `GetImages` query returns all images in the database. That's not really scalable, so let's add a pagination.
  * By default, query should simply return first 10 images
  * It should take `page` and `perPage` params which would respectively change current page and page size
  * The response should include `totalCached` field which would inform users about number of Images that we currently have in our database

2. We've already got mutations for creating both Images and Authors via our own API, but they're missing option to bind Author with Image. Let's fix that:
  * Edit mutations `CreateImage` and `UpdateImage` to allow adding new or assigning existing Author for given Image
  * Add tests for both mutations

3. When adding a test during previous challenge, you've probably realized that one of the developers left some of the tests failing. Shame on him! But no hurt feelings, let's help him by fixing the tests :)

4. Our collection of images is unfortunately quite small, but we can use external APIs to fix that! Let's implement lazy loading of images from Unsplash API:
  * Whenever user queries for images, we return whatever we currently have in our database
  * If we don't have enough images to fulfill user's query:
    * We make a call to Unsplash API (https://unsplash.com/documentation#list-photos)
    * We save additional images in our own database *along with author and source information* (make sure we don't duplicate any images)
  * We return all requested images from our database to the user

5. *[BONUS]* Lazy loading of Images is cool, but after some time we will end up with a lot of images, so it will be hard to browse them through. We also would like to get rid of images that are not really liked by the users. Please add an upvoting & cleanup system which would work as following:
  * It should save original number of likes for every image when it's being grabbed from the source (Unsplash)
  * It should have mutation which allows our own users to upvote images
  * It should have a background task which would be run once a week and delete all photos that were not upvoted at least 1 time

## Additional Information

### Tools

Usefull tools for development:

- [GraphiQL app](https://electronjs.org/apps/graphiql) (we highly recommend to use this GUI for editing and testing GraphQL queries and mutations )
- [Postman app](https://www.getpostman.com/downloads/)

### Unsplash API

Resolving challenges will required using Unsplash API to get some image data. In order to use their API please sign up and register a new app:

- Sign up at [unsplash.com](https://unsplash.com/)
- Create [new application](https://unsplash.com/oauth/applications)
- Copy your Access Key. You'll need it for sending the requests
- Check out the [API documentation](https://unsplash.com/documentation#schema), You will need only Public Actions

Please be aware that Unsplash API has limitation of [50 requests per hour](https://unsplash.com/documentation#rate-limiting). If you're having trouble with the limit, you can consider using some mock solution to overcome it.

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