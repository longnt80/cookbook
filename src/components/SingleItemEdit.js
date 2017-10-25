import React, { Component } from 'react';
import '../styles/SingleItemEdit.css';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class SingleItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSingleItemData: {
                name: '',
                description: '',
                image: '',
                ingredients: [
                    'Ingredient',
                ]
            }
        }
    }

    
    componentWillMount() {
        const {singleItemData} = this.props;
        const {newSingleItemData} = this.state;

        if (singleItemData !== null) {
            this.setState({
                newSingleItemData: {...singleItemData.data}
            });
        }
    }
    

    handleEditIngredientField = (e, index) => {
        let newArr = this.state.newSingleItemData.ingredients.slice(0);
        newArr[index] = e.target.value;
        this.setState({
            newSingleItemData: {
                ...this.state.newSingleItemData,
                ingredients: [...newArr]
            }
        })
    }

    handleRemoveIngrBtn = (index) => {
        console.log(index)
        let newArr = this.state.newSingleItemData.ingredients.slice(0);
        // console.log(newArr)
        newArr.splice(index, 1);
        // console.log(newArr)
        this.setState({
            newSingleItemData: {
                ...this.state.newSingleItemData,
                ingredients: [...newArr]
            }
        });
        
    }
    
    
    render() {
        // const {singleItemData} = this.props;
        const {newSingleItemData} = this.state;
        console.log(newSingleItemData.ingredients)

        return (
            <div>
                <Paper className="SingleItemEdit" zDepth={2}>
                
                    <div className="image-edit-field">
                        <TextField
                            hintText="Link to your image"
                            floatingLabelText="Image URL"
                            defaultValue={newSingleItemData.image}
                            floatingLabelFixed={true}
                            onChange={(e) => {
                                this.setState({
                                    newSingleItemData: {
                                        ...newSingleItemData,
                                        image: e.target.value
                                    }
                                })
                            }}
                            />
                        <div className="detailV__recipe__image">
                            <img src={newSingleItemData.image} alt={newSingleItemData.name} />
                        </div>
                    </div>
                    <div className="detailV__recipe__info">
                        <TextField
                            hintText="Name of your recipe"
                            floatingLabelText="Name"
                            onChange={(e) => {
                                this.setState({
                                    newSingleItemData: {
                                        ...newSingleItemData,
                                        name: e.target.value
                                    }
                                })
                            }}
                            defaultValue={newSingleItemData.name}
                            floatingLabelFixed={true}
                            type="text"
                            fullWidth={true}
                            style={{display: "block"}}
                            />
                        <TextField
                            hintText="Please give some description"
                            floatingLabelText="Description (optional)"
                            defaultValue={newSingleItemData.description}
                            floatingLabelFixed={true}
                            onChange={(e) => {
                                this.setState({
                                    newSingleItemData: {
                                        ...newSingleItemData,
                                        description: e.target.value
                                    }
                                })
                            }}
                            fullWidth={true}
                            multiLine={true}
                            rows={1}
                            rowsMax={4}
                            style={{display: "block"}}
                            />

                        <h2 className="detailV__recipe__ingrs-heading">Ingredients:</h2>                           
                        
                        {
                            newSingleItemData.ingredients.map( (ingredient, index) =>
                                <div className="form-item" key={index}>
                                    <TextField
                                        className="text-field"
                                        hintText="Ingrdient"
                                        defaultValue={ingredient}
                                        floatingLabelFixed={true}
                                        type="text"
                                        onChange={ (e) => this.handleEditIngredientField(e, index) }
                                        />
                                    <FlatButton 
                                        label="Remove" 
                                        labelStyle={{
                                            fontSize: "10px",
                                            paddingLeft: "2px",
                                            paddingRight: "2px",
                                        }}
                                        secondary={true}
                                        style={{
                                            minWidth: "50px",
                                            height: "26px",
                                            lineHeight: "26px"
                                        }}
                                        onClick={ () => this.handleRemoveIngrBtn(index) }
                                        />
                                    
                                </div>
                            )

                        }
                        <br/>
                        <FlatButton 
                            label="Add ingredient" 
                            labelStyle={{
                                fontSize: "10px",
                                paddingLeft: "5px",
                                paddingRight: "5px",
                            }}
                            primary={true}
                            style={{
                                minWidth: "50px",
                                height: "26px",
                                lineHeight: "26px"
                            }} 
                            />    
                        
                        {/* Buttons */}
                        <div className="detailV__recipe__ctrls">
                            <FlatButton 
                                label="SAVE" 
                                primary={true} />
                            <FlatButton 
                                label="CANCEL" 
                                primary={true} />
                            <FlatButton 
                                label="DELETE THIS RECIPE" 
                                secondary={true} />
                        </div>      

                    </div>
                </Paper>
            </div>
        );
        
        
    }
}

export default SingleItemEdit;