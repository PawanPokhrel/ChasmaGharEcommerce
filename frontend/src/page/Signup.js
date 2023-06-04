import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
// import {login} from './Login';
import dummy from "../asset/dummy.jpg";
import { toast } from "react-hot-toast";
// import Dropzone from 'react-dropzone';
// import { ReactComponent as UploadIcon } from './upload-icon.svg';
// import { Img } from 'react-image';

// import { useHistory } from 'react-router-dom';

// import Login from "./Login";

export const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  console.log(data);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setshowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const UploadProfileImage = async(e) => {

    const data = await ImagetoBase64(e.target.files[0])
  

      setData((prev)=>{
          return{
            ...prev,
            image : data
          }
      })
    // var fileInput = document.getElementById("uploadphoto");

    // var file = fileInput.files[0];

    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   var img = document.getElementById("profilephoto");
    //   img.src = e.target.result;
    // };
    // reader.readAsDataURL(file);
    // setData((prev)=>{
    //   return {
    //     ...prev,
    //     image : file
    //   }
    // })
  }

  console.log(process.env.REACT_APP_SERVER_DOMAIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        // useHistory.push('/login');
        console.log(data);
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        console.log(dataRes);
          // toast(dataRes.message);
        // alert(dataRes.messasge);

        toast(dataRes.message);

        if(dataRes.alert) {
          navigate("/login");
        }
        // navigate("/login");
      } else {
        alert("Password and confirm password are not same.");
      }
    } else {
      alert("Please Enter required fields");
    }
  };
  // const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  // const handleshowConfirmPassword = () => {
  //   setshowConfirmPassword((prev) => !prev);
  // };

  
  // const [data, setData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   image : ""
  // });

  // console.log(data);
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        <div className="w-50 over flow-hidden drop-shadow-md shadow-md">
          <h1 className="text-center text-2xl font-bold text-align-center">
            Sign up
          </h1>
          <div className=" w-full flex justify-center mt-2">
            <label htmlFor="uploadphoto" className="cursor-pointer">
              {" "}
              <img
                src={data.image ? data.image :  dummy}
                id="profilephoto"
                className="rounded-full shadow-lg h-20 w-20 cursor-pointer"
                alt="dummy"
              ></img>
            </label>
            <input
              type="file"
              accept="image/*"
              id="uploadphoto"
              className="justify-center shadow-lg hidden"
              onChange={UploadProfileImage}
              required
            ></input>
          </div>
          {/* <label htmlFor="uploadphoto" className="cursor-pointer justify-center">Upload Photo</label> */}

          <form
            className="w-full py-3 px-2 flex-column"
            onSubmit={handleSubmit}
          >
            <label htmlFor="firstName">First Name</label>
            <input
              type={"text"}
              id="firstName"
              name="firstName"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.firstName}
              onChange={handleOnChange}
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type={"text"}
              id="lastName"
              name="lastName"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.lastName}
              onChange={handleOnChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type={"email"}
              id="email"
              name="email"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.email}
              onChange={handleOnChange}
              required
            />
            <label htmlFor="password">Password</label>
            <div className="px-2 py-1 flex bg-slate-200 rounded mt-1 mb-2 focus-within:outline-blue-300">
              <input
                type={showPassword ? "text" : "Password"}
                id="password"
                name="password"
                className=" w-full bg-slate-200  rounded border-none outline-none"
                value={data.password}
                onChange={handleOnChange}
                required
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="px-2 py-1 flex bg-slate-200 rounded mt-1 mb-2 focus-within:outline-blue-300">
              <input
                type={showConfirmPassword ? "text" : "Password"}
                id="confirmPassword"
                name="confirmPassword"
                className=" w-full bg-slate-200  rounded border-none outline-none"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            <button
              type="submit"
              className=" w-full max-w-[150px]m-auto  bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
            >
              Sign up
            </button>
          </form>
          <p className="text-left">
            Already have account?{" "}
            <Link to={"/login"} className="text-blue-700 underline">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
