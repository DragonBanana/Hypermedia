# Documentation of the Backend part
> Deliverable D1
## General group information
| Member n. | Role| First name | Last Name | Matricola | Email address|
| --------- | ------------- | ---------- | --------- | --------- | --------------- |
| 1 | administrator | Ibrahim | El Shemy | 920174 | ibrahim.elshemy@mail.polimi.it |
| 2 | member | Marco | Gasperini | 847650 | marco1.gasperini@mail.polimi.it |
| 3 | member | Davide Yi Xian | Hu | 919754 | davideyi.hu@mail.polimi.it |
## Links to other deliverables
- Deliverable D0: the web application is accessible at
[this address](http://book-boutique-static.s3-website-eu-west-1.amazonaws.com/index.html).
- Deliverable D2: the YAML or JSON file containing the specification of the app
API can be found at [this address](https://example.com/backend/spec.yaml).
- Deliverable D3: the SwaggerUI page of the same API is available at
[this address](https://app.swaggerhub.com/apis/DragonBanana/book_boutique/1.0.0).
- Deliverable D4: the source code of D0 is available as a zip file at
[this address](https://example.com/backend/app.zip).
- Deliverable D5: the address of the online source control repository is
available [this address](https://github.com/Ibriaco/Hypermedia). We hereby declare that this is a private repository and, upon request, we will give access to the
instructors.
## Specification
### Web Architecture
![Alt text](documentation/images/hypermedia_architecture.png?raw=true "Architecture")

#### Presentation Layer
The presentation layer is the topmost level of the application. It is the layer
which users can use to access directly to this project features. It is
an e-commerce web application of a bookstore that is accessible from personal computers and
smartphones. Exploring the website a user can see
a catalog of books, authors and events. The book catalog can be filtered by book themes and
genres and it allow users to add books to the cart.

The presentation layer, as most of the frontend application, uses technologies like HTML, CSS5 and Javascript.
It also implements external libraries such as Bootstrap, Google Maps and Slick (an image slider library).

The static content of the frontend can be retrieved from an Amazon Web Service: Amazon S3.
This service, known also as Simple Storage Service, is an unstructured data storage service that offers 
industry-leading scalability, data availability, security, and performance.

#### Application Layer
The application layer is pulled out from the presentation tier and,
as its own layer, it provides all the logical services such as user registration and authentication,
retrieving book, author and event catalogs, easy and basic catalogs filtering and cart management.

The protocol used in order to offer those features is REST and the data exchanged between
clients and servers are in JSON format.

This layer uses two Amazon Web Service: AWS API Gateway and AWS Lambda. The first one manages the HTTP endpoints
that accept the requests. The second one, written using NodeJS, implements the logical features of the application.

#### Data Layer
The data layer encapsulates the persistence mechanisms and exposes the data. In
particular, this layer is used to store data regarding books, events, authors,
users and cart items.

The data layer uses AWS DynamoDB, a key-value and document database
 that delivers single-digit millisecond performance at any scale.
It's not a SQL database and so it has pros, such as good scaling and performance, but
it does not have an important property like the ACID one (Atomicity, Consistency, Isolation, Durability).

### API
#### REST compliance
Describe here to what extent did you follow REST principles and what are the
reasons for which you might have decided to diverge. Note, you must not describe
the whole API here, just the design decisions.
#### OpenAPI Resource models
Describe here synthetically, which models you have introduced for resources.
### Data model
Describe with an ER diagram the model used in the data layer of your web
application. How these map to the OpenAPI data model?
## Implementation
### Tools used
Describe here which tools, languages and frameworks did you use for the backend
of the application.
### Discussion
Describe here:
- How did you make sure your web application adheres to the provided OpenAPI
specification?
- Why do you think your web application adheres to common practices to partition
the web application (static assets vs. application data)
- Describe synthetically why and how did you manage session state, what are the
state change triggering actions (e.g., POST to login etc..).
- Which technology did you use (relational or a no-SQL database) for managing
the data model?
## Other information
### Task assignment
Describe here how development tasks have been subdivided among members of the
group, e.g.:
- Foo worked on front end (80%) and OpenAPI Spec (20% of the time)
- Bar worked on ....
### Analysis of existing API
4Describe here if you have found relevant APIs that have inspired the OpenAPI
specification and why (at least two).
### Learning outcome
What was the most important thing all the members have learned while developing
this part of the project, what questions remained unanswered, how you will use
what you ' ve learned in your everyday life?
Examples:
- Foo learned to write SQL queries and Javascript but wanted to know more about
caching, he ' s probably going to create his own startup with what she has
learned
- Bar learned how to deploy on a cloud platform, he would have liked to know
more about promises for asynchronous code..
