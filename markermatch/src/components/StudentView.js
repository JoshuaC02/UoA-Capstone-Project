import React, { useState, useMemo, useEffect  } from 'react';
import MaterialReactTable from 'material-react-table';
const data = [
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
    {
      courseNo: 'COMPSCI 399',
      courseName: 'COMPSCI 399 - Capstone',
      status: 'ACCEPTED',
      hoursAssigned: 20,
    },
  ];
function StudentView() {

  const columns = useMemo(
      () => [
          {
            accessorKey: 'courseNo', 
            header: 'CourseNo',
          },
          {
            accessorKey: 'courseName',
            header: 'Course Name',
          },
          {
            accessorKey: 'status', 
            header: 'Status',
          },
          {
            accessorKey: 'hoursAssigned',
            header: 'Hours Assigned',
          },
        ],
        [],
      );
      // const viewportHeight = window.innerHeight; // Get the viewport height
      // const subtractedHeight = 300; // The height to subtract
      // const m = viewportHeight - subtractedHeight; // Calculate the max height
      // console.log(m); // Log the calculated value

      const [m, setMaxHeight] = useState(getMaxHeight());

      // Function to calculate the max height based on viewport size
      function getMaxHeight() {
        const viewportHeight = window.innerHeight;
        const subtractedHeight = 300; // Adjust this value as needed
        return viewportHeight - subtractedHeight;
      }
    
      // Function to update the max height when the window is resized
      function handleResize() {
        setMaxHeight(getMaxHeight());
      }
    
      useEffect(() => {
        // Add an event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
  return (

    <div className='student-table'>
        <MaterialReactTable columns={columns} data={data}
        enableRowVirtualization   
        // enableColumnVirtualization    
        muiTableContainerProps={{ sx: { maxHeight: `${m}px` } }}
        />
    </div>
    );
}

export default StudentView;


