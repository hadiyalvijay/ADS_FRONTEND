import React, { useState, useEffect, useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EmployeeModal from './EmployeeModel';

const EmployeeActionDropdown = ({ employee, onDelete, profilePic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

 
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

 
  const handleViewProfile = () => {
    navigate('/loading');
    setTimeout(() => {
      navigate('/User Profile/Profile', {
        state: {
          employee: {
            ...employee,
            profilePic,
          },
        },
      });
    }, 1000);
  };

  
  const handleEditClick = () => {
  
      setIsOpen(false);
      setShowEditModal(true); 
  };

  return (
    <div className="relative" ref={dropdownRef}>
     
      <button
        onClick={handleToggle}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </button>

     
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1" role="menu">
              
              <button
                onClick={handleViewProfile}
                className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                View
              </button>
              
              <button
                onClick={handleEditClick}
                className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Edit
              </button>
            
              <button
                onClick={() => {
                  onDelete(employee.id);
                  setIsOpen(false); e
                }}
                className="flex w-full px-4 py-2 text-sm text-red-700 hover:bg-red-100 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {showEditModal && (
        <EmployeeModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          employeeData={{ ...employee, profilePic: profilePic }}
        />
      )}
    </div>
  );
};

export default EmployeeActionDropdown;
