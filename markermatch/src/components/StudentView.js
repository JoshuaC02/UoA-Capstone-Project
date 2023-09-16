import React from 'react';
import Table from 'react-bootstrap/Table';
function StudentView() {

  return (
    <>
        {/* <div className="student-grid">
            <Table responsive className='student-table'>
                <thead>
                    <tr>
                        <th>Course #</th>
                        <th>Course Name</th>
                        <th>Status</th>
                        <th>Hours Assigned</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstoneasasasasas</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 399</td>
                        <td>compsci 399 - Capstone</td>
                        <td>ACCEPTED</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 335</td>
                        <td>compsci 335 - blaba</td>
                        <td>PENDING</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>COMPSCI 111</td>
                        <td>compsci 111 - blaba</td>
                        <td>DECLINED</td>
                        <td>N/A</td>
                    </tr>
                </tbody>
            </Table> 
        </div>*/}
    </>
    );
}

export default StudentView;


