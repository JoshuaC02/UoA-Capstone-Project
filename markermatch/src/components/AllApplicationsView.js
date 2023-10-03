import React, { useState, useMemo, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicationStatus, Course, MarkerApplication } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';

function AllApplicationsView() {
    const [data, setData] = useState([]);
    const [getCourses, setCourses] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();
    const handleRowClick = (row) => {
        navigate(`/all-applicantions/${row.original.course.replace(/\s+/g, '-')}`);
      };
    const columns = useMemo(() => [
        {
            accessorKey: 'course',
            header: 'Course',
        },
        {
            accessorKey: 'semester',
            header: 'Semester',
        },
        {
            accessorKey: 'markersNeeded',
            header: 'Markers needed',
        },
        {
            accessorKey: 'markersAssigned',
            header: 'Markers Assigned',
        },
        {
            accessorKey: 'hoursAllocated',
            header: 'Hours Allocated',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },],[]);
        
        const rowEdit = async ({ exitEditingMode, row, values }) => {
            try {
              const updatedData = [...data];
              updatedData[row.index] = values;
              setData(updatedData);        
              exitEditingMode();
            } catch (error) {
              console.error('Error updating row:', error);
            }
          };
        const fetchdata = async () => {
        try 
        {
            const fetchCourses = await getAllCourses();
            const newRecord = fetchCourses.map((record) => ({
                course: record.name,
                semester: record.yearSemester.split(' ')[1] + ' ' + record.yearSemester.split(' ')[2],
                markersNeeded: record.markersNeeded || 0,
                markersAssigned:  record.markersAssigned || 0,
                hoursAllocated: 0 +'/'+ record.totalHours,
                status: (parseInt(record.markersNeeded) || 0) - (parseInt(record.markersAssigned) || 0) === 0? 'COMPLETED' : 'INCOMPLETE',
            }));
            newRecord.sort((a, b) => {
                const sortByStatus = b.status.localeCompare(a.status);
                if (sortByStatus !== 0) {
                  return sortByStatus;
                }
                
                return b.course.localeCompare(a.course);
              });
            setData(newRecord);
        } catch (e) {
            alert('Error fetching data:', e);
            }
        };
    useEffect(() => {
        fetchdata();
    }, [user.username]);

    const [myHeight, setMaxHeight] = useState(getMaxHeight());

    async function getAllCourses(){
        const allCourses = await DataStore.query(Course);
        return allCourses;
    }


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
    });

    return (

        <div className='student-table'>
            <MaterialReactTable 
                columns = {columns}
                data = {data}
                muiTableContainerProps = {{ sx: { maxHeight: `${myHeight}px` } }}
                muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        handleRowClick(row);
                    },
                    sx: { cursor: 'pointer' },
                })}
            />
        </div>
    );
}
export default AllApplicationsView;
