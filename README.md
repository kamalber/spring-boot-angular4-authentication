# springBoot-social-auth
this is the back end part of the java/spring challenge 

## What's inside 
This project is based on the [Spring Boot](http://projects.spring.io/spring-boot/) project and uses these packages :
- Maven
- Spring Core
- Spring Data (jpa/Hibernate & MySQL)
- Spring security
- Spring MVC (Tomcat)

## Installation 
The project is created with Maven, so you just need to import it to your IDE(Eclipse,..) and build the project to resolve the dependencies

## Database configuration 
Create a MySQL database with the name `springbootdb`and add the credentials to `/resources/application.properties`.  
The default ones are :

```
spring.datasource.driverClassName = com.mysql.jdbc.Driver
spring.datasource.url = jdbc:mysql://localhost/spring_auth
spring.datasource.username = root
spring.datasource.password = 
```
