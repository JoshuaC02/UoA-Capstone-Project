import React, { useState, useMemo, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicationStatus } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';

function UserApplicationStatus() {
    const [data, setdata] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);
    const columns = useMemo(() => [
        {
            accessorKey: 'courseNo',
            header: 'CourseNo',
        },
        {
            accessorKey: 'hoursRequested',
            header: 'Hours Requested',
        },
        {
            accessorKey: 'hoursAssigned',
            header: 'Hours Assigned',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
    ],[]);

    useEffect(() => {
        const fetchdata = async () => {
        try 
        {
            const records = await DataStore.query(ApplicationStatus, (a) => a.userId.eq(user.username));
            const newRecord = records.map((record) => ({
                courseNo: record.appliedCourses,
                hoursRequested:  record.hoursRequested,
                hoursAssigned:  record.hoursAssigned,
                status: record.status,
            }));
            setdata(newRecord);
        } catch (e) {
            alert('Error fetching data:', e);
            }
        };
        fetchdata();
    }, [user.username]);

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
    });

    return (

        <div className='student-table'>
            <MaterialReactTable columns={columns} data={data}
            muiTableContainerProps={{ sx: { maxHeight: `${m}px` } }}
            />
        </div>
    );
}
export default UserApplicationStatus;
