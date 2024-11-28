import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios

const Employeelist = ({ onEmployeeClick }) => {
    const [employeeData, setEmployeeData] = useState([]);  // State to store employee data
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    // Fetch employee data from API

    useEffect(() => {



        const fetchEmployeeData = async () => {

            setLoading(true);  // Set loading state before the request
            try {
                const response = await axios.get('https://ads-server-rdvc.vercel.app/api/employees'); 
                setEmployeeData(response.data);  // Update state with fetched data
            } catch (error) {
                console.error('Error fetching employee data:', error);
                setError(error.message);  // Set error state if request fails
            } finally {
                setLoading(false);  // Stop loading once request completes
            }
        };

        fetchEmployeeData();  // Call the function to fetch data
    }, []);  // Empty dependency array means this runs once when the component mounts

    // Handle employee click to view more details
    const handleEmployeeClick = async (employee) => {
        const { _id } = employee; // Get employee id (using _id for MongoDB)
        try {
            const response = await axios.get(`https://ads-server-rdvc.vercel.app/api/employees/${_id}`);  // Use axios.get
            onEmployeeClick(response.data); // Pass the employee data to parent component
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    return (
        <div className="employee-list">
            <h3>Employee List</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Department</th>
                        <th>Joining Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData.length === 0 ? (
                        <tr>
                            <td colSpan="6">No employees available</td>
                        </tr>
                    ) : (
                        employeeData.map((employee, index) => (
                            <tr key={index}>
                                <td>
                                    {employee.profilepic ? (
                                        <img src={employee.profilepic} alt="Profile" style={{ width: '50px', height: '50px' }} />
                                    ) : (
                                        <span>No Profile Pic</span>
                                    )}
                                    <br />
                                    {employee.firstName} {employee.middleName} {employee.lastName}
                                </td>
                                <td>{employee.officeEmail}</td>
                                <td>{employee.mobileNumber}</td>
                                <td>{employee.department}</td>
                                <td>{employee.joiningDate}</td>
                                <td>
                                    <button onClick={() => handleEmployeeClick(employee)}>View</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Employeelist;
