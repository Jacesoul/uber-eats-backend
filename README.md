# Uber Eats

The Backend of Uber Eats Clone

## User Entity:

- id
- createdAt
- updatedAt

- email
- password
- role(client | owner | delivery)

## User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

## Restaurant Model

- name
- category
- address
- coverImage

## Restaurant CRUD:

- Edit Restaurant
- Delete Restaurant

- See Categories
- See Restaurants by Category (pagination)
- See Restaurants (pagination)
- Search Restaurant
- See Restaurant

- Create Dish
- Edit Dish
- Delete Dish

- Orders CRUD
- Orders Subscription :

  - s : subscribe | t : trigger
  - Pending Orders(Owner) (s: newOrder) (t: createOrder(newOrder))
  - Order Status(Client, Delivery, Owner) (s: orderUpdate) (t: editOrder(orderUpdate))
  - Pending Pickup Order(Delivery) (s: orderUpdate) (t: editOrder(orderUpdate))

- Payments(CRON)
