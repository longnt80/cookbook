import React, { Component } from 'react';

import SingleItemView from './SingleItemView';
import SingleItemEdit from './SingleItemEdit';


class SingleItem extends Component {

    render() {
        const {singleItemData, edittingItem, handleViewAllBtn, handleEditOrCreateBtn} = this.props;

        if(!edittingItem) {
            return (
                <SingleItemView 
                    singleItemData={singleItemData}
                    handleViewAllBtn={handleViewAllBtn}
                    handleEditOrCreateBtn={handleEditOrCreateBtn} />
            )
        }
        else if (edittingItem) {
            return (
                <SingleItemEdit 
                    singleItemData={singleItemData}
                    handleViewAllBtn={handleViewAllBtn} />
            )
        }
    }
}

export default SingleItem;