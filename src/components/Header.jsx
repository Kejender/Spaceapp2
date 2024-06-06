import React from 'react'

const Header = ({ hardwareitem, showHw, showComponents, closeDesc}) => {

  //console.log("hard"+hardware.name)
    return (
      <div id="header">
        <div id="hwtab" onClick={(target) => showHw(target)}>
          <h3>{hardwareitem}</h3>
        </div>
        <div id="componentstab" onClick={(target) => showComponents(target)}>
          <h3>Components</h3>
        </div>
        <div id="close" onClick={closeDesc}><h2>X</h2></div>
      </div>
    )
}

export default Header