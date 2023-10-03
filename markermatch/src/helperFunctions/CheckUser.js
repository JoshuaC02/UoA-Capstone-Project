// Helper function to show the available links and their routes based on authentication. 

export function getSideLinks(user){
  const isCourseCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "CourseCoordinators";
  const isMarkerCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "MarkerCoordinator";
  // console.log(user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "MarkerCoordinator");

  const pathRoutes = [
    {
      icon: "home",
      path: "/home",
      label: "Home",
    },
    {
      icon: "columns",
      path: "/application-status",
      label: "Application Status",
    },
    {
      icon: "edit",
      path: "/addcourses",
      label: "Add Courses",
      show: isMarkerCo,
    },
    {
      icon: "edit",
      path: "/edit-courses",
      label: "Edit Courses",
      show: isMarkerCo || isCourseCo,
    },
    {
      icon: "edit",
      path: "/all-applicantions",
      label: "All Applications",
      show: isMarkerCo || isCourseCo,
    },
    {
      icon: "edit",
      path: "/cart",
      label: "Cart",
    },
  ];
  return pathRoutes;
}

