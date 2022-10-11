import React, { useState, useEffect } from 'react';
import { Prompt,useParams, useNavigate   } from 'react-router-dom';
// import {Prompt} from 'react-router'

import { RiMoonFill, RiSunFill ,RiClipboardFill } from "react-icons/ri";
import { motion } from 'framer-motion'
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";


import './EditFilestyle.css';
// /updateFile/:fileId/:key

function EditFile(props) {

  const navigate = useNavigate();
  const FileId = useParams().FileId;

  const [fileData, setFileData] = useState('');
  const [showLoader, setShowLoader] = useState(true);
  const [saveLoad, setSaveLoad] = useState(true);

  const [textAreaStyle, setTextAreaStyle] = useState({
    dark: false,
    color: '#343434',
    backgroundColor: '#FAF9F6'
  });

  const [saveButtonStyle, setSaveButtonStyle] = useState({
    text: 'Saved',
    color: '#decadf',
    backgroundColor: '#2c2c55',
    border: '2px solid #decadf'
  });



  useEffect(() => {

    if (!props.authorized.val) {
      navigate('/loginUser');
    } else {
      // we will make a get request to api to get user last saved data... and set that in the text area 
      axios.get(`https://takenote-api.herokuapp.com/getFileContent/${FileId}/${props.APIkey}`)
        .then((res) => {
          if (res.data.gotContent) {
            //means we got the content safely...
            props.setMessage({
              message: res.data.message,
              bgColor: '#79a925',
            })
            setFileData(res.data.content);

          } else {
            props.setMessage({
              message: res.data.message,
              bgColor: '#fe3533'
            })

          }
        })
        .catch(err => {
          props.setMessage({
            message: err.message,
            bgColor: '#fe3533'
          })
        });


    }
    setShowLoader(false);
    setSaveLoad(false);

  }, [])

  // console.log(fileData);

  const saveFile = () => {
    // console.log('button clicked :)');
    if (saveLoad == true) return;
    setSaveLoad(true);

    if (saveButtonStyle.text === 'Saved') {
      props.setMessage({
        message: 'already saved.',
        bgColor: '#79a925',
      })
      setSaveLoad(false);
      return;
    }

    const dataForServer = fileData.replace(/"/g, '\\"');
    // console.log(dataForServer);
    axios.put(`https://takenote-api.herokuapp.com/updateFile/${FileId}/${props.APIkey}`,
      {
        newFileContent: dataForServer
      })

      .then(res => {

        if (res.data.updated) {
          //then our file is updated ...
          props.setMessage({
            message: res.data.message,
            bgColor: '#79a925',
          })

          setSaveButtonStyle({
            text: 'Saved',
            color: '#decadf',
            backgroundColor: '#2c2c55',
            border: '2px solid #decadf'
          })

        } else {
          props.setMessage({
            message: res.data.message,
            bgColor: '#fe3533',
          })
        }
        setSaveLoad(false);

      })
      .catch(err => {
        props.setMessage({
          message: err.message,
          bgColor: '#fe3533',
        })
        setSaveLoad(false);
      })


  }

  const toggleMode = () => {
    setTextAreaStyle((prev) => ({
      dark: !prev.dark,
      color: prev.backgroundColor,
      backgroundColor: prev.color
    }))
  }

  return (
    <>
      <motion.div
      initial = {{
        opacity : 0
      }}
      animate = {{
        opacity  :1
      }}
      transition = {{
        delay : 0.6
      }}
        exit={{
          x: 750, opacity: 0, transition: {
            duration: 0.5
          }
        }}
      >
        
        {showLoader && <div className='loader-in-edit'> <BeatLoader size={50} color={'#decadf'} /> </div>}

        <h4 className='vlt-purple edit-text-heading'>Edit File :</h4>
        <div className="textArea-container">

          <textarea className='edit-file-textArea' id='txt' onChange={(e) => {
            setFileData(e.target.value); setSaveButtonStyle(
              { text: 'Save !', color: '#2c2c55', backgroundColor: '#decadf', border: '2px solid #2c2c55' }
            )
          }} value={fileData} spellCheck="false" style={textAreaStyle} />

        </div>

        <div className='function-buttons-cont'>

          <motion.button className="save-button --wt-semibold"
            style={saveButtonStyle}
            onClick={saveFile}
            whileTap={{ scale: 0.8 }}
          >{(saveLoad) ? <BeatLoader color={'#2c2c55'} size={25} /> : saveButtonStyle.text}
          </motion.button>

          <div>
            <motion.button
              className='x'
              whileTap={{ scale: 0.8 }}
              onClick = { () => {
                  const ele = document.getElementById('txt');
                  ele.select();
                  document.execCommand('Copy');
              } }
            >
              <RiClipboardFill className='edit-file-icons' />
            </motion.button>

            <motion.button
              className='x'
              onClick={toggleMode}
              whileTap={{ scale: 0.8 }}
            >
              {(!textAreaStyle.dark) ? <RiMoonFill className='edit-file-icons' /> : <RiSunFill className='edit-file-icons' />}
            </motion.button>

          </div>

        </div>
      </motion.div>
    </>
  )
}

export default EditFile
