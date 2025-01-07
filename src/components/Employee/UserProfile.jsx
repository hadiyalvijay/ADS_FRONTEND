import React, { useEffect, useState } from 'react';
import { Edit, Plus, PenTool, Calendar, UserCheck, User, Users, LayoutGrid, Link } from 'lucide-react';
import { Card, CardContent, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';


const UserProfile = () => {
    const { isDarkMode } = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');

    const location = useLocation();
    const employee = location.state?.employee;
    const { profilePic } = employee;
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (employee) {
            setProfileData(employee);
            setLoading(false);
        } else {
            const fetchProfileData = async () => {
                try {
                    const employeeId = "employeeId";
                    const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`);
                    const data = await response.json();
                    setProfileData(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching employee data:", error);
                    setLoading(false);
                }
            };
            fetchProfileData();
        }
    }, [employee]);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin border-4 border-t-4 border-teal-500 rounded-full w-8 h-8"></div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="text-center text-red-500">
                <p>Error: Profile data not found!</p>
                <button onClick={() => window.location.reload()} className="text-blue-500">
                    Try Again
                </button>
            </div>
        );
    }


    const { firstName, middleName, status, designation, department, country, languages, mobileNumber, skypeId, officeEmail, teams, aadharCard, birthDate, panCard, profilepic } = profileData;

    return (
        <div className="min-w-8xl  mt-1" style={{ backgroundColor: isDarkMode ? '#232333' : '#f6f5fa', color: isDarkMode ? '#6d6e8d' : '#566a7f', width: isMobile ? '54%' : '100%' }}>

            <div className="relative">
                <div
                    className="bg-gradient-to-r from-teal-400 via-teal-200 to-pink-200 rounded-lg relative overflow-hidden"
                    style={{ height: "200px", sm: { height: "308px" } }}
                >
                    <div
                        className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ animation: 'shimmer 2s infinite' }}
                    />

                    {profilePic ? (
                        <img
                            src={profilePic}
                            alt="Profile Cover"
                            className="w-full h-full object-cover object-top rounded-lg transition-transform duration-700 hover:scale-105"
                            style={{ objectPosition: '0 -350px' }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-200 to-pink-200 animate-gradient" />
                    )}
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 sm:left-8 sm:translate-x-0 translate-y-1/2 avatar-initial rounded"
                    style={{
                        marginTop: "100px",
                        border: "5px solid #444564",
                        borderRadius: "4px",
                        boxShadow: "0 2px 15px rgba(105, 108, 255, 0.4), 0 0 30px rgba(105, 108, 255, 0.1)",
                        transition: "box-shadow 0.3s ease-in-out"
                    }}>
                    <div className="bg-cyan-400 text-white flex items-center justify-center text-2xl font-medium overflow-hidden hover:shadow-lg"
                        style={{
                            width: "110px",
                            height: "120px",
                            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))"
                        }}>
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            profileData.initials
                        )}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-16 sm:pt-0"
                    style={{ minHeight: "110px", backgroundColor: isDarkMode ? '#2a2b40' : '#fefeff', color: isDarkMode ? '#bcbcd2' : '#566a7f' }}>
                    <div className="text-center sm:text-left sm:ml-[12%] sm:mt-[-20px]">
                        <h1 className="text-xl sm:text-2xl font-bold">{middleName} {firstName}</h1>
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm mt-3">
                            <span className="text-[16px] flex items-center gap-1 font-bold">
                                <PenTool size={16} className="inline-block transform -rotate-90" />
                                {designation}
                            </span>
                            <span className="text-[16px]">{status}</span>
                            <span className="text-[16px] flex items-center gap-1 font-bold">
                                <Calendar size={16} />
                                {new Date().toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <button className="mx-auto sm:mx-0 mt-4 sm:mt-0 bg-[#696cff] w-32 text-white px-5 py-2 text-sm rounded sm:mr-5 flex items-center gap-1 hover:bg-[#4f52cc] shadow-lg shadow-indigo-500/50">
                        <UserCheck size={16} />
                        <span>Connected</span>
                    </button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-7">
                    <button className="nav-link w-32 px-7 py-2 text-sm font-medium transition-colors duration-150 bg-[#696cff] text-white rounded-md hover:bg-[#4f52cc] shadow-lg shadow-indigo-500/50 flex items-center gap-2">
                        <User size={17} className="shrink-0" />
                        Profile
                    </button>
                    <button className="nav-link w-32 px-7 py-2 text-sm font-medium transition-colors duration-150 bg-[#232333] text-white rounded-md hover:bg-[#4f52cc] hover:shadow-indigo-500/30 hover:shadow-indigo-500/30 flex items-center gap-2">
                        <Users size={17} className="shrink-0" />
                        Teams
                    </button>
                    <button className="nav-link w-32 px-5 py-2 text-sm font-medium transition-colors duration-150 bg-[#232333] text-white rounded-md hover:bg-[#4f52cc] shadow-md hover:shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2">
                        <LayoutGrid size={17} className="shrink-0" />
                        Projects
                    </button>
                    <button className="nav-link w-32 px-3 py-2 text-sm font-medium transition-colors duration-150 bg-[#232333] text-white rounded-md hover:bg-[#4f52cc] shadow-md hover:shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2">
                        <Link size={17} className="shrink-0" />
                        Connections
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-7">
                {/* About Section */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-lg p-5 shadow-sm">
                        <h2 className="text-sm text-gray-700 font-medium  mb-3">ABOUT</h2>
                        <div className="space-y-3">
                            <div className="flex items-center text-sm ">
                                <span className="w-28">Full Name:</span>
                                <span>{firstName}{middleName}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="w-28">Status:</span>
                                <span>{"Active"}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="w-28">Role:</span>
                                <span>{designation}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="w-28">Department:</span>
                                <span>{department}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="w-28">Country:</span>
                                <span>{"INDIA"}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="w-28">Languages:</span>
                                <span>{"Gujrati,Hindi,English"}</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg mt-8 shadow-sm">
                            <h2 className="text-sm text-gray-700 font-medium mb-3">CONTACTS</h2>
                            <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <span className="w-28">Contact:</span>
                                    <span>{mobileNumber}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="w-28">Skype:</span>
                                    <span className="truncate">{skypeId}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="w-28">Email:</span>
                                    <span className="truncate">{officeEmail}</span>
                                </div>
                            </div>
                        </div>

                        {/* Teams Section */}
                        <div className="bg-white rounded-lg mt-8 shadow-sm">
                            <h2 className="text-sm text-gray-700 font-medium mb-3">TEAMS</h2>
                            <div className="space-y-3">

                                <div className="flex items-center justify-between text-sm">
                                    <span></span>
                                    <span className="text-gray-400"></span>
                                </div>

                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button className="text-blue-500">
                                <Edit size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sections */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Personal Details Section */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-medium text-gray-700">Personal Details</h2>
                            <button className="text-blue-500">
                                <Edit size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="p-3">
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">Passport No:</label>
                                </div>
                                <div className="mt-1 text-sm flex justify-between ">
                                    <label className="text-sm">AadharCard:</label>
                                    <div className="w-100">{aadharCard}</div>
                                </div>
                                <div className="mt-1 text-sm flex justify-between">
                                    <label className="text-sm">Religion:</label>
                                    <div>{"Hindu"}</div>
                                </div>
                                <div className="mt-1 text-sm flex justify-between">
                                    <label className="text-sm">Employment of Spouse:</label>
                                    <span>False</span>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="p-3">
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">Passport Exp Date:</label>
                                </div>
                                <div className="mt-1 text-sm flex justify-between">
                                    <label className="text-sm">PanCard:</label>
                                    <div>{panCard}</div>
                                </div>
                                <div className="mt-1 text-sm flex justify-between">
                                    <label className="text-sm">Marital Status:</label>
                                </div>
                                <div className="mt-1 text-sm flex justify-between">
                                    <label className="text-sm">No of Children:</label>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-medium text-gray-700">Current Details</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="p-3">
                                <div className="mt-1 text-sm flex justify-between">
                                    <label className="text-sm">Country:</label>
                                    <div>{"INDIA"}</div>
                                </div>
                                <div className="mt-1 text-sm flex justify-between">
                                    <label className="text-sm">District:</label>
                                    <div>{"GUJRAT"}</div>
                                </div>
                                <div className="mt-1 text-sm flex justify-between">
                                    <label className="text-sm">PinCode:</label>
                                    <div>{"363310"}</div>

                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="p-3">
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">State:</label>
                                </div>
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">City:</label>
                                </div>
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">Address:</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-medium text-gray-700">Permanent Details</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="p-3">
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">Country:</label>
                                </div>
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">District:</label>
                                </div>
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">PinCode:</label>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="p-3">
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">State:</label>
                                </div>
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">City:</label>
                                </div>
                                <div className="mt-1 text-sm">
                                    <label className="text-sm">Address:</label>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>


            </div>
            <div className="container mx-auto mt-4">
                {/* Row 1: Experience and Education */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Experience Details */}
                    <div className="bg-white rounded-lg p-4 shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-medium text-gray-700">Experience Details</h2>
                            <button className="text-blue-500">
                                <Edit size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">

                            <p className="text-sm">Details about experience will go here.</p>
                        </div>
                    </div>

                    {/* Education Details */}
                    <div className="bg-white rounded-lg p-4 shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-medium text-gray-700">Education Details</h2>
                            <button className="text-blue-500">
                                <Edit size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">

                            <p className="text-sm">Details about education will go here.</p>
                        </div>
                    </div>
                </div>

                {/* Row 2: Bank Information and Emergency Details */}
                <div className="flex flex-col lg:flex-row gap-4 mt-4">
                    {/* Bank Information */}
                    <div className="bg-white rounded-lg p-4 shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-medium text-gray-700">Bank Information</h2>
                            <button className="text-blue-500">
                                <Edit size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">

                            <p className="text-sm">Bank details will go here.</p>
                        </div>
                    </div>

                    {/* Emergency Details */}
                    <div className="bg-white rounded-lg p-4 shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-sm font-medium text-gray-700">Emergency Details</h2>
                            <button className="text-blue-500">
                                <Edit size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm text-gray-600 mb-3">Primary Emergency Details:</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="mt-1 text-sm">
                                        <label className="text-sm">Name:</label>
                                        <p className="text-sm text-gray-800">John Doe</p>
                                    </div>
                                    <div className="mt-1 text-sm">
                                        <label className="text-sm">Phone 1:</label>
                                        <p className="text-sm text-gray-800">123-456-7890</p>
                                    </div>
                                    <div className="mt-1 text-sm">
                                        <label className="text-sm">Relationship:</label>
                                        <p className="text-sm text-gray-800">Brother</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="mt-1 text-sm">
                                        <label className="text-sm">Phone 2:</label>
                                        <p className="text-sm text-gray-800">987-654-3210</p>
                                    </div>
                                    <div className="mt-1 text-sm">
                                        <label className="text-sm">Email:</label>
                                        <p className="text-sm text-gray-800">john.doe@example.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-8xl mt-4 overflow-x-auto">
                <div className="bg-white rounded-lg shadow-sm flex-1">
                    <div className="p-0">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg text-gray-700 font-medium">Family Details</h2>
                            <button className="text-blue-600 hover:text-blue-700">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-4 text-sm font-medium">FAMILY MEMBER NAME</th>
                                    <th className="text-left p-4 text-sm font-medium">RELATIONSHIP</th>
                                    <th className="text-left p-4 text-sm font-medium">BIRTHDATE</th>
                                    <th className="text-left p-4 text-sm font-medium">MOBILENO</th>
                                    <th className="text-left p-4 text-sm font-medium">EMAIL</th>
                                    <th className="text-left p-4 text-sm font-medium">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>

                <footer className="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
                    <div className="flex items-center gap-1">
                        <span>© 2024, made with</span>
                        <span className="text-red-500">❤</span>
                        <span>by ThemeSelection</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-gray-900">License</a>
                        <a href="#" className="hover:text-gray-900">More Themes</a>
                        <a href="#" className="hover:text-gray-900">Documentation</a>
                        <a href="#" className="hover:text-gray-900">Support</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default UserProfile;