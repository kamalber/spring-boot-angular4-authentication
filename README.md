# springBoot-social-auth
 - spring boot & angular 4 application , this is the back end layer of the app using spring boot 
 - you cant get the front end part from here : https://github.com/kamalber/AngularSocialAuth
## idea of the app 
 - simple user registration / secure authentication
 - it link your facebook account to load your albums photos
## What's inside 
This project is based on the [Spring Boot](http://projects.spring.io/spring-boot/) project and uses these packages :
- Maven
- Spring Core
- Spring Data (jpa/Hibernate & MySQL)
- Spring security
- Spring MVC (Tomcat)
- Junit4

## Installation 
The project is created with Maven, so you just need to import it to your IDE(Eclipse,..) and build the project to resolve the dependencies

## Database configuration 
Create a MySQL database with the name `spring_auth`and add the credentials to `/resources/application.properties`.  
The default ones are :

```
spring.datasource.driverClassName = com.mysql.jdbc.Driver
spring.datasource.url = jdbc:mysql://localhost/spring_auth
spring.datasource.username = root
spring.datasource.password = 
```
