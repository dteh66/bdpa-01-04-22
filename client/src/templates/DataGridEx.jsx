import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

//implement with followSuggestions.jsx

const columns = [
  // { 
  //   field: '_id', 
  //   headerName: 'ID', 
  //   width: 90 
  // },
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
    editable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 150,
    editable: false,
  },{ 
    field: 'id', 
    headerName: 'ID', 
    width: 450 
  },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, 'firstName') || ''} ${
  //       params.getValue(params.id, 'lastName') || ''
  //     }`,
  // },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridEx({suggestedUsers}) {
  console.log("hi56")
  console.log("suggestedUsers:", suggestedUsers)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1> Follow Suggestions </h1>
      <DataGrid
        rows={suggestedUsers}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
