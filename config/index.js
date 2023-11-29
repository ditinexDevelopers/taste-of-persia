const Config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL, //'http://localhost:3001'
  STORAGE_URL: process.env.NEXT_PUBLIC_STORAGE_URL,
  SQUARE_APPLICATION_ID: process.env.NEXT_PUBLIC_APPLICATION_ID,
  SQUARE_LOCATION_ID: process.env.NEXT_PUBLIC_LOCATION_ID,
  UNAUTHORIZED_EXCEPTION: false,
  VAPID: process.env.NEXT_PUBLIC_VAPID
};

export default Config;
