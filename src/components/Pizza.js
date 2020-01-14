import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian ? 'Vegetarian' : 'Not Vegetarian'}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.editPizza(props.pizza)}>Edit Pizza</button></td>
       <td><button type="button" className="btn btn-danger" onClick={() => props.deletePizza(props.pizza)}>Delete Pizza</button></td>
    </tr>
  )
}

export default Pizza
