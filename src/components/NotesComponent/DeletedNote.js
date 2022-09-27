import React from 'react'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForever from '@mui/icons-material/DeleteForever';
import axios from 'axios';


const DeletedNote = ({id ,title ,description , user_id}) => {


    const handleRestore = () =>
    {
        axios.post(
            `http://localhost:8080/user/${user_id}/restore/${id}` , 
            {} , 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
        ).then((res) => console.log(res))
        {window.location.reload(true)}
    }


    const handleDelete = () =>
    {
        axios.delete(`http://localhost:8080/user/${user_id}/remove/${id}`).then((res) => console.log(res))
        {window.location.reload(true)}
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