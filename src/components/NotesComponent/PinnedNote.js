import React , { useState} from 'react'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArchiveTwoTone from '@mui/icons-material/ArchiveTwoTone';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';

const PinnedNote = ({id , title , description , username , bg_color  , user_id , handleArchieve}) => {

    const [open, setopen] = useState(false)

    const headers = {
        headers : {
            Authorization :`Bearer ${localStorage.getItem(username)}`,
            "Access-Control-Max-Age":1728000
            
        }
    } 

    const unPin = async () =>
    {
        await axios.post(
            `http://localhost:8080/user/pin/${id}`, {} ,
            headers
        )

        window.location.reload(true)
    }



    function DropDownItem()
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
    async function handleDelete()
    {

        const DELETE_URL = "http://localhost:8080/user"+`/${user_id}/delete/${id}`;

        await axios.delete(DELETE_URL , headers).then((res) => console.log("Deleted Successfully" + res))

        window.location.reload(true)
    }



  return (
    <div className='notes'
    style={bg_color === null ? (
        {
            'backgroundColor' : 'white'
        }) : (
            bg_color.length < 15 ?
                (
                    {
                        'backgroundColor' : bg_color
                    }
                ) : 
                (
                    {
                        'backgroundImage' : `url(https://www.gstatic.com/keep/backgrounds/${bg_color})`
                    }
                )
        )
    }
    >
        <p className='pin' onClick={() => {
            unPin(id)
        }}
        style={{
            'marginTop' : 10
        }}
        ><Tooltip title="Unpin"><PushPinRoundedIcon/></Tooltip></p>
        <p>
            {
                title
            }
        </p>
        <p>
            {
                description
            }
        </p>
        <div className='options'>
            <p><Tooltip title="Archive"><ArchiveTwoTone onClick={() => handleArchieve(id)}/></Tooltip></p>
            <p><MoreVertIcon onClick={() => {setopen(!open)}}/></p>
            {
                open ? <DropDownItem />
                : null
            }
        </div>
    </div>
  )
}

export default PinnedNote