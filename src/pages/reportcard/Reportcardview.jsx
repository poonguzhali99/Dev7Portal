import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';




import './style.scss';

// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import { ImportantDevices } from '@mui/icons-material';

const Reportcardview = (props) => {
    const { data,data22,data33 } = props;
    // data.map((d) => {
    //  d.checkBox = false;
    //  return d;
    // });
    let headerValues = [];
    for (let [ key, value ] of Object.entries(data[0])) {
        //console.log('Key: ', key, 'Value:', value);
        let temp = {
            key: key,
            value: value
        };
        headerValues.push(temp);
    }
    console.log('headerValues', headerValues);

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total f_600">
            Showing {from} to {to} of {size} Reports
        </span>
    );

    const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
        <li
            key={text}
            role="presentation"
            className="dropdown-item btn-sm cursor_p"
            onMouseDown={(e) => {
                e.preventDefault();
                onSizePerPageChange(page);
            }}
        >
            <a href="#" tabIndex="-1" role="menuitem" data-page={page} className="text-dark text-decoration-none">
                {text}
            </a>
        </li>
    );
    const options = {
        page: 1,
        paginationTotalRenderer: customTotal,
        sizePerPageOptionRenderer,
        showTotal: true,
        custom: true,
        totalSize: data.length,
        alwaysShowAllBtns: true,
        withFirstAndLast: false,
        sizePerPageList: [
            {
                text: 'Page / 30',
                value: 30
            },
            {
                text: 'Page / 50',
                value: 50
            }
        ],
        hidePageListOnlyOnePage: true
    };

    const renderTableCell = (cell, row) => {
        const { view  } = row;

        
      
        switch (cell) {
            case view:
                if(row.OfflineStatus==="Generate"){
                return (
                 
               <p>Generate</p>
                );
                }
                else{
                    return (
                 <p>Ready</p>
                    
                    );
                }
        }
    };
    const renderTableCell11 = (cell, row) => {
       console.log(cell);
       console.log(row);
        const { select }=row;
        switch (cell) {
          
                case select:
                    console.log(cell);
                   // console.log(select);
                    if(row.MarksEntryStatus==="Entered"){
                    return (
                        
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled"  />
                    );}
                    else{
                        return (
                        
                           <p>Pending</p>
                           
                        );
                    }
        }
    };

    const columns = [
        
        // {
        //     dataField: "select",
        //     text: "Select" ,
        //     formatter: renderTableCell11
        //   },

     
        {
            dataField: "S. No",
            text: "S. No",
            align: 'center',
            headerAlign: 'center',
            headerStyle: {
                backgroundColor: "#c8e6c9"  
              }
          },
          {
            dataField: "Student ID",
            text: "Student ID",
            align: 'center',
            headerAlign: 'center'
          },
          {
            dataField: "Student Name",
            text: "Student Name",
            align: 'center',
            headerAlign: 'center'
          },
          {
            dataField: "Class",
            text: "Class",
            align: 'center',
            headerAlign: 'center'
          },
          {
            dataField: "Section",
            text: "Section",
            align: 'center',
            headerAlign: 'center'
          },
          {
            dataField: "Roll No.",
            text: "Roll No",
            align: 'center',
            headerAlign: 'center'
          },
          {
            dataField: "Date of Birth",
            text: "Date of Birth",
            align: 'center',
            headerAlign: 'center'
          },

          {
            dataField: "Fathers Name",
            text: "Fathers Name",
            align: 'center',
            headerAlign: 'center'
          },
          {
            dataField: "Mothers Name",
            text: "Mothers Name",
            align: 'center',
            headerAlign: 'center'
          },
          {
            dataField: "view",
            text: "View Offline Report Card",
            align: 'center',
            headerAlign: 'center',
            formatter: renderTableCell
          },

    ];

    // const columns = headerValues.map((head, index) => {
    //     let tempObj = {
    //         dataField: head.key,
    //         text: `${head.key}`
    //     };
    //     return tempObj;
    // });
     
