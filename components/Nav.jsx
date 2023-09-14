'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {

        const setProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setProviders();
    }, [])


    return (
        <nav className='mb-16 pt-3 flex-between w-full'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src="/assets/images/dark-logo.svg"
                    width={40}
                    height={30}
                    alt='Logo'
                    className='object-contain'
                />
                <p className='logo_text'>NextApp</p>
            </Link>


            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ?
                    (
                        <div className='flex gap-3 md:gap-5'>
                            <Link href="/create-post" className='blue_btn'>
                                Create Post
                            </Link>
                            <button type='button' onClick={signOut} className='outline_btn'>
                                Sign Out
                            </button>
                            <Link href="/profile">
                                <Image
                                    src="/assets/images/profile.jpg"
                                    width={37}
                                    height={37}
                                    className='rounded-full'
                                    alt='Profile picture'
                                >

                                </Image>
                            </Link>
                        </div>
                    ) :
                    (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => {
                                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='blue_btn'>
                                        Sign In
                                    </button>
                                })
                            }
                        </>
                    )}

            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden flex'>
                {isUserLoggedIn ? (
                    <div className='flex'>
                        <Image
                            src="/assets/images/profile.jpg"
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='Profile picture'
                            onClick={() => { setToggleDropdown((prev) => !prev) }}
                        />

                        {
                            toggleDropdown &&
                            <div className='dropdown'>
                                <Link className='dropdown_link blue_btn  w-full' href="/profile" onClick={() => setToggleDropdown(false)}>
                                    Profile
                                </Link>
                                <Link className='dropdown_link blue_btn mt-1 w-full' href="/create-post" onClick={() => setToggleDropdown(false)}>
                                    Create Post
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-1 w-full blue_btn'>
                                    Sign Out
                                </button>
                            </div>
                        }
                    </div>
                ) : (
                    <>
                        {
                            providers && Object.values(providers).map((provider) => {
                                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='blue_btn'>
                                    Sign In
                                </button>
                            })
                        }
                    </>
                )}
            </div>

        </nav>
    )
}

export default Nav
