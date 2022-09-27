import axios from 'axios';
import React from 'react'
import { useState , useEffect } from 'react';
import Search from './SearchBar';
import LogoutIcon from '@mui/icons-material/Logout';
import Note from './Note';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PinnedNote from './PinnedNote';

const NotesPage = (props) => 
{
    const [notes, setnotes] = useState([])

    const [search, setsearch] = useState('');

    const [user_id, setid] = useState()

    const [visible, setvisible] = useState(false)

    const [title, settitle] = useState('')

    const [description, setdescription] = useState('')

    const [pinned, setpinned] = useState([])


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
        axios.get(`http://localhost:8080/user/getpinned`).then((res) => {
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

        const ARCHIEVE_URL = await"http://localhost:8080/user" + `/archieve/${props.location.state}/${id}`;

        await axios.post(
            ARCHIEVE_URL, {} ,
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => console.log(res));window.location.reload(true)

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

    return <div>
                <div>
                    <Search handleSearch={setsearch} />
                    <p onClick={() => {logout()}} className="logout"><a href='/login'><LogoutIcon/></a></p>
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
                <div className='pinned-notes'>
                    {
                        pinned.map((note) => 
                        <div key={note.id}>
                            <PinnedNote id = {note.id} title = {note.title} description = {note.description}/>
                        </div>
                        )
                    }
                 </div>
                <div className='left-bar'>
                    <ul className='sidebar'>
                        <li className='nav-item'>
                            <Link to={{ 
                                            pathname: "/notes",
                                            state:props.location.state
                                            }} >
                                                <LightbulbOutlinedIcon/> Notes
                                            </Link>
                            </li>
                            <br/>
                            <li className='nav-item'>
                                <Link to={{ 
                                                pathname: "/trash",
                                                state:props.location.state
                                                }} >
                                                <DeleteOutlinedIcon/> Trash
                                                </Link>
                            </li>
                            <br/>
                            <li className='nav-item'>
                                <Link to={{ 
                                                pathname: "/archieve",
                                                state:props.location.state
                                                }} >
                                                <ArchiveOutlinedIcon/> Archieve
                                                </Link>
                            </li>
                    </ul>
                </div>
                <div>
                {
                    <NotesList
                        notes={notes.filter((note) => note.title.toLowerCase().includes(search))}
                    />
                }
            </div>
        </div>
}
 
export default NotesPage;