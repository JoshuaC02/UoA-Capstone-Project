import React, { useState, useMemo, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicationStatus, MarkerApplication } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import ModalPopUp from './ModalPopUp';

function ApplicantsView() {
    const [data, setdata] = useState([]);
    const [getApplicants, setApplicants] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const { user } = useAuthenticator((context) => [context.user]);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    function closeModal() {
        setShowModal(false);
      }

    const selectedCourse = location.pathname.split("/")[2].replace("-", "");
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'AUID',
        },
        {
            accessorKey: 'fullName',
            header: 'Name',
        },
        {
            accessorKey: 'overseas',
            header: 'Overseas',
        },
        {
            accessorKey: 'prevMakrer',
            header: 'Previous Tutor',
        },
        {
            accessorKey: 'qualification',
            header: 'Qualification',
        },
        {
            accessorKey: 'availability',
            header: 'Availability h/w',
        },
        {
            accessorKey: 'pref',
            header: 'Preference',
        },
        {
            accessorKey: 'hoursAssigned',
            header: 'Hours Assigned',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },],[]);

    useEffect(() => {
        const fetchdata = async () => {
        try 
        {
            console.log(location.pathname.split("/")[2].replace("-",""));
            const fetchApplicants = await getAllApplicants();
            const newRecord = fetchApplicants.map((record) => ({
                id: record.auid,
                fullName: record.givenName + ' '+ record.familyName,
                overseas: record.overseas === true ? 'Yes' : 'No',
                prevMakrer:  record.currentTutor === true ? 'Yes' : 'No',
                qualification:  record.underPostGrad,
                availability:  record.maxHours,
                pref:  'need to implement',
                hoursAssigned:  'need to implement',
                status:  'need to implement',
            }));
            setdata(newRecord);
        } catch (e) {
            setShowModal(true);
            }
        };
        fetchdata();
    }, [user.username]);

    const [myHeight, setMaxHeight] = useState(getMaxHeight());

    async function getAllApplicants() {
        const allMarkers = await DataStore.query(MarkerApplication);
        const applicants = allMarkers.filter((marker) =>
          marker.courseSpecifics.includes(selectedCourse)
        );
      
        return applicants;
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

            <h1>All Courses &gt; Application for {selectedCourse}</h1>
            <MaterialReactTable
                columns = {columns}
                data = {data}
                editingMode = "modal"
                enableEditing
                muiTableContainerProps = {{ sx: { maxHeight: `${myHeight}px` } }}
                enableRowSelection
                getRowId={(row) => row.userId}
                state={{ rowSelection }} 
                onRowSelectionChange={setRowSelection} 
                muiTableBodyRowProps={({ row }) => ({
                    onClick: row.getToggleSelectedHandler(),
                    sx: { cursor: 'pointer' },
                })}
            />
        </div>
    );
}
export default ApplicantsView;
