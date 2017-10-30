import React from 'react';

const GridItem = (props) => {
    return (
        <div className="grid__item">
            {props.children}
        </div>
    );
};

export default GridItem;