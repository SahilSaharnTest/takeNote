import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { RiFileAddFill } from "react-icons/ri";
import {motion ,AnimatePresence} from 'framer-motion'
import BeatLoader from "react-spinners/BeatLoader";

import './filesStyle.css'
import Afile from './Afile';
import Modal from './Modal';

function Files(props) {

  //this is the main state which will hold the file's for the user...
  const [userFiles, setUserFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(true);
  const [toggleFetch, setToggleFetch] = useState(false);

  //use props.props.setMessage
  //our userName which whose files we are viewing...
  const param = useParams().user;
  const navigate = useNavigate();
  useEffect(() => {

    if (!props.authorized.val)
      navigate('/loginUser');
    else {
      //our get request for files...
      setLoad(true);
      axios.get(`https://takenote-api.herokuapp.com/files/${param}/${props.APIkey}`)
        .then((res) => {
          // console.log(res.data)
          setUserFiles(res.data);
        })
        .catch(err => {
          props.setMessage({
            message: err.message,
            bgColor: '#fe3533'
          })
        });
      setLoad(false);
    }

  }, [toggleFetch])

  const validFileName = (name) => {
    const names = userFiles.map((ele) => ele.fileName)
    const res = names.findIndex((ele) => ele === name)
    if (res >= 0) return false;
    else return true;
  }

  //function to remove a file as per file id from db controlled by the aFile.jsx
  function removeFile(file_id) {

    axios.delete(`https://takenote-api.herokuapp.com/deleteFile/${file_id}/${props.APIkey}`)
      .then(res => {
        if (res.data.deleted) {
          //remove from front end and set message file deleted...

          //this code will remove it from the front end...
          setUserFiles((prevFiles) => {
            const newArray = prevFiles.filter(ele => ele.fileId !== file_id);
            return newArray;
          })
          props.setMessage({
            message: res.data.message,
            bgColor: '#79a925',
          })
        } else {
          props.setMessage({
            message: res.data.message,
            bgColor: '#fe3533',
          })
        }
      })
      .catch(err => {
        props.setMessage({
          message: err.message,
          bgColor: '#fe3533',
        })
      })

  }

  //function sent to the modal to call this thing to add a file...
  function addFile(user_name, file_name) {
    setShowModal(false);
    setLoad(true);

    if (userFiles.length >= 5) {
      props.setMessage({
        message: 'Max 5 files allowed.',
        bgColor: '#fe3533'
      })
      setLoad(false);
      return;

    } else if (file_name.length === 0) {
      props.setMessage({
        message: 'File name cannot be empty.',
        bgColor: '#fe3533'
      })
      setLoad(false);
      return;
    } else if (!(validFileName(file_name))) {
      props.setMessage({
        message: 'File Name already exists.',
        bgColor: '#fe3533'
      })
      setLoad(false);
      return;

    } else {
      //now we have to send a post request to the server for creating a file ...
      axios.post(`https://takenote-api.herokuapp.com/addFile/${props.APIkey}`, {
        "username": user_name,
        "filename": file_name
      })
        .then(res => {
          //make a mesage what happens and fetch again 

          if (res.data.added) {
            //means our file is added success...
            props.setMessage({
              message: res.data.message,
              bgColor: '#79a925'
            })
            setToggleFetch((prev) => !prev);
          } else {
            props.setMessage({
              message: res.data.message,
              bgColor: '#fe3533'
            })
            setLoad(false);
          }

        })
        .catch(err => {

          props.setMessage({
            message: err.message,
            bgColor: '#fe3533'
          })
          setLoad(false);

        })
    }


  }

  //suppose userfiles is our fetched content from our api...
  const filesToRender = userFiles.map((ele, i) =>
  ( 
  
    <motion.div
      initial = {{opacity :0 ,translateY : -25}}
      animate = {{opacity :1 ,translateY : 0 }}
      transition ={{duration : 0.3 ,delay : ((i+1)*0.2)}}
      exit = {{opacity :0  , transition : {duration : 0.5}} }
    >
      <Afile fid={ele.fileId} fname={ele.fileName} key={ele.fileId} dFile={removeFile} /> 
    </motion.div>
    
  ))
  // console.log(userFiles);

  return (<>
    <motion.div

      transition={{delay : 0.4 }}
      exit={{
        x: -750, opacity: 0, transition: {
          duration: 0.5
        }
      }}
    >
    <motion.h1 
      className="your-files-title vlt-purple --wt-bold"
      initial={{ translateY: -200, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      >
      Your File's !
    </motion.h1>

    <div>
      {

        (load) ?
          (<div className='no-file-txt'> <BeatLoader color={'#decadf'} size={50} /> </div>)
          :
          ((userFiles.length > 0) ? (<AnimatePresence> {filesToRender} </AnimatePresence>) : <h3 className='no-file-txt'>No Files!</h3>)

      }
    </div>

    { userFiles.length < 5 && <button className='add-file-btn' onClick={() => setShowModal(true)}> <RiFileAddFill className='add-icon vlt-purple' /> </button>}
    </motion.div>
    {showModal && <Modal setModal={setShowModal} addF={addFile} />}
  </>)

}

export default Files
