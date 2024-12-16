import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Employeelist = ({ onEmployeeClick }) => {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get('https://ads-server-rdvc.vercel.app/api/employees');

                console.log(response.data); // Log the response to verify its structure

                // Safely check and set data
                const employees = Array.isArray(response.data.employees) ? response.data.employees : [];
                setEmployeeData(employees);
            } catch (err) {
                console.error('Error fetching employee data:', err);
                setError('Error fetching employee data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    // Handle employee click to view more details
    const handleEmployeeClick = (employee) => {
        if (onEmployeeClick) {
            onEmployeeClick(employee); // Call the onEmployeeClick function passed from parent
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Employee List</h3>

            {loading && <div className="alert alert-info">Loading...</div>}
            {error && <div className="alert alert-danger">Error: {error}</div>}

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
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
                        {Array.isArray(employeeData) && employeeData.length > 0 ? (
                            employeeData.map((employee, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {employee.profilepic ? (
                                                <img
                                                    src={`data:image/jpeg;base64,${employee.profilepic}`}
                                                    alt="Profile"
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                                    className="mr-3"
                                                />
                                            ) : (
                                                <span>No Profile Pic</span>
                                            )}
                                            <span>{employee.firstName} {employee.middleName} {employee.lastName}</span>
                                        </div>
                                    </td>
                                    <td>{employee.officeEmail}</td>
                                    <td>{employee.mobileNumber}</td>
                                    <td>{employee.department}</td>
                                    <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() => handleEmployeeClick(employee)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    {loading ? 'Loading...' : 'No employees available'}
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Employeelist;
