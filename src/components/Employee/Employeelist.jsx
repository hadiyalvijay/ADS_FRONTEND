import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Employeelist = ({ onEmployeeClick }) => {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch employee data from API
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                const employees = response.data.map(employee => ({
                    ...employee,
                    profilePicUrl: `http://localhost:5000${employee.profilePic}` // Ensure full image URL
                }));
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

    // Handle employee row click
    const handleEmployeeClick = (employee) => {
        if (onEmployeeClick) {
            onEmployeeClick(employee);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Employee List</h3>

            {/* Loading and Error States */}
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
                        {/* Check if employee data is available */}
                        {employeeData.length > 0 ? (
                            employeeData.map((employee, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {employee.profilePicUrl && employee.profilePicUrl.trim() !== '' ? (
                                                <img
                                                    src={employee.profilePicUrl}
                                                    alt="Profile Pic"
                                                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                                                />
                                            ) : (
                                                <span>No Profile Pic</span>
                                            )}
                                            <span>
                                                {employee.firstName || 'N/A'} {employee.middleName || ''}{' '}
                                                {employee.lastName || 'N/A'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{employee.officeEmail || 'N/A'}</td>
                                    <td>{employee.mobileNumber || 'N/A'}</td>
                                    <td>{employee.department || 'N/A'}</td>
                                    <td>
                                        {employee.joiningDate
                                            ? new Date(employee.joiningDate).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
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
