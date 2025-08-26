# Lunatic PDF API

This project provides an **Express-based API** to generate **PDF summaries** of data collected via web forms, using the [Lunatic](https://github.com/InseeFr/lunatic) library. It is designed for seamless integration into web applications that require dynamic, customizable PDF outputs of user-entered data.

## ✨ Features

- Generate **PDF recaps** from Lunatic web survey data.
- Based on **Lunatic library** for consistent rendering of survey components.
- REST API built with **Express** and **TypeScript** for reliability and scalability.
- Easy to integrate into existing web platforms.

## 🚀 Tech Stack

- **Node.js** (Express)
- **TypeScript**
- **[@inseefr/lunatic](https://github.com/InseeFr/lunatic)** for rendering and data handling
- PDF generation tools integrated with Lunatic models

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/InseeFr/lunatic-pdf-api.git
cd lunatic-pdf-api

# Install dependencies
pnpm install
```

## 🌐 Launch api-server

```bash
# launch api on port 8080
pnpm run dev
```

## 👩‍💻 Launch pdf preview (minimal React + Vite app)

For development purposes only, read [README](./src/preview/README.md).

```bash
# launch vite app on port 5173
pnpm run dev:preview
```

## 🐋 Docker

You can run the docker image: `inseefr/lunatic-pdf-api`.

The environment variable `APPLICATION_SCHEME` and `APPLICATION_HOST` are useful for swagger configuration. (default: `http` and `localhost:8080`)
