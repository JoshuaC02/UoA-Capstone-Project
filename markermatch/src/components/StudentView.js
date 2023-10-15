import React, { useState, useMemo, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicationStatus } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import ModalPopUp from './ModalPopUp';

function ApplicationStatuss() {
    const [data, setdata] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);
    const [showModal, setShowModal] = useState(false);

    function closeModal() {
        setShowModal(false);
      }

    const columns = useMemo(() => [
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
        },],[]);

    useEffect(() => {
        const fetchdata = async () => {
        try 
        {
            const records = await DataStore.query(ApplicationStatus, (a) => a.userId.eq(user.username));
            const newRecord = records.map((record) => ({
                courseNo: record.appliedCourses,
                courseName: 'NEED TO IMPLEMENT',
                status: 'NEED TO IMPLEMENT',
                hoursAssigned:  'NEED TO IMPLEMENT',
            }));
            setdata(newRecord);
        } catch (e) {
            setShowModal(true);
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
            <MaterialReactTable columns={columns} data={data}
            muiTableContainerProps={{ sx: { maxHeight: `${m}px` } }}
            />
        </div>
    );
}
export default ApplicationStatuss;
