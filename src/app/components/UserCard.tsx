import React from 'react'
import Image from 'next/image'

const UserCard = ({type} : {type: string})=> {
  return (
    <>
    <div className="p-4 rounded-2xl odd:bg-blue-200 even:bg-yellow-200 flex-1 min-w-[130px]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
          <Image src="/more.png" alt="More" width={20} height={20} />
        </div>
        <h1 className="text-2xl font-semibold my-4">1,254</h1>
        <h2 className="text-sm text-gray-500">{type}</h2>
    </div>
    </>
  )
}

export default UserCard