import { MdBloodtype } from "react-icons/md";

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-red-500 to-pink-500 p-2 rounded-lg text-white shadow-md shadow-pink-500/20">
                <MdBloodtype className="text-xl" />
            </div>
<span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-red-500  to-pink-500 bg-clip-text text-transparent">
                Blood Donation
            </span>
        </div>
    );
};

export default Logo;