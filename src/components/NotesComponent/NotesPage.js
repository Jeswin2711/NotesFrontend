import axios from 'axios';
import React from 'react'
import { useState , useEffect } from 'react';
import Search from './SearchBar';
import Note from './Note';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PinnedNote from './PinnedNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ResetPassword from '../ResetPassword';

const NotesPage = (props) => 
{
    const [notes, setnotes] = useState([])

    const [pinned, setpinned] = useState([])

    const [search, setsearch] = useState('');

    const [user_id, setid] = useState()

    const [visible, setvisible] = useState(false)

    const [title, settitle] = useState('')

    const [description, setdescription] = useState('')

    const [open, setopen] = useState(false)


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
        axios.get(`http://localhost:8080/user/${user_id}/getpinned`).then((res) => {
            setpinned(res.data.data)
        })
    },[user_id])


    const deleteNote = async (id) => {

        const DELETE_URL = await "http://localhost:8080/user"+`/${user_id}/delete/${id}`;

        axios.delete(DELETE_URL).then((res) => console.log("Deleted Successfully" + res))

        window.location.reload(true)

        setnotes(notes.filter((note) => note.id !== id))
    }

    const handlePin = async (id) =>
    {

        await axios.post(
            `http://localhost:8080/user/pin/${id}`
        )

        window.location.reload(true)
    }


    const archieveNote = async (id) => {

        const ARCHIEVE_URL = await "http://localhost:8080/user" + `/archieve/${props.location.state}/${id}`;

        await axios.post(
            ARCHIEVE_URL, {} ,
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => console.log(res));
        
        window.location.reload(true)

    }




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

    const logout = () => 
    {
        localStorage.removeItem(`${props.location.state}`)
    }


    const NotesList = ({notes}) =>
    {
        return <div className='notes-list'>
            {
                notes.map((note) => <Note id={note.id} title={note.title} description={note.description}
                handleDelete = {deleteNote} handleArchieve = {archieveNote} username={props.location.state} handlePin={handlePin}/>)
            }
        </div>
    }


    function DropDownItem()
    {
        return <div className='user-dropdown'>
            <Link to={{ 
                                                pathname: "/reset-password",
                                                state:props.location.state
                                                }} >
                                                    <p> 
                                                        ResetPassword
                                                    </p>
                                                </Link>
            <p onClick={() => {logout()}}>
                <a href='/login'>Logout</a>
                </p>
        </div>
    }


    return <div className='note-page'>
        {
            localStorage.getItem(props.location.state) !== null ? (
                <div>
                    <div>
                        <img src="https://play-lh.googleusercontent.com/9bJoeaPbGTB8Tz_h4N-p-6ReRd8vSS-frZb2tmJulaGIoTKElKj3zpmcFJvnS96ANZP5=w600-h300-pc0xffffff-pd" width="130px" height="60px"/>
                        <p className='user'>
                            <AccountCircleIcon onClick={() => {setopen(!open)}}/>
                            {
                                open ? <DropDownItem/>
                                : null
                            }
                        </p>
                    </div>  
                    <div>
                        <Search handleSearch={setsearch} />
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
                            <textarea type="text" placeholder='Take a note...' value={description} onChange={(e) => setdescription(e.target.value)}/><br></br>
                            <button disabled={!title || !description ? true : false } onClick={SaveNote}>close</button>
                            </div>
                        }
                    </div>
                    <div className='pinned-notes'>
                        {
                            pinned.map((note) => 
                            <div key={note.id}>
                                <PinnedNote id = {note.id} title = {note.title} description = {note.description} handleDelete={deleteNote}/>
                            </div>
                            )
                        }
                    </div>
                    <div className='left-bar-1'>
                        <ul className='side-bar'>
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
                        <NotesList
                            notes={notes.filter((note) => note.title.toLowerCase().includes(search) || note.description.toLowerCase().includes(search))}
                        />
                    }
                    </div>
            </div>
            ) : <div className='notes-error'>
                <h1>Internal Server Error</h1>
                <h5>Login again <a href='/login'>here</a></h5>
            </div>
        }
        </div>
}
 
export default NotesPage;