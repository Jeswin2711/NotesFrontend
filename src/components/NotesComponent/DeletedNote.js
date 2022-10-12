import React from 'react'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForever from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { Tooltip } from '@mui/material';

const DeletedNote = ({id ,title ,description , user_id , username , bg_color}) => {

    
    const headers = {
        headers : {
            Authorization :`Bearer ${localStorage.getItem(username)}`,
            "Access-Control-Max-Age":1728000
            
        }
    } 


    const handleRestore = async () =>
    {
        await axios.post(
            `http://localhost:8080/user/${user_id}/restore/${id}` , 
            {} , 
            headers
        ).then((res) => console.log(res))

        window.location.reload(true)
    }


    const handleDelete = async () =>
    {
        await axios.delete(`http://localhost:8080/user/${user_id}/remove/${id}`,headers).then((res) => console.log(res))
        window.location.reload(true)
    }


  return (
    <div className='notes' key={id} 
    style={bg_color === null ? (
        {
            'backgroundColor' : 'white','height':120
        }) : (
            bg_color.length < 15 ?
                (
                    {
                        'backgroundColor' : bg_color,'height':120
                    }
                ) : 
                (
                    {
                        'backgroundImage' : `url(https://www.gstatic.com/keep/backgrounds/${bg_color})`,'height':120
                    }
                )
        )
    }
    >
                                    {title}
                                    <br/>
                                    {description}
                                    <div className='options'>
                                        <Tooltip title="Delete Forever"><DeleteForever onClick={() => {handleDelete()}}/></Tooltip>
                                        <Tooltip title="Restore"><RestoreFromTrashIcon onClick={() => {handleRestore()}}/></Tooltip>
                                    </div>
     </div>
  )
}

export default DeletedNote