import { Button, TextField } from '@mui/material'
import React,{useState} from 'react'

export default function NotFound() {


  return (
    <div style={{ height: "40vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center",}}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
            <h1>404</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
            <h3>Page not Found</h3>
        </div>

    </div>
  )
}
