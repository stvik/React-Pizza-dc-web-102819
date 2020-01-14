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
				vegetarian: false
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
		if (this.state.editPizza.id) {
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
		.then(pizza => this.updateAllPizza(pizza)) } else {

		let configObj = {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(this.state.editPizza)
		}

			fetch(`http://localhost:3000/pizzas`, configObj)
			.then(resp => resp.json())
			.then(pizza => {
				this.setState({
					pizzaOrders: [pizza, ...this.state.pizzaOrders]
				})
			})
		}




	}

	updateAllPizza = (pizza) => {
		let copyPizzas = [...this.state.pizzaOrders]
		const index = this.state.pizzaOrders.findIndex(p => p.id === pizza.id)
		copyPizzas.splice(index, 1, pizza)
		this.setState({
			pizzaOrders: copyPizzas
		})
	}

	deletePizza = (pizza) => {

		this.setState({
			pizzaOrders: this.state.pizzaOrders.filter(p => p.id !== pizza.id)
		})

		fetch(`http://localhost:3000/pizzas/${pizza.id}`, {method: 'DELETE'})
		
	}

  	render() {
    	return (
	      <Fragment>
	        <Header/>
	        <PizzaForm pizza={this.state.editPizza} updatePizza={this.updatePizza} handleSubmit={this.handleSubmit}/>
	        <PizzaList pizzas={this.state.pizzaOrders} editPizza={this.editPizza} deletePizza={this.deletePizza}/>
	      </Fragment>
   	 );
  }
}

export default App;
