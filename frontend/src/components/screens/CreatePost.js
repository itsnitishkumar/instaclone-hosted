import React,{useState, useEffect} from 'react'
import '../styles/CreatePost.css'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

export default function CreatePost({loggedUser}) {

  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()
  var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
  
  //Toast functions
  const notifyA = (data)=> toast.error(data)
  const notifyB = (data)=> toast.success(data)
 

  useEffect(() => {
    //saving post to mongodb
    if(url){
      fetch("/createPost", {
        method: "post",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body, pic: url
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
          notifyA(data.error)
        else {
          notifyB("Successfully Posted")
          navigate("/")
        }
      })
      .catch(err => console.log(err))
    }
  }, [url])
  


  // posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "itsnitishkumar")

    fetch("https://api.cloudinary.com/v1_1/itsnitishkumar/image/upload",{
      method: "post",
      body: data
    }).then(res => res.json())
    .then(data => setUrl(data.url))
    .catch(err => console.log(err))

    
  }

  const loadfile = (event)=>{
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  }
    
  return (
    <div className='createPost'>
        
        {/* header */}
        <div className="post-header">
            <h4 style={{margin: "3px auto"}}>Create New Post</h4>
            <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
        </div>

        {/* image preview */}
        <div className="main-div">
            <img src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" alt="" id='output'/>
            <input type="file" accept='image/*' 
            onChange={(event) => {
              loadfile(event) 
              setImage(event.target.files[0])
            }}/>
        </div>

        {/* details */}
        <div className="details">
            <div className="card-header">
                <div className="card-pic">
                  <img src={loggedUser.Photo ? loggedUser.Photo : picLink} alt="" />
                </div>
                <h5>{JSON.parse(localStorage.getItem("user")).name}</h5>
            </div>
            <textarea type="text" placeholder='Write a caption' value={body} onChange={(e)=>{setBody(e.target.value)}}></textarea>
        </div>
    </div>
  )
}
