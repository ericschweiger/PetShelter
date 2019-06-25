import React, { Component } from 'react';
import axios from 'axios';

class View extends Component {

    constructor(props){
        super(props);
        this.state = {
            pet: {},
            isLiked: false
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

    
    delete = () => {
        axios.delete(`/api/pets/${this.props.match.params._id}`)
          .then( res => {
            this.props.history.push('/');
          })
          .catch( err => {
            console.log(err);
          });
    }

    like = () => {
        let p = {...this.state};
        p.pet.likes += 1;
        p.isLiked = true;
        this.setState(p);
        axios.put(`/api/pets/${this.props.match.params._id}`, this.state.pet)
        .then( res => {
            this.componentDidMount();
        })
        .catch( err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="DisplayPet">
                <h2>Details about {this.state.pet.name}!</h2>
                <label>Pet Species:</label>
                <p>{this.state.pet.species}</p>
                <label>Pet Description:</label>
                <p>{this.state.pet.description}</p>
                <label>Pet Skills:</label>
                <p>skill #1:  {this.state.pet.skill1}</p>
                <p>skill #2:  {this.state.pet.skill2}</p>
                <p>skill #3:  {this.state.pet.skill3}</p>
                <br></br>
                <p>Likes:  {this.state.pet.likes}</p>
                {
                    this.state.isLiked?
                    <button style={{visibility:"hidden"}} onClick={this.like.bind(this)}>Like this pet!</button>:
                    <button onClick={this.like.bind(this)}>Like this pet!</button>
                }
                <button onClick={this.delete.bind(this)}>Adopt this pet</button>
            </div>
        )
    }
}

export default View
