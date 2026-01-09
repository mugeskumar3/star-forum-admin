import React from 'react'
import DefaultInputs from './child/DefaultInputs'

const FormPageLayer = ({ title }) => {
    return (
        <div className="row justify-content-center">
            {/* DefaultInputs */}
            <DefaultInputs title={title} />
        </div>
    )
}

export default FormPageLayer