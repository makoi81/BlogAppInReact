import React, { Component } from 'react';

class DeletePost extends Component{
	constructor(props){
		super(props);
	   	this.state = {
		    title: "",
		    content: ""	 
		}

		this.handleClick = this.handleClick.bind(this);    
	}

	handleClick(event){
		this.props.callback(this.props.index)
	}

		render(){ 
		    return(
		    		<div>
		        		<span>{this.state.title}, {this.state.content}</span> <button onClick={(e)=>this.handleClick()} >Delete</button>
		    		</div>
		    	) 			
		}
}
export default DeletePost;





