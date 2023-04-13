import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { Pagination } from '@mui/material';
// import { SearchOutlined } from '@mui/icons-material';
import { useState } from 'react';
  
export default function InvoiceDatagrid(props) {

  const [page,setPage]=useState(1);
  const apiData = props.rows;
  let row = 5;
  const count = Math.ceil((props.rows).length/row);
  row = row * page
  const list = apiData.slice((page-1)*5 , row);
  const handleChange = (event ,value) => {
    setPage(value);
};

  return (
    <Box>
      <DataGrid sx={{
        '@media print': {
              '.MuiDataGrid-main': {
                width: 'fit-content',
                fontSize: '10px',
                height: 'fit-content',
                overflow: 'visible',
              },},
        border: 0, 
        '.MuiDataGrid-columnSeparator': { display: 'none' },
        '& .MuiDataGrid-row:nth-child(2)':{ borderBottom:"1px solid black"},
        '& .MuiDataGrid-row:nth-child(4)':{ borderBottom:"1px solid black"},
        '& .MuiDataGrid-row:nth-child(5)':{  fontWeight:"bold"},
        '.MuiDataGrid-cell': { border: 'none', fontSize:"16px" }, //tableCell
        '& .MuiDataGrid-columnHeaders': { borderBottom: "none", backgroundColor: 'rgb(250,250,251)', color:"#455560", fontSize:"16px", }, //tableHeader
        '& .MuiDataGrid-columnHeaderTitle':{fontWeight:"bold"},
        '& .MuiDataGrid-main': { mb: 2, mt:4 },  //table
      }}
        autoHeight
        disableColumnMenu
        GridColDef={false}
        hideFooter={true}
        rows={list}
        getRowId={(row)=> row[props.id]}
        disableColumnFilter
        disableColumnSelector
        disableRowSelectionOnClick
        disableMultipleRowSelection
        disableDensitySelector
        columns={props.columns}
      />
    </Box>
  );
}