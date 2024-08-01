import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000/"

const Main = () => {

    const [passwordArray, setpasswordArray] = useState([])

    const ref = useRef()
    const passwordref = useRef();

    const [manager, setmanager] = useState({
        url: "",
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setmanager({
            ...manager, [e.target.name]: e.target.value
        })
    }

    const passwordManager = (e) => {

        e.preventDefault();

        setpasswordArray([...passwordArray, manager])

        const saveToMongo = async () =>{
            const data = await axios.post('/create', manager)
            console.log(data);
        }

        saveToMongo()

        
        setmanager({
            url: "",
            username: "",
            password: ""
        })


    }

    const getFetchData = async () =>{
        const data = await axios.get("/")

        if(data.data.success){
            setpasswordArray(data.data.data)
        }
    }

    useEffect(() => {
        getFetchData()
          
    }, [])
    
    const deletePass = (id) => {
        toast.error('Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            });

        let copyPasswordArray = [...passwordArray]
        copyPasswordArray.splice(id, 1)
        setpasswordArray(copyPasswordArray)

        const deleteMongo = async() => {
            const data = await axios.delete(`/delete/${id}`)
            console.log("hello");
            if(data.data.success){
                getFetchData()
            }
        }

        deleteMongo()
    }



    const showPassword = () => {

        if (ref.current.src.includes("/crosseye.png")) {
            ref.current.src = "/eye.png"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "/crosseye.png"
            passwordref.current.type = "text"
        }

    }

    const copytext = (text) => {
        toast.success('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text);
    }

    const editPass = (id) => {
        
        let obj = passwordArray[id]
        setmanager({
            url: obj.url,
            username: obj.username,
            password: obj.password
        })

    }

    return (
        <>

            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />

            <div className='bg-[#89ccf3] w-full pb-7 justify-center items-center py-7 flex-col'>
                <div className="forms flex justify-center items-center flex-col w-full">
                    <div className="head text-center">
                        <h1 className='text-3xl font-bold'>PassPhrase Chief</h1>
                        <p className='text-sm'>Your own Password Manager</p>
                    </div>
                    <form onSubmit={passwordManager} className='p-5 flex flex-col gap-7 justify-center lg:w-[70%] w-[100vw] mt-4' >
                        <div className="inputs flex gap-5 flex-col">
                            <input required onChange={(e) => handleChange(e)} name="url" value={manager.url} type="text" placeholder='Enter Website URL' className='w-full p-1 px-3 out-line rounded-3xl' />
                            <div className="authentication relative flex flex-col sm:flex-row gap-5 w-full">
                                <input required onChange={(e) => handleChange(e)} name='username' value={manager.username} type="text" placeholder='Enter Username' className='w-[100%] sm:w-[70%] input out-line' />
                                <input onChange={(e) => handleChange(e)} ref={passwordref} name='password' value={manager.password} type="password" placeholder='Enter Password' className='w-[100%] sm:w-[30%] input out-line' show />
                                <span onClick={showPassword} className='absolute right-2 top-16 sm:top-2 cursor-pointer'><img ref={ref} className='w-5' src="/eye.png" alt="" /></span>
                            </div>

                        </div>

                        <div className="btns w-20 m-auto">
                            <button className='bg-[#003049] flex justify-center gap-2 items-center p-1 rounded-xl px-4 font-bold text-yellow-50 hover:bg-[#337090] '>
                                <lord-icon
                                    className=''
                                    src="https://cdn.lordicon.com/hqymfzvj.json"
                                    trigger="loop"
                                    delay="500"
                                    colors="primary:#ffffff"
                                >
                                </lord-icon>

                                Save</button>
                        </div>
                    </form>
                </div>


                <div className="passwords lg:w-[70%] w-[100vw] flex gap-4 flex-col p-5 px-10 m-auto">
                    <h1 className='text-xl font-bold'>Your Passwords</h1>
                    {/* <h1 className='text-sm'>No password found</h1> */}
                    {passwordArray.length === 0 && <h1 className='text-sm'>No password found</h1>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full  rounded-md overflow-hidden">
                            <thead className='bg-[#003049] text-white'>
                                <tr>
                                    <th className='py-2'>Website URL</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    passwordArray.map((item, index) => {
                                        return <tr key={index} className=''>
                                            <td className='py-2 text-center bg-[#65c0f5] w-55'> <a target='_blank' href={item.url}>{item.url}</a></td>
                                            <td className=' py-2 text-center border border-black border-l-1 border-r-1 border-t-0 border-b-0 bg-[#65c0f5] w-55'>
                                                <div className="flex gap-3 justify-center items-center cursor-pointer" onClick={() => copytext(item.username)}>
                                                    <span>{item.username}</span>
                                                    {/* <div className='w-2'> */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/uecgmesg.json"
                                                        trigger="loop"
                                                        stroke="bold"
                                                        colors="primary:#121331,secondary:#4bb3fd"
                                                        style={{ "width": "20px", "height": "20px", "cursor": "pointer" }}
                                                    >
                                                    </lord-icon>
                                                </div>

                                                {/* </div> */}

                                            </td>
                                            <td className='py-2 text-center  bg-[#65c0f5] border border-black border-r-1 border-t-0 border-b-0 w-55'>
                                                <div className="flex gap-3 justify-center items-center cursor-pointer" onClick={() => copytext(item.password)}>
                                                    <span>{item.password}</span>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/uecgmesg.json"
                                                        trigger="loop"
                                                        stroke="bold"
                                                        colors="primary:#121331,secondary:#4bb3fd"
                                                        style={{ "width": "20px", "height": "20px" }}

                                                    >
                                                    </lord-icon>
                                                </div>
                                            </td>
                                            <td className='py-3  bg-[#65c0f5] w-55'>
                                                <div className="gap-2 flex justify-center items-center">
                                                <span className="delete flex gap-3 justify-center items-center cursor-pointer" onClick={()=> deletePass(index)}>
                                                    {/* <span>Delete</span> */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/drxwpfop.json"
                                                        trigger="loop"
                                                        stroke="bold"
                                                        colors="primary:#121331,secondary:#4bb3fd"
                                                        style={{ "width": "20px", "height": "20px" }}>
                                                    </lord-icon>
                                                </span>

                                                <span className="delete flex gap-3 justify-center items-center cursor-pointer" onClick={()=> editPass(index)}>
                                                    {/* <span>Delete</span> */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/ghhwiltn.json"
                                                        trigger="loop"
                                                        colors="primary:#121331,secondary:#4bb3fd"
                                                        style={{"width":"20px","height":"20px"}}>
                                                    </lord-icon>
                                                </span>
                                                </div>
                                                
                                            </td>

                                        </tr>


                                    })
                                }
                            </tbody>

                        </table>
                    }

                </div>

            </div>
        </>
    )
}

export default Main
