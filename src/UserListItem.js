import React, { Component } from 'react';
import axios from 'axios';
import usFlag from './img/us-flag.png';
import femaleIcon from './img/female.png';
import maleIcon from './img/male.png';

const api = "https://randomuser.me/api/?results=25";

class UserListItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
        }

        this.handleAPI = this.handleAPI.bind(this);
    }

    handleAPI(){
        const promise = axios.get(api);
        promise.then((res) => {
            const users = res.data.results;
            this.setState({users});
            
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount(){
        this.handleAPI();
    }
    
    render(){
        return(
            <div className="App">

                <ul className="user-list">
                    {this.state.users.map(user => {
                        return(
                            <li key={user.cell}>
                                <div className="per_user">
                                    
                                    <div className="profile_image">
                                        <img src={user.picture.large} alt="large user profile"></img>
                                    </div>

                                    <div className="user-info">
                                        <div className="name">
                                            <p>
                                                {user.name.last + ', ' + user.name.first}
                                            </p>
                                        </div>

                                        <div className="location">
                                            <p>
                                                {user.location.city + ', ' + user.location.state}
                                            </p>
                                            
                                        </div>

                                        <div className="email">
                                            <p>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="icon">
                                        <div className="gender">
                                           {user.gender==="male" ? 
                                            (<img src={maleIcon} style={{width:"48px"}} alt="male icon"></img>)
                                             : (<img src={femaleIcon} style={{width:"48px"}} alt="female icon"></img>)}
                                        </div>

                                        <div className="nation">
                                            {user.nat === "US" ?
                                             (<img src={usFlag} alt="USA flag icon"></img>) : (null)}
                                        </div>

                                        <div className="delete">
                                            <button onClick={()=>{
                                                let index = this.state.users.indexOf(user);
                                                const list = Object.assign([], this.state.users);
                                                list.splice(index, 1);
                                                this.setState({users: list});
                                            }}>Delete</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
        )
    }

}

export default UserListItem;