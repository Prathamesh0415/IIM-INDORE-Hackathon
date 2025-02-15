import { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Create() {

  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

   function handleClick(){
    const data = {
        title,
        //author,
        description
    }
    axios.post('http://localhost:3000/krishi/forum/createpost', data)
    .then(() => {
        navigate('/forum')
    })
    .catch(error => {
        console.log(error)
    })
  }
  
  return (
    <div>
        <div className='flex flex-col contents-center p-7 gap-6 border'>
          <input 
            onChange={e=> setTitle(e.target.value)}
            type="text" placeholder="Enter the title of the discussion" />
          {/*<input 
            onChange={e => setAuthor(e.target.value)}
            type="text" placeholder="Enter the name of the author" />*/}
          <input
            onChange={e => setDescription(e.target.value)} 
            type="text" placeholder="Enter the description here" />
          <Button
          onClick={handleClick}
          variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
    </div>
  );
}