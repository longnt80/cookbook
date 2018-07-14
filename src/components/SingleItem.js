import React from 'react';
import SingleItemView from './SingleItemView';
import SingleItemEdit from './SingleItemEdit';

const SingleItem = props => {
    if(!props.edittingItem) {
        return (
            <SingleItemView {...props} />
        )
    }
    else {
        return (
            <SingleItemEdit {...props} />
        )
    }
}

export default SingleItem;
