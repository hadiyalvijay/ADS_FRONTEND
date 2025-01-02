
import React, { createContext, useState } from 'react';

const LabelContext = createContext();

export const LabelProvider = ({ children }) => {
    const [labels, setLabels] = useState({
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
    });

    const updateLabels = (activeState) => {
        setLabels(activeState === "out" ? {
            hours: 'Work',
            minutes: 'Lunch',
            seconds: 'Break',
        } : {
            hours: 'Hours',
            minutes: 'Minutes',
            seconds: 'Seconds',
        });
    };

    return (
        <LabelContext.Provider value={{ labels, updateLabels }}>
            {children}
        </LabelContext.Provider>
    );
};

export default LabelContext;
