import React, { Component } from 'react';
import 'normalize.css';
import '../styles/App.css';
import ListView from './ListView';
import SingleItem from './SingleItem';
import demoData from '../demo';

import { generateNewId } from '../utils/functions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "list", // "list" or "detail"
            data: null, // data for all recipes
            singleItemData: null, //data for one recipe
            edittingItem: false
        }
    }

    componentWillMount() {
        const data = JSON.parse( localStorage.getItem("recipe") );

        this.setState({
            data: data ? [...data] : [...demoData]
        });
    }

    handleViewOneBtn = (recipe) => {
        this.setState({
            view: "detail",
            singleItemData: { ...recipe },
            edittingItem: false
        });
    }

    handleViewAllBtn = () => {
        this.setState({
            view: "list",
            edittingItem: false
        });
    }

    handleEditOrCreate = (e, singleItemData) => {
        e.preventDefault();
        if (singleItemData) {
            this.setState({
                view: "detail",
                singleItemData: {...singleItemData},
                edittingItem: true
            });
        }
        else {
            this.setState({
                view: "detail",
                singleItemData: null,
                edittingItem: true
            });
        }
    }

    handleDelete = (recipeId) => {
        const newData = this.state.data.filter( item => item.id !== recipeId )

        localStorage.setItem('recipe', JSON.stringify(newData) );

        this.setState({
            data: [...newData]
        });

        this.handleViewAllBtn();
    }

    handleSubmit = (e, newSingleData) => {
        e.preventDefault();

        if (typeof newSingleData.id !== "undefined") {
            const newData = this.state.data.map(item => {
                return item.id === newSingleData.id ? newSingleData : item;
            })
            localStorage.setItem('recipe', JSON.stringify(newData) );
            this.setState({
                data: [...newData]
            })
            this.handleViewOneBtn(newSingleData)
        }
        else {
            const newId = generateNewId(this.state.data);
            newSingleData.id = newId;
            const newData = this.state.data.concat([newSingleData])
            localStorage.setItem('recipe', JSON.stringify(newData) );
            this.setState({
                data: [...newData]
            });
            this.handleViewAllBtn();
        }

    }



    render() {
        const {view, data, singleItemData, edittingItem} = this.state;

        const theListView = view === "list" ?
                <ListView
                    data={data}
                    handleDelete={this.handleDelete}
                    handleViewOneBtn={this.handleViewOneBtn}
                    handleEditOrCreate={this.handleEditOrCreate} />
                : null;
        const theSingleView = view === "detail" ?
                <SingleItem
                    edittingItem={edittingItem}
                    singleItemData={singleItemData}
                    handleDelete={this.handleDelete}
                    handleSubmit={this.handleSubmit}
                    handleViewOneBtn={this.handleViewOneBtn}
                    handleViewAllBtn={this.handleViewAllBtn}
                    handleEditOrCreate={this.handleEditOrCreate} />
                : null;


        if (data !== null) {
            return (
                <div className="container">
                    <div className="header"><h1 className="logo">Recipe Box</h1></div>
                    {theListView}
                    {theSingleView}
                </div>
            )

        }
        else {
            return "Loading recipes..."
        }

    }
}

export default App;
