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
catalogs of books, authors and events. The book catalog can be filtered by book themes and
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
This layer uses two Amazon Web Services: AWS API Gateway and AWS Lambda. The first one manages the HTTP endpoints
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

The services are exposed through a RESTful API. Web services, built using this architecture, 
allow the requesting systems to access and manipulate textual representations of web resources 
by using a uniform and pre-defined set of stateless operations.

This software architectural style is very popular when software engineers have to design and develope web services.
It is based on an client-server architecture and it suits very well with the serverless architecture we
decided to adopt. The main reasons we decided to use this architecture are:
- **Statelessness**: The client-server communication is constrained by no client context being stored on the server between requests. Each request from any client contains all the information necessary to service the request, and the session state is held in the client.
- **Cacheability**: Clients and intermediaries can cache responses. This property improves server performance and user experience
(when a data has already been retrieved, there is no need for the server to send it again to the client)
- **Popularity**: This property is not related to technical details about the architecture, but it is one of the reason we choose it.
Since it is very used in IT world, this architectural design pattern is well documented (so it is easy to use and do troubleshooting) and supported
(there are many libraries and frameworks that can simplify backend communication).

The web application follows all the principles of a REST architecture and it extends it by adding some query parameter in the
request URI in order to allow server to filter data that clients are not interested on.
#### OpenAPI Resource models

The resources specified in the OPENAPI are the following ones:
- **User** (*username*, password, name, surname)
- **Book** (*isbn*, title, description, price, authorId, themeId, genreId)
- **Author** (*id*, name, surname)
- **Event** (*id*, name, location, time, bookId)
- **Theme** (*name*, description)
- **Genre** (*name*, description)
- **Cart** (*username*, *isbn*, quantity, price)

### Data model
![Alt text](documentation/images/er_hypermedia.png?raw=true "Architecture")
## Implementation
### Tools used
In this section we will present the tools, the languages and the frameworks we used in order
to develope and deploy the backend of the application.

We decided to use AWS technologies in order to develope our application: in particular we opted to use
 the serveless-type services. We will briefly describe what are these services, why we choose them
and how we used them.

#### Serverless architecture.
Before introducing the AWS services we used, we'd like to spend two words on the serverless architecture.
Serverless is a cloud computing execution model where the cloud provider dynamically manages the allocation and provisioning of servers. 
A serverless application runs in stateless compute containers that are event-triggered, ephemeral (may last for one invocation), 
and fully managed by the cloud provider.
Its main advantages is that it suits very well for small and medium size project since it is a pay-as-you-go service, it is horizontally scalable
and there is no need to design and manage the infrastructure.

#### Amazon S3
Amazon S3, as we already said in the 'web architecture' section is an unstructured data storage service that offers 
industry-leading scalability, data availability, security, and performance.
It can be used to store and protect any amount of data for a range of use cases, 
such as websites, mobile applications, backup, as a data lake and etc.

We use this service to store the static content of the data. We configured this service in order to
allow all people to access this service (by default it is a private cloud storage, like Dropbox).
It is also configured with some particular header in order to allow the resources to be cached.

#### AWS API Gateway

#### AWS Lambda

#### Amazon DynamoDB

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
