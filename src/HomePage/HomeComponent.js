import React , {useEffect, useState} from 'react'
import Search from '../components/NotesComponent/SearchBar'
import './css/home.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import axios from '../api/apis'
import Note from '../components/NotesComponent/Note';
import DeletedNote from '../components/NotesComponent/DeletedNote';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchievedNote from '../components/NotesComponent/ArchievedNote';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import PinnedNote from '../components/NotesComponent/PinnedNote';
import TextareaAutosize from '@mui/material/TextareaAutosize';


const HomeComponent = (props) => {

    const [search, setsearch] = useState('')

    const [showbar, setshowbar] = useState(false)

    const [logoarea, setlogoarea] = useState(null)

    const [id, setid] = useState()

    const [notes, setnotes] = useState([])

    const [pinned, setpinned] = useState([])

    const [archieved, setarchieved] = useState([])

    const [trash, settrash] = useState([])

    const [showdeleted, setshowdeleted] = useState(false)

    const [showarchieved, setshowarchieved] = useState(false)

    const [shownotes, setshownotes] = useState(true)

    const [visible, setvisible] = useState(false)

    const [showpinned, setshowpinned] = useState(false)

    const [title, settitle] = useState('')

    const [description, setdescription] = useState('')

    const [open, setopen] = useState(false)

    const [height, setheight] = useState()

    const [bgcolor, setbgcolor] = useState()

    const colorStyle = {
        background : bgcolor
        }

    
    


    const GET_USET_ID_URL = `http://localhost:8080/user/${props.location.state}`


    const headers = {
        headers : {
            Authorization :`Bearer ${localStorage.getItem(props.location.state)}`,
            "Access-Control-Max-Age":1728000
            
        }
    } 


    useEffect(() => {

        axios.get(
            GET_USET_ID_URL ,
            headers
        )
        .then((res) => {
            setid(res.data)
            axios.get(
                `http://localhost:8080/user/${id}/getnotes`,
                headers
            )
            .then((res) => {
                let data = res.data['data'];
                setnotes(data);
            })}
        )
        axios.get(`http://localhost:8080/user/${id}/getpinned`, headers ).then((res) => {
            setpinned(res.data.data);
        })

        axios.get(`http://localhost:8080/user/${id}/getarchieved` , headers)
        .then((res) => setarchieved(res['data'].data));

        axios.get(`http://localhost:8080/user/${id}/getdeleted` , headers)
        .then((res) => settrash(res['data'].data))

    },[id])


    const AddNote = async () =>
    {
        const notes = {title , description};

            await axios.post(
                `http://localhost:8080/user/addnote/${id}`, notes,
                headers
            );
        window.location.reload(true)
    }


    const handleDelete = async (note_id) => {

        const DELETE_URL = await "http://localhost:8080/user"+`/${id}/delete/${note_id}`;

        axios.delete(DELETE_URL , headers).then((res) => console.log("Deleted Successfully" + res))

        window.location.reload(true)

        setnotes(notes.filter((note) => note.id !== note_id))
    }


    const handleArchieve = async (id) => {

        const ARCHIEVE_URL = await "http://localhost:8080/user" + `/archieve/${props.location.state}/${id}`;

        await axios.post(
            ARCHIEVE_URL, {} ,
            headers
        ).then((res) => console.log(res));
        
        window.location.reload(true)

    }

    const handlePin = async (id) =>
    {

        await axios.post(
            `http://localhost:8080/user/pin/${id}`,{},
            headers
        )
        window.location.reload(true)
    }

    function DropDownItem()
    {
        return <div className='account-dropdown'>
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

    const logout = () => 
    {
        localStorage.removeItem(`${props.location.state}`)
    }

    function onChangeHandler (e)
    {
        setheight(parseInt(e.target.style.height,10))
        setdescription(e.target.value)
    }



  return (
    <div>
        <div className='home'>
            <p onClick={() => {setshowbar(!showbar)}} ><DensityMediumIcon/></p>
            {
                logoarea === null ?  (
                    <div className='logo'>
                        <img src="https://play-lh.googleusercontent.com/9bJoeaPbGTB8Tz_h4N-p-6ReRd8vSS-frZb2tmJulaGIoTKElKj3zpmcFJvnS96ANZP5=w600-h300-pc0xffffff-pd" width="130px" height="60px"/>
                        <h4>Keep</h4>
                    </div>
                    
                ) : 
                (
                    <div className='logo-area'>
                        <p>{logoarea}</p>
                    </div>
                )
            }
            <Search handleSearch={setsearch} />
            <p className='account' onClick={() => {setopen(!open)}}><AccountCircleIcon/></p>
            {
                open ? <DropDownItem /> : null
            }
            <div className='side-bar'>
                <ul>
                    {
                        showbar ? 
                            (
                                <div onClick={() => {setshowbar(true)}}>
                                    <li onClick={() => {
                                            setlogoarea(null);
                                            setshownotes(true);
                                            setshowdeleted(false);
                                            setshowarchieved(false);
                                            setshowpinned(true)
                                            }} className='bar-icon'>
                                        <LightbulbOutlinedIcon/>
                                        <p className='option'> 
                                            Notes
                                        </p> 
                                    </li>
                                    <li onClick={() => {
                                        setlogoarea('Archieve');
                                        setshownotes(false);
                                        setshowdeleted(false);
                                        setshowarchieved(true);
                                        setshowpinned(false)
                                        }} className='bar-icon'>
                                            <ArchiveOutlinedIcon/> 
                                            <p className='option'>Archieve</p>
                                        </li>
                                    <li onClick={() => {
                                        setshowdeleted(true);
                                        setshownotes(false);
                                        setshowarchieved(false)
                                        setshowpinned(false)
                                        setlogoarea('Trash')}} className='bar-icon'>
                                            <DeleteOutlinedIcon/><p className='option'>Trash</p> 
                                    </li>
                                </div>
                            ) :
                            (
                                <div onClick={() => {setshowbar(true)}}>
                                    <li className='bar-icon'><LightbulbOutlinedIcon/></li>
                                    <li className='bar-icon'><ArchiveOutlinedIcon/></li>
                                    <li className='bar-icon'><DeleteOutlinedIcon/></li>
                                </div>
                            )
                    }
                </ul>
            </div>
            {
                shownotes ? (
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
                            {/* <textarea type="text" 
                            placeholder='Take a note...' 
                            value={description} 
                            onChange={(e) => setdescription(e.target.value)}
                            /> */}
                            <TextareaAutosize
                                placeholder='Take a Note'
                                value={description}
                                onChange={
                                    (e) => onChangeHandler(e)
                                }
                            />
                            <br/>
                                <button disabled={!title || !description ? true : false } onClick={AddNote}>close</button>
                            </div>
                        }
                    </div>
                ) : null
            }
        </div> 
        <div>
        {
        showpinned ? (
                    pinned.length !== 0 ? (
                        <div>
                            <div className='pinned-notes'>
                                <h6>
                                    Pinned
                                </h6>
                                <br/>
                                {
                                    pinned.map((note) => 
                                    <PinnedNote id = {note.id} title = {note.title} description = {note.description} handleDelete={handleDelete} username={props.location.state}/>
                                    )
                                }
                                <br/>
                            </div>
                            <h6 className='other'>Others</h6>
                        </div>
                    ) : null
                ): null
                }

        

        <div className='notes-list' style={height === NaN || height < 100 ? (
            {
                'marginTop' : '170px'
            }
        ) : (
            {
                'marginTop' : height + 120
            }
        )}>
            {
                shownotes ? 
                    (
                            notes.filter((note) => note.title.includes(search) || note.description.includes(search))   
                                .map(
                                    (note) => <div key={note.id} style={colorStyle}><Note id={note.id} title={note.title} description={note.description} handleDelete={handleDelete}
                                    handleArchieve={handleArchieve} handlePin={handlePin} username={props.location.state} headers={headers} user_id = {id}/> 
                                    </div>)
                        ) 
                    : null
            }
            {
                showdeleted ? 
                (
                    trash.length !== 0 ? (
                        <div>
                            {
                                trash.filter((note) => note.title.toLowerCase().includes(search) || note.description.toLowerCase().includes(search)).map(
                                    (note) => 
                                    <DeletedNote id={note.id} title={note.title} description={note.description} user_id={id} username={props.location.state}/>
                                    )
                            }
                        </div>
                    ) : (
                        <div className='no_deleted'>
                            <h1>No Deleted Notes Here !!!</h1>
                            <br/>
                            <DeleteOutlineOutlinedIcon className='icons'/>
                        </div>
                    )
                ) : null
            }
            {
                showarchieved ? (
                    archieved.length !== 0 ? 
                    (
                            <div>
                                {
                                    archieved.filter((note) => note.title.toLowerCase().includes(search) || note.description.toLowerCase().includes(search)).map(
                                        (note) => 
                                        <ArchievedNote id={note.id} title={note.title} description={note.description} user_id={id} username={props.location.state} handleDelete={handleDelete}/>
                                        )
                                }
                            </div>
                    ) :
                    (
                            <div className='no_archieved'>
                                <h1>No Archived Notes Here !!!</h1>
                                <br/>
                                <ArchiveTwoToneIcon className="icons"/>
                        </div>
                    )
                ) : null
            }
            </div>
        </div>
    </div>
  )
}

export default HomeComponent