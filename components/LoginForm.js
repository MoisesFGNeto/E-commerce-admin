import { useSession, signIn} from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function LoginForm() {
  const { data: session, } = useSession(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  async function credentialsLogin(e) {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false, 
        email,
        password,
      });
      if (result && result.error) {
        setError('Login failed. Try again with the correct admin credentials');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  }

  async function googleLogin() {
    try {
        await signIn('google', { redirect: false });
        const res = await fetch('/api/auth/session');
        const session = await res.json();
        if (session && session.user?.role === 'admin') {
          router.push('/');
          }
        } catch(err){
          setError("This Google account is not a registered Admin")
        }
  }

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  if (!session) {
    return (
      <div className="max-w-md relative flex mx-auto mt-12 flex-col p-4 rounded-md text-black bg-white border-solid border-2 border-black-500">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome to my <br/><span className="text-[#7747ff]">E-commerce Admin</span></div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form 
            className="flex flex-col gap-3"
            onSubmit={credentialsLogin}
          >
            <div className="block relative"> 
              <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
              <input 
                type="email" 
                required
                id="email" 
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] ring-offset-2  ring-gray-500 outline-0"
                onChange={(e) => setEmail(e.target.value)}
                />
              <label>email: myecommerceadm2023@gmail.com</label>
            </div>
            <div className="block relative"> 
              <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
              <input 
                type="password" 
                required
                id="password" 
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] ring-offset-2 ring-gray-500 outline-0"
                onChange={(e) => setPassword(e.target.value)}/>
              <label>password: ecommerce_test</label>
            </div>
            <button 
              type="submit" 
              className="bg-[#7747ff] w-max mx-auto m-2 px-32 py-2 border border-0 rounded-lg text-white"
              >
              Submit
            </button>
            <div>
              <a 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="text-sm text-[#7747ff]" 
                href="#">
                Forgot your password?
              </a>
              {showTooltip && (
                <span className="ml-3 p-2 text-xs text-gray-500 mt-1 border border-bpurple"> 
                  Please contact the administration
                </span>
              )}
            </div>
            <button 
              type="button"
              onClick={googleLogin}  
              className="p-2 px-4 mt-3 mx-auto rounded-lg bg-bpurple border-0 text-white" >
              Authorized Admin <FontAwesomeIcon icon={faGoogle} className="google-icon" />oogle
            </button>
          </form>
      </div>
    );
  }
  return null;
  }