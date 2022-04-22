import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'reactstrap';
import './style.scss';
import swal from 'sweetalert2';

import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';

const Consolidatedview = (props) => {
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
        const { action } = row;
        switch (cell) {
            case action:
                return (
                    // <Input type='text' value={Listening_Comprehension} />
                    // <input type="button">edit</input>
                    //  <Button>edit</Button>
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled />
                );
        }
    };

    const columns = headerValues.map((head, index) => {
        let tempObj = {
            dataField: head.key,
            text: `${head.key}`,
            align: 'center',
            headerAlign: 'center'
        };
        return tempObj;
    });
    // formatter: renderTableCell
    // columns.unshift({
    //     dataField: 'action',
    //     text: 'Edit',
    //     formatter: renderTableCell
    // });
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
                    keyField="Roll No"
                    bootstrap4
                    hover
                    striped
                    wrapperClasses="table-responsive"
                    data={data.slice(data22,data33)}
                    columns={columns}
                    bordered={true}
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
export default Consolidatedview;