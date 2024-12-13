import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get('https://ads-server-rdvc.vercel.app/api/employees');
                setEmployeeData(response.data);
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
        setSelectedEmployee(employee); // Set selected employee to show in modal
    };

    const renderEmployeeRow = (employee, index) => {
        const profilePicUrl = employee.profilepic
            ? `https://ads-server-rdvc.vercel.app${employee.profilepic}`
            : 'https://via.placeholder.com/50'; // Fallback to placeholder if no profile pic

        return (
            <tr key={index}>
                <td>
                    <div className="d-flex align-items-center">
                        <img
                            src={profilePicUrl}
                            alt="Profile"
                            width={50}
                            height={50}
                            style={{ borderRadius: '50%' }}
                        />
                        <span className="ms-2">
                            {employee.firstName} {employee.middleName || ''} {employee.lastName}
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
        );
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Employee List</h3>

            {loading && <div className="alert alert-info">Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

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
                        {employeeData.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No employees available</td>
                            </tr>
                        ) : (
                            employeeData.map(renderEmployeeRow)
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for displaying selected employee details */}
            {selectedEmployee && (
                <div className="modal show d-block" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedEmployee(null)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="text-center">
                                    <img
                                        src={`http://localhost:5000${selectedEmployee.profilepic}`}
                                        alt="Profile"
                                        width={150}
                                        height={150}
                                        style={{ borderRadius: '50%' }}
                                    />
                                </div>
                                <p><strong>Email:</strong> {selectedEmployee.officeEmail || 'N/A'}</p>
                                <p><strong>Mobile:</strong> {selectedEmployee.mobileNumber || 'N/A'}</p>
                                <p><strong>Department:</strong> {selectedEmployee.department || 'N/A'}</p>
                                <p><strong>Joining Date:</strong> {selectedEmployee.joiningDate ? new Date(selectedEmployee.joiningDate).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedEmployee(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
