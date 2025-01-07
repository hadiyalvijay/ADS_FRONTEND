import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { UserCircle2, Mail, Smartphone, Briefcase, Calendar, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import EmployeeActionDropdown from './EmployeeActionDropdown';
import EmployeeModal from './EmployeeModel';

const Employeelist = ({ onEmployeeClick, currentUsername, setPageLoading, isDarkMode }) => {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredEmployee, setHoveredEmployee] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });



    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    const [dropdownOpen, setDropdownOpen] = useState(null);

    const dropdownRefs = useRef({});


    const sortData = (data, key, direction) => {
        if (!key || !direction) return data;

        return [...data].sort((a, b) => {
            let aValue = key === 'name' ? `${a.firstName} ${a.middleName || ''}` : a[key];
            let bValue = key === 'name' ? `${b.firstName} ${b.middleName || ''}` : b[key];


            if (key === 'joiningDate') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (direction === 'ascending') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(3);
            } else {
                setItemsPerPage(5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };



    const fetchEmployeeData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            const updatedData = response.data.map(emp => {
                const fullName = `${emp.firstName} ${emp.middleName || ''}`.trim();
                return {
                    ...emp,
                    displayName: fullName,
                    isCurrentUser: fullName === currentUsername
                };
            });
            setEmployeeData(updatedData);


            const currentUser = updatedData.find(emp => emp.isCurrentUser);
            if (currentUser) {
                localStorage.setItem('username', currentUser.displayName);
            }
        } catch (err) {
            console.error('Error fetching employee data:', err.response || err.message);
            setError('Error fetching employee data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [currentUsername]);

    useEffect(() => {
        fetchEmployeeData();
        const intervalId = setInterval(fetchEmployeeData, 10000);
        return () => clearInterval(intervalId);
    }, [fetchEmployeeData]);

    const handleEmployeeClick = (employee) => {
        if (onEmployeeClick) {
            onEmployeeClick(employee);
        }
    };
    const handleDropdownToggle = (employeeId, e) => {
        e.stopPropagation();
        setDropdownOpen(prev => (prev === employeeId ? null : employeeId));
        const employee = employeeData.find(emp => emp.id === employeeId);
        console.log('Employee details:', employee);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRefs.current && !Object.values(dropdownRefs.current).some(ref => ref && ref.contains(e.target))) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    const handleView = (employee) => {

        alert(`Viewing ${employee.name}`);
    };
    const handleDelete = async (employeeId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');

        if (confirmDelete) {
            try {

                const response = await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);

                if (response.status === 200) {

                    setEmployeeData((prevData) => prevData.filter((emp) => emp._id !== employeeId));
                }
            } catch (error) {
                console.error('Error deleting employee:', error);

            }
        }
    };


    const sortedEmployees = sortData(employeeData, sortConfig.key, sortConfig.direction);
    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(employeeData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const BlurredImage = ({ src, alt, className }) => {
        const [isLoaded, setIsLoaded] = useState(false);
        const [hasError, setHasError] = useState(false);

        return (
            <LazyMotion features={domAnimation}>
                <div className="relative rounded-full h-12 w-12 group">
                    {!hasError ? (
                        <m.img
                            src={src}
                            alt={alt}
                            className={`${className} relative z-10 object-cover rounded-full 
                                transition-all duration-500 ease-out
                                group-hover:scale-125 group-hover:rotate-6 
                                group-hover:shadow-lg group-hover:brightness-75`}
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                                rotate: -15
                            }}
                            animate={{
                                opacity: isLoaded ? 1 : 0,
                                scale: isLoaded ? 1 : 0.7,
                                rotate: 0
                            }}
                            whileHover={{
                                scale: 1.25,
                                rotate: 6,
                                transition: {
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300
                                }
                            }}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                bounce: 0.3
                            }}
                            onLoad={() => setIsLoaded(true)}
                            onError={() => {
                                setIsLoaded(true);
                                setHasError(true);
                            }}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <UserCircle2 className="h-full w-full text-gray-400" />
                        </div>
                    )}
                </div>
            </LazyMotion>
        );
    };


    const columns = [
        { key: 'name', label: 'Profile', sortable: true },
        { key: 'officeEmail', label: 'Email', sortable: true },
        { key: 'mobileNumber', label: 'Mobile', sortable: true },
        { key: 'designation', label: 'Designation', sortable: true },
        { key: 'joiningDate', label: 'Joining Date', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },

    };

    return (
        <div className="min-w-full">
            <div className="mx-auto px-2 py-4 w-auto">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white shadow-lg rounded-2xl w-full h-full flex flex-col overflow-hidden"
                    style={{
                        backgroundColor: isDarkMode
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(255, 255, 255, 0.15)',
                        color: isDarkMode ? '#c7c7df' : '#566a7f',
                        borderRadius: '12px',
                        padding: '20px',
                        height: 'auto',
                        overflowY: 'auto',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid',
                        borderColor: isDarkMode
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(255, 255, 255, 0.3)',
                        boxShadow: isDarkMode
                            ? '0 4px 16px 0 rgba(0, 0, 0, 0.15)'
                            : '0 4px 16px 0 rgba(200, 200, 200, 0.25)',
                        position: 'relative',
                    }}
                >
                    {/* Subtle gradient overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{
                            background: isDarkMode
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
                                : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                            zIndex: 1,
                        }}
                    />

                    {/* Content container */}
                    <div className="relative z-10">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 md:p-6 rounded-t-2xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                                Employee Directory
                            </h2>
                        </div>
                    </div>


                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className=" flex justify-center items-center text-gray-500"
                        >
                            <svg className="animate-spin h-10 w-10 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Loading Employees...</span>
                        </motion.div>
                    )}

                    {error && (
                        <div className="p-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                {error}
                            </motion.div>
                        </div>
                    )}

                    <AnimatePresence>
                        {currentEmployees.length > 0 && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex-1 flex flex-col "
                            >
                                <div className='overflow-y-auto'>
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                {columns.map((column) => (
                                                    <th
                                                        key={column.key}
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {column.label}
                                                            {column.sortable && (
                                                                <div className="flex flex-row gap-1">
                                                                    <ArrowUpCircle
                                                                        className={`h-4 w-4 cursor-pointer ${sortConfig.key === column.key &&
                                                                            sortConfig.direction === 'ascending'
                                                                            ? 'text-blue-500'
                                                                            : 'text-gray-400'
                                                                            }`}
                                                                        onClick={() => handleSort(column.key)}
                                                                    />
                                                                    <ArrowDownCircle
                                                                        className={`h-4 w-4 cursor-pointer ${sortConfig.key === column.key &&
                                                                            sortConfig.direction === 'descending'
                                                                            ? 'text-blue-500'
                                                                            : 'text-gray-400'
                                                                            }`}
                                                                        onClick={() => handleSort(column.key)}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentEmployees.map((employee, index) => (
                                                <motion.tr
                                                    key={index}
                                                    variants={itemVariants}
                                                    whileHover="hover"
                                                    className={`border-b transition-all duration-300 ${hoveredEmployee === index
                                                        ? 'bg-blue-50'
                                                        : employee.isCurrentUser
                                                            ? 'bg-blue-50'
                                                            : 'bg-white hover:bg-gray-50'
                                                        }`}
                                                    onHoverStart={() => setHoveredEmployee(index)}
                                                    onHoverEnd={() => setHoveredEmployee(null)}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <BlurredImage
                                                                src={employee.profilePic || ''}
                                                                alt={`${employee.firstName}'s profile`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {employee.firstName} {employee.middleName || ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Mail className="mr-2 h-4 w-4 text-gray-400" />
                                                            {employee.officeEmail || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Smartphone className="mr-2 h-4 w-4 text-gray-400" />
                                                            {employee.mobileNumber || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
                                                            {employee.designation || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                                            {employee.joiningDate
                                                                ? new Date(employee.joiningDate).toLocaleDateString()
                                                                : 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                        <EmployeeActionDropdown
                                                            employee={employee}
                                                            onView={handleView}
                                                            onDelete={() => handleDelete(employee._id)}
                                                            profilePic={employee.profilePic}
                                                        />
                                                    </td>

                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div className="flex flex-col md:flex-row justify-center items-center py-4">
                        <div className="flex mb-2 md:mb-0">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 mx-1 bg-gray-300 rounded-lg disabled:opacity-50 text-lg text-gray-700"
                            >
                                Previous
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageClick(index + 1)}
                                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} text-lg`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 mx-1 bg-gray-300 rounded-lg disabled:opacity-50 text-lg text-gray-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>


                    {employeeData.length === 0 && !loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 text-gray-500"
                        >
                            No employees available
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Employeelist;