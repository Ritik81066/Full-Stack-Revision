import React from 'react'
import { Link } from 'react-router-dom'

function Logo({width='100px'}) {
  return (
    <Link to="/" className="text-2xl font-bold text-blue-500" style={{ width }}>
      DevBlog
    </Link>
  )
}

export default Logo