import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

export default function QuickFilteringGrid(props) {

  // const columns = React.useMemo(
  //   () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
  //   [data.columns],
  // );
 
  return (
    <Box>
      <DataGrid sx={{
        border: 0, 
        "& .MuiDataGrid-row:hover": { backgroundColor: "#4daaff", color: "#FFF" },
        '.MuiDataGrid-columnSeparator': { display: 'none' },
        '.MuiDataGrid-cell': { border: 'none' }, //tableData
        '& .MuiDataGrid-columnHeaders': { borderBottom: "none", textAlign: "center",backgroundColor: 'rgb(250,250,251)', }, //tableHeader
        '& .MuiDataGrid-main': { my: 2 },  //table
        '& .MuiDataGrid-footerContainer': { border: 0 },
      }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 }  }
        }}
        autoHeight
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
            quickFilterProps: { placeholder:"search here", debounceMs: 500 },
          },
        }}
      />
      <Box sx={{display:'flex',justifyContent:'end'}} >
        <Pagination sx={{'& .Mui-selected':{backgroundColor:"#4daaff", color:"#fff", '&: hover':{backgroundColor:"#4daaff"}}}} hideNextButton hidePrevButton color='primary' count={10}   />
      </Box>
    </Box>
  );
}