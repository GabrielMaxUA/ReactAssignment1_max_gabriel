import React, { useState } from 'react';

function AddUtil({call}) {
  const [newItemText, setNewItemText] = useState("");

  const updateNewTextValue = (event) => {
    setNewItemText(event.target.value);
  };

  const  createLocation = () => {
    if(newItemText !==""){
      call(newItemText);
      setNewItemText("");
    }
  }
    
    return(
      <div className="my-1">
        <input 
         className="form-control" 
          value={ newItemText }
          onChange={ updateNewTextValue } 
        />
        <button className="btn btn-primary mt-1" onClick={ createLocation }>
      Add</button>
    </div>
    );
}
  
export default AddUtil;