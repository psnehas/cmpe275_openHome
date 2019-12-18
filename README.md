# cmpe275_openHome

Requirements file: https://docs.google.com/document/d/1rOctIX2Gr5QnzoDl3ahkj1DG14O8d_c7THceBA5Lb0s/edit

# Project Report Team 6

 
|Team Member|Student ID|
|-----------|------------|
|Arman Pathan|013771082|
|Nikhil Limaye|013007644|
|Shravani Pande|013849264|
|Sneha|013850174|

## App URL : 
http://ec2-52-53-166-161.us-west-1.compute.amazonaws.com:3000
 
## Build instructions on local –

 ### Frontend:
Step 1:cd cmpe275_openHome
Step 2:cd frontend
Step 3:npm install
Step 4:npm start

 ### Backend:
 Using Terminal:
 ----------------
 Step 1: cd cmpe275_openHome
 Step 2: cd backend/spring-jpa-mysql/src/main/java/com/testproject/springsecurityjpamysql
 Step 3: javac SpringSecurityJpaMysqlApplication.java


 Using IDE:
 ------------
 Step 1: Open cmpe275_openHome/backend in Eclipse IDE
 Step 2: Navigate to: 
 spring-jpa-mysql/src/main/java/com/testproject/springsecurityjpamysql
 Step 3: Run SpringSecurityJpaMysqlApplication.java

## Introduction:
-----------------
OpenHome is a REST based rental marketplace where a user can register either as an owner or as a guest. The owner has the privilege to list his property by providing details like amenities supported, weekday/weekend rent, parking facility details and charges if applicable. In addition, the owner can post multiple images of the property to attract customers and use them as advertising aid to popularize the property. At any point of time, the owner is capable of editing the property details or cancelling the property availability with a cancellation penalty. While the owner has the above benefits, the guest can select to be a permanent member of the application by registering or choose to use the application as a one-time booking service by signing in using Google OAuth or Facebook login. Irrespective of the login platform, the guest gets the flexibility to view and book a property of interest for the required number of days. He can check-in, check-out at any desired time with late check-in penalties applied. Once the reservation is made, the guest is notified of the reservation with an email notification providing details of the reservation. Reservation check-in and cancellations are also supported with notifications.

## Technologies Used and Architecture diagram: 
The architecture of the application comprises of 3 major sections –
1.  	Presentation Layer: Developed using ReactJS, Bootstrap and Firebase. Deployed on an AWS EC2 instance listening on port 3000. The user can carry out all functionalities using this user interface.

2.  	Business Logic Layer: The backend business logic has been implemented using the Spring Boot framework. Spring REST controllers have been set up for each resource such as User profile, Properties, Reservations, etc. The backend has been integrated with the database layer using the Spring Data framework specifically the JpaRepository. This API reduces a considerable amount of boiler plate code required to handle database transactions. Uses Object Relational Mapping of the Hibernate framework. The backend codebase can be categorized:
a.  	Models – Entities to be mapped with the database
b.  	Repository – JPA repository interfaces for each model to carry out database transactions
c.   Resources – REST Controllers to handle HTTP requests from the front end
d.  	Services – Mediator classes between Resource classes and the Data Repository classes.

3.  	Database Layer: A MySQL database has been used hosted using Amazon RDS. Listening on port 3306. Code has been written using JPA annotations with the underlying Hibernate engine and the Spring Data API.

## ARCHITECTURE DIAGRAM
## DATABASE ENTITY DIAGRAM
## Final Application WorkFlow:
------------------------------
## OWNER ACTIVITIES:
### 1. New Owner sign-up:
Any user who signs up with the SJSU email ID is considered as an Owner. At sign-up, the owner has to provide his First Name, Last Name, Password, email ID, 10 digit phone number. He is also asked to enter is card details at signup as a required information. 
### 2. Login:
An owner can login with his email ID and password. He is navigated to the “Host Your Property” page.
### 3. Host a Property:
A host creates a new property by giving various property details such as property description, address, availability, type of property, Internet and parking availability, daily parking fees if available, rent for weekdays and weekends.
### 4. Email Notification:
The owner receives a confirmation email on his email ID once the property is posted successfully.
### 5. Owner’s Dashboard:
Owner can view all his properties on his dashboard. He can view the properties hosted by him and the properties which are currently reserved and the ones reserved in the past.
### 6. Edit an already reserved property:
An owner can edit a property once posted. He can change the daily availability, weekday and weekend rents, parking and internet availability, etc. A property can also be edited even after a guest has reserved the property or has checked in to the property.
### 7. Email notification to the Owner - new Property booked
## GUEST ACTIVITIES:
### 1. New User Sign-up:
A guest can sign up with Google, Facebook or a personal email ID . At sign-up, the owner has to provide his First Name, Last Name, Password, email ID, 10 digit phone number. He is also asked to enter is card details at signup as a required information.
### 2. Login:
A guest can login with his email ID and password. He is navigated to the Home page where he can search a property. 
### 3. Enter search fields:
Guest enters the desired city, start date and end date to search for a property. He is navigated to a search results page where he can view all the properties matching his search criteria.
### 4. Apply filters:
A guest can filter the properties according to Sharing type, Property Type, Price range and Internet availability.
### 5. View Property Details:
A guest selects “Details” option for a property he wishes to view. A guest can book the property here.
### 6. Book Property:
A guest enters the start date and end date for his reservation. He is not allowed to select dates which are a year later than the current date. If the property has parking available, the guest has the provision to book or not book the parking. A guest can view his estimated rent before booking the property is booked.
### 7. Email Notification:
Guest receives an email confirmation about the property booked by him.
### 8. Guest’s Dashboard:
Guest can view all his currently reserved properties on his dashboard. He can also view his past reservations. A guest can check-in, check-out or cancel his reservation with the respective options provided for the current reservations.
### 9. Check-in to the Property:
A guest checks in to the property. He can only check-in on the day of his reservation. (not before 3 PM)
### 10. Credit card charged notification on Check-In:
Guest’s credit card is charged with the estimated amount (the amount is calculated when the user books the property). He is notified about the deductions via email.
## CUSTOM APPLICATION CLOCK:
### Testing plan executed and results:
As a part of application testing, we have conducted manual test cases during the development phase as well as after the complete integration. Following are the test scenarios tests and the test results obtained.

## Lessons learned: 
The project was an end to end application that tested programming skills both on the display UI and using Spring REST services. Having only the academic exposure to spring, it was a first time application development for the team using all the services that Spring has to offer. 

1. Resources mapping with the database was a tedious task as we had to create another class naming strategy to map table names used in the database with the source listed in the API services.
2. Mapping API calls to respective controllers was challenging.
3. Google OAuth and Facebook implementation was relatively new task for the team.
4. Implementation of time advancement functionality throughout the application was complex.

## Future Scope:
In order to enhance our existing application and provide a future scope to it, we propose the following functionalities:
1. A direct communication can be established between the owner and the guest by adding contact the owner/chatbox for every property.
2. A favourite list for property “add property to favourites” can be implemented to enhance guest experience with the application.
3. Provide the guest with ability to rate and review the property.
4. Sync the property location with google maps to provide real-time view of the property.
5. Utilize guest booking history to make property recommendations for future bookings.
6. Use the guest's current location to recommend nearby properties.
