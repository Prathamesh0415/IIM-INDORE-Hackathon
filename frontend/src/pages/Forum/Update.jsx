import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "/src/components/Forum/loading.jsx";
import toast from 'react-hot-toast'

export default function Update() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("");
  //const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

   function handleClick(){
    const data = {
        title,
    //    author,
        description
    }
    axios.put(`http://localhost:3000/krishi/forum/updatepost/${id}`, data)
    .then((res) => {
        navigate('/forum')
        toast.success(res.data.message)
    })
    .catch(error => {
        console.log(error)
        toast.error(error.response.data.message)
    })
  }

  useEffect(() => {
    async function fetchData(){
        setLoading(true)
        await axios.get(`http://localhost:3000/post/${id}`)
        .then((response) => {
            console.log(response)
            setLoading(false)
            //setAuthor(response.data.author)
            setTitle(response.data.title)
            setDescription(response.data.description)
        })
        .catch(error => {
            setLoading(false)
            console.log(error)
        })
    }
    fetchData()
  }, [])
  
  return (
    <div>{
        loading ? <Loading /> : 
        <div className='flex flex-col contents-center p-7 gap-6 border'>
          <input 
            value={title}
            onChange={e=> setTitle(e.target.value)}
            type="text"  />
          {/*<input 
            value={author}
            onChange={e => setAuthor(e.target.value)}
            type="text"  />*/}
          <input
            value={description}
            onChange={e => setDescription(e.target.value)} 
            type="text"  />
          <Button
          onClick={handleClick}
          variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
    }
    </div>
  );
}