import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useState } from 'react';

export default function QuickFilteringGrid(props) {
  
  const apiData = props.rows;
  const [page,setPage]=useState(1);
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
        border: 0, 
        "& .MuiDataGrid-row:hover": { backgroundColor: "#4daaff", color: "#FFF" },
        '.MuiDataGrid-columnSeparator': { display: 'none' },
        '.MuiDataGrid-cell': { border: 'none', color:"#455560", fontSize:"16px" }, //tableCell
        '& .MuiDataGrid-columnHeaders': { borderBottom: "none", backgroundColor: 'rgb(250,250,251)', color:"#455560", fontSize:"16px", }, //tableHeader
        '& .MuiDataGrid-columnHeaderTitle':{fontWeight:"bold"},
        '& .MuiDataGrid-main': { mb: 2, mt:4 },  //table
        // '& .MuiDataGrid-footerContainer': { border: 0 },
      }}
        autoHeight
        disableColumnMenu
        GridColDef={false}
        hideFooter={true}
        pageSizeOptions={[5, 10, 50]}
        rows={list}
        getRowId={(row)=> row[props.id]}
        disableColumnFilter
        disableColumnSelector
        disableRowSelectionOnClick
        disableMultipleRowSelection
        disableDensitySelector
        columns={props.columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            sx:{display:"block"},
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { placeholder:"Search here..", debounceMs: 500, InputProps:{disableUnderline :true, endAdornment:(<SearchOutlined/>), sx:{px:2, border:"none", backgroundColor:"#fff", borderRadius:"10px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", height:"50px", width:"280px", input: {border:"none", color: '#455560', "&::placeholder": { opacity: 1, } } },} },
          },
        }}
      />
      <Box sx={{display:'flex', justifyContent:'end'}} >
        <Pagination count={count} hideNextButton hidePrevButton page={page} onChange={handleChange} sx={{ mr:5, mt:2, '& .MuiButtonBase-root':{":hover":{backgroundColor:'#4daaff',color:'white'}},'& .MuiButtonBase-root.Mui-selected':{backgroundColor:'#62b4ff', color:"white", '& :hover':{backgroundColor:"#4daaff"}},}}/>
        {/* <Pagination sx={{ '& .MuiPaginationItem-root':{'&: hover':{backgroundColor:"skyblue", color:"#fff"},'& .Mui-selected':{ backgroundColor:"#4daaff"} } }} color='primary' hideNextButton hidePrevButton count={10} siblingCount={10 } /> */}
      </Box>
    </Box>
  );
}