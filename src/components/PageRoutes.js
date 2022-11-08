import React from 'react'
import {BrowserRouter,Route,Routes } from "react-router-dom";
import AddIssue from './AddIssue';
import IssueFilter from './IssueFilter';
import IssueList from './IssueList';
import IssueTable from './IssueTable';
import IssueEdit from './IssueEdit';
const NotFount=()=><h1> Not Available</h1>;

export default function PageRoutes() {
  return (
 
        <Routes>
            <Route path='/' element={<IssueList />} />
            <Route path='/issue' element={<AddIssue />} />
            <Route path='/report' element={<IssueFilter />} />
            <Route path='*' element={<NotFount />} />
            <Route path='/edit/:_id' element={<IssueEdit />} />
        </Routes>
     
  )
}
