import React from 'react'

export default function Status() {
  return (
    <div>
      <h1>Status</h1>
      <p>This is the status page</p>

      <p>{process.env.APP_ID}</p>
      <p>{process.env.JWT_SECRET}</p>
      
    </div>
  )
}