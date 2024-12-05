import React from 'react';

function Header({locations}){


return(
<h4 className="bg-primary text-white text-center p-2">
Our Highlights
({ locations.filter(t => !t.booked).length } destinations to choose from)
</h4>
);

}

export default Header;