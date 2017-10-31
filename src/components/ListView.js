import React from 'react';
import PropTypes from 'prop-types';

import '../styles/ListView.css';

import GridItem from './GridItem';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const ListView = (props) => {
    const {data, handleViewOneBtn, handleEditOrCreate} = props;
    
    const recipesList = data.map( (recipe) => {
        const bgStyle = {
            backgroundImage: "url(" + recipe.image + ")",
            backgroundColor: '#f3dddd',
            backgroundSize: "cover"
        }
        
        return (
            <GridItem 
                key={recipe.id}>
                
                <Paper 
                    style={bgStyle}
                    className="grid__content"
                    zDepth={1}
                    onClick={() => handleViewOneBtn(recipe)}
                    >
                    
                    <div className="listV__recipe-info">
                        <h2 className="listV__recipe-info__name">
                            {recipe.name}
                        </h2>
                        {<h3 className="listV__recipe-info__desc">{recipe.description}</h3>}
                        <div className="listV__recipe__ctrls">
                            <FlatButton 
                                onClick={() => handleViewOneBtn(recipe)} 
                                className="listV__recipe__ctrls__edit" 
                                label="VIEW"
                                labelStyle={{fontSize: "0.8em"}}
                                primary={true}
                            />
                            <FlatButton 
                                onClick={(e) => {
                                        e.stopPropagation();
                                        props.handleDelete(recipe.id)
                                    } 
                                }
                                className="listV__recipe__ctrls__delete" 
                                label="DELETE" 
                                labelStyle={{fontSize: "0.8em"}}
                                secondary={true}
                            />
                        </div>
                    </div>
                </Paper>
                
            </GridItem>
        )
    });

    return (
        <div>
            <div className="grid">

                {recipesList}
            </div>
                <br/><br/>
                <RaisedButton 
                    onClick={(e) => handleEditOrCreate(e)}
                    label="New recipe"
                    primary={true}
                    />
                <br/><br/>
        </div>    
    )
}

ListView.propTypes = {
    data: PropTypes.array.isRequired
};

export default ListView;