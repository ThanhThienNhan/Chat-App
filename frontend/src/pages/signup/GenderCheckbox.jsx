import React from 'react'

function GenderCheckbox() {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className={'label gap-2 cursor-pointer'}>
                    <span className='label-text'>Male</span>
                    <input type='checkbox' className='checkbox border-s-slate-900'></input>
                </label>
            </div>
            <div>
                <label className={'label gap-2 cursor-pointer'}>
                    <span className='label-text'>Female</span>
                    <input type='checkbox' className='checkbox border-s-slate-900'></input>
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox