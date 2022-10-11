import React from 'react'
import './errorPageStyle.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function ErrorPage() {
  return (
    <div className='err-main-cont'>

      <motion.div className='--wt-bold message-err'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition = {{duration : 0.4 ,delay :0.3}}
      >
        <span> 404 </span>: No such Page exists
      </motion.div>

      <motion.div className='c'
       initial = {{opacity :0}}
       animate = {{opacity :1}}
       transition = {{delay : 1, duration : 0.5}}
      ><Link to='/' className='go-home-link --wt-bold'> Go Home! </Link></motion.div>

    </div>
  )
}

export default ErrorPage
