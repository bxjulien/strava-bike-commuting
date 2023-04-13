const env = {
  STRAVA_CLIENT_ID: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET: process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET,
  VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  ACTIVITY_FILENAME: process.env.NEXT_PUBLIC_ACTIVITY_FILENAME,
};

module.exports = {
  env
};