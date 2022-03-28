# Uber Eats

The Backend of Uber Eats Clone

## Directory Structure

```bash
├── src
│ ├── auth
│ │ ├── auth-user.decorator.ts
│ │ ├── auth.guard.ts
│ │ ├── auth.module.ts
│ │ └── role.decorator.ts
│ ├── common
│ │ ├── dtos
│ │ │ ├── output.dto.ts
│ │ │ └── pagination.dto.ts
│ │ ├── entities
│ │ │ └── core.entity.ts
│ │ ├── common.constants.ts
│ │ └── common.module.ts
│ ├── jwt
│ │ ├── jwt.interfaces.ts
│ │ ├── jwt.middleware.ts
│ │ ├── jwt.module.ts
│ │ ├── jwt.service.ts
│ │ └── jwt.service.spec.ts
│ ├── mail
│ │ ├── mail.interfaces.ts
│ │ ├── mail.module.ts
│ │ ├── mail.service.ts
│ │ └── mail.service.spec.ts
│ ├── orders
│ │ ├── dtos
│ │ │ ├── create-order.dto.ts
│ │ │ ├── edit-order.dto.ts
│ │ │ ├── get-order.dto.ts
│ │ │ ├── get-orders.dto.ts
│ │ │ ├── order-updates.dto.ts
│ │ │ └── take-order.dto.ts
│ │ ├── entities
│ │ │ ├── order-item.entity.ts
│ │ │ └── order.entity.ts
│ │ ├── order.resolver.ts
│ │ ├── order.service.ts
│ │ └── orders.module.ts
│ ├── payments
│ │ ├── dtos
│ │ │ ├── create-payment.dto.ts
│ │ │ └── get-payment.dto.ts
│ │ ├── entities
│ │ │ └── payment.entity.ts
│ │ ├── payment.resolver.ts
│ │ ├── payment.service.ts
│ │ └── payments.module.ts
│ ├── restaurants
│ │ ├── dtos
│ │ │ ├── all-categories.dto.ts
│ │ │ ├── category.dto.ts
│ │ │ ├── create-dish.dto.ts
│ │ │ ├── create-restaurant.dto.ts
│ │ │ ├── delete-dish.dto.ts
│ │ │ ├── delete-restaurant.dto.ts
│ │ │ ├── edit-dish.dto.ts
│ │ │ ├── edit-restaurant.dto.ts
│ │ │ ├── restaurant.dto.ts
│ │ │ ├── restaurants.dto.ts
│ │ │ └── search-restaurant.dto.ts
│ │ ├── entities
│ │ │ ├── category.entity.ts
│ │ │ ├── dish.entity.ts
│ │ │ └── restaurant.entity.ts
│ │ ├── repositories
│ │ │ └── category.repository.ts
│ │ ├── restaurants.resolver.ts
│ │ ├── restaurants.service.ts
│ │ └── restaurants.module.ts
│ ├── users
│ │ ├── dtos
│ │ │ ├── create-account.dto.ts
│ │ │ ├── edit-profile.dto.ts
│ │ │ ├── login.dto.ts
│ │ │ ├── user-profile.dto.ts
│ │ │ └── verify-email.dto.ts
│ │ ├── entities
│ │ │ ├── user.entity.ts
│ │ │ └── verification.entity.ts
│ │ ├── repositories
│ │ │ └── category.repository.ts
│ │ ├── user.resolver.ts
│ │ ├── user.service.ts
│ │ ├── user.service.spec.ts
│ │ └── user.module.ts
│ ├── app.module.ts
│ └── main.ts
├── test
│ ├── jest-e2e.json
│ └── users.e2e-spec.ts
├── description.txt
├── package.json
└── README.md
```

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

  - Pending Orders(Owner) (s: newOrder) (t: createOrder(newOrder))
  - Order Status(Client, Delivery, Owner) (s: orderUpdate) (t: editOrder(orderUpdate))
  - Pending Pickup Order(Delivery) (s: orderUpdate) (t: editOrder(orderUpdate))
  - s : subscribe | t : trigger

- Payments(CRON)
