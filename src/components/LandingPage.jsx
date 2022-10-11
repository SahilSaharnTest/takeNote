import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import "./landingPageStyle.css"





function LandingPage(props) {
  return (<>
    <motion.div 
      className="vertical-center"
      exit = {{ x:-750 ,opacity : 0 ,transition : {
        duration :0.3
      } }}  
    >

      <motion.h1 className="vlt-purple --wt-bold title-heading"
        initial={{
          translateY: -200,
          opacity: 0
        }}

        animate={{
          opacity: 1,
          translateY: 0
        }}

        transition={{
          type: 'tween',
          duration: 0.2,
        }}
      >
        takeNote
      </motion.h1>

      <div className="wrapper">
        <motion.p
          className="vlt-purple --wt-medium para-text"
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1.5 }}
        >
          this project help's you to take notes online and save them online so they Never get lost at the Moment (before one-hour of exam's hahhaa...)
        </motion.p>
      </div>

      <div className="wrapper">

        <Link to="/loginUser" >
          <motion.button
            className="enter-link vlt-purple --wt-semibold"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            Enter Now!
          </motion.button>
        </Link>

      </div>
      <motion.div className = 'fotter vlt-purple --wt-semibold'
        initial = {{ opacity : 0 ,translateY : 200}}
        animate ={{opacity :1 , translateY : 0}}
        transition = {{duration : 0.5}}
      >
        Created by : <motion.a href="https://www.linkedin.com/in/sahil-saharn" className = 'fotter-link vlt-purple' target={'__blank'}
          initial = {{opacity :0}}
          animate = {{opacity :1}}
          transition = {{delay : 1 ,duration : 0.5}}
        >Sahil Saharn</motion.a>
      </motion.div>
    </motion.div>


  </>);
}

export default LandingPage
