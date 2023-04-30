import React from 'react'
import '../styles/PostDetail.css'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


export default function PostDetail({item,user, toggleDetails}) {
    const navigate = useNavigate()
    var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"


    //Toast functions
    const notifyA = (data)=> toast.error(data)
    const notifyB = (data)=> toast.success(data)

    const removePost = (postId)=>{
        if(window.confirm("Do you really want to delete this post ?"))
        fetch(`/deletePost/${postId}`,{
            method: "delete",
            headers: {
                Authorization: "Bearer "+ localStorage.getItem("jwt")
            },
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            toggleDetails();
            navigate("/")
            notifyB(result.message)
        })
    }

  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img src={item.photo} alt="" />
        </div>

        <div className="details">

          {/* card header */}
          <div className="card-header" style={{borderBottom: "1px solid #00000029"}}>
            <div className="card-pic">
            <img src={user.Photo ? user.Photo : picLink} alt="" />
            </div>
            <h5>{user.name} </h5>
            <div className="deletePost">
                <span className="material-symbols-outlined" onClick={()=>{removePost(item._id)}}>
                    delete
                </span>
            </div>
          </div>

          {/* comment section */}
          <div className="comment-section" style={{borderBottom: "1px solid #00000029"}}>
            {item.comments.map((comment)=>{
              return (
              <p className="comm " key={comment._id} >
                <span className="commenter" style={{fontWeight: "bolder"}}>{item.postedBy.name}</span>
                <span className="commentText">{comment.comment}</span>
              </p>)

            })}
          </div>

          {/* card content */}
          <div className="card-content">
            <p>{item.likes.length} Likes</p>
            <p>{item.body}</p>
          </div>

          {/* add comments */}
          <div className="add-comment">
              <span className="material-symbols-outlined">
                Mood
              </span>
              <input type="text" name="" id="" placeholder='Add a comment' 
            //   value={comment} 
            //   onChange={(e)=>setComment(e.target.value)}
              />
              <button className="comment" 
            //   onClick={()=>{
            //     makeComment(comment, item._id)
            //     toggleComment()
            //   }}
              >Post</button>
          </div>

        </div>
      </div>
      <div className="close-comment" 
      onClick={()=>{
        toggleDetails();
      }}
      >
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
    </div>
    )
}
