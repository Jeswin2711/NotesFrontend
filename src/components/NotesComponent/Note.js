import React,{useEffect, useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ArchiveOutlined from '@mui/icons-material/ArchiveOutlined';


const Note = ({id ,title ,description , handleDelete , handleArchieve , username , handlePin , headers , user_id}) => {

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
        axios.get(
            `http://localhost:8080/user/${user_id}/getnote/${id}`,
            headers
        ).then((res) => setbgcolor(res.data['data'].color))
    } , [])

    function DropDownItem({id})
    {
        return <div className='dropdown'>
            <p onClick={() => {
                handleDelete(id)
            }}>Delete</p>
        </div>
    }


    async function setColor(id , color)
    {
        await axios.post(
            `http://localhost:8080/user/${id}/setbackground/${color}`,
            {} ,
            headers
        ).then((res) => console.log("Updated"))
    }


    async function updateNote()
    {
        await axios.put(
            `http://localhost:8080/user/${username}/update/${id}`,
            {
                title : notetitle , 
                description : notedescription
            },headers
        )

        window.location.reload(true)
    }

    function ColorDropDown()
    {
        return  <div>
                <div className='colordropdown'>
                    <p style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            backgroundColor: 'antiquewhite'}} 
                        className="color-circle" 
                        onClick={() => setcolorshow(true) & setColor(id , 'antiquewhite') & setbgcolor('antiquewhite')}
                        >
                    </p>
                    <p style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'red'}} 
                    className="color-circle" onClick={() =>  setcolorshow(true) & setColor(id , 'red') & setbgcolor('red')}></p>
                    <p style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'yellow'}} 
                    className="color-circle" onClick={() =>  setcolorshow(true) & setColor(id , 'yellow') & setbgcolor('yellow')}></p>
                    <p style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'lightcoral'}} 
                    className="color-circle" onClick={() => setColor(id , 'lightcoral') & setcolorshow(true) & setbgcolor('lightcoral')}></p>
                    <p style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'lightblue'}} 
                    className="color-circle" onClick={() => setColor(id , 'lightblue') & setcolorshow(true) & setbgcolor('lightblue')}></p>
                    <p style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'lightgreen'}} 
                    className="color-circle" onClick={() => setColor(id , 'lightgreen') & setcolorshow(true) & setbgcolor('lightgreen')}>
                    </p>
                    <p style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'purple'}} 
                    className="color-circle" onClick={() => setColor(id , 'purple') & setcolorshow(true) & setbgcolor('purple')}></p>
                    <p style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'aquamarine'}} 
                    className="color-circle" onClick={() => setColor(id , 'aquamarine') & setcolorshow(true) & setbgcolor('aquamarine')} ></p>
                    <p style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    textAlign : 'center'
                }}
                    className = {"color-circle"} onClick={() => setbgcolor('white') & setColor(id , 'white') & setcolorshow(false)}>x</p>
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
                        setbgcolor(`url(https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg)`) 
    
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
                        <textarea value={notedescription} onChange={(e) => setdescription(e.target.value)} scrol/>
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
                                            <ArchiveOutlined onClick={() => handleArchieve(id)}/>
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