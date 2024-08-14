# Technical guide to using this service

This service was built with one core design pattern in mind - Singleton Pattern. This means that most things (be it services, modules, configs e.t.c) use this pattern to interact with each other.

Modules also interact seamlessly with Nests Repository pattern and communicate with a postgres database.

## Database Initiation

Create an .env file in the project root directory and create the following variables inside it

```env
APP_PORT=
APP_VERSION=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USENAME=
DATEBASE_PASSWORD=
DATABASE_NAME=
DATABASE_TYPE=
ACCESS_TOKEN_SECRET=
PASSWORD_ENCRYPTION_SALT=
```

**Note:** Each variable should retain the exact naming inference as the system is expecting that exact naming in order to bootstrap itself. Keep in mind that the appropriate data types are postgres, mysql or as otherwise defined by the typeorm on the nestjs website

## Api Versioning

The core versioning control is based on the version defined on the .env file. The flow works as such:

1. .env defines the version
2. The module version loader grabs the created version number if it exists
3. The version loader loads all the modules inside the version folder

### What the heck does that mean?

Here's an example to further illustrate this --

If you create a user management module on version 1 of this microservice in the following folder

```bash
src/modules/{{CURRENT_VERSION}}/{{MODULE_FOLDER_NAME}}
```

Then you need to register this module in the module loader

```bash
src/modules/{{CURRENT_VERSION}}index.tsx
```

This module will then be automatically picked up by the version module loader and inserted into the app module without you needing to do any imports

### Starting up the project

The system requires some permissions to be able to function correctly. So here are the steps to initiation for this project

1. Run the service
2. Don't register yet
3. Seed the database
4. Create accounts

**_Why_**

It is crucial to seed the database as this populates all the necessary permissions needed to work with the system. Without it, the system will be unable to aid users in the policy creations

### Seeding the database

You don't need to do anything other than hit the seeding endpoint. The appropriate endpoint to hit for database seeding is

```bash
{{BASE_URL}}/permissions/create/defaults
```

### Account Creation

Once you have successfully seeded the database, you can proceed to create an account. There are currently 3 allowed account types - **_business_**, **_staff_**, **_user_**

**Business** - This indicates that this user is a business owner and that account will be the primary account hoisted with the super admin status for that business. Basically, this user can do everything involved in managing the business.

**Staff** - This indicates that the user belongs to an organization a.k.a a business and that this users permissions will have to be created by the super admin upon using the system. All created staff are outfitted (once they register or are created) with a view permission for the following - `orders, products and users`. You require an organization id in order to register a user as this kind of user

**User** - This indicates that the user belongs to no organization and is merely on the platform to do simple things like viewing products listed by the multitude of organizations and can create orders on said products. By default, this user is outfitted with the following permissions - `read:product`, `read:user`, `read:order`, `create:order` and `update:order`

### Permissions and Role Handling

There are currently 24 different default permissions based on actions that can be taken on the system

- Create Order
- Update Order
- Read Order
- Delete Order
- Create Product
- Update Product
- Delete Product
- Read Product
- Create User
- Update User
- Read User
- Delete User
- Create Role
- Read Role
- Update Role
- Delete Role
- Read permission

`The permissions below are only given to super admins`

- Create Permission
- Update Permission
- Delete Permission
- Create Organization
- Update Organization
- Read Organization
- Delete Organization

Each business has the ability to create roles that can mix and match any of the above stated permissions e.g

1. Business A creates a role called MODERATOR
2. Business A can attach permissions like - Create Product, Create User, View User, View Product
3. Business A can create a user called "Managing Director" and assign the role of ADMIN to said user

If and when any of the above happens, the user will effectively be able to login and also be able to use resources that fall under the purview of his/her permission scope

At any given time, **a super admin account can remove all these capabilities for the users in that role or create new roles to match the policies they would prefer for those users to have**

### Product Creation

Only users with the permission - `create:product` - can actively create products on the system and one other key requirement for this to be successful is for the user in question to have an attached organization as products are tied to organizations by default

This means:

- Customers can not create products
- Only approved staff can create products
- All super admins of their respective organizations can create products

### Permission Addition

If you need to create new permissions and add them to the available permissions list, you can do so via the route

```bash
{{BASE_URL}}/{{API_VERSION}}/permissions/add
```

**NOTE:** Only a system admin with user type `system` and `create:permission` permission can hit this endpoint successfully

### Order Creation

Orders can be created by customers and anyone else with the create:order permission. Each order can contain multiple products by which the order must be processed with. They can also contain only 1 product in the array and the service will work just fine.

An attached payload sample can be gotten for all endpoints via the swagger or the postman doc but for quick reference

```bash

{
    "address": "Some string",
    "products": [
        {
            id: number;
            price: number;
            quantity: number;
        }
    ]
}
```

If you don't adhere to this standard, the api will reject your request.

## Thanks

That basically covers what was done in this iteration
