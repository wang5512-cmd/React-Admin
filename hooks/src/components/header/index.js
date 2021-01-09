import React, { useEffect, useState } from 'react'
import './index.css'
import StoreUtils from '../../utils/storeUtils'
import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'

function Index(props) {
  const user = StoreUtils.getUser()
  const [weather, setWeather] = useState({})
  const [nowtime, setNowtime] = useState('')
  const [title, setTitle] = useState('')
  let pathname = props.location.pathname
  useEffect(() => {
    menuList.forEach(item => {
      if (item.key === pathname) {
        setTitle(item.title)
      } else if (item.children) {
        item.children.forEach(cItem => {
          if (cItem.key === pathname) {
            setTitle(cItem.title)
          }
        })
      }
    })
    reqWeather('郑州').then(res => {
      setWeather(res)
    })
  }, [pathname])
  useEffect(() => {
    setInterval(function () {
      setNowtime(formateDate(new Date()))
    }, 1000)
  }, [nowtime])
  return (
    <div className="header">
      <div className="header-top">
        欢迎{
          user.username ? user.username : ''
        }
      </div>
      <div className="header-bottom">
        <span className="left">{title}</span>
        <span className="right">
          <em className="spl">{nowtime}</em>
          <em className="spr">
            <img src={weather.dayPictureUrl} />
          </em>
          <em>{weather.weather}</em>
        </span>
      </div>
    </div>
  )
}

export default withRouter(Index)