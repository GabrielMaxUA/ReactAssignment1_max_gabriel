import React from 'react';

function HideUtil({description, isBooked, call}) {
return(
<div className="form-check">
  <input 
  className="form-check-input" 
  type="checkbox"
  checked={ isBooked }
  onChange={ (e) => call(e.target.checked) } />
<label className="form-check-label">
Show { description }
</label>
</div>


)
}
export default HideUtil