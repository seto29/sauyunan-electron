import React, { useEffect, useState } from 'react'

import { getBlackList } from "../helpoers/storage"
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import Cookies from 'js-cookie';

// import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import navigationA from './_navA'
import navigationSG from './_navSG'
import navigationSDv from './_navSDv'
import navigationSGR from './_navSGR'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const [stating, setStating] = useState({})
  
  let sidebar = []
  let number = 0;

  useEffect(()=>{
    let a = getBlackList();
    if(a){
      a = JSON.parse(a)
      setStating(a)
    }
  },[])

  navigation.map((value)=>{
     if(stating && stating.state1==="0" && value.name==="Transaksi"){
    }else if(stating && stating.state2==="0" && value.name==="Pembayaran"){
    }else if(stating && stating.state3==="0" && value.name==="Data Entry"){
    }else if(stating && stating.state4==="0" && value.name==="Data Setup"){
    }else if(stating && stating.state5==="0" && value.name==="Laporan"){

    }else{
      sidebar[number]=value
      number+=1
    }
  })
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <h3>Cap</h3>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={sidebar}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
