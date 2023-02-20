// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'ei6px4kvnh'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example: - DONE
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-ygy3x1gcb13crfkc.us.auth0.com', // Auth0 domain
  clientId: '0E691SEbUrLUg4S4GZQKEfoOKeqS7BsZ', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
