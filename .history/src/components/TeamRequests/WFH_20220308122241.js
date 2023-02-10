
import React, {useState, useEffect} from 'react';

import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from '@material-tailwind/react/Button';
import {getPendingRequestsByManager} from '../../actions/RequestAction';
import jwt from 'jwt-decode'


const columns = [

  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 300,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  { field: 'date', headerName: 'Date', width: 300 },
  {
    field: 'status',
    headerName: 'Status',
    // type: 'number',
    width: 260,
  },
  
{
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 260,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking
        console.log('params', params)
        const api: {GridApi} = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );
          let path = `/request/${params.id}`;
        //   console.log(thisRow)

        return window.location.href = path;
      };

      return <Button  color="indigo"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark" onClick={onClick}>Edit</Button>;
    },
  }
  
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, date: '2021-11-29' },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, date: '2021-11-29' },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, date: '2021-11-29' },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, date: '2021-11-29' },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, date: '2021-11-29' },
//   { id: 6, lastName: 'Melisandre', firstName: 'foulen', age: 150, date: '2021-11-29' },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];





export default function WFH(props) {

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    const [data, setData] = useState();
    const [rows, setRows] = useState([]);
    const user = jwt(token)


    useEffect( async() => {
        const result = await getPendingRequestsByManager(token, user.id)
        setData(result)
        var rowsData = []
        result && result.map(item => {
            rowsData.push({
                id: item._id,
                lastName: item.idSender.lastname,
                firstName: item.idSender.firstname,
                status: item.status,
                date: item.createdAt.substring(0,10).split('-').reverse().join('-') + ' ' + item.createdAt.substring(11,16)
            })
       
        })
        setRows(rowsData)
    }, []);

  


    return (
        <>
            
            <div style={{ height: 1000, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[5]}
                />
            </div>          
                       
        </>
    );
}
