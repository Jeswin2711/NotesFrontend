import React , {useState , useEffect} from 'react'
import NotesList from './NotesList'
import Search from './SearchBar'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import axios from '../../api/apis';


const HomePage = (props) => {

    const [search, setsearch] = useState('')

    const [visible, setvisible] = useState(false)

    const [title, settitle] = useState('')

    const [description, setdescription] = useState('')

    const [user_id, setid] = useState()

    const [notes, setnotes] = useState([])

    const logout = () => 
    {
        localStorage.removeItem("jj")
    }


    const USER_ID_URL = `http://localhost:8080/user/${props.location.state}`


    useEffect(() => {
        axios.get(
            USER_ID_URL
        )
        .then((res) => {
            setid(res.data)
            axios.get(
                `http://localhost:8080/user/${user_id}/getnotes`
            )
            .then((res) => {
                let data = res.data['data'];
                setnotes(data);
            })}
        )
    },[user_id])


    const SaveNote = async () =>
    {
        const notes = {title , description};

            await axios.post(
                `http://localhost:8080/user/addnote/${user_id}`, notes,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        window.location.reload(true)
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
                                        }} >
                                            <LightbulbOutlinedIcon/><p className='tab'>Notes</p>
                        </Link>
                    </li>
                        <br/>
                        <br/>
                    <li className='nav-item'>
                        <Link to={{ 
                                        pathname: "/trash",
                                        }} >
                                        <FolderDeleteOutlinedIcon/><p className='tab'>Trash</p>
                        </Link>
                    </li>
                        <br/>
                        <br/>
                    <li className='nav-item'>
                        <Link to={{ 
                                        pathname: "/archieve",
                                        }} >
                                        <ArchiveOutlinedIcon/><p className='tab'>Archieve</p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='addnote'>
                    {
                        visible === false
                        ?
                        <div>
                        <input type="text" placeholder="Take a note..." onClick={() => setvisible(true)} />
                        </div>
                        :
                        <div>
                        <input type="text" placeholder='Title' value={title} onChange={(e) => settitle(e.target.value)}/><br></br>
                        <input type="text" placeholder='Take a note...' value={description} onChange={(e) => setdescription(e.target.value)}/><br></br>
                        <button disabled={!title || !description ? true : false } onClick={SaveNote}>close</button>
                        </div>
                    }
            </div>
            <div className='notes-list'>
                <NotesList 
                    notes = {notes}
                    user_id = {user_id}
                    username = {props.location.state}
                />
            </div>
        </div>
  )
}

export default HomePage