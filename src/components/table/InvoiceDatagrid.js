import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
  
export default function InvoiceDatagrid(props) {

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
        rows={props.rows}
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