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
                console.log(response.data); // Check the response structure
                const employees = Array.isArray(response.data) ? response.data : [];
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

    const handleEmployeeClick = (employee) => {
        if (onEmployeeClick) {
            onEmployeeClick(employee);
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
                        {employeeData.length > 0 ? (
                            employeeData.map((employee, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {employee.profilepic ? (
                                                <img
                                                    src={`http://localhost:5000${employee.profilepic}`}
                                                    alt="Profile"
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                                    className="mr-3"
                                                />

                                            ) : (
                                                <span>No Profile Pic</span>
                                            )}
                                            <span>
                                                {employee.firstName || 'N/A'} {employee.middleName || ''} {employee.lastName || 'N/A'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{employee.officeEmail || 'N/A'}</td>
                                    <td>{employee.mobileNumber || 'N/A'}</td>
                                    <td>{employee.department || 'N/A'}</td>
                                    <td>{employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : 'N/A'}</td>
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
