import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './navbar.css'
import CreateButton from 'components/buttons/CreateButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { IsLoggedInContext } from '../../context/IsLoggedInContext'
import { PostsContext } from '../../context/PostsContext'
// eslint-disable
import Profiledropdown from './Profiledropdown'

const NavigationBar = ({ setSearchedPosts, searchedPosts }) => {
  const { isLoggedIn } = useContext(IsLoggedInContext)
  const navigate = useNavigate()
  const { posts } = useContext(PostsContext)
  const location = useLocation()
  const [value, setValue] = useState('')
  useEffect(() => {
    if (location.pathname.includes('/q/')) {
      setValue(location.pathname.replaceAll('%20', ' ').slice(3))
    }
  }, [])
  const searchSubmitHandler = e => {
    console.log(location)
    if (e.target.children[0].value) {
      setSearchedPosts(
        posts.filter(post =>
          post.title
            .toLowerCase()
            .trim()
            .replace(' ', '')
            .includes(e.target.children[0].value.trim().toLowerCase().replace(' ', ''))
        )
      )
      navigate(`/q/${e.target.children[0].value.trim().toLowerCase()}`)
    } else {
      navigate(`/`)
    }
  }
  return (
    <Navbar className="shadow-mdsticky-top bg-white" expand="lg">
      <Container className="py-[2px] ">
        <Navbar.Brand className="logo" href="#">
          ArabiansDevWorld
        </Navbar.Brand>
        <Navbar.Toggle className="shadow-none" aria-controls="navbarScroll" />
        <Navbar.Collapse style={{ transition: 'ease 0.4s' }} id="navbarScroll">
          <Form
            onSubmit={e => {
              e.preventDefault()
              searchSubmitHandler(e)
            }}
            className="d-flex items-center md:mt-3 mr-auto position-relative"
          >
            <Form.Control
              defaultValue={value}
              type="search"
              placeholder="ابحث هنا"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" className="position-absolute search-button">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>
          <Nav className="my-2 my-lg-0 gap-3 flex ml-auto items-center" style={{ maxHeight: '215px' }} navbarScroll>
            <Nav.Link as={Link} to="/">
              الرئيسيه
            </Nav.Link>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login" className="hover:text-[#3b49df]">
                  تسجيل دخول
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-btn" style={{ width: '90%' }} href="#">
                  <CreateButton text="انشاء حساب" />
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/new" style={{ width: '90%' }} className="nav-btn" href="#">
                  <CreateButton text="انشاء منشور جديد" />
                </Nav.Link>
                <Profiledropdown />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
