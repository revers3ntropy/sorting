import React from 'react';

function Bar ({ value, width_, theme }) {
    const style = {
        height: value + width_ - 5, // get the smallest to be circular
        width: width_,
        borderRadius: width_/2,
        background: theme
    };

    return (
        <div style={style} className="bar"/>
    );
}

export default Bar;