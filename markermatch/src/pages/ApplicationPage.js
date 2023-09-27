import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import React from 'react';
import MarkerApplicationForm from '../components/MarkerApplicationForm';
import { useAuthenticator } from '@aws-amplify/ui-react';

function ApplicationPage() {
  return (
    <div>
      <h1>Application Page</h1>
      <MarkerApplicationForm />
    </div>
  );
}

export default ApplicationPage;