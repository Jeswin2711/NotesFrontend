import React,{useState} from 'react'
import axios from 'axios';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ArchievedNote = ({id ,title ,description , user_id}) => {


    const [open, setopen] = useState(false)



    const handleUnArchieve = async () =>
    {

            const ARCHIEVE_URL = `http://localhost:8080/user/archieve/${user_id}/${id}`;
    
            await axios.post(
                ARCHIEVE_URL, {} ,
                {
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((res) => console.log(res));
            {window.location.reload(true)}
        }


    const handleDelete = () =>
    {
        axios.delete(`http://localhost:8080/user/${user_id}/delete/${id}`).then((res) => console.log(res))
        {window.location.reload(true)}
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
    <div>
        <div className='notes' key={id}>
                                        {title}
                                        <br/>
                                        {description}
                                        {user_id}
                                        <div className='option'>
                                            <p onClick={() => {handleUnArchieve()}}><UnarchiveIcon/></p>
                                            <div className='option'>
                                            <MoreVertIcon onClick={() => {setopen(!open)}}/>
                                            {
                                                open ? <DropDownItem id={id}/>
                                                : null
                                            }
                                        </div>
                                        </div>
        </div>
     </div>
  )
}

export default ArchievedNote