import React from "react"

class PizzaForm extends React.Component {



  render() {
    return(
        <div className="form-row">
          <div className="col-5">
              <input type="text" className="form-control"placeholder="Pizza Topping" value={
                  this.props.pizza.topping
                } onChange={e => this.props.updatePizza( e ,'topping')}/>
          </div>
          <div className="col"> 
            <select value={this.props.pizza.size}  className="form-control" onChange={(e) => this.props.updatePizza(e, 'size')}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col" >
            <div className="form-check">
              <input className="form-check-input" name='veg' type="radio" value="Vegetarian" checked={this.props.pizza.vegetarian} onChange={(e) => this.props.updatePizza(e, 'vegetarian')}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" name='veg' type="radio" value="Not Vegetarian"  checked={!this.props.pizza.vegetarian} onChange={(e) => this.props.updatePizza( e, 'vegetarian')}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" onClick={this.props.handleSubmit}>Submit</button>
          </div>
        </div>

      )
  }
}

export default PizzaForm
