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
        {
            id: 0,
            name: ''
        }
    ]
}

class SingleItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSingleData: this.props.singleItemData === null ? {...defaultContent} : {...this.props.singleItemData},
            noIngredientError: this.props.singleItemData.ingredients.filter( this.removeEmptyIngrFields ).length === 0 ? true : false
        }
    }

    removeEmptyIngrFields = (ingr) => {
        return ingr.name !== '';
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.newSingleData.ingredients !== nextState.newSingleData.ingredients) {
            const allIngrFieldsAreEmpty = nextState.newSingleData.ingredients.filter( this.removeEmptyIngrFields ).length === 0 ? true : false;
            this.setState({
                noIngredientError: allIngrFieldsAreEmpty
            });
        }
    }



    handleInputChange = (e, index) => {
        const target = e.target;

        if ( target.name === "ingredient" ) {
            this.setState({
                newSingleData: {
                    ...this.state.newSingleData,
                    ingredients: this.state.newSingleData.ingredients.map( (obj, i) => {
                                            return index === i ? { ...obj, name: target.value } : obj
                                        })
                }
            })
        }
        else {
            this.setState({
                newSingleData: {
                    ...this.state.newSingleData,
                    [target.name]: target.value
                }
            })
        }
    }

    handleRemove = (index) => {
        const newArr = this.state.newSingleData.ingredients.slice(0);
        newArr.splice(index, 1);
        const allIngrFieldsAreEmpty = newArr.filter( this.removeEmptyIngrFields ).length === 0 ? true : false;

        this.setState({
            newSingleData: {
                ...this.state.newSingleData,
                ingredients: [...newArr]
            },
            noIngredientError: allIngrFieldsAreEmpty
        });
    }

    handleAdd = () => {
        const newArr = [...this.state.newSingleData.ingredients];

        const generateNewId = (arr) => {
            const idsArr = arr.map( item => item.id );
            const sortedArr = idsArr.sort((a,b) => a-b)
            if ( sortedArr[0] !== 0 ) {
                return 0;
            }
            else {
                for (let i = 0; i < sortedArr.length; i++) {
                    if (sortedArr[i+1] - sortedArr[i] > 1) {
                        return sortedArr[i]+1;
                    }
                }
                return sortedArr[sortedArr.length-1]+1;
            }
        }
        const newId = generateNewId(newArr);
        newArr.push({ id: newId, name: '' })

        this.setState({
            newSingleData: {
                ...this.state.newSingleData,
                ingredients: [...newArr]
            }
        });
    }

    handleCancel = () => {
        const {singleItemData,handleViewOneBtn, handleViewAllBtn} = this.props;

        singleItemData === null ?
        handleViewAllBtn() :
        handleViewOneBtn(singleItemData)
    }



    render() {
        const {handleSubmit} = this.props;
        const {newSingleData, noIngredientError} = this.state;
        const onlyOneIngredientLeft = newSingleData.ingredients.length === 1;
        const nameIsEmpty = newSingleData.name.length < 1;
        const noIngredient = noIngredientError;
        const noError = !noIngredient && !nameIsEmpty

        const ingredientsList = newSingleData.ingredients.map( (ingredient, index) =>
            <div className="form-item" key={ingredient.id}>
                <TextField
                    className="text-field"
                    hintText="Ingrdient"
                    value={ingredient.name}
                    name="ingredient"
                    floatingLabelFixed={true}
                    type="text"
                    errorText={noIngredient ? "At least one ingredient is needed" : ""}
                    onChange={ (e) => this.handleInputChange(e, index) }
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
                        onClick={ () => this.handleRemove(index) }
                        />
                }
            </div>
        )

        return (
            <div>
                <form onSubmit={(e) => handleSubmit(e, newSingleData)}>
                    <Paper className="SingleItemEdit" zDepth={2}>

                        <div className="image-edit-field">
                            <TextField
                                hintText="http://website.com/image.jpg"
                                floatingLabelText="Image URL (Optional)"
                                value={newSingleData.image}
                                fullWidth={true}
                                floatingLabelFixed={true}
                                name="image"
                                onChange={(e) => this.handleInputChange(e)}
                                />
                            <div className="detailV__recipe__image">
                                <img
                                    src={newSingleData.image}
                                    alt={ newSingleData.name === '' ? "" : 'Image of ' + newSingleData.name} />
                            </div>
                        </div>
                        <div className="detailV__recipe__info">
                            <TextField
                                hintText="Name of your recipe"
                                floatingLabelText="Recipe's Name"
                                errorText={nameIsEmpty ? "Name of recipe is required" : ""}
                                name="name"
                                onChange={(e) => this.handleInputChange(e)}
                                value={newSingleData.name}
                                floatingLabelFixed={true}
                                type="text"
                                fullWidth={true}
                                style={{display: "block"}}
                                />
                            <TextField
                                hintText="Please give some description"
                                floatingLabelText="Description (optional)"
                                value={newSingleData.description}
                                floatingLabelFixed={true}
                                name="description"
                                onChange={(e) => this.handleInputChange(e)}
                                fullWidth={true}
                                multiLine={true}
                                rows={1}
                                rowsMax={4}
                                style={{display: "block"}}
                                />

                            <h2 className="detailV__recipe__ingrs-heading">Ingredients:</h2>

                            {ingredientsList}

                            <br/>
                            <FlatButton
                                label="Add ingredient"
                                primary={true}
                                onClick={this.handleAdd}
                                labelStyle={{
                                    fontSize: "10px",
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                }}
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
                                    type="submit"
                                    disabled={!noError}
                                    primary={true}
                                    />
                                <FlatButton
                                    label="CANCEL"
                                    onClick={this.handleCancel}
                                    primary={true}
                                    />
                                { (newSingleData.id !== undefined) &&
                                <FlatButton
                                    label="DELETE THIS RECIPE"
                                    onClick={() => this.props.handleDelete(newSingleData.id)}
                                    secondary={true}

                                    />
                                }
                            </div>

                        </div>
                    </Paper>
                </form>
            </div>
        );


    }
}


export default SingleItemEdit;
