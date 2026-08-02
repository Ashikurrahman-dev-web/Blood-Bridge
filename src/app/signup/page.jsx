"use client";
import { Check } from "@gravity-ui/icons";
import { Button, Card,  Form, Input, Label, } from "@heroui/react";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCamera, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SignUpPage = () => {
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const districts = districtsData.find((item) => item.type === "table")?.data || [];
  const upazilas = upazilasData.find((item) => item.type === "table")?.data || [];

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas.filter((upazila) => String(upazila.district_id) === String(selectedDistrict));
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, upazilas]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      setLoading(false);
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile); 
      } catch (error) {
        toast.error("Failed to upload image");
        setLoading(false);
        return;
      }
    }

    try {
      const districtName = districts.find((d) => String(d.id) === String(data.district))?.name || "";
      const upazilaName = upazilas.find((u) => String(u.id) === String(data.upazila))?.name || "";

      const { data: signUpData, error: signUpError } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl,
        bloodGroup: data.bloodGroup,
        district: districtName,
        upazila: upazilaName,
        role: "donor",
        status: "active",
        callbackUrl: "/signin",
      });

      if (signUpError) {
        toast.error(signUpError.message || "Failed to sign up");
        return;
      }
await authClient.signOut();
      toast.success("Sign up successful!.");
      router.push("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
<Card className="border border-red-500 bg-red-200 mx-auto w-[420px] py-8 px-6 mt-6 mb-6 shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-3 text-black">Sign Up</h1>
      <p className="mb-4 text-black">Create your account to get started.</p>

      <Form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-3 mb-4 w-full">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-500 shadow-lg bg-slate-800">
              {preview ? (
                <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <FaUser size={32} />
                </div>
              )}
            </div>
<label htmlFor="image" className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition">
              <FaCamera size={12} />
            </label>
          </div>
          <input
            {...register("image", { required: "Profile image is required" })}
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              register("image").onChange(e); 
              handleImageChange(e);         
            }}
          />
          {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
          <p className="text-xs text-black">Upload your profile picture</p>
        </div>

        {/* Name Field */}
        <div className="flex flex-col gap-1">
          <Label className="text-xs text-black font-semibold">Name</Label>
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            type="text"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <Label className="text-xs text-black font-semibold">Email</Label>
          <Input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address"
              }
            })}
            placeholder="john@example.com"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Blood Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-black font-semibold">Select Blood Group *</label>
            <select
              {...register("bloodGroup", { required: "Blood group is required" })}
              defaultValue=""
className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 h-10 text-sm text-white focus:outline-none focus:border-red-500 transition"
            >
              <option value="" disabled>Choose group</option>
              {bloodGroups.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
      {errors.bloodGroup && <p className="text-red-500 text-xs">{errors.bloodGroup.message}</p>}
          </div>

          {/* District */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-black font-semibold">Select District *</label>
            <select
              {...register("district", { required: "District is required" })}
              defaultValue=""
              onChange={(e) => {
                register("district").onChange(e); 
                setSelectedDistrict(e.target.value); 
                setValue("upazila", ""); 
              }}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 h-10 text-sm text-white focus:outline-none focus:border-red-500 transition"
            >
              <option value="" disabled>Choose district</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}
          </div>

          {/* Upazila */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs text-black font-semibold">Select Upazila *</label>
            <select
              {...register("upazila", { required: "Upazila is required" })}
              defaultValue=""
              disabled={!selectedDistrict}
className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 h-10 text-sm text-white focus:outline-none focus:border-red-500 transition disabled:opacity-50"
            >
              <option value="" disabled>Choose upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            {errors.upazila && <p className="text-red-500 text-xs">{errors.upazila.message}</p>}
          </div>
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password */}
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-black font-semibold">Password</Label>
            <div className="relative">
              <Input
                {...register("password", { required: "Password is required" })}
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button type="button" onClick={() => setIsShowPassword(!isShowPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-black font-semibold">Confirm Password</Label>
            <div className="relative">
              <Input
                {...register("confirmPassword", { required: "Confirm Password is required" })}
                type={isShowConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
              />
              <button type="button" onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 mt-4">
          <Button className='flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold h-11 rounded-xl shadow-lg' type="submit" isLoading={loading}>
            <Check /> {loading ? "Signing Up..." : "SignUp"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default SignUpPage;