import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class New extends Component {

    constructor(props){
        super(props);
        this.state = {
            newPet: {
                name: "",
                species: "",
                description: "",
                skill1: "",
                skill2: "",
                skill3: "",
                likes: 0
            },
            errors: {}
        }
    }

    change = (key, e) => {
        let p = {...this.state.newPet};
        p[key] = e.target.value;
        this.setState({newPet: p});
    }

    addPet = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post("/api/pets", this.state.newPet)
            .then(res => {
                if(res.data.errors){
                    console.log(res.data.errors);
                    this.setState({errors: res.data.errors.errors})
                }
                else{
                    this.props.history.push('/');
                }
            })
    }

    render() {
        return (
            <form onSubmit={this.addPet}>
                <div className="form-group">
                    <label>Pet Name:</label>
                    <input type="text" onChange={this.change.bind(this, "name")}></input>
                    {
                        this.state.errors.name ?
                        <p className="warning">{this.state.errors.name.message}</p>:
                        ""
                    }
                </div>
                <div className="form-group">
                    <label>Pet Species:</label>
                    <input type="text" onChange={this.change.bind(this, "species")}></input>
                    {
                        this.state.errors.species ?
                        <p className="warning">{this.state.errors.species.message}</p>:
                        ""
                    }
                </div>
                <div className="form-group">
                    <label>Pet Description:</label>
                    <input type="text" onChange={this.change.bind(this, "description")}></input>
                    {
                        this.state.errors.description ?
                        <p className="warning">{this.state.errors.description.message}</p>:
                        ""
                    }
                </div>
                <div className="form-group">
                    <h4>List a few pet skills/traits (if any)</h4>
                    <label>Skill #1:</label><br></br>
                    <input type="text" onChange={this.change.bind(this, "skill1")}></input>
                    {
                        this.state.errors.skill1 ?
                        <p className="warning">{this.state.errors.skill1.message}</p>:
                        ""
                    }
                    <br></br><br></br><label>Skill #2:</label><br></br>
                    <input type="text" onChange={this.change.bind(this, "skill2")}></input>
                    {
                        this.state.errors.skill2 ?
                        <p className="warning">{this.state.errors.skill2.message}</p>:
                        ""
                    }
                    <br></br><br></br><label>Skill #3:</label><br></br>
                    <input type="text" onChange={this.change.bind(this, "skill3")}></input>
                    {
                        this.state.errors.skill3 ?
                        <p className="warning">{this.state.errors.skill3.message}</p>:
                        ""
                    }
                </div>
                <input type="submit" className="petSubmit" value="Add Pet"></input>
                <Link to={`/`}><button className="cancel">Cancel</button></Link>
            </form>
        )
    }
}

export default New
