import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import DeletedNote from './DeletedNote'
import { Link } from 'react-router-dom'
import Search from './SearchBar';
import LogoutIcon from '@mui/icons-material/Logout';

const TrashComponent = (props) => {


    const [trash, settrash] = useState([])

    const [search, setsearch] = useState('');

    const [user_id, setuser_id] = useState('')


    const USER_ID_URL = `http://localhost:8080/user/${props.location.state}`



    useEffect(() => {
         axios.get(USER_ID_URL).then((res) => setuser_id(res.data))
         axios.get(`http://localhost:8080/user/${user_id}/getdeleted`).then((res) => settrash(res['data'].data))
    }, [user_id])
    
    const logout = () => 
    {
        localStorage.removeItem(`${props.location.state}`)
    }

    const TrashList = ({trash}) =>
    {
        return <div className='notes-list'>
            {
                trash.map((note) => <DeletedNote id={note.id} title={note.title} description={note.description} user_id={user_id}/>)
            }
        </div>
    }
    

  return (
    <div>
        <div>
                    <Search handleSearch={setsearch} />
                    <p onClick={() => {logout()}} className="logout"><a href='/login'><LogoutIcon/></a></p>
                 </div>
        <div className='left-bar'>
                    <ul className='sidebar'>
                    <li className='nav-item'>
                            <Link to={{ 
                                            pathname: "/notes",
                                            state:props.location.state
                                            }} >
                                            Notes
                                            </Link>
                        </li>
                        <br/>
                        <li className='nav-item'>
                            <Link to={{ 
                                            pathname: "/trash",
                                            state:props.location.state
                                            }} >
                                            Trash
                                            </Link>
                        </li>
                        <br/>
                        <li className='nav-item'>
                            <Link to={{ 
                                            pathname: "/archieve",
                                            state:props.location.state
                                            }} >
                                            Archieve
                                            </Link>
                        </li>
                    </ul>
                 </div>
            <div>
                {
                    <TrashList
                        trash={trash.filter((note) => note.title.toLowerCase().includes(search))}
                    />
                }
            </div>
    </div>
  )
}

export default TrashComponent