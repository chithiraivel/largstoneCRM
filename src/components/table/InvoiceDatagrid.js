import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
  
export default function InvoiceDatagrid(props) {

  return (
    <Box>
      <DataGrid sx={{
        width:"100%",
        border: 0,
        '.MuiDataGrid-columnSeparator': { display: 'none' },
        '& .MuiDataGrid-row:nth-child(2)':{ borderBottom:"1px solid black",},
        '& .MuiDataGrid-row:nth-child(3)':{ fontWeight:"bold"},
        '& .MuiDataGrid-row:nth-child(4)':{ borderBottom:"1px solid black", fontWeight:"bold"},
        '& .MuiDataGrid-row:nth-child(5)':{  fontWeight:"bold",  fontSize:"20px"},
        '.MuiDataGrid-cell': { border: 'none' }, //tableCell
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