import React, { Component } from 'react';

class DeletePost extends Component{
	constructor(props){
		super(props);
	   	this.state = {
		    title: "",
		    content: ""	 
		}

		this.deletePosted = this.deletePosted.bind(this);    
	}
	deletePosted(item){
		    const newState = this.state;
		    if (newState.indexOf(item) > -1) {
		    	newState.splice(newState.indexOf(item), 1);
	        	this.setState({ newState})
	    }
	}

	render(){
	    //const listItem = this.state.map((item)=>{
		return <div key={item.this.props.params.id}>
		//<span>{item.name}</span> <button onClick={this.deletePosted.bind(this, item)}>Delete</button>
		<span>{item.name}</span> <button onClick={this.deletePosted.bind(this.item)}>Delete</button>
		</div>
	    //})
	    return <div>
	        {listItem}
	    </div>
	}
}

export default DeletePost;





