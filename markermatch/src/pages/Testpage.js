import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function Testpage({ signOut, user }) {
    console.log(user.attributes)
  return (
    <>
      <h1>If you're reading this, congrats</h1>
    </>
  );
}

export default withAuthenticator(Testpage);