import React from 'react'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForever from '@mui/icons-material/DeleteForever';
import axios from 'axios';


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
                                    {title}
                                    <br/>
                                    {description}
                                    <div className='option'>
                                        <p onClick={() => {handleDelete()}}><DeleteForever/></p>
                                        <p onClick={() => {handleRestore()}}><RestoreFromTrashIcon/></p>
                                    </div>
     </div>
  )
}

export default DeletedNote