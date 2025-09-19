import React, { useState } from 'react'

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className='h-auto w-full p-4 bg-amber-500 '>

            <nav className="flex justify-around h-auto items-center">

                <div>
                    <a href="" className='font-title p-4 text-3xl'>Chaves Blog</a>
                </div>
                
                <div className='hidden md:flex justify-between gap-4 p-4 text-2xl'>
                    <a href="" className='font-content'>Sobre Mim</a>
                    <a href="" className='font-content'>Contato</a>
                </div>

                <div className='flex md:hidden'>
                    <button className="text-2xl flex flex-col"onClick={()=> setIsOpen(!isOpen)}>
                        <span className='h-0.5 w-6 bg-[var(--color-black)] transition-all duration-300'></span>
                        <span className='h-0.5 w-6 bg-[var(--color-black)] my-1 transition-all duration-300'></span>
                        <span className='h-0.5 w-6 bg-[var(--color-black)] transition-all duration-300 '></span>
                    </button>
                </div>
                
            </nav>

        </header>
    )
}

export default NavBar