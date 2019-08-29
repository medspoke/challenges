# MedSpoke Rails Challenge

## Description
This branch includes boilerplate for your challenge so feel free to clone it, set it up, run `rails db:seed` and you are ready!

## Project
- rails 5.2.3
- ruby 2.5.1
- graphql

## Tools
- [GraphiQL app](https://electronjs.org/apps/graphiql) (we highly recommend to use this GUI for editing and testing GraphQL queries and mutations )
- [Postman app](https://www.getpostman.com/downloads/)

**If you use `GraphiQL app` for testing be sure to run the server using `rails s -b 127.0.0.1 -p 3000` otherwise you'll see the error in app*

1 challenge
----
The first challenge for you is to get images data from Unsplash API.

First of all please sign up and register new app 
- sign up at [unsplash.com](https://unsplash.com/)
- create [new application](https://unsplash.com/oauth/applications)
- Copy your Access Key. You'll need it for sending the requests
- Check out the [API documentation](https://unsplash.com/documentation#schema). You will need only Public Actions
- Unsplash API has limitation of [50 requests per hour](https://unsplash.com/documentation#rate-limiting). 
If you reach the limit you can simply create another application and use second Access Key

Now you are ready to start coding!

--------

- create resolver which sends the request to [search endpoint](https://unsplash.com/documentation#search-photos) with `query`, `page` and `per_page` arguments
- use `HTTParty` gem for sending requests to Unsplash API
- it should return the same response as below(be sure you are returning exact response fields)

#### Query
```
query UnsplashImages {
  unsplashImages(query: "nature", page: 1, perPage: 5) {
    total
    totalPages
    results {
      id
      description
      height
      width
      urls {
        raw
        small
        thumb
      }
      user {
        id
        name
        username
        firstName
        lastName
      }
      createdAt
    }
  }
}
```

#### Response

```
{
  "data": {
    "unsplashImages": {
      "total": 247916,
      "totalPages": 49584,
      "results": [
        {
          "id": "cssvEZacHvQ",
          "description": "Bridge over a green waterfall",
          "height": 6000,
          "width": 4000,
          "urls": {
            "raw": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "small": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "thumb": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ"
          },
          "user": {
            "id": "8xWqhQl506k",
            "name": "Blake Richard Verdoorn",
            "username": "blakeverdoorn",
            "firstName": "Blake Richard",
            "lastName": "Verdoorn"
          },
          "createdAt": "2015-05-31T11:42:52-04:00"
        },
        {
          "id": "4rDCa5hBlCs",
          "description": "Looking up",
          "height": 5473,
          "width": 3654,
          "urls": {
            "raw": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "small": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "thumb": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ"
          },
          "user": {
            "id": "q3J4y6ukHWk",
            "name": "Casey Horner",
            "username": "mischievous_penguins",
            "firstName": "Casey",
            "lastName": "Horner"
          },
          "createdAt": "2017-12-21T01:05:50-05:00"
        },
        {
          "id": "oR0uERTVyD0",
          "description": null,
          "height": 4673,
          "width": 2626,
          "urls": {
            "raw": "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "small": "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "thumb": "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ"
          },
          "user": {
            "id": "2am9AbdXmss",
            "name": "Shifaaz shamoon",
            "username": "sotti",
            "firstName": "Shifaaz",
            "lastName": "shamoon"
          },
          "createdAt": "2018-10-22T07:07:04-04:00"
        },
        {
          "id": "eOpewngf68w",
          "description": "Whangarei Falls footbridge",
          "height": 3648,
          "width": 5472,
          "urls": {
            "raw": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "small": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "thumb": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ"
          },
          "user": {
            "id": "-tFuGwqXda0",
            "name": "Tim Swaan",
            "username": "timswaanphotography",
            "firstName": "Tim",
            "lastName": "Swaan"
          },
          "createdAt": "2015-11-17T04:37:46-05:00"
        },
        {
          "id": "tGTVxeOr_Rs",
          "description": "This is the first photo I am uploading to unsplash.com - I’ve been taking photos actively for the last 15 years, and despite having a vast collection of thousands of images from all parts of the world, I have never really sold any. I love the idea of sharing free images for those who cannot afford to pay for them. I also believe that those who can afford to pay for a photo, and appreciate the efforts of a photographer will be happy to compensate the photographer when they use one for commercial purposes. Here is a free image of a tree - if you use it, please follow my Instagram @niko.photos :)",
          "height": 2494,
          "width": 3741,
          "urls": {
            "raw": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "small": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
            "thumb": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ"
          },
          "user": {
            "id": "CIwKmxLlgQc",
            "name": "niko photos",
            "username": "niko_photos",
            "firstName": "niko",
            "lastName": "photos"
          },
          "createdAt": "2017-08-07T01:17:24-04:00"
        }
      ]
    }
  }
}
```

------

- create resolver which sends the request to [get a photo endpoint](https://unsplash.com/documentation#get-a-photo) with `id` argument
- use `HTTParty` gem for sending requests to Unsplash API
- it should return the same response as below(be sure you are returning exact response fields)

### Query

```
query UnsplashImage {
  unsplashImage(id: "cssvEZacHvQ") {
    id
    description
    height
    width
    urls {
      raw
      small
      thumb
    }
    user {
      id
      name
      username
      firstName
      lastName
    }
    createdAt
  }
}

```

### Response
```
{
  "data": {
    "unsplashImage": {
      "id": "cssvEZacHvQ",
      "description": "Bridge over a green waterfall",
      "height": 6000,
      "width": 4000,
      "urls": {
        "raw": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
        "small": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ",
        "thumb": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjg4OTg3fQ"
      },
      "user": {
        "id": "8xWqhQl506k",
        "name": "Blake Richard Verdoorn",
        "username": "blakeverdoorn",
        "firstName": "Blake Richard",
        "lastName": "Verdoorn"
      },
      "createdAt": "2015-05-31T11:42:52-04:00"
    }
  }
}
```
2 challenge
-----
Try to load the collection of Posts along with authors data. If you see any problems with this request try to improve it.


### Query

```
query Posts {
  posts {
    id
    title
    body
    author {
      id
      email
      fullName
    }
  }
}

```

3 challenge
-----
TODO