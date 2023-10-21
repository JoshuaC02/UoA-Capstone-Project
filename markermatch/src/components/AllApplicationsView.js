import React, { useState, useMemo, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicationStatus, Course, MarkerApplication } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';
import { Box, Button, MenuItem} from '@mui/material';
import ModalPopUp from './ModalPopUp';


function AllApplicationsView() {
    const [data, setData] = useState([]);
    const [getCourses, setCourses] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    function closeModal() {
        setShowModal(false);
      }

    const handleRowClick = (row) => {
        navigate(`/all-applications/${row.original.course.replace(/\s+/g, '-')}`);
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
            header: 'Markers Wanted',
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
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={() => ({
                        backgroundColor: cell.getValue() === "FULFILLED"? "green": "red",
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '8.7ch',
                    p: '0.25rem',   
                    })}
                >
                    {cell.getValue()}
                </Box>
            ),
        },],[]);
    
        const fetchdata = async () => {
            try {
                const fetchCourses = await getAllCourses();
                let count = 0;
                const newRecord = [];
                for (const record of fetchCourses) {
                    const [markers, hours] = await getAllApplicants(record.name);
                    count += 1;
                    newRecord.push({
                        course: record.name,
                        semester: record.yearSemester.split(' ')[1] + ' ' + record.yearSemester.split(' ')[2],
                        markersNeeded: record.markersNeeded || 0,
                        markersAssigned: markers || 0,
                        hoursAllocated: hours + '/' + record.totalHours,
                        status: (parseInt(record.totalHours) || 0) - (parseInt(hours) || 0)  <= 0 ? 'FULFILLED' : 'UNFULFILLED',
                    });
                }
                newRecord.sort((a, b) => {
                    const sortByStatus = b.status.localeCompare(a.status);
                    if (sortByStatus !== 0) {
                        return sortByStatus;
                    }
                    return b.course.localeCompare(a.course);
                });
                setData(newRecord);
            } catch (e) {
                alert(e);
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

    function getHoursAssigned(allApplicants, courseName){
        let assignedMarkers = 0;
        let assignedHours = 0;
        for(const applicant of allApplicants){
            let hours = 0;
            let markers = 0;
            if(applicant.appliedCourses === courseName){
                if(applicant.status === "ACCEPTED"){
                    assignedHours += parseInt(applicant.hoursAssigned);
                    assignedMarkers +=1;
                }
            }
        }
        
        return[assignedMarkers, assignedHours];
    }
    async function getAllApplicants(courseName){
        const allApplicants = await await DataStore.query(ApplicationStatus, (a) => a.appliedCourses.eq(courseName));
        const [markers, hours] = getHoursAssigned(allApplicants, courseName);
        return [markers, hours];
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

            {showModal && (
                <ModalPopUp
                    show={showModal}
                    onHide={closeModal}
                    title="Error"
                    body="Error fetching data."
                    primaryButtonLabel="Close"
                    onPrimaryButtonClick={closeModal}
                />
            )}

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
