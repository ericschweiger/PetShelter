import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

    constructor(props){
        super(props);
        this.state = {
            pet: {
                name: "",
                species: "",
                description: "",
                skill1: "",
                skill2: "",
                skill3: ""
            },
            errors: {}
        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params._id);
        axios.get(`/api/pets/${this.props.match.params._id}`)
            .then(res => {
                this.setState({pet: res.data.pet});
            })
            .catch(err =>{
                console.log(err);
            });
    }

    change = (key, e) => {
        let p = {...this.state.pet};
        p[key] = e.target.value;
        this.setState({pet: p});
    }

    updatePet = (e) => {
        e.preventDefault();
        axios.put(`/api/pets/${this.state.pet._id}`, this.state.pet)
            .then(res => {
                if(res.data.errors){
                    console.log(res.data.errors);
                    this.setState({errors: res.data.errors.errors})
                }
                else{
                    this.props.history.push('/');
                }
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.updatePet}>
                <div className="form-group">
                    <label>Pet Name:</label>
                    <input type="text" onChange={this.change.bind(this, "name")} value={this.state.pet.name}></input>
                    {
                        this.state.errors.name ?
                        <p className="warning">{this.state.errors.name.message}</p>:
                        ""
                    }
                </div>
                <div className="form-group">
                    <label>Pet Species:</label>
                    <input type="text" onChange={this.change.bind(this, "species")} value={this.state.pet.species}></input>
                    {
                        this.state.errors.species ?
                        <p className="warning">{this.state.errors.species.message}</p>:
                        ""
                    }
                </div>
                <div className="form-group">
                    <label>Pet Description:</label>
                    <input type="text" onChange={this.change.bind(this, "description")} value={this.state.pet.description}></input>
                    {
                        this.state.errors.description ?
                        <p className="warning">{this.state.errors.description.message}</p>:
                        ""
                    }
                </div>
                <div className="form-group">
                    <h4>List a few pet skills/traits (if any)</h4>
                    <label>Skill #1:</label><br></br>
                    <input type="text" onChange={this.change.bind(this, "skill1")} value={this.state.pet.skill1}></input>
                    {
                        this.state.errors.skill1 ?
                        <p className="warning">{this.state.errors.skill1.message}</p>:
                        ""
                    }
                    <br></br><br></br><label>Skill #2:</label><br></br>
                    <input type="text" onChange={this.change.bind(this, "skill2")} value={this.state.pet.skill2}></input>
                    {
                        this.state.errors.skill2 ?
                        <p className="warning">{this.state.errors.skill2.message}</p>:
                        ""
                    }
                    <br></br><br></br><label>Skill #3:</label><br></br>
                    <input type="text" onChange={this.change.bind(this, "skill3")} value={this.state.pet.skill3}></input>
                    {
                        this.state.errors.skill3 ?
                        <p className="warning">{this.state.errors.skill3.message}</p>:
                        ""
                    }
                </div>
                <input type="submit" className="petSubmit" value="Update Pet"></input>
                <Link to={`/`}><button className="cancel">Cancel</button></Link>
            </form>
            </div>
        )
    }
}

export default Edit
