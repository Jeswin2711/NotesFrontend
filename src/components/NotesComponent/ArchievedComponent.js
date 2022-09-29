import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import ArchievedNote from './ArchievedNote'
import { Link } from 'react-router-dom'
import Search from './SearchBar';
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';

const ArchievedComponent = (props) => {


    const [archieved, setarchieved] = useState([])

    const [search, setsearch] = useState('');

    const [user_id, setuser_id] = useState('')

    const USER_ID_URL = `http://localhost:8080/user/${props.location.state}`


    const getArchieve = async () => 
    {
        await axios.get(`http://localhost:8080/user/${user_id}/getarchieved`).then((res) => setarchieved(res['data'].data));
    }

    const logout = () => 
    {
        localStorage.removeItem(`${props.location.state}`)
    }


    useEffect(() => {
        axios.get(USER_ID_URL).then((res) => setuser_id(res.data))
        getArchieve();
    }, [user_id])
    

    const ArchieveList = ({archieved}) =>
    {
        return <div>
            {
                archieved.length !== 0 ? 
                (
                        <div className='notes-list'>
                            {
                                archieved.map((note) => <ArchievedNote id={note.id} title={note.title} description={note.description} user_id={user_id}/>)
                            }
                        </div>
                ) :
                (
                        <div className='no-notes'>
                            <h1>No Archived Notes Here !!!</h1>
                            <br/>
                            <ArchiveTwoToneIcon className="svg_icons"/>
                    </div>
                )
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
                                            <p className='tab'>
                                                    <LightbulbOutlinedIcon/> Notes
                                                </p>
                                            </Link>
                        </li>
                        <br/>
                        <li className='nav-item'>
                            <Link to={{ 
                                            pathname: "/trash",
                                            state:props.location.state
                                            }} >
                                            <p className='tab'>
                                                            <DeleteOutlinedIcon/> Trash
                                                    </p>
                                            </Link>
                        </li>
                        <br/>
                        <li className='nav-item'>
                            <Link to={{ 
                                            pathname: "/archieve",
                                            state:props.location.state
                                            }} >
                                            <p className='tab'>
                                                            <ArchiveOutlinedIcon/> Archieve 
                                                    </p>
                                            </Link>
                        </li>
                    </ul>
                 </div>
            <div>
            {
                <ArchieveList
                    archieved={archieved.filter((note) => note.title.toLowerCase().includes(search) || note.description.toLowerCase().includes(search))}
                />
            }
            </div>
    </div>
      )
}

export default ArchievedComponent