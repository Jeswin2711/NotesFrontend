import React,{useState} from 'react'
import axios from 'axios';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';


const ArchievedNote = ({id ,title ,description , user_id , username , bg_color}) => {


    const [open, setopen] = useState(false)

    const headers = {
        headers : {
            Authorization :`Bearer ${localStorage.getItem(username)}`,
            "Access-Control-Max-Age":1728000
        }
    } 

    const handleUnArchieve = async () =>
    {

            const ARCHIEVE_URL = `http://localhost:8080/user/archieve/${user_id}/${id}`;
    
            await axios.post(
                ARCHIEVE_URL, {} ,
                headers
            ).then((res) => console.log(res));
            window.location.reload(true)
    }


    const handleDelete = async () =>
    {
        await axios.delete(`http://localhost:8080/user/${user_id}/delete/${id}`,headers).then((res) => console.log(res))
        window.location.reload(true)
    }


    function DropDownItem(id)
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

  return (
        <div className='notes' 
        style={
            bg_color === null ? (
            {
                'backgroundColor' : 'white',
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
            <div>
                <p style={{'fontWeight': 500}}>{title}</p>
                <br/>
                <p style={{'fontWeight': 300}}>{description}</p>
            </div>
            <div className='options'>
                <p><Tooltip title="UnArchive"><UnarchiveIcon onClick={() => {handleUnArchieve()}}/></Tooltip></p>
                <p><MoreVertIcon onClick={() => {setopen(!open)}}/></p>
                {
                    open ? <DropDownItem id={id}/>
                    : null
                }
            </div>
        </div>
  )
}

export default ArchievedNote