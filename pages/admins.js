import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';
import { prettyDate } from '@/lib/date';
import { signOut } from 'next-auth/react';
import { useRouter, userRouter } from "next/router";

function AdminsPage({swal}){
  const [email, setEmail] = useState('');
  const [adminEmails, setAdminEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const mainAdmin = "myecommerceadm2023@gmail.com";

  async  function logout() {
    await router.push('/');
    await signOut();
  }

  function addAdmin(ev){
    ev.preventDefault();
    axios.post('/api/admins', {email}).then(() => {
      swal.fire({
        title: 'Admin created',
        icon: 'success',
      });
      setEmail('');
      loadAdmins();
    }).catch(err => {
      swal.fire({
        title: 'Error',
        text: err.response.data.error,
        icon: 'error',
      });
    });
  }

  function deleteAdmin(_id, email){
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete admin ${email}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        axios.delete('/api/admins?_id='+_id).then(() => {
          swal.fire({
            title: 'Admin deleted',
            icon: 'success',
          });
          if (adminEmails.email === mainAdmin){
            loadAdmins()
          } else {
            logout();
          }
          
        });
      }
    });
  }
  function loadAdmins(){
      setIsLoading(true);
      axios.get('/api/admins').then(res => {
        setAdminEmails(res.data);
        setIsLoading(false);
    },[]);
  }
  useEffect(() => {
    loadAdmins();
  },[]);

  return(
    <Layout>
      <h1>Admins</h1>
      <h2>Add new admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2">
          <input 
            type="text" 
            className='mb-0' 
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            placeholder='Only Google email'/>
          <button 
            type='submit'
            className='btn-primary py-1 whitespace-nowrap'>
            Add admin
          </button>
        </div>
      </form>
      <h2>Existing admins</h2>
      <table className='basic'>
        <thead>
          <tr>
            <th className='text-left'>Admin google email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan='2'>
                <div className='py-4'>
                  <Spinner fullWidth={1}/>
                </div>
              </td>
            </tr>
          )}
          {adminEmails.length > 0 && adminEmails.map(adminEmail => (
            <tr key={adminEmail._id}>
              <td>{adminEmail.email}</td>
              <td>{adminEmail.createdAt && prettyDate(adminEmail.createdAt)}</td>
              <td>
                {adminEmail.email !== mainAdmin && (
                   <button 
                   className='btn-red'
                   onClick={() => deleteAdmin(adminEmail._id, adminEmail.email)}>
                   Delete
                 </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default withSwal (({swal}) => (
  <AdminsPage swal={swal}/>
));
