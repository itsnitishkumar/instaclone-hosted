import React,{useState, useEffect} from 'react'
import '../styles/Profile.css'
import PostDetail from './PostDetail'
import { useParams } from 'react-router-dom'

export default function UserProfile() {

  var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
  const { userid } = useParams()
  const [isFollow, setIsFollow] = useState(false)
  const [user, setUser] = useState("")
  const [posts, setPosts] = useState([])

  // to follow user
  const followUser = (userId)=> {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        followId:userId
      })
    })
    .then((res)=>{res.json()})
    .then((data)=>{
      console.log(data);
      setIsFollow(true)
    })
  }
  
  // to unfollow user
  const unfollowUser = (userId)=> {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        followId:userId
      })
    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data);
      setIsFollow(false)
    })
  }

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer "+ localStorage.getItem("jwt")
      }
    }).then(res=> res.json())
    .then((result)=> {
        console.log(result);
        setUser(result.user)
        setPosts(result.post)
        if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
          setIsFollow(true)
        }
    })
  }, [isFollow])
  

  return (
    <div className='profile'>
      {/* profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={user.Photo ? user.Photo : picLink} alt="" />
        </div>
        {/* profile-data */}
        <div className="profile-data">
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <h1>{ user.name}</h1>
            <button className="followBtn" 
            onClick={
              ()=> { 
                if(isFollow){
                  unfollowUser(user._id)
                } else {
                  followUser(user._id)
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-info" style={{display: "flex"}}>
            <p>{posts.length} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>

      <hr style={{width: "90%", opacity:"0.8", margin: "25px auto"}}/>

      {/* Gallery */}
      <div className="gallery">
        {posts.map((pics)=>{
          return <img key={pics._id} src={pics.photo} 
        //   onClick={()=>{toggleDetails(pics)}}
          className='item' alt="" />
        })}
      </div>

      {/* {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails}/>
      } */}

    </div>
  )
}
