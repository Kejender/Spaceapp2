import React from 'react'

const Hardware = ({ hardware, showDesc}) => {

  //console.log("hardware "+hardware.name)
  //onClick={showDesc("joo")}

    return (
      <div className='hardwareitem' onClick={(target) => showDesc(hardware, target)}>
        <p>{hardware.name}</p>
      </div>
    )
}

export default Hardware