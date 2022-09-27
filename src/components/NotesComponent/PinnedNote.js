import React from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import axios from 'axios';

const PinnedNote = ({id , title , description}) => {

    const unPin = async () =>
    {
        await axios.post(
            `http://localhost:8080/user/pin/${id}`
        )

        window.location.reload(true)
    }

  return (
    <div className='notes'>
        <p className='unpin' onClick={() => {
            unPin(id)
        }}><CancelRoundedIcon/></p>
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
    </div>
  )
}

export default PinnedNote