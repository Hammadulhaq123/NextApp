'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
const Nav = () => {
    return (
        <nav className='mb-16 pt-3 flex-between w-full'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt='Logo'
                    className='object-contain'
                />
                <p className='logo_text'>NextApp</p>
            </Link>

        </nav>
    )
}

export default Nav
