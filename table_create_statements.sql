show databases;
use openHome;
show tables;

-- creating table userProfile  
create table userProfile(user_id varchar(50) primary key, first_name varchar(20),
 last_name varchar(30),phone_number varchar(20), role varchar(20));

-- creating table address
create table address(address_id int(20) primary key, street varchar(30), city varchar(15), state varchar(20), zip int(10));

-- creating table parking
create table parking(parking_id int(20) primary key, available boolean, 
paid boolean, daily_fee float(10));

-- creating table property
create table property(property_id int(30) primary key, owner_id varchar(50), sharing_type varchar(30),
 description varchar(100), type varchar(50), area float(10), bedrooms int(10), images varchar(50), 
 priv_bath boolean, priv_shower boolean, weekend_rent float(10), weekday_rent float(10), address_id int(20), 
 parking_id int(20), booked boolean, checked_in boolean,
 foreign key(owner_id) references userProfile(user_id), 
 foreign key(address_id) references address(address_id), 
 foreign key(parking_id) references parking(parking_id));


-- creating table availability
create table availability(property_id int(30),mon boolean,tue boolean, wed boolean,
thurs boolean, fri boolean, sat boolean, sun boolean, always_available boolean,
foreign key(property_id) references property(property_id));

-- creating table booking
create table booking(property_id int(30), owner_id varchar(50),
user_id varchar(50), booked_price float(10), start_date datetime,end_date datetime,
foreign key(owner_id) references userProfile(user_id),
foreign key(user_id) references userProfile(user_id));

-- drop commands for the respective tables 
drop table userProfile;
drop table property;
drop table address; 
drop table parking;
drop table booking;
drop table availability;