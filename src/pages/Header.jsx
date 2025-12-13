import { ModeToggle } from '@/components/ui/themetoggle'
import { Link } from 'react-router-dom'
import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className="backdrop-blur flex justify-between items-center py-4 px-1 sm:px-16">
      <div>
        <Link to="/">
          <Logo />
        </Link>
        
      </div>
      <div className='flex gap-1 sm:gap-8'>
        <ModeToggle />
        <Button>Login</Button>
      </div>
    </div>
  )
}

export default Header
