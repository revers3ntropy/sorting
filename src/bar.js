import React from 'react';

function Bar ({ value, width, theme }) {
    const style = {
        height: value + width - 5, // get the smallest to be circular
        width,
        borderRadius: width/2,
        background: theme
    };

    return (
        <div style={style} className="bar"/>
    );
}

export default Bar;