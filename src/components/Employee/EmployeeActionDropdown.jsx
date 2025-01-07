import React, { useState, useEffect, useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EmployeeModal from './EmployeeModel';

const EmployeeActionDropdown = ({ employee, onDelete, profilePic, isDarkMode }) => {
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
    localStorage.setItem('firstname', employee.firstname || '');
    localStorage.setItem('middlename', employee.middlename || '');
    
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

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={handleToggle}
        className={`p-2 rounded-full transition-all duration-300
          ${isDarkMode 
            ? 'hover:bg-gray-700/50 text-gray-300' 
            : 'hover:bg-gray-100/70 text-gray-500'}`}
      >
        <MoreHorizontal className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute right-0 mt-2 w-48 rounded-xl overflow-hidden
              ${isDarkMode 
                ? 'bg-gray-800 shadow-lg shadow-black/20' 
                : 'bg-white shadow-lg shadow-gray-200/50'}
              border border-opacity-20
              ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}
              z-50`}
            style={{
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none'
            }}
          >
            <div className="py-1" role="menu">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleViewProfile}
                className={`flex w-full px-4 py-2 text-sm transition-all duration-300
                  ${isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
              >
                View
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleEditClick}
                className={`flex w-full px-4 py-2 text-sm transition-all duration-300
                  ${isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Edit
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  onDelete(employee.id);
                  setIsOpen(false);
                }}
                className={`flex w-full px-4 py-2 text-sm transition-all duration-300
                  ${isDarkMode 
                    ? 'text-red-400 hover:bg-red-900/30' 
                    : 'text-red-700 hover:bg-red-50'}`}
              >
                Delete
              </motion.button>
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