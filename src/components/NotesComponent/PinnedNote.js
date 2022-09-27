import React , { useState} from 'react'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PinnedNote = ({id , title , description , handleDelete}) => {

    const [open, setopen] = useState(false)

    const unPin = async () =>
    {
        await axios.post(
            `http://localhost:8080/user/pin/${id}`
        )

        window.location.reload(true)
    }


    function DropDownItem({id})
    {
        return <div className='dropdown'>
            <p onClick={() => {
                handleDelete(id)
            }}>Delete</p>
        </div>
    }

  return (
    <div className='notes'>
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
                open ? <DropDownItem id={id}/>
                : null
            }
        </div>
    </div>
  )
}

export default PinnedNote