import React, { Component } from 'react';
import '../styles/SingleItemEdit.css';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const defaultContent = {
    name: '',
    description: '',
    image: '',
    ingredients: [
        'Ingredient',
    ]
}

class SingleItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSingleItemData: null,
            ingrNeededErr: false
        }
    }

    
    componentWillMount() {
        const {singleItemData} = this.props;
        const {newSingleItemData} = this.state;

        if (singleItemData !== null) {
            this.setState({
                newSingleItemData: {...singleItemData}
            });
        }
        else {
            this.setState({
                newSingleItemData: {...defaultContent}
            });
        }
    }
    
    handleEditIngredientField = (e, index) => {
        let newArr = [...this.state.newSingleItemData.ingredients];
        newArr[index] = e.target.value;

        if ( this.state.newSingleItemData.ingredients.length === 1 && e.target.value === "" ) {
            this.setState({
                newSingleItemData: {
                    ...this.state.newSingleItemData,
                    ingredients: newArr
                },
                ingrNeededErr: true
            })
        }
        else {
            this.setState({
                newSingleItemData: {
                    ...this.state.newSingleItemData,
                    ingredients: newArr
                },
                ingrNeededErr: false
            })
        }
        

    }

    handleRemoveIngrBtn = (index) => {
        const ingrsArray = this.state.newSingleItemData.ingredients;
    
        let newArr = ingrsArray.slice(0);
        newArr.splice(index, 1);
        this.setState({
            newSingleItemData: {
                ...this.state.newSingleItemData,
                ingredients: [...newArr]
            }
        });
    
    }
    
    
    render() {
        const {newSingleItemData, ingrNeededErr} = this.state;
        const onlyOneIngredientLeft = newSingleItemData.ingredients.length < 2 ;
        console.log("Re-rendered!!!");

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
                            floatingLabelText="Recipe's Name"
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
                                <div className="form-item" key={ingredient + " " + index}>
                                    <TextField
                                        className="text-field"
                                        hintText="Ingrdient"
                                        defaultValue={ingredient}
                                        floatingLabelFixed={true}
                                        type="text"
                                        errorText= {ingrNeededErr ? "At least one ingrdient needed" : ""}
                                        onBlur={ (e) => this.handleEditIngredientField(e, index) }
                                        />
                                    { !onlyOneIngredientLeft &&
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
                                    }
                                    
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