import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

	constructor() {
		super()
		this.state = {
			pizzaOrders: [],
			editPizza: {
				topping: '',
				size: 'Small',
				vegetarian: null
			}
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/pizzas')
		.then(resp => resp.json())
		.then(data => {
			this.setState({
				pizzaOrders: data
			})
		})
	}

	editPizza = (pizza) => {
		this.setState({
			editPizza: pizza
		})
	}

	updatePizza = (event, k) => {
		let newValue = null
		if (k === 'vegetarian') {
			 newValue = event.target.value === 'Vegetarian' ? true : false
		} else {
			newValue = event.target.value
		}


		this.setState({
			editPizza: {
				...this.state.editPizza,
				[k]: newValue,
			}
			
		})

	}

	handleSubmit = (e) => {
		let configObj = {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				accept: 'application/json'
			},
			body: JSON.stringify(this.state.editPizza)
		}

		fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`,configObj)
		.then(resp => resp.json())
		.then(pizza => this.updateAllPizza(pizza))
	}

	updateAllPizza = (pizza) => {
		console.log(pizza)
		let copyPizzas = [...this.state.pizzaOrders]
		copyPizzas.splice(index, 1, pizza)
		const index = this.state.pizzaOrders.findIndex(p => p.id === pizza.id)
		this.setState({
			pizzaOrders: copyPizzas
		})
	}

  	render() {
    	return (
	      <Fragment>
	        <Header/>
	        <PizzaForm pizza={this.state.editPizza} updatePizza={this.updatePizza} handleSubmit={this.handleSubmit}/>
	        <PizzaList pizzas={this.state.pizzaOrders} editPizza={this.editPizza}/>
	      </Fragment>
   	 );
  }
}

export default App;
