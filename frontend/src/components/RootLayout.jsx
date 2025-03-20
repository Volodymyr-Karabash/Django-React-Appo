import React from 'react'
import TopBar from './TopBar/TopBar'
import NavBar from './NavBar/NavBar'
import TopFooter from './Footer/TopFooter'
import BottomFooter from './Footer/BottomFooter'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <>
            <header>
                <TopBar />
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <TopFooter />
                <BottomFooter />
            </footer>
        </>
    )
}
