import { Breadcrumbs, Divider, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const AppBreadcrumbs = ({ subpage, crntPage, path }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: "20px", height: "30px" }}>
      <Typography sx={{ fontWeight: "700", mr: "10px", color: '#349eff' }}>{crntPage}</Typography>
      <Divider orientation="vertical" sx={{ mr: "10px", borderRightWidth: 3 }} variant="middle" flexItem />
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon />} sx={{ fontWeight: "700" }}>
        <Link to="/">
          Home
        </Link>
        {
          subpage ? (<Link to={path}>
            {subpage}
          </Link>) : ""
        }
        <span
          underline="hover"
          color="inherit"
        >
          {crntPage}
        </span>

      </Breadcrumbs>
    </div>
  )
}


export default AppBreadcrumbs;