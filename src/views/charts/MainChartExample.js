import React,{useEffect, useState} from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import {getAll} from '../../services/Charts'
import { ContactlessOutlined } from '@material-ui/icons'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'
const MainChartExample = attributes => {
  const [labels, setLabels] =useState([])
  const [numTr, setNumTr] =useState([])
  const [numMax, setNumMax] =useState(0)


  const random = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async function fetchNum(dateFrom, dateTo) {
    const response = await getAll(dateFrom, dateTo)
      setNumTr(response.sales)
      setNumMax(response.max)
      setLabels(response.labels)
  }

  useEffect(() => {
    fetchNum(attributes.dateFrom, attributes.dateTo)
  }, [attributes])

  const defaultDatasets = (()=>{
    let elements = 27
    const data1 = []
    const data2 = []
    const data3 = []
    for (let i = 0; i <= elements; i++) {
      data1.push(random(50, 200))
      data2.push(random(80, 100))
      data3.push(65)
    }
    return [
      {
        label: 'Pemasukan',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: numTr
      },
      // {
      //   label: 'My Second dataset',
      //   backgroundColor: 'transparent',
      //   borderColor: brandSuccess,
      //   pointHoverBackgroundColor: brandSuccess,
      //   borderWidth: 2,
      //   data: data2
      // },
      // {
      //   label: 'My Third dataset',
      //   backgroundColor: 'transparent',
      //   borderColor: brandDanger,
      //   pointHoverBackgroundColor: brandDanger,
      //   borderWidth: 1,
      //   borderDash: [8, 5],
      //   data: data3
      // }
    ]
  })()

  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: numMax
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  // render
  return (
    ""
  )
}


export default MainChartExample
