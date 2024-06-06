import React from 'react'

const Koje = ({kojef, juttu}) => {


    return (
        <div>
            <div id="koje" onClick={(target) => kojef(juttu, target)}>
                <h1>Koje</h1>
            </div>
        </div>
    )
}

export default Koje