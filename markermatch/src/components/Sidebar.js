import React from 'react';

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarFooter,
    CDBSidebarMenuItem,
    
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';
  
  function Sidebar(){
    return (
        <>
            <div className="sidebox">
                <CDBSidebar maxWidth="225px" minWidth="80px" id="CDBSidebar">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <p id="Menu">Menu</p>
                    </CDBSidebarHeader>
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            <NavLink exact to="/" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="home"> Home Page </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/application-status" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="columns">Application Status</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/assigned-courses" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="columns">Assigned Courses</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/view-courses" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="columns">View Courses</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/add-courses" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="columns">Add Courses</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/edit-courses" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="edit">Edit Courses</CDBSidebarMenuItem>
                            </NavLink>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                    <CDBSidebarFooter id="CDBSidebarFooter"> <div className="sidebar-btn-wrapper"> Team 12 - 2023 </div> </CDBSidebarFooter>
                </CDBSidebar>
            </div>
        </>
    );
  };

export default Sidebar;
