# t3-ecomm

Basic e-commerce website created with the T3 stack.

## Features

- Fetch all registered items from DB and display in home page
- Add items to cart
- Cart content is consistent (Cookie)
- Basic CRUD actions for each item

## Stack

- Prisma (ORM)
- SQLite (DB)
- Next TS (SSR)
- Tailwind CSS (Styling)

## How to use

    git clone https://github.com/catneep/t3-ecomm
    cd t3-ecomm
    npm install .
    npx prisma db push
    npm run dev

The SQLite database gets generated inside `./prisma/`, you could also set it locally by editing the DATABASE_URL variable in the default `.env` file.
