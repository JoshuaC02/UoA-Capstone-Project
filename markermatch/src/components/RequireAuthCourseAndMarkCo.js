//https://ui.docs.amplify.aws/react/guides/auth-protected#adding-in-a-requireauth-component
//https://www.xiegerts.com/post/amplify-ui-auth-nextjs/#group-based-access-with-cognito-groups
// user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"] -> notSignedIn, notAssignedToGroup = undefined, Group = "CourseCoordinators"
import { useLocation, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

export function RequireAuthCourseAndMarkCo({ children }) {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  const { user } = useAuthenticator((context) => [context.user]);
  const checkUser = (user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"]?.[0] === "CourseCoordinators" ||
    user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"]?.[0] === "MarkerCoordinator");
    console.log(checkUser);

  if (route !== 'authenticated') {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  } else if (!checkUser) {
        return <Navigate to="/notauthorised" state={{ from: location }} replace />;
  }
  return children;
}