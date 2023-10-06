import React, { useState, useMemo, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicationStatus, MarkerApplication } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';

function ApplicantsView() {
    const [data, setdata] = useState([]);
    const [getApplicants, setApplicants] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const { user } = useAuthenticator((context) => [context.user]);
    const location = useLocation();
    const selectedCourse = location.pathname.split("/")[2].replace("-", "");
    const [editedHoursAssigned, setEditedHoursAssigned] = useState('');

    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'AUID',
            isEditable: true,
        },
        {
            accessorKey: 'fullName',
            header: 'Name',

        },
        {
        accessorKey: 'availability',
        header: 'Availability h/w',
        Cell: ({ cell }) => (
            <Box
            component="span"
            sx={(theme) => ({
            })}
            onClick={() => {
                console.log('Cell clicked! Value:', cell.getValue());
            }}
            >
                {cell.getValue()}
            </Box>
            ),
        },
        {
        accessorKey: 'hoursAssigned',
        header: 'Hours Assigned',
        },
        {
            accessorKey: 'prevMakrer',
            header: 'Previous Tutor',
        },
        {
            accessorKey: 'overseas',
            header: 'Overseas',
        },
        {
            accessorKey: 'pref',
            header: 'Preference',
        },
        {
            accessorKey: 'qualification',
            header: 'Qualification',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ cell }) => (
                <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: cell.getValue() === "ACCEPTED"? "green": cell.getValue() === "DECLINED" ? "red" : "orange",
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {cell.getValue()}
              </Box>
            ),
        },],[]);

    useEffect(() => {
        const fetchdata = async () => {
        try 
        {
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
                status:  'ACCEPTED',
            }));
            setdata(newRecord);
        } catch (e) {
            alert('Error fetching data:', e);
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
    const updateCell = async ({ exitEditingMode, row, values }) => {
        
        if (row.original.hoursAssigned !== undefined) {
          setEditedHoursAssigned(row.original.hoursAssigned);
          const updatedValue = window.prompt('Edit Hours Assigned:', editedHoursAssigned);
          
          if (updatedValue !== null) {
            const updatedData = [...data];
            updatedData[row.index].hoursAssigned = updatedValue;
            setdata(updatedData);
          }
        } 
      };
      
    return (

        <div className='student-table'>
            <h1>All Courses &gt; Application for {selectedCourse}</h1>
            <MaterialReactTable
                columns={columns}
                data={data}
                muiTableContainerProps={{ sx: { maxHeight: `${myHeight}px` } }}
                positionToolbarAlertBanner="bottom"
                state={{ rowSelection }}
                onRowSelectionChange={setRowSelection}
                isEditable={(column) => column.isEditable}
                enableRowActions
                renderRowActionMenuItems={({ row, exitEditingMode }) => [
                    <MenuItem key="edit" onClick={() => updateCell({ row, exitEditingMode })}>
                      Edit
                    </MenuItem>,
                ]}
                onEditingRowSave={updateCell}
                enableRowSelection                            
                renderBottomToolbarCustomActions={({ table }) => {
                    const handleDeactivate = () => {
                      table.getSelectedRowModel().flatRows.map((row) => {
                        alert('deactivating ' + row.getValue('name'));
                      });
                    };
            
                    const handleActivate = () => {
                      table.getSelectedRowModel().flatRows.map((row) => {
                        alert('activating ' + row.getValue('name'));
                      });
                    };
            
                    const handleContact = () => {
                      table.getSelectedRowModel().flatRows.map((row) => {
                        alert('contact ' + row.getValue('name'));
                      });
                    };
            
                    return (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                          color="success"
                          disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                          onClick={handleDeactivate}
                          variant="contained"
                        >
                          ACCEPT
                        </Button>
                        <Button
                          color="info"
                          disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                          onClick={handleActivate}
                          variant="contained"
                        >
                          PENDING
                        </Button>
                        <Button
                          color="error"
                          disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                          onClick={handleContact}
                          variant="contained"
                        >
                          DECLINE
                        </Button>
                      </div>
                    );
                }}
            />
        </div>
    );
}
export default ApplicantsView;
