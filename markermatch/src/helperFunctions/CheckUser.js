// Helper function to show the available links and their routes based on authentication. 

export function getSideLinks(user){
  let isCourseCo = false;
  let isMarkerCo = false;
  if (user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"] != undefined) {
    isCourseCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "CourseCoordinators";
    isMarkerCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "MarkerCoordinator";
  }
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
      path: "/all-applications",
      label: "All Applications",
      show: isMarkerCo || isCourseCo,
    },
    {
      icon: "edit",
      path: "/markersignup",
      label: "Manage Users",
      show: isMarkerCo,
    },
    {
      icon: "edit",
      path: "/cart",
      label: "Cart",
    },
  ];
  return pathRoutes;
}

