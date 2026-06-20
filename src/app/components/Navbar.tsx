import React from 'react'

const Search: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
)

const MessageCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)

const Bell: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
)

function Navbar() {
    return (
        <>
            <div className="w-full h-16 bg-white flex items-center justify-between px-6 gap-4 shadow-sm">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative hidden md:flex">
                        <Search className="hidden absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div>
                        <button className="text-gray-600 hover:text-gray-900">
                            <MessageCircle className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="relative">
                        <button className="text-gray-600 hover:text-gray-900">
                            <Bell className="w-5 h-5" />
                        </button>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
                    </div>

                    <div className="flex items-center gap-3 border-l pl-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">Rishindu Yohan</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                        <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar