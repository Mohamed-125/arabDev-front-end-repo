import React, { useContext, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import CreateButton from 'components/buttons/CreateButton'
import Cookies from 'js-cookie'
import { IsLoggedInContext } from '../../context/IsLoggedInContext'
import { UserDataContext } from '../../context/UserDataContext'
import { Link } from 'react-router-dom'
function Profiledropdown() {
  const { setIsLoggedIn } = useContext(IsLoggedInContext)
  const [windowWidth, setWindowWidth] = useState(0)
  const {
    //  setUserData,
    setAuthTokens,
  } = useContext(UserDataContext)

  const logoutUserHandler = () => {
    window.location.reload()
    setIsLoggedIn(false)
    setAuthTokens({ refreshToken: null, accessToken: null })
    Cookies.set('user_name', null)
    Cookies.set('user_data', null)
  }
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', e => {
      setWindowWidth(e.target.innerWidth)
    })
  }, [])

  return windowWidth > 991 ? (
    <DropdownButton
      id="dropdown-basic-button"
      title={
        <button>
          <img
            src={
              'https://res.cloudinary.com/practicaldev/image/fetch/s--SJypo9p1--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/918667/482123db-3a77-489f-8d32-0c5b45f0a3bd.png'
            }
            className="max-w-[50px] relative top-[4px] rounded-full border-[2px] border-slate-400"
          />
        </button>
      }
      className="bg-transparent"
    >
      <Dropdown.Item as={Link} to="/profile" href="#/action-1" className="my-[0.25rem]">
        Mohamed ibrahim
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item as={Link} to="/reading-list" className="my-[0.25rem] text-end" href="#/action-2">
        المحفوظات
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/new" className="my-[0.25rem] text-end" href="#/action-2">
        انشاء منشور جديد
      </Dropdown.Item>
      <Dropdown.Item className="my-[0.25rem] text-end" href="#/action-2">
        الاعدادت
      </Dropdown.Item>
      <Dropdown.Divider />
      <CreateButton
        onClick={logoutUserHandler}
        className="bg-blue-600 !mx-[1rem] my-[0.25rem] border-none text-white mt"
        text="تسجيل خروج  "
      />
    </DropdownButton>
  ) : (
    <div className="flex flex-col items-center gap-4 text-[#0000008c]">
      <Link to="/profile"> Mohamed ibrahim </Link>
      <a> الاعدادت</a>
      <Link to="/reading-list">المحفوظات</Link>
      <CreateButton
        onClick={logoutUserHandler}
        className="bg-blue-600 !mx-[1rem] my-[0.25rem] border-none text-white mt"
        text="تسجيل خروج  "
      />
    </div>
  )
}

export default Profiledropdown
