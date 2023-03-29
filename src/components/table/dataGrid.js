import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

export default function QuickFilteringGrid(props) {

  return (
    <Box>
      <DataGrid sx={{
        border: 0, 
        "& .MuiDataGrid-row:hover": { backgroundColor: "#4daaff", color: "#FFF" },
        '.MuiDataGrid-columnSeparator': { display: 'none' },
        '.MuiDataGrid-cell': { border: 'none', color:"#455560", fontSize:"16px" }, //tableCell
        '& .MuiDataGrid-columnHeaders': { borderBottom: "none", backgroundColor: 'rgb(250,250,251)', color:"#455560", fontSize:"16px", }, //tableHeader
        '& .MuiDataGrid-columnHeaderTitle':{fontWeight:"bold"},
        '& .MuiDataGrid-main': { my: 2 },  //table
        // '& .MuiDataGrid-footerContainer': { border: 0 },
      }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 }  }
        }}
        autoHeight
        disableColumnMenu
        GridColDef={false}
        hideFooter={true}
        pageSizeOptions={[5, 10, 50]}
        rows={props.rows}
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
            quickFilterProps: { placeholder:"search here",  debounceMs: 500 },
          },
        }}
      />
      <Box sx={{display:'flex', justifyContent:'end'}} >
        <Pagination sx={{ '& .MuiPaginationItem-root':{'&: hover':{backgroundColor:"#75acdd"}, 'MuiPaginationItem-selected':{backgroundColor:"#4daaff"}} }} hideNextButton hidePrevButton color='primary' count={10} siblingCount={10 } />
      </Box>
    </Box>
  );
}