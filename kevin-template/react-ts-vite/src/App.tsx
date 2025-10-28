import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Router from "./router/index";
import api from "@/api";

declare global {
  interface Window {
    $api: any,
  }
}
/* 
  设置全局变量
*/
window.$api = {...api}

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
export default App