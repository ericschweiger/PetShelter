import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class List extends Component {

    constructor(props){
        super(props);
        this.state = {
            pets: []
        }
    }

    componentDidMount = () => {
        axios.get("/api/pets")
            .then( res => {
                console.log(res);
                this.setState({pets : res.data.pets})
            })
            .catch( err => {
                console.log(err);
            })
    }

    render() {
      return (
        <div>
            {
                this.state.pets.map( pet => 
                    <table key={pet._id} className="pettable">
                        <thead>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            <td>{pet.name}</td>
                            <td>{pet.species}</td>
                            <td><Link to={`/pet/${pet._id}`}><button>Details</button></Link></td>
                            <td><Link to={`/edit/${pet._id}`}><button>Edit</button></Link></td>
                        </tbody>
                    </table>
                )
            }
        </div>
      )
    }
  }

export default List