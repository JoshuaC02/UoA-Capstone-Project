import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function Auth({ signOut, user }) {
    console.log(user.attributes)
  return (
    <>
      <h1>Hello {user.attributes.given_name}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}
//user.attributes.given_name, user.attributes.family_name, user.attributes.email
export default withAuthenticator(Auth);