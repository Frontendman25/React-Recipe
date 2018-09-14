import React, { Component } from 'react';
import './App.css';

import Form from './components/Form'
import Recipes from './components/Recipes'

const API_KEY = '9799230a3da7b94e5801779b70810abd'

class App extends Component {
	state = {
		recipes: []
	}
	
	getRecipe = async (e) => {
		const recipeName = e.target.elements.recipeName.value
		e.preventDefault()
		const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=15`)
		
		const data = await api_call.json()
		this.setState({recipes: data.recipes})
	}
	
	componentDidMount = () => {
		const json = localStorage.getItem("recipes")
		const recipes = JSON.parse(json)
		this.setState({recipes})
	}
	
	componentDidUpdate = () => {
		const recipes = JSON.stringify(this.state.recipes)
		localStorage.setItem("recipes", recipes)
	}
	
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
				<Form getRecipe={this.getRecipe} />
				<Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
