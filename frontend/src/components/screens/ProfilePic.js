import React,{useState, useEffect, useRef} from 'react'

export default function ProfilePic({changeProfile}) {

    const hiddenFileInput = useRef(null)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    // posting image to cloudinary
    const postDetails = () => {
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

    const postPic = ()=>{
        //saving post to mongodb
        fetch("/uploadProfilePic", {
          method: "put",
          headers: {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            pic: url
          })
        }).then(res=>res.json())
        .then(data=>{
          console.log(data);
          changeProfile();
          window.location.reload()
        })
        .catch(err => console.log(err))
    }
    

    const handleClick = ()=>{
        hiddenFileInput.current.click()
    }

    useEffect(()=>{
        if(image){
            postDetails();
        }
    }, [image])


    useEffect(() => {
        if(url){
            postPic()
        }
    }, [url])
    

    return (
        <div className='profilePic darkBg'>
            <div className="changePic centered">
                <div>
                    <h2>Change Profile Photo</h2> 
                </div>
                <div style={{borderTop: "1px solid #00000030"}}>
                    <button className="upload-btn" style={{color: "#1EA1F7"}} onClick={handleClick}>Upload Photo</button>
                    <input type="file" ref={hiddenFileInput} accept='image/*' style={{display:"none"}} onChange={(e)=>{setImage(e.target.files[0])}}/>
                </div>
                <div style={{borderTop: "1px solid #00000030"}}>
                    <button className="upload-btn" style={{color: "#ED4956 "}} onClick={()=>{
                        setUrl(null);
                        postPic()
                    }}>Remove Current Photo</button>
                </div>
                <div style={{borderTop: "1px solid #00000030"}}>
                    <button style={{background:"none", border: "none", cursor:"pointer", fontSize: "15px"}} onClick={changeProfile}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
