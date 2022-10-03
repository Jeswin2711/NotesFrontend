import React,{useEffect, useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { width } from '@mui/system';

const Note = ({id ,title ,description , handleDelete , handleArchieve , username , handlePin , }) => {

    const [open, setopen] = useState(false)

    const [editable, seteditable] = useState(false)

    const [notetitle, settitle] = useState('')

    const [notedescription, setdescription] = useState('')

    const [bgcolor, setbgcolor] = useState()

    const [bgimg, setbgimg] = useState()

    const [colorpalette, setcolorpalette] = useState(false)

    const [colorshow, setcolorshow] = useState(false)

    const [imgshow, setimgshow] = useState(false)


    useEffect(() => {
        settitle(title)
        setdescription(description)
    } , [])

    function DropDownItem({id})
    {
        return <div className='dropdown'>
            <p onClick={() => {
                handleDelete(id)
            }}>Delete</p>
            <p onClick={() => {
                handleArchieve(id)
            }}>Archieve</p>
        </div>
    }


    async function updateNote()
    {
        await axios.put(
            `http://localhost:8080/user/${username}/update/${id}`,
            {
                title : notetitle , 
                description : notedescription
            }
        )

        window.location.reload(true)
    }

    function ColorDropDown()
    {
        return <div>
            <div className='colordropdown'>
                <p style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: 'antiquewhite'}} className="color-circle" onClick={() => setbgcolor('antiquewhite') & setcolorshow(true)}></p>
                <p style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'red'}} className="color-circle" onClick={() => setbgcolor('red') & setcolorshow(true) }></p>
                <p style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'yellow'}} className="color-circle" onClick={() => setbgcolor('yellow') & setcolorshow(true)}></p>
                <p style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'lightcoral'}} className="color-circle" onClick={() => setbgcolor('lightcoral') & setcolorshow(true)}></p>
                <p style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'lightblue'}} className="color-circle" onClick={() => setbgcolor('lightblue') & setcolorshow(true) }></p>
                <p style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'lightgreen'}} className="color-circle" onClick={() => setbgcolor('lightgreen') & setcolorshow(true) }></p>
                <p style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'purple'}} className="color-circle" onClick={() => setbgcolor('purple') & setcolorshow(true)}></p>
                <p style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'aquamarine'}} className="color-circle" onClick={() => setbgcolor('aquamarine')} ></p>
                <p style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                textAlign : 'center'
            }}
                className = {"color-circle"} onClick={() => setbgcolor('white') & window.location.reload(true)}>x</p>
            </div>
            <div className='imgdropdown'>
                <p
                    className='img-circle'
                    style={{
                        backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg)`,
                        width:20,
                        height:20,
                        borderRadius:'50%'
                    }}
                    onClick={() => 
                    setbgimg(`url(https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg)`) 
                    & 
                    setbgcolor(false) 
                    & 
                    setimgshow(true)}>  </p>
                <p
                    className='img-circle'
                    style={{
                        backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg)`,
                        width:20,
                        height:20,
                        borderRadius:'50%'
                    }}
                    onClick={() => 
                    setbgimg(`url(https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg)`) 
                    & 
                    setbgcolor(false) 
                    & 
                    setimgshow(true)}>  </p>
                <p
                    className='img-circle'
                    style={{
                        backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg)`,
                        width:20,
                        height:20,
                        borderRadius:'50%'
                    }}
                    onClick={() => 
                    setbgimg(`url(https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg)`) 
                    & 
                    setbgcolor(false) 
                    & 
                    setimgshow(true)}>  </p>
                <p
                    className='img-circle'
                    style={{
                        backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg)`,
                        width:20,
                        height:20,
                        borderRadius:'50%'
                    }}
                    onClick={() => 
                    setbgimg(`url(https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg)`) 
                    & 
                    setbgcolor(false) 
                    & 
                    setimgshow(true)}>  </p>
                <p
                    className='img-circle'
                    style={{
                        backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg)`,
                        width:20,
                        height:20,
                        borderRadius:'50%'
                    }}
                    onClick={() => 
                    setbgimg(`url(https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg)`) 
                    & 
                    setbgcolor(false) 
                    & 
                    setimgshow(true)}>  </p>
                <p
                className='img-circle'
                style={{
                    backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg)`,
                    width:20,
                    height:20,
                    borderRadius:'50%'
                }}
                onClick={() => 
                setbgimg(`url(https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg)`) 
                & 
                setbgcolor(false) 
                & 
                setimgshow(true)}>  </p>
                <p
                className='img-circle'
                style={{
                    backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg)`,
                    width:20,
                    height:20,
                    borderRadius:'50%'
                }}
                onClick={() => 
                setbgimg(`url(https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg)`) 
                & 
                setbgcolor(false) 
                & 
                setimgshow(true)}>  </p>
            </div>
        </div>
        
    }

    const colorStyle = {
        background : bgcolor
        }

    const imgStyle = {
        backgroundImage : bgimg
    }
    

  return (
    <div>
        <div>
            {editable ? ( 
                <section className='update-note'>
                         <p className='close'>
                            <button onClick={() => {window.location.reload(true)}}><CloseIcon/></button>
                        </p>
                        <input value={notetitle} onChange={
                            (e) => settitle(e.target.value)
                        }/>
                        <textarea value={notedescription} onChange={(e) => setdescription(e.target.value)}/>
                        <button onClick={() => {
                            updateNote()
                        }} className="update">update</button>
                </section>
                )
                : (
                    <div className='notes' key={id} style={bgcolor ? colorStyle : imgStyle}>
                                        <div className='pin'>
                                            <p onClick={() => {
                                            handlePin(id)
                                        }}>
                                            <PushPinOutlinedIcon/>
                                        </p>
                                            
                                        </div>
                                        <div onClick={() => {seteditable(!editable)}}>
                                        {notetitle}
                                        <br/>
                                        {notedescription}
                                        </div>
                                        <div className='option'>
                                            <ColorLensIcon onClick={() => {setcolorpalette(!colorpalette)}}/>
                                            {
                                                colorpalette ? <ColorDropDown /> : null
                                            }
                                            <MoreVertIcon onClick={() => {setopen(!open)}}/>
                                            {
                                                open ? <DropDownItem id={id}/>
                                                : null
                                            }
                                        </div>
                        </div>
                        )
            }
        </div>                           
    </div>
  )
}

export default Note