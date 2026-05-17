import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/blacknode.png'
import clsx from 'clsx'

const navLinks = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Themes', to: '/themes' },
  { label: 'About', to: '/about' },
  { label: 'Wiki', to: '/wiki' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header className={clsx(
        'fixed top-0 left-0 right-0 z-50 border-b',
        scrolled ? 'bg-surface-2/80 backdrop-blur-md border-white/5' : 'bg-transparent border-transparent'
      )}>
        <div className="max-w-screen-xl mx-auto px-5 sm:px-8 h-14 flex items-center gap-8">

          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <img src={logo} alt="logo" className="h-6 w-auto object-contain opacity-90 group-hover:opacity-100" />
            <span className="text-text text-[15px] tracking-tight" style={{ fontFamily: "'Lato', sans-serif" }}>
              Awesome <span className="text-accent">Dotfiles</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 flex-1">
            {navLinks.map(({ label, to }) => (
              <NavLink key={label} to={to} className={({ isActive }) => clsx(
                'relative px-3.5 py-1.5 text-sm rounded-lg',
                isActive ? 'text-text' : 'text-text/35 hover:text-text/70'
              )}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-white/8"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Link
              to="/submit"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent hover:bg-accent text-black text-sm"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Share your build
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden ml-auto w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white"
          >
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} className="w-4 h-4" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-14 left-0 right-0 z-40 bg-surface border-b border-white/5 md:hidden"
          >
            <nav className="max-w-screen-xl mx-auto px-5 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, to }) => (
                <NavLink key={label} to={to} className={({ isActive }) => clsx(
                  'px-3 py-2.5 rounded-lg text-sm',
                  isActive ? 'bg-white/8 text-white' : 'text-white/40 hover:text-white'
                )}>
                  {label}
                </NavLink>
              ))}
              <div className="mt-2 pt-3 border-t border-white/5">
                <Link to="/submit" className="flex items-center justify-center w-full py-2.5 rounded-full bg-[#e8ff47] text-black text-sm">
                  Share your build
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
