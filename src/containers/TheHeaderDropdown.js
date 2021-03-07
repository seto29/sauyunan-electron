import React from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {
  // CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = (props) => {
  // const {history} = props;
  function Logout(){
    Cookies.remove('user');
    Cookies.remove('role');
    window.location.reload();
  }

  return (
        <div className="c-avatar">
          <CImg
            title="logout"
            src={'avatars/logout.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
            onClick={()=>Logout()}
          />
        </div>
  )
}

export default TheHeaderDropdown
