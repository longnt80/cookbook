import React from 'react';
import '../styles/SingleItemView.css';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const SingleItemView = (props) => {
    const {singleItemData, handleViewAllBtn, handleEditOrCreate} = props;
    const ingredientsList = singleItemData.ingredients.map( ingredient => <li key={ingredient.id}>{ingredient.name}</li> )

    const noImgStyle = (singleItemData.image === '') ? { maxWidth: "600px", margin: "0 auto" } : null

    return (
        <div>
            <Paper className="SingleItemView" zDepth={2} style={noImgStyle}>
                { singleItemData.image !== '' &&
                    <div className="detailV__recipe__image">
                        <img src={singleItemData.image} alt={singleItemData.name} />
                    </div>
                }
                
                <div className="detailV__recipe__info">
                    <h1 className="detailV__recipe__name">{singleItemData.name}</h1>
                    <h2 className="detailV__recipe__desc">{singleItemData.description}</h2>
                    <ul className="detailV__recipe__ingrs">
                        {ingredientsList}
                    </ul>
                    
                    <div className="detailV__recipe__ctrls">
                        <FlatButton 
                            onClick={(e) => handleEditOrCreate(e, singleItemData)}
                            label="EDIT" 
                            primary={true} 
                            />
                        <FlatButton 
                            label="DELETE THIS RECIPE"
                            secondary={true} 
                            onClick={() => props.handleDelete(singleItemData.id)}
                            />
                    </div>      

                </div>
            </Paper>
            <br/><br/>
            <div><RaisedButton onClick={handleViewAllBtn} label="View all Recipes" /></div>
            <br/><br/><br/>
        </div>
    );
};

export default SingleItemView;