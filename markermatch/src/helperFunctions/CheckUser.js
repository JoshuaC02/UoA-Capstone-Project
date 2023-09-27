// Helper function to show the available links and their routes based on authentication. 

export function getSideLinks(user){
  const isCourseCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "CourseCoordinators";

  const pathRoutes = [
    {
      icon: "home",
      path: "/",
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
      show: isCourseCo,
    },
    {
      icon: "edit",
      path: "/edit-courses",
      label: "Edit Courses",
      show: isCourseCo,
    },
    {
      icon: "edit",
      path: "/cart",
      label: "Cart",
    },
  ];
  return pathRoutes;
}

