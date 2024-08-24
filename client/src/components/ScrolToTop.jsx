import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';


const ScrolToTop = () =>{
    const { currentUser } = useSelector((state) => state.user);
  const {pathname} = useLocation()
  useEffect(()=>{
    window.scrollTo(0, 0);

  },[pathname])
  return null

}

export default ScrolToTop