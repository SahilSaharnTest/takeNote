

import React from 'react'
import './timedComp.css'
import {motion ,AnimatePresence} from 'framer-motion'
// backColor = {'#fe3533'} color for error signal...
// backColor = {'#79a925'} color for login success signal...

function TimedComp(props) {

  const styles = {backgroundColor : props.obj.bgColor ,
                  color           : '#fffde3',
                  }


  if( !props.obj.message ) return (<></>);
  
  else {
      setTimeout( ()=>{
        props.setter({
          message :null,
          bgColor :null
        })
      } ,4000);
  }

  return (
    <AnimatePresence>
    <motion.div 
    className='cont-ainer --wt-bold ' 
    style={ styles }
    initial = {{opacity :0 ,translateY : -200}}
    animate = {{opacity :1 ,translateY : 0}}
    exit = {{opacity :0 ,translateY : -200}}
    >
      {props.obj.message}
    </motion.div>
    </AnimatePresence>
  )
}

export default TimedComp
