import React from 'react'
import {Link,BrowserRouter as Router } from "react-router-dom";
import PageRoutes from './PageRoutes';

function Nav(params) {
    return(
        <nav style={{padding:"1rem", display:"flex",justifyContent: "space-evenly" ,backgroundColor:"cornflowerBlue"}}>
        <Link to="/">Home </Link>
        <Link to="/issue">Issue </Link>
        <Link to="/report">Report </Link>
        <Link to="/edit/:_id">Edit </Link>
        </nav>
    )
}

export default function Page() {
  return (
    <Router>
    <Nav />

    <PageRoutes />
    </Router>
  )
}
