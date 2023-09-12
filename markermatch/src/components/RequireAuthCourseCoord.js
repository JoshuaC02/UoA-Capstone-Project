//https://ui.docs.amplify.aws/react/guides/auth-protected#adding-in-a-requireauth-component
//https://www.xiegerts.com/post/amplify-ui-auth-nextjs/#group-based-access-with-cognito-groups
// user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"] -> notSignedIn, notAssignedToGroup = undefined, Group User = "Users"
import { useLocation, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

export function RequireAuthCourseCoord({ children }) {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  const { user } = useAuthenticator((context) => [context.user]);
  alert(user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"]);
  if (route !== 'authenticated') {
    alert("not signed in")
    return <Navigate to="/auth" state={{ from: location }} replace />;
  } else if (user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"] != "CourseCoordinators") {
    alert("not authorised")
    return <Navigate to="/notauthorised" state={{ from: location }} replace />;
  }
  alert("authorised")
  return children;
}