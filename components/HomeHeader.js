import { useSession } from "next-auth/react"

export default function HomeHeader() {
  const {data: session} = useSession();
  return (
    <div className="text-blue-900 flex justify-between">   
       
        <div className="flex gap-2 text-blue-700 items-center">
          <img className="w-6 h-6 rounded-md sm:hidden" src={session?.user?.image} alt="Profile Img" />
          Hello, <b>{session?.user?.name}</b>
        </div>
        
        <div className="hidden sm:block">
          <div className="bg-gray-200 flex gap-1 text-black rounded-lg overflow-hidden">
            <img className="w-6 h-6" src={session?.user?.image} alt="Profile Img" />
            <span className="px-2">
              {session?.user?.name} 
            </span>
          </div>
        </div>
      </div> 
  )
}