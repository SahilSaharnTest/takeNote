import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import './modalStyle.css'
import { RiFileAddFill} from "react-icons/ri";
function Modal(props) {

    const [fileName ,setFileName] = useState('');
    // console.log(fileName);
    // console.log(fileName.length);

    const userName = useParams().user;

    return (
        <div className='modal-background' >
            <div className="card-modal">

                <div className="--textCenter">
                    <RiFileAddFill className='modal-icon dark-purple'/>
                </div>

                <form action="/" className="modal-form ">
                    <div className="input-field-container ">
                        <label htmlFor="userID" className='label-headings --wt-medium dark-purple'>filename : </label>
                        <input type="text" name="uid" id="userID" className='input-fields' onChange={ (event)=>{
                            if(event.target.value.length > 25){
                                event.target.value = fileName;
                            } else {
                                setFileName(event.target.value);
                            }
                        } } />
                    </div>

                    <div className="add-file-buttons ">
                        <button onClick={ (event)=>{
                            event.preventDefault();
                            props.setModal(false);
                        } } className='dark-purple --wt-semibold cancel-btn' >Cancel</button>
                        <button className='dark-purple --wt-semibold' onClick={ (e)=>{
                            e.preventDefault();
                            props.addF(userName ,fileName);
                        } } >Add File</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Modal