//      columns.unshift({
//          dataField: 'action',
//         text: 'Edit',
//         formatter: renderTableCell
//  });
    // formatter: renderTableCell

    // const columns = [
    //  {
    //      dataField: 'S No',
    //      text: 'S No'
    //      // formatter: renderTableCell
    //      // filterRenderer: (onFilter, column) => <PriceFilter onFilter={onFilter} column={column} />,
    //      // headerStyle: { width: '200px' }
    //  },
    //  {
    //      dataField: 'Student ID',
    //      text: 'Student ID'
    //      // formatter: () => <div>Lab Checklist</div>
    //      // headerStyle: { width: '400px' }
    //  },
    //  {
    //      dataField: 'Student Name',
    //      text: 'Student Name'
    //      // formatter: () => <div>Lab Checklist</div>
    //      // headerStyle: { width: '400px' }
    //  },
    //  {
    //      dataField: 'Roll No',
    //      text: 'Roll No'
    //      // formatter: () => <div>Lab Checklist</div>
    //      // headerStyle: { width: '400px' }
    //  },
    //  {
    //      dataField: 'value3',
    //      text: 'Shift 3'
    //      // formatter: () => <div>Lab Checklist</div>
    //      // headerStyle: { width: '400px' }
    //  },
    //  {
    //      dataField: 'value4',
    //      text: 'Shift 4'
    //      // formatter: () => <div>Lab Checklist</div>
    //      // headerStyle: { width: '400px' }
    //  }
    // ];
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true
      };
    return (
        <Card>
            {data.length > 0 && (
                // <PaginationProvider pagination={paginationFactory(options)}>
                //  {({ paginationProps, paginationTableProps }) => (
                //      <div>
                //          <Row className="justify-content-end mb-3">
                //              <Col>
                //                  <SizePerPageDropdownStandalone
                //                      {...paginationProps}
                //                      btnContextual="btn-outline-primary"
                //                  />
                //                  <PaginationListStandalone {...paginationProps} />
                //              </Col>
                //          </Row>
             
                <BootstrapTable
                    keyField='S. No'
                    bootstrap4
                    hover
                    striped
                    wrapperClasses="table-responsive stripped bordered hover"
                    data={data.slice(data22,data33)}
                    columns={columns}
                    bordered={true}
                    selectRow={ selectRow }
                    
                    // {...paginationTableProps}
                    // pagination={paginationFactory()}
                    noDataIndication={<div>No Data Found To Display</div>}
                />
                // </div>
                // )}
                // </PaginationProvider>
            )}
        </Card>

        //      <div className="tablever2">
        //          <br />
        //          {props.data.length > 0 ? (
        //              <div>
        //                  <thead>
        //                      <th>#</th>
        //                      <th>Student ID</th>
        //                      <th>Student Name</th>
        //                      <th>Roll No</th>
        //                      <th>
        //                          Listening-Comprehension
        //                          <br />
        //                          ( Max-Marks: 10 )
        //                      </th>
        //                      <th>
        //                          Reading-Comprehension
        //                          <br />
        //                          ( Max-Marks: 10 )
        //                      </th>
        //                      <th>
        //                          Writing-Creative Writing
        //                          <br />
        //                          ( Max-Marks: 10)
        //                      </th>
        //                      <th>
        //                          Writing-Vocabulary
        //                          <br />
        //                          ( Max-Marks: 10)
        //                      </th>
        //                      <th>
        //                          Writing-Grammer
        //                          <br />
        //                          ( Max-Marks: 10)
        //                      </th>
        //                      <th>
        //                          Writing Spelling and Dictation
        //                          <br />
        //                          ( Max-Marks: 10)
        //                      </th>
        //                  </thead>
        //                  <tbody>
        //                      {props.data.map((curr) => {
        //                          return (
        //                              <tr key={curr['Student ID']}>
        //                                  <td data-label="bp code">{curr['S No']}</td>
        //                                  <td data-label="bp code">{curr['Student ID']} </td>
        //                                  <td data-label="bp code">{curr['Student Name']}</td>
        //                                  <td data-label="bp code">{curr['Roll No']}</td>
        //                                  <td data-label="bp code">
        //                                      <input
        //                                          type="text"
        //                                          style={{ textAlign: 'center' }}
        //                                          value={curr['Listening-Comprehension']}
        //                                      />
        //                                  </td>
        //                                  <td data-label="bp code">
        //                                      <input
        //                                          type="text"
        //                                          style={{ textAlign: 'center' }}
        //                                          value={curr['Reading-Comprehension']}
        //                                      />
        //                                  </td>
        //                                  <td data-label="bp code">
        //                                      <input
        //                                          type="text"
        //                                          style={{ textAlign: 'center' }}
        //                                          value={curr['Writing-Creative Writing']}
        //                                      />
        //                                  </td>
        //                                  <td data-label="bp code">
        //                                      <input
        //                                          type="text"
        //                                          style={{ textAlign: 'center' }}
        //                                          value={curr['Writing-Vocabulary']}
        //                                      />
        //                                  </td>
        //                                  <td data-label="bp code">
        //                                      <input
        //                                          type="text"
        //                                          style={{ textAlign: 'center' }}
        //                                          value={curr['Writing-Grammar']}
        //                                      />
        //                                  </td>
        //                                  <td data-label="bp code">
        //                                      <input
        //                                          type="text"
        //                                          style={{ textAlign: 'center' }}
        //                                          value={curr['Writing-Spelling and Dictation']}
        //                                      />
        //                                  </td>
        //                              </tr>
        //                          );
        //                      })}
        //                  </tbody>
        //              </div>
        //          ) : (
        //              <p className="card-body333">
        //                  {' '}
        //                  <strong> No data found to display </strong>
        //              </p>
        //          )}
        //      </div>
    );
};
export default Reportcardview;