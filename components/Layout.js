import { useSession, signIn} from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Nav from "@/components/Nav";
import { useState } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function Layout({children}) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession(); 
  
  async function login() {
    await signIn('google');
  }
  if (!session) {
    return (
      <LoginForm/>
      // <div className='bg-gray-800 w-screen h-screen flex items-center'>
      //   <div className=" login-form">
      //     <h1 className="text-3xl font-bold mb-4">My-Ecommerce Login</h1>
      //     <div>
      //     <p className="text-bold">As admin please login with this google credential: </p>
      //     <div className="border mt-6 p-4">
      //       <p className="text-sm ">Email: myecommerceadm2023@gmail.com</p>
      //       <p className="text-sm ">Password: ecommerce_test</p>
      //     </div>
      //     </div>
      //     <button 
      //       onClick={login}  
      //       className="p-2 px-4 mt-5 rounded-lg bg-primary border-0 text-white" >
      //        Login With <FontAwesomeIcon icon={faGoogle} className="google-icon" />oogle
      //     </button>
      //   </div>
      // </div>
    );
  }
  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
        <Link  href={'/'} className="flex grow justify-center mr-6 font-bold text-gray-500">
         My-Ecommerce Admin
        </Link>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
  }