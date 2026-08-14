"use client"
import { authClient, useSession } from '@/lib/auth-client';
import { uploadImage } from '@/utils/uploadImage';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const {data: session} = useSession();
  const user = session?.user;
  const userEmail = user?.email;
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [profile, setProfile] = useState({
    name:"",
    email:"",
    image:"",
    bloodGroup:"",
    district:"",
    upazila:"",
  });
  useEffect(()=>{
 const loadProfile = async()=>{
if(!userEmail) return;
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/${encodeURIComponent(userEmail)}`);
const data = await res.json();
setProfile({
    name: data?.name || "",
    email: data?.email || "",
    image: data?.image || "",
    bloodGroup: data?.bloodGroup || "",
    district: data?.district || "",
    upazila: data?.upazila || "",
});
setPreview(data?.image || user?.image || "")
}catch(error){
console.log(error);
}finally{
    setLoading(false);
}
 };
 loadProfile();
  }, [userEmail,user]);
const  handleChange = (e)=>{
setProfile({
    ...profile,
    [e.target.name]: e.target.value,
});
};
const handleImageChange =(e)=>{
const file = e.target.files?.[0];
setImageFile(file);
setPreview(URL.createObjectURL(file));
};
const handleSaving = async () => {
    setSaving(true);

    if (!userEmail) {
        toast.error('No user email');
        setSaving(false);
        return;
    }

    try {
        let uploadedImage = profile.image;

        if (imageFile) {
            uploadedImage = await uploadImage(imageFile);
        }

        const result = await authClient.updateUser({
            name: profile.name,
            image: uploadedImage,
        });
        console.log(result);

const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/${encodeURIComponent(userEmail)}`, {
            method: 'PATCH',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...profile,
                image: uploadedImage,
            }),
        });
        const data = await res.json()
               console.log(data);

        if (data.success) {
            toast.success('Profile Updated Successfully');
            setProfile((oldData) => ({
                ...oldData,
                image: uploadedImage,
            }));
            setIsEditing(false);
        } else {
            toast.error('Update Failed');
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
    } finally {
        setSaving(false);
    }
};
if(loading){
return (
    <div className="flex justify-center items-center min-h-screen">
<div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin">
 </div>
    </div>
  );    
}
    return (
<div className="max-w-4xl mx-auto bg-gray-300 p-8 rounded-xl shadow">
    <button>
    <Link className='bg-red-500 text-white rounded-2xl py-2 px-2' href={'/'}>Go Back Home</Link>
        </button>
    <div className="flex justify-between items-center mb-8">
   <h2 className="text-3xl font-bold">
      My Profile
    </h2>
   {!isEditing ? (
    <button
   onClick={()=> setIsEditing(true)} 
  className="bg-red-600 text-white px-5 py-2 rounded-lg cursor-pointer">
Edit
    </button>
   ):(
    <button
  onClick={handleSaving}
  disabled={saving}  
    className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer">
{saving ? "Saving...": "Save"}
    </button>
   )}      
    </div>
    <div className="flex justify-center mb-8">
     <div className="relative">
    <img
    src={preview || user?.image || '/default-profile.png'}
    alt='profile image'
    className='w-32 h-32 rounded-full object-cover border'
    /> 
    {isEditing && (
<>
<label htmlFor='image'
className="absolute bottom-0 right-0 bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm">
Change
</label>
<input 
id='image'
type='file'
accept='image/*'
className='hidden'
onChange={handleImageChange}
/>
</>
    )}   
        </div>   
    </div>
 <div className="grid md:grid-cols-2 gap-5">
    <div>
      <label className="block mb-1 font-medium">
        Name
        </label>
        <input 
       type='text' 
       name='name'
       defaultValue={user?.name}
       onChange={handleChange}
       disabled={!isEditing}
       className="w-full border rounded-lg p-3"
        />  
        </div>
        <div>
<label className='block mb-1 font-medium'>
Email
</label>
<input 
type='email'
defaultValue={user?.email}
disabled
className='w-full border rounded-lg p-3'
/>
</div>
<div>
  <label className='block mb-1 font-medium'>
Blood Group
</label>
<select
name='bloodGroup'
value={profile.bloodGroup}
onChange={handleChange}
disabled={!isEditing}
className='w-full border rounded-lg p-3'>
    <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
    </select>  
</div>
<div>
   <label className='block mb-1 font-medium'>
District
</label>
<input 
type='text'
name='district'
defaultValue={user?.district}
onChange={handleChange}
disabled={!isEditing}
className="w-full border rounded-lg p-3"
/> 
</div>
<div>
   <label className='block mb-1 font-medium'>
Upazila
</label>
<input 
type='text'
name='upazila'
defaultValue={user?.upazila}
onChange={handleChange}
disabled={!isEditing}
className="w-full border rounded-lg p-3"
/> 
</div>
    </div>    
</div>        
    );
};

export default ProfilePage;