import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';


const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function QuickFilteringGrid(props) {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS, 
    rowLength: 100,
  });

  // Otherwise filter will be applied on fields such as the hidden column id

  // const columns = React.useMemo(
  //   () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
  //   [data.columns],
  // );
 
  return (
    <Box >
      <DataGrid sx={{
        border: 0, 
        "& .MuiDataGrid-row:hover": { backgroundColor: "#4daaff", color: "#FFF" },
        '.MuiDataGrid-columnSeparator': { display: 'none' },
        '.MuiDataGrid-cell': { border: 'none' }, //tableData
        '& .super-app-theme--header': { backgroundColor: 'rgb(250,250,251)', }, //className for header bg
        '& .MuiDataGrid-columnHeaders': { borderBottom: "none", textAlign: "center" }, //tableHeader
        '& .MuiDataGrid-main': { my: 2 },  //table
        '& .MuiDataGrid-footerContainer': { border: 0 },
      }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 }  }
        }}
        autoHeight
        pageSizeOptions={[5, 10, 50]}
        rows={props.rows || data}
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
    </Box>
  );
}