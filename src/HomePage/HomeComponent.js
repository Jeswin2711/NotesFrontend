import React , {useEffect, useState} from 'react'
import Search from '../components/NotesComponent/SearchBar'
import './css/home.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import FooterComponent from '../components/Footer/FooterComponent';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReplayIcon from '@mui/icons-material/Replay';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';


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

    const [showpinned, setshowpinned] = useState(true)

    const [title, settitle] = useState('')

    const [description, setdescription] = useState('')

    const [open, setopen] = useState(false)

    const [height, setheight] = useState(0)

    const [bgcolor, setbgcolor] = useState()
    
    const [clickednotes, setclickednotes] = useState(false)

    const [clickedarchive, setclickedarchive] = useState(false)

    const [clickeddelete, setclickeddelete] = useState(false)

    const [gridchange, setgridchange] = useState(true)

    const [showsetting, setshowsetting] = useState(false)

    const [display, setdisplay] = useState('row')

    const colorStyle = {
        background : bgcolor
        }

    let others = false
    


    const GET_USET_ID_URL =  `http://localhost:8080/user/${props.location.state}`


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
        .then(async (res) => {
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

        const closeAddDialogBox = (e) => {
            if(e.path['0'].tagName !== 'INPUT')
            {
                setvisible(false)
            }
        }

        document.body.addEventListener('click' , closeAddDialogBox)

        return () => document.body.removeEventListener('click' , closeAddDialogBox)

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


    function logout()
    {
        localStorage.removeItem(`${props.location.state}`)
    }


    function onChangeHandler (e)
    {
        setheight(parseInt(e.target.style.height,10))
        setdescription(e.target.value)
    }


    const style={
        'marginLeft':10,
        'fontFamily':'sans-serif',
        'border':'none',
        'outline':'none',
        'borderRadius':20,
        'marginTop':10,
        'transition':'0.6s',
        'paddingLeft':20,
        'marginTop':-20,
    }

    const icons = {
        'paddingLeft':20 , 
        'transform' : 'scale(0.8)',
        'marginTop' : -20                            
    }

    const textStyle =  {
        'fontSize' : 11,
        'fontStyle':'normal'
    }

  return (
    <div>   
        <div className='home'>
            <p onClick={() => setshowbar(!showbar)} className="densityicon">
                <DensityMediumIcon/>
            </p>
            {
                logoarea === null ?  (
                    <div className='logo'>
                        <img src="https://play-lh.googleusercontent.com/9bJoeaPbGTB8Tz_h4N-p-6ReRd8vSS-frZb2tmJulaGIoTKElKj3zpmcFJvnS96ANZP5=w600-h300-pc0xffffff-pd" width="130px" height="60px"/>
                        <h4>Keep</h4>
                    </div>
                    
                ) : 
                (
                    <div className='logo'>
                        <p>{logoarea}</p>
                    </div>
                )
            }
            <Search handleSearch={setsearch} />
            <div className='top-icons'>
                <p><Tooltip title="Reload"><ReplayIcon onClick={() => window.location.reload(true)}/></Tooltip></p>
                <p>
                {
                    gridchange ? 
                        (
                            <Tooltip title="Layout">
                                <ViewAgendaOutlinedIcon onClick={() => setgridchange(!gridchange) 
                                & setdisplay('column')}/></Tooltip>
                            
                        ) 
                        : 
                        (
                            <Tooltip title="Layout"><GridViewIcon onClick={
                                () => setgridchange(!gridchange) &
                                setdisplay('row')
                                }/></Tooltip>
                        )
                }
                </p>
                <p><SettingsOutlinedIcon onClick={() => setshowsetting(true)}/></p>
            </div>
            <div className="account"style={{'marginLeft' : '33%' , 'marginTop' : 14 }}>
                <Avatar alt="J" src="https://st3.depositphotos.com/32100976/34458/i/600/depositphotos_344585916-stock-photo-anime-wallpapers-black-white-anime.jpg" onClick={() => {setopen(!open)}} />
                {
                    open ? <Box style={{'position' : 'fixed' , }}>
                                <Paper elevation={6} style={{
                                    'marginLeft' : -140,
                                    'marginTop' : 12,
                                    'textAlign' : 'center',
                                    'paddingRight' : 15,
                                    'paddingLeft' : 5,
                                    'paddingTop' : 5,
                                    'paddingBottom' : 5,
                                    'fontFamily' : 'sans-serif',
                                    'fontSize' : 17,
                                    'fontWeight' : 200
                                }}>
                                <Link
                                    to={{
                                        pathname : "/reset-password",
                                        state : props.location.state
                                    }}
                                    style={{
                                        'textDecoration' : 'none',
                                        'color' : 'black'
                                    }}
                                >
                                    <a > Reset Password </a>
                                </Link>
                                <a href='/login' style={{
                                    'textDecoration' : 'none',
                                    'color' : 'black'
                                }}>
                                    Logout
                                </a>
                                </Paper>
                        </Box> : null
                }
            </div>
            <div
            className='side-bar'
            onMouseOut={() => setshowbar(false)}
            onMouseOver={() => {setshowbar(true)}}
            >
                <ul>
                    {
                        showbar ? 
                            (
                                <div onClick={() => {setshowbar(true)}} style={{
                                    'paddingRight':40

                                }}className="tab" >
                                    <li onClick={() => {
                                            setlogoarea(null);
                                            setshownotes(true);
                                            setshowdeleted(false);
                                            setshowarchieved(false);
                                            setshowpinned(true)
                                            setclickednotes(true)
                                            setclickedarchive(false)
                                            setclickeddelete(false)
                                            }} 
                                            style={
                                                clickednotes ? ({'backgroundColor':'rgb(255, 213, 128)'}) : ({'backgroundColor':'white'})
                                            }
                                            className="tab_show"
                                            >
                                            <LightbulbOutlinedIcon/>
                                            <p>Notes</p>
                                    </li>
                                    <li onClick={() => {
                                        setlogoarea('Archieve');
                                        setshownotes(false);
                                        setshowdeleted(false);
                                        setshowarchieved(true);
                                        setshowpinned(false)
                                        setclickednotes(false)
                                        setclickedarchive(true)
                                        setclickeddelete(false)
                                        }} style={
                                            clickedarchive ? ({'backgroundColor':'rgb(255, 213, 128)'}) : ({'backgroundColor':'white'})
                                        }
                                        className="tab_show"
                                        >
                                            <ArchiveOutlinedIcon/>
                                            <p>Archieve </p>
                                        </li>
                                    <li onClick={() => {
                                        setshowdeleted(true);
                                        setshownotes(false);
                                        setshowarchieved(false)
                                        setshowpinned(false)
                                        setclickednotes(false)
                                        setclickedarchive(false)
                                        setclickeddelete(true)
                                        setlogoarea('Trash')}
                                    } 
                                        style={
                                            clickeddelete ? ({'backgroundColor':'rgb(255, 213, 128)'}) : ({'backgroundColor':'white'})
                                        }
                                        className="tab_show"
                                        >
                                            <DeleteOutlinedIcon/>
                                            <p>Trash</p> 
                                    </li>
                                </div>
                            ) :
                            (
                                <div className='bar-icon'>
                                    <li><LightbulbOutlinedIcon/></li>
                                    <li><ArchiveOutlinedIcon/></li>
                                    <li><DeleteOutlinedIcon/></li>
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
            pinned.length !== 0 ? 
            (
                showpinned ? 
                (
                    <div className={display === 'column' ? 'notes-list-column' : 'notes-list'} style={
                        height === 0 ? ({'marginTop' : 170 , flexDirection:display}) : (height !== 0 ? ({'marginTop' : 150 + height}) : null) 
                    }>
                        <h6 style={{
                            'position' : 'absolute',
                            'marginTop' : -30,
                            'fontFamily':'sans-serif',
                            'fontWeight':'normal'
                        }}>PINNED</h6>                
                        {
                            pinned.map((note) => 
                            <div key={note.id}>
                                <PinnedNote id = {note.id} title = {note.title} description = {note.description} handleDelete={handleDelete} 
                                username={props.location.state} 
                                bg_color = {note.color}
                                user_id = {id} 
                                handleArchieve = {handleArchieve}
                                />
                            </div>
                            )
                        }
                        <br/>
                        {
                            others = true
                        }  
                    </div>
                ) : null
            ) : null
        }
        {
            others ? <h6 style={
                {
                    'position' : 'relative',
                    'marginLeft' : 280,
                    'fontFamily':'sans-serif',
                    'fontWeight':'normal'

                }
            }>OTHERS</h6> : null
        }
        {
            shownotes ? 
            (
                <div className={display === 'column' ? 'notes-list-column' : 'notes-list'}
                style={
                    height === 0 & pinned.length !== 0 ? ({'marginTop' : 10 , flexDirection:display}) : 
                    (
                        height === 0 & pinned.length === 0 ? ({'marginTop' : 170 , flexDirection:display}) : (height !== 0 & pinned.length === 0? ({'marginTop' : 170 + height , flexDirection:display}) : null)
                    )
                }
                >
                        {
                        notes.filter((note) => note.title.includes(search) || note.description.includes(search))   
                            .map((note) => <div  key={note.id} style={colorStyle}>
                                <Note id={note.id} title={note.title} description={note.description} handleDelete={handleDelete}
                                handleArchieve={handleArchieve} handlePin={handlePin} username={props.location.state} headers={headers} user_id = {id}/> 
                                </div>)
                            }
                </div>
                ) 
            : null
        }
        <div>
        {
            showdeleted ? 
            (
                trash.length !== 0 ? (
                    <div className='notes-list' style={{
                        'marginTop' : '70px',
                        'flexDirection':display
                    }}>
                        {
                            trash.filter((note) => note.title.toLowerCase().includes(search) || note.description.toLowerCase().includes(search))
                            .map(
                                (note) =>  <div key={note.id}>
                                <DeletedNote id={note.id} title={note.title} description={note.description} 
                                user_id={id} username={props.location.state} bg_color={note.color}/></div>
                                )
                        }
                    </div>
                ) : (
                    <div style={{
                        'textAlign' : 'center'
                    }}>
                        <h1>No Deleted Notes Here !!!</h1>
                        <br/>
                        <DeleteOutlineOutlinedIcon/>
                    </div>
                )
            ) : null
        }
        </div>
        <div>
        {
            showarchieved ? (
                archieved.length !== 0 ? 
                (
                    <div className='notes-list' style={{
                        'marginTop' : '70px'
                    }}>
                        {
                            archieved.filter((note) => note.title.toLowerCase().includes(search) || note.description.toLowerCase().includes(search)).map(
                                (note) => <div key={note.id}>
                                <ArchievedNote id={note.id} title={note.title} description={note.description} user_id={id} 
                                username={props.location.state} 
                                handleDelete={handleDelete}
                                bg_color={note.color}/></div>
                                )
                        }
                    </div>
                ) :
                (
                    <div style={{
                        'textAlign' : 'center'
                    }}>
                        <h1>No Archived Notes Here !!!</h1>
                        <br/>
                        <ArchiveTwoToneIcon/>
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