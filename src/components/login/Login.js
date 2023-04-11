import { env } from "../../../config";

const Login = () => {
  const CODE_URL = getCodeUrl();

  return <button onClick={() => window.location = CODE_URL}>Log in to Strava</button>;
}

const getCodeUrl = () => {
  const url = new URL('https://www.strava.com/oauth/authorize');
  url.searchParams.set('client_id', env.STRAVA_CLIENT_ID);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', env.VERCEL_URL || 'http://localhost:3000');
  url.searchParams.set('approval_prompt', 'force');
  url.searchParams.set('scope', 'activity:write');

  return url;
}

export default Login;