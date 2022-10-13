import React , {useState} from 'react'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForever from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import {Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const DeletedNote = ({id ,title ,description , user_id , username , bg_color}) => {

        
    const [alert, setalert] = useState(false)

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
    alert ? (
        <Dialog open={alert}>
            <DialogContent>
                Are you sure want to delete it ?
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDelete()}>Delete</Button>
                <Button onClick={() => window.location.reload(true)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    ) : 
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
        <p style={{'fontWeight': 500}}>{title}</p>
        <br/>
        <p style={{'fontWeight': 300}}>{description}</p>
        <div className='options'>
            <Tooltip title="Delete Forever"><DeleteForever onClick={() => {setalert(true)}}/></Tooltip>
            <Tooltip title="Restore"><RestoreFromTrashIcon onClick={() => {handleRestore()}}/></Tooltip>
        </div>
     </div>
  )
}

export default DeletedNote