import React from 'react'
import GenderCheckbox from './GenderCheckbox'
import {Link} from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
      bg-opacity-50'>
        <h1 className='text-3x1 font-semibold text-center text-gray-300'>
          Sign Up
        </h1>

        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type='text' placeholder='Enter full name' className='w-full input input-bordered h-10'></input>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'></input>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10'></input>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type='text' placeholder='Confirm password' className='w-full input input-bordered h-10'></input>
          </div>

          <GenderCheckbox></GenderCheckbox>

          <Link to='/login' className='text-gray-300 text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>

        </form>

      </div>

    </div>
  )
}

export default SignUpPage