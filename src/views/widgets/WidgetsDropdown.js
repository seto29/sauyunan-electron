import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import NumberFormat from 'react-number-format';
import axios from '../../axios';
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import { Typography } from '@material-ui/core';

const WidgetsDropdown = (props) => {
  const [data, setData] = useState([]);
  const [countProducts, setCountProducts] = useState("")
  const [salesQty, setSalesQty] = useState("")
  const [reminder, setReminder] = useState("")
  const [shop, setShop] = useState("")
  const [bestSeller, setBestSeller] = useState("")
  const [worstSeller, setWorstSeller] = useState("")
  const [deadline, setDeadline] = useState("")
  const [accReceivable, setAccReceivable] = useState("")

  async function fetchData(dateFrom, dateTo) {
    const response = await axios.get('/dashboard/GetDataByDate.php?dateFrom='+dateFrom+'&dateTo='+dateTo)

    setCountProducts(response['data'][0][0]['countProducts'])
    setSalesQty(response['data'][1][0]['qty'])
    response['data'][2][0]['shop'] !== null ? setShop(response['data'][2][0]['shop']) : setShop("")
    response['data'][3][0]['reminder'] !== null ? setReminder(response['data'][3][0]['reminder']) : setReminder(0)
    setBestSeller(response['data'][4][0]['name'])
    setWorstSeller(response['data'][5][0]['name'])
    response['data'][6][0]['deadline'] !== null ? setDeadline(response['data'][6][0]['deadline']) : setDeadline(0)
    response['data'][7][0]['ar'] !== null ? setAccReceivable(response['data'][7][0]['ar']) : setAccReceivable(0)
    return response
  }
  useEffect(() => {
    //if [], run once pas load dan ga run lagi only on page load
    fetchData(props.dateFrom, props.dateTo)
  }, [props])
  // render
  return (
    <div>
      <CRow>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-primary"
            header={<Typography>{countProducts}</Typography>}
            text="SKU Barang"
          >
            <CDropdown>
              <CDropdownToggle color="transparent">
                <CIcon name="cil-settings" />
              </CDropdownToggle>
              {/* <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu> */}
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-info"
            header={<NumberFormat value={salesQty} displayType={'text'} thousandSeparator={true} />}
            text="Barang Terjual"
          >
            <CDropdown>
              <CDropdownToggle caret={false} color="transparent">
                <CIcon name="cil-location-pin" />
              </CDropdownToggle>
              {/* <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu> */}
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            // header={<NumberFormat value={shop} displayType={'text'} thousandSeparator={true} />}
            header={deadline}
            text="Tagihan Jatuh Tempo"

          >
            <CDropdown>
              <CDropdownToggle color="transparent">
                <CIcon name="cil-settings" />
              </CDropdownToggle>
              {/* <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu> */}
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-danger"
            header={reminder}
            text="Barang Hampir Habis"

          >
            <CDropdown>
              <CDropdownToggle caret className="text-white" color="transparent">
                <CIcon name="cil-settings" />
              </CDropdownToggle>
              {/* <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu> */}
            </CDropdown>
          </CWidgetDropdown>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-primary"
            header={bestSeller}
            text="Best Seller"

          >
            <CDropdown>
              <CDropdownToggle color="transparent">
                <CIcon name="cil-settings" />
              </CDropdownToggle>
              {/* <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu> */}
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-info"
            header={worstSeller}
            text="Barang Tidak Laku"

          >
            <CDropdown>
              <CDropdownToggle caret={false} color="transparent">
                <CIcon name="cil-location-pin" />
              </CDropdownToggle>
              {/* <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu> */}
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            header={shop}
            text="Top Spender"
            

          >
            {/* <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-danger"
            header={<NumberFormat value={accReceivable} displayType={'text'} thousandSeparator={true} prefix='Rp. ' />}
            text="Total Piutang"
          // footerSlot={
          //   <ChartBarSimple
          //     className="mt-3 mx-3"
          //     style={{ height: '70px' }}
          //     backgroundColor="rgb(250, 152, 152)"
          //     label="Barang Mau Habis"
          //     labels="months"
          //   />
          // }
          >
            {/* <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
          </CWidgetDropdown>
        </CCol>
      </CRow>
    </div>



  )
}

export default WidgetsDropdown
