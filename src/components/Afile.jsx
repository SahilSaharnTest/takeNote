import React from 'react'
import { RiFile3Fill, RiEdit2Fill, RiDeleteBinFill } from "react-icons/ri";
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'


function Afile(props) {

  const confirmToDelete = () => {
    const toDelete = window.confirm(`Do You Really Want to delete ${props.fname}`);
    if (toDelete) {
      //then delete it 
      props.dFile(props.fid);
    } else {
      //then dont delete it... 
      return;
    }
  }

  return (<>

    <div className='file-card'>

      <RiFile3Fill className='a-icon dark-purple' />
      <div className='dark-purple --wt-bold a-file' > {props.fname} </div>

      <div>
        <Link to={`/EditFile/${props.fid}`} className='link-in-afile' > <RiEdit2Fill className='a-icon dark-purple' /> </Link>

        <RiDeleteBinFill 
          className='a-icon dark-purple' 
          onClick={() => confirmToDelete()}
        />
        
      </div>

    </div>
  </>);
}

export default Afile
