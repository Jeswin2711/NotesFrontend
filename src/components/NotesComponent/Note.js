import React,{useEffect, useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

const Note = ({id ,title ,description , handleDelete , handleArchieve , username , handlePin}) => {

    const [open, setopen] = useState(false)

    const [editable, seteditable] = useState(false)

    const [notetitle, settitle] = useState('')

    const [notedescription, setdescription] = useState('')


    useEffect(() => {
        settitle(title)
        setdescription(description)
        console.log("Note title" + notetitle)
        console.log("note " + notedescription)
    } , [])

    function DropDownItem({id})
    {
        return <div className='dropdown'>
            <p onClick={() => {
                handleDelete(id)
            }}>Delete</p>
            <p onClick={() => {
                handleArchieve(id)
            }}>Archieve</p>
        </div>
    }


    function updateNote()
    {
        axios.put(
            `http://localhost:8080/user/${username}/update/${id}`,
            {
                title : notetitle , 
                description : notedescription
            }
        )
    }

    

  return (
    <div>
        <div>
            {editable ? <section className='notes updatenote'>
                    <input value={notetitle} onChange={
                        (e) => settitle(e.target.value)
                    }/>
                    <input value={notedescription} onChange={(e) => setdescription(e.target.value)}/>
                    <button onClick={updateNote()} >Save</button>
                </section>
                : null
}
        </div>
        <div className='notes' key={id}>
                                        <div className='pin'>
                                            <p onClick={() => {
                                            handlePin(id)
                                        }}>
                                            <PushPinOutlinedIcon/>
                                        </p>
                                            
                                        </div>
                                        <div onClick={() => {seteditable(!editable)}}>
                                        {notetitle}
                                        <br/>
                                        {notedescription}
                                        </div>
                                        <div className='option'>
                                            <MoreVertIcon onClick={() => {setopen(!open)}}/>
                                            {
                                                open ? <DropDownItem id={id}/>
                                                : null
                                            }
                                        </div>
        </div>
    </div>
  )
}

export default Note