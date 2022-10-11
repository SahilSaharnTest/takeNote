import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './loginPageStyle.css';
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'


function LoginPage(props) {

  // our form data maintaining state
  const [formData, setFormData] = useState({

    uid: "",
    userPassword: ""
    // give this same properties as name to the input ele
  });

  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.authorized.val) navigate(`/files/${props.authorized.username}`);;
  }, [])

  const handleFormData = (event) => {

    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));

  }

  const handleSubmitCreds = (event) => {
    //this is to prevent loading in the form...
    // console.log('clicked button :) ');
    setLoad(true);
    event.preventDefault();

    if (formData.uid === "" || formData.uid.length !== 9) {
      props.setMessage({
        message: 'Invalid Uid',
        bgColor: '#fe3533'
      });
      setLoad(false);
      return;
    } else if (formData.userPassword.length === 0) {
      props.setMessage({
        message: 'Passoword Required',
        bgColor: '#fe3533'
      });
      setLoad(false);
      return;
    }

    //now we have to get the data from the form... 

    //main post request ...
    axios.post(`https://takenote-api.herokuapp.com/validate/${props.APIkey}`, {
      "username": formData.uid,
      "password": formData.userPassword
    })

      .then((res) => {

        //here we have to evaluate the response from api if correct...
        if (res.data.authenticated) {
          //setting notifi to true if its true

          //to give the data to the app.js and redirecting the user ...

          props.setMessage({
            message: res.data.message,
            bgColor: '#79a925'
          });

          props.setAuthorized({
            val: true,
            username: res.data.username
          });
          setLoad(false);

          setTimeout(() => {
            navigate(`/files/${res.data.username}`);
          }, 1500)
        }
        //setting it to false if user cannot be authenticated 
        else {
          props.setMessage({
            message: res.data.message,
            bgColor: '#fe3533'
          });
          setLoad(false);
        }
        
      })

      .catch((err) => {

        props.setMessage({
          message: err.message,
          bgColor: '#fe3533',
        });
        setLoad(false);

      })

        

  }


  return (<>
    <motion.div
      className="main-container"
      exit={{
        x: -750, opacity: 0, transition: {
          duration: 0.3
        }
      }}
    >
      <motion.h1 className="sub-heading vlt-purple --wt-bold"
        initial={{ translateY: -200, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >LOG IN</motion.h1>
      <motion.div
        className="card "
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >

        <motion.form
          onSubmit={handleSubmitCreds}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >

          <div className="input-field-container">
            <label htmlFor="userID" className='label-headings --wt-medium dark-purple'>Uid : </label>
            <input type="text" name="uid" id="userID" className='input-fields' onChange={handleFormData} />
          </div>

          <div className="input-field-container">
            <label htmlFor="userpass" className='label-headings --wt-medium dark-purple'>Password : </label>
            <input type="password" name="userPassword" id="userpass" className='input-fields' onChange={handleFormData} />
          </div>

          <button className='butn --wt-bold vlt-purple'  > {(load) ? <BeatLoader color={'#56567e'} size={25} /> : 'LOG IN'}</button>

        </motion.form>

      </motion.div>

    </motion.div>

  </>);
}

export default LoginPage
