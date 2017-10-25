import React from 'react';
import '../styles/SingleItemView.css';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const SingleItemView = (props) => {
    const {singleItemData, handleViewAllBtn, handleEditOrCreateBtn} = props;
    console.log(singleItemData);

    return (
        <div>
            <Paper className="SingleItemView" zDepth={2}>
                <div className="detailV__recipe__image">
                    <img src={singleItemData.data.image} alt={singleItemData.data.name} />
                </div>
                <div className="detailV__recipe__info">
                    <h1 className="detailV__recipe__name">{singleItemData.data.name}</h1>
                    <h2 className="detailV__recipe__desc">{singleItemData.data.description}</h2>
                    <ul className="detailV__recipe__ingrs">

                        {
                            singleItemData.data.ingredients.map( (ingredient, index) => <li key={index}>{ingredient}</li> )
                        }

                    </ul>
                    
                    <div className="detailV__recipe__ctrls">
                        <FlatButton 
                            onClick={(e) => handleEditOrCreateBtn(e, singleItemData)}
                            label="EDIT" 
                            primary={true} 
                        />
                        <FlatButton 
                            label="DELETE THIS RECIPE"
                            secondary={true} 
                        />
                    </div>      

                </div>
            </Paper>
            <br/><br/><br/>
            <div><RaisedButton onClick={handleViewAllBtn} label="View all Recipes" /></div>
            <br/><br/><br/>
        </div>
    );
};

export default SingleItemView;