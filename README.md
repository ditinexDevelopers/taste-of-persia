This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Env File Setup

- Create a file named .env.local in the root directory and copy contents from .env.local.example.
- firebase.json file in root contains the firebase service credentials for push notification. Add firebase service information here. Please contact developer team for credentials.
- public/firebase-messaging-sw.js is the service worker file to listen to background push notifications.
- Create a file NodeJSRestAPI/.env and Copy NodeJSRestAPI/.env.example contents into it.

## Run Project in Dev

First, run the frontend application:

```bash
npm run dev
```

The, run the backend application:

```bash
cd NodeJSRestAPI
npm run dev
```

## Deployment in Server

```bash
npm run dev
# or
yarn dev
# start forever
forever start -c "npm start" --uid "frontend" --sourceDir "/home/goodness/the-goodness-land/" ./
# start pm2
pm2 start npm --name "frontend" -- start
```

## Reference Links

www.pixel-industry.com/html/royal-plate/img/slider/slide01.jpg

https://html.softtechitltd.com/khadyo/khadyo/index.html

https://muffinman.io/react-animate-height/

https://demos.creative-tim.com/material-tailwind-dashboard-react/?&_ga=2.207947088.316637250.1656397645-1224480034.1656397645#/

https://react-square-payments.weareseeed.com/docs/props
https://developer.squareup.com/docs/devtools/sandbox/payments
