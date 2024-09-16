# Shorl - An app to manage your short links

A simple short link manager XD

## 💪 Features

- ✅ Fast short link redirection
- ✅ Different permissions for different users
- ✅ Custom short link
- ✅ Privacy options

## 🚀 Getting Started

### Prerequisites

### With Docker:

- Docker
- Docker Compose

### Step 1

Clone the repository

```sh {"id":"01J6K7GWBBTEN629YSHZJ1BYHD"}
git clone https://github.com/tobycm/l
cd l
```

### Step 2

With web frontend:

```sh {"id":"01J6K7FHRZEHP2PYPZJHKFB41D"}
docker compose -f docker-compose-full.yaml up
```

Without web frontend:

```sh {"id":"01J6K7EA5RF6T2N4YPVTZZ6C9D"}
docker compose up
```

### Without Docker:

- [Bun](https://bun.sh)
- [PocketBase](https://pocketbase.io)

### Step 1

Clone the repository

```sh {"id":"01J6K7HS08C87M42HE07X7GXAY"}
git clone https://github.com/tobycm/l
cd l
```

### Step 2

Install the dependencies

```sh {"id":"01J6K7JKVY7RS3486R0TW8XXAG"}
cd web
bun i
cd ..

cd server
bun i
cd ..
```

### Step 3

Start services

```sh {"id":"01J6K7P605DHZ0FABRMZHVTPZ3"}
cd pocketbase
pocketbase serve
```

```sh {"id":"01J6K7M5ERP0XA84YJ6YRZTR2Q"}
cd web
bun run dev
```

```sh {"id":"01J6K7P8G5TGRSDGDAJMDVA1AK"}
cd server
bun run start
```

### Disabling sign up (optional)

You can go to your PocketBase admin dashboard (`https://<your pocketbase url>/_/`) and set `users` collection create rule to admin only.

## 📚 Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Bun](https://bun.sh)
- [Mantine](https://mantine.dev/)
- [PocketBase](https://pocketbase.io)

## 📝 License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## 🤝 Contributions

Any contribution is appreciated. Just create an issue/pull request and I will review it ASAP.

## 🔗 Share this project

If you like this project, please give it a ⭐ and share it with your friends!
