import React,{useEffect, useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ArchiveOutlined from '@mui/icons-material/ArchiveOutlined';
import Dialog from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Tooltip from '@mui/material/Tooltip';


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
        )
        .then((res) => {
            if(res.data['data'].color !==  null)
            {
                if(res.data['data'].color.length < 15)
                {
                    setbgcolor(res.data['data'].color)
                }
                else
                {
                    setbgcolor(`url(https://www.gstatic.com/keep/backgrounds/${res.data['data'].color})`)
                }
            }
            else
            {
                setbgcolor('white')
            }
        })

        const paintButtonListener = (e) => 
        {
            console.log(e)
            if(e.path['0'].tagName !== 'path')
            {
                setcolorpalette(false)
            }
        }
        document.body.addEventListener('click',paintButtonListener)
        return () => document.body.removeEventListener('click',paintButtonListener)
    } , [])

    function DropDownItem({id})
    {
        return <Box sx={{ position: 'absolute' , width : 80 , 
                        height : 18,
                        'marginTop' : 2 ,
                        'marginLeft' : 5 ,
                        'textAlign' : 'center',
                        'cursor' : 'pointer' 
                        }}>
                <Paper elevation={6}>
                        <p onClick={() => {
                            handleDelete(id)
                        }}
                        >Delete</p>
                </Paper>
        </Box>
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

        return <div>
            <ClickAwayListener onClickAway={() => setcolorpalette(false)}>
                <Box sx={{ position: 'absolute' }}>
                    {
                    colorpalette ? (
                        <Paper elevation={3} style={{
                            'marginLeft' : -150,
                            'marginTop' : 50
                        }}>
                            <div style={{'display' : 'flex' , 'cursor' : 'pointer'}} className="bgs">
                                <p style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: 'antiquewhite'}} 
                                className="color-circle" 
                                onClick={() => setcolorshow(true) & setColor(id , 'antiquewhite') & setbgcolor('antiquewhite')}></p>
                                <p style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: 'orange'}} 
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
                                backgroundColor: 'mediumaquamarine'}} 
                                className="color-circle" onClick={() => setColor(id , 'mediumaquamarine') & setcolorshow(true) & setbgcolor('mediumaquamarine')}></p>
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
                                backgroundColor: 'greenyellow'}} 
                                className="color-circle" onClick={() => setColor(id , 'greenyellow') & setcolorshow(true) & setbgcolor('greenyellow')}>
                                </p>
                                <p style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: 'lightgoldenrodyellow'}} 
                                className="color-circle" onClick={() => setColor(id , 'lightgoldenrodyellow') & setcolorshow(true) & setbgcolor('lightgoldenrodyellow')}></p>
                                <p style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: 'lightpink'}} 
                                className="color-circle" onClick={() => setColor(id , 'lightpink') & setcolorshow(true) & setbgcolor('lightpink')} ></p>
                                <p style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                textAlign : 'center'
                            }}
                                className = {"color-circle"} 
                                onClick={() => setbgcolor('white') & setColor(id , 'white') & 
                                setcolorshow(false)}>x</p>
                            </div>
                            <div style={{'display' : 'flex', 'cursor' : 'pointer'}} className="bgs"> 
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
                                & setColor(id , "grocery_light_thumb_0615.svg")}>  </p>
                            <p
                                className='img-circle'
                                style={{
                                    backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg)`,
                                    width:20,
                                    height:20,
                                    borderRadius:'50%'
                                }}
                                onClick={() => 
                                setbgcolor(`url(https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg)`) 
                                & 
                                setColor(id , "food_light_thumb_0615.svg")}>  </p>
                            <p
                                className='img-circle'
                                style={{
                                    backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg)`,
                                    width:20,
                                    height:20,
                                    borderRadius:'50%'
                                }}
                                onClick={() => 
                                    setbgcolor(`url(https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg)`) 
                                & 
                                setColor(id , "music_light_thumb_0615.svg")}>  </p>
                            <p
                                className='img-circle'
                                style={{
                                    backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg)`,
                                    width:20,
                                    height:20,
                                    borderRadius:'50%'
                                }}
                                onClick={() => 
                                setbgcolor(`url(https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg)`) 
                                & 
                                setColor(id , "places_light_thumb_0615.svg")}>  </p>
                            <p
                                className='img-circle'
                                style={{
                                    backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg)`,
                                    width:20,
                                    height:20,
                                    borderRadius:'50%'
                                }}
                                onClick={() => 
                                    setbgcolor(`url(https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg)`) 
                                & 
                                setColor(id ,"celebration_light_thumb_0715.svg")}>  </p>
                            <p
                            className='img-circle'
                            style={{
                                backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg)`,
                                width:20,
                                height:20,
                                borderRadius:'50%'
                            }}
                            onClick={() => 
                            setbgcolor(`url(https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg)`) 
                            & 
                            setColor(id , "video_light_thumb_0615.svg")}>  </p>
                            <p
                            className='img-circle'
                            style={{
                                backgroundImage : `url(https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg)`,
                                width:20,
                                height:20,
                                borderRadius:'50%'
                            }}
                            onClick={() => 
                            setbgcolor(`url(https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg)`) 
                            & 
                            setColor(id ,"recipe_light_thumb_0615.svg")}>  </p>
                            </div>
                    </Paper>
                            ) : null}
                </Box>
                </ClickAwayListener>
        </div>
    }

    const colorStyle = {
        background : bgcolor
        }

    const imgStyle = {
        backgroundImage : bgimg
    }
    

    const dialogbox = {
        'outline' : 'none',
        'border':'none',
        'fontFamily':'sans-serif',
        'width':420,
        'height':20,
        'fontSize':15,
        'backgroundColor' : 'transparent'
    }


    const styles = {
        dialogPaper: {
            minHeight: '80vh',
            maxHeight: '80vh',
        },
    };
    

  return ( 
    <div>
        <div>
            {editable ? ( 
                <div>
                    <Dialog open={editable} PaperProps={{
                         sx: {
                            width: "50%",
                            maxHeight: 500,
                            height:'50%'
                          }
                    }}>
                        <DialogTitle style={bgcolor.length < 15 ? (
                                {
                                    'backgroundColor' : bgcolor
                                }
                            )
                            : (
                                {
                                    'backgroundImage' : bgcolor
                                }
                            )}>Update Note</DialogTitle>
                        <DialogContent style={
                            bgcolor.length < 15 ? (
                                {
                                    'backgroundColor' : bgcolor
                                }
                            )
                            : (
                                {
                                    'backgroundImage' : bgcolor
                                }
                            )
                        }>
                            <input 
                                value = {notetitle} 
                                onChange = {(e) => settitle(e.target.value)}
                                style={dialogbox}
                            />
                            <br/>
                            <TextareaAutosize
                                value = {notedescription} 
                                onChange = {(e) => setdescription(e.target.value)}
                                // style={dialogbox}
                                style = {
                                    {
                                        'backgroundColor' : 'transparent',
                                        'outline' : 'none',
                                        'border' : 'none',
                                        'fontFamily' :'sans-serif',
                                        'width' : '100%',
                                        'resize' : 'none'
                                    }
                                }
                            />
                        </DialogContent>
                        <DialogActions style={
                            bgcolor.length < 15 ? (
                                {
                                    'backgroundColor' : bgcolor,
                                        'position' : 'absolute',
                                        'marginTop' : 250
                                }
                            )
                            : (
                                {
                                    'backgroundImage' : bgcolor,
                                        'position' : 'absolute',
                                        'marginTop' : 250
                                })}>
                            <p style={{'marginLeft' : 120}}><ColorLensIcon onClick={() => {setcolorpalette(!colorpalette)}}/></p>
                            {
                                colorpalette ?  <ColorDropDown /> : null
                            }
                            <ArchiveOutlined onClick={() => handleArchieve(id)} style={{'marginLeft' : 120}}/>
                            <MoreVertIcon onClick={() => {setopen(!open)}} style={{'marginLeft' : 120}}/>
                            {
                                open ? <DropDownItem id={id}/>
                                : null
                            }
                            <Button style={{'marginLeft' : 90}} onClick={() => {updateNote()}}>close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                )
                : (
                    <div className='notes' key={id} style={bgcolor ? colorStyle : imgStyle}>
                        <p onClick={() => {
                            handlePin(id)
                        }}>
                            <Tooltip title="Pin" className='pin'><PushPinOutlinedIcon/></Tooltip>
                        </p>
                        <div onClick={() => {seteditable(!editable)}}>
                            {notetitle}
                            <br/>
                            {notedescription}
                        </div>
                        <div className='options'>
                            <p><Tooltip title="Color"><ColorLensIcon onClick={() => {setcolorpalette(!colorpalette)}}/></Tooltip></p>
                            {
                                colorpalette ? <ColorDropDown />: null
                            }
                            <p><Tooltip title="Archive"><ArchiveOutlined onClick={() => handleArchieve(id)}/></Tooltip></p>
                            <p><MoreVertIcon onClick={() => {setopen(!open)}}/></p>
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