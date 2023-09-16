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
      const [m, setMaxHeight] = useState(getMaxHeight());

      function getMaxHeight() {
        const viewportHeight = window.innerHeight;
        const subtractedHeight = 300; 
        return viewportHeight - subtractedHeight;
      }
    
      function handleResize() {
        setMaxHeight(getMaxHeight());
      }
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);
    
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


