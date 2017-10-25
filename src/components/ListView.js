import React, { Component } from 'react';

import '../styles/ListView.css';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ListView extends Component {
    
    

    render() {
        const {data, handleViewBtn, handleEditOrCreateBtn} = this.props;
        const recipes = data.map( (recipe, index) => {
            return (
                <div key={index} className="grid__item">
                    <Paper 
                        style= {{
                            backgroundImage: "url(" + recipe.image + ")",
                            backgroundSize: "cover"
                        }}
                        className="grid__content"
                        zDepth={1}>
                        
                        <div className="listV__recipe-info">
                            <h2 className="listV__recipe-info__name">
                                {recipe.name}
                            </h2>
                            {<h3 className="listV__recipe-info__desc">{recipe.description}</h3>}
                            <div className="listV__recipe__ctrls">
                                <FlatButton 
                                    onClick={() => handleViewBtn(recipe, index)} 
                                    className="listV__recipe__ctrls__edit" 
                                    label="VIEW"
                                    labelStyle={{fontSize: "0.8em"}}
                                    primary={true}
                                />
                                <FlatButton 
                                    className="listV__recipe__ctrls__delete" 
                                    label="DELETE" 
                                    labelStyle={{fontSize: "0.8em"}}
                                    secondary={true}
                                />
                            </div>
                            
                        </div>

                    </Paper>
                </div>
            )
        });

        return (
                <div className="grid">

                    {recipes}

                    <div className="grid__item">
                        <Paper className="grid__content grid__content--add-btn" zDepth={1}>
                            <a 
                                onClick={(e) => handleEditOrCreateBtn(e)}
                                href="">
                                    New recipe
                            </a>
                        </Paper>
                    </div>
                    <RaisedButton 
                        onClick={(e) => handleEditOrCreateBtn(e)}
                        className="mobile-only" 
                        label="New recipe" 
                        fullWidth={true} />
                </div>
        );
    }
}

export default ListView;