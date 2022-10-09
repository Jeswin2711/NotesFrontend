import React , { useState} from 'react'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PinnedNote = ({id , title , description , username , bg_color  , user_id }) => {

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
        return <div className='dropdown'>
            <p onClick={() => {
                handleDelete()
            }}>Delete</p>
        </div>
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
        <p className='unpin' onClick={() => {
            unPin(id)
        }}><PushPinRoundedIcon/></p>
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

        <div className='option'>
            <MoreVertIcon onClick={() => {setopen(!open)}}/>
            {
                open ? <DropDownItem />
                : null
            }
        </div>
    </div>
  )
}

export default PinnedNote