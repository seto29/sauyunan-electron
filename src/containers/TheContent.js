import React, { Suspense, useEffect, useState } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { CContainer, CFade } from '@coreui/react'
import { getBlackList } from "../helpoers/storage"

// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const [loged, setLoged]=useState(false)
  const user = Cookies.get('user');

  const [stating, setStating] = useState({state1:"0"})

  useEffect(()=>{
    let a = getBlackList();
    if(a){
      a = JSON.parse(a)
      setStating(a)
    }
  },[])

  useEffect(()=>{
    var a = getBlackList();
    if(a===""){
      setLoged(false)
    }else{
      setLoged(true)
    }
  },[])
  return (
    <main className="c-main">
    {
      user?
        <CContainer fluid>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component && (
                  ((route.path==="/sale-transactions") && stating.state1==="0")
                      ?
                      <>
                      
                {console.log(route.path)}
                      </>
                      :
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )} />
                )
              })}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Suspense>
        </CContainer>
      :
        <Redirect
        to="/login"/>
    }
    </main>
  )
}

export default React.memo(TheContent)
