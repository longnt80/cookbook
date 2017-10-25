import React, { Component } from 'react';
import 'normalize.css';
import '../styles/App.css';
import ListView from './ListView';
import SingleItem from './SingleItem';
import demoData from '../demo';

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "list", // "list" or "detail"
            data: null, // data for all recipes
            singleItemData: null, //data for one recipe
            edittingItem: false
        }
    }
    
    componentDidMount() {
        this.setState({
            data: demoData,
        });
    }

    handleViewBtn = (recipe, index) => {
        this.setState({
            view: "detail",
            singleItemData: {
                data: recipe,
                index: index
            },
            edittingItem: false
        });
    }

    handleViewAllBtn = () => {
        this.setState({
            view: "list",
            edittingItem: false
        });
    }
    
    handleEditOrCreateBtn = (e, singleItemData) => {
        e.preventDefault();
        console.log(singleItemData);
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

    

    render() {
        const {view, data, singleItemData, edittingItem} = this.state;
        
        if (data !== null) {
            if (view === "list")
                return (
                        <div className="container">
                            <div className="header"><h1 onClick={this.handleViewAllBtn} className="logo">Recipe Box</h1></div>
                            <ListView 
                                data={data} 
                                handleViewBtn={this.handleViewBtn}
                                handleEditOrCreateBtn={this.handleEditOrCreateBtn} />
                        </div>
                );
            else if (view === "detail")
                return (
                        <div className="container">
                            <div className="header"><h1 onClick={this.handleViewAllBtn} className="logo">Recipe Box</h1></div>
                            <SingleItem 
                                edittingItem={edittingItem}
                                singleItemData={singleItemData}
                                handleViewAllBtn={this.handleViewAllBtn}
                                handleEditOrCreateBtn={this.handleEditOrCreateBtn} />
                        </div>
                );
        }
        else {
            return "Loading recipes..."
        }

    }
}

export default componentName;