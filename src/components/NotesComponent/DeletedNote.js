import React from 'react'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForever from '@mui/icons-material/DeleteForever';
import axios from 'axios';


const DeletedNote = ({id ,title ,description , user_id , username}) => {

    
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
    <div className='notes' key={id}>
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