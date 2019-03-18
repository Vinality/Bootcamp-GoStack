# Bootcamp-GoStack
6-Week long, intensive bootcamp provided by Rocketseat with the intent of learning the stack:

<strong>NodeJS</strong>

<strong>React</strong>

<strong>React Native</strong>

# Table of Contents:
1. [Node.js](#NodeJS)
   * [Introduction](#Module1)
   * [Nunjucks](#Module2)
   * [REST API](#Module3)
   * [AdonisJS](#Module4)
2. [ReactJS](#ReactJS)
   * [Introduction](#Module1React)
   * [Consuming GitHub API](#Module2React)
   * [Flux Architecture with Redux](#Module3React)
3. [React Native](#ReactNative)
   * [Introduction](#Module1RN)
   * [Consuming GitHub API](#Module2RN)
   * [Flux Architecture with Redux](#Module3RN)
 
      
# NodeJS
## Module 1 - Introduction <a name="Module1"></a>
This module consists of learning basic NodeJS concepts using Express and Nunjuck to build HTTP routes and Middlewares.

What I learned:
* Introduction to Node.js
* Introduction to the MVC architecture
* Introduction to Nunjucks template language for views
* Passing data to views

### Exercise
The exercise consisted of developing an application which receives an age value and redirects the user to a different route depending on the input value.

## Module 2 - Nunjucks <a name="Module2"></a>
This second module consists of building a appointment scheduling application for a barber shop in which users can register as both barbers or clients and schedule an appointment with a barber.

What I learned:
* User authentication
* User sessions
* Template Language (Nunjucks)
* Redirecting routes
* Password encryption
* Sequelize ORM for PostgreSQL
* Moment for date management

### Exercise
The exercise for module 2 consisted on adding a schedule list feature in which barber accounts could check their appointments on any day.

## Module 3 - REST API <a name="Module3"></a>
In the third module we built a marketplace REST API where users can list items for sale and buy items.

What I learned:
* User auth/sessions
* JWT Auth
* REST API
* Mongoose ORM for MongoDB
* Query filters
* Express handlebars
* Environment Variables
* Sentry.io

### Exercise 
In this exercise we had to add a feature to the API where a vendor could create an offer on an ad, followed by the buyer accepting the offer. The ad should, then, be updated as sold and should no longer show up on the listings (since it is now marked as sold).

## Module 4 - AdonisJS Framework <a name="Module4"></a>
In the fourth module we learned about the Node framework AdonisJS and its functionalities to quickly setup user auth, models and controllers

What I learned:
* AdonisJS routing
* JWT Auth
* File Upload
* Postgres relational modelling within Adonis
* Docker for db containing
* Adonis Validators
* Redis and Kue for Jobs

### Exercise
The exercise for the fourth module consisted on building a REST API in Adonis to schedule appointments and showing them for the specific users that created them. 

# ReactJS <a name="ReactJS"></a>
## Module 1 - Introduction <a name="Module1React"></a>
The first module on ReactJS served as an introduction to the framework, presenting the fundamental concepts of React.

What I learned:
* Webpack, JSX and Babel transpilation
* Component syntax
* Props and Children
* State and Immutability
* Lifecycle methods  

### Exercise
The exercise for the first module consisted on building a simple Facebook-like UI with 3 components: Header, Post and the Post Header. This exercises helped on understanding how to pass data through the components.

## Module 2 - GitHub Compare app <a name="Module2React"></a>
Module 2 consisted on building an application to pull data from the Github API and display repository info through a component. 

What I learned:
* Passing data through components
* Managing component state
* Styled components addon
* MomentJS for date manipulation
* Flash Messages
* Rendering a component conditionally
* Local storage saving/parsing JSON
* Font Awesome addon

### Exercise
The exercise consisted on adding two features to the application: removing/updating a repository on display.

## Module 3 - Flux Architecture <a name="Module3React"></a>
Module 3 introducted the React-Redux Saga architecture, building a simple application to gather data from the GitHub API and save favorites on the page. This was done through Sagas and Reducers.

What I learned:
* Redux interface
* Using Reactotron as debug tool
* Redux Reducers and Actions
* Redux Sagas
* Duck Patterns

### Exercise
The exercise consisted on building from scratch an application, using Redux Sagas and the MapGL, to pull data from the GitHub API and position markers for developers on the map.

# React Native <a name="ReactNative"></a>
## Module 1 - Introduction <a name="Module1RN"></a>
Module 1 of React Native introducted the environment for mobile development such as the XCode iPhone simulator and the setup of a react-native application. The application we built is a simple and static interface for a Post component.

What I learned:
* XCode simulator setup
* react-native commands to initialize an application
* React Native components (View, Text, etc)
* Flexbox

## Module 2 - GitHub Issues <a name="Module2RN"></a>
The second module of React Native consisted on building an application to list a GitHub user's repositories and display their README
  
What I learned:
* React Native navigation and routes
* Using the AsyncStorage component
* ActivityIndicator and FlatList components

### Exercise
The exercise for this module consisted on building an application for scratch to dynamically add repositories to a list and upon clicking them, displaying a list of clickable issues that link to the actual issue on the web browser.

## Module 3 - Flux Architecture on React Native <a name="Module3RN"></a>
The third module consisted on converting the application made in the previous module to the Flux Architecture employing Redux.

What I learned: 
* Flux Architecture with Redux
* Store
* Actions
* Sagas
* Reactotron for Debugging







