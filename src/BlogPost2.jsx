import React, { Component } from 'react';
const $ = require('jquery');


class BlogPost extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			StatusUpdate: []
    	};
		
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onContentChange = this.onContentChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onTitleChange(event) {
		console.log(event.target);
	}

	onContentChange(event) {
		console.log(event.target);
	}
		
	onSubmit(event) {
		event.preventDefault();

		let status = {
			title: event.target.title.value,
			content: event.target.content.value

		}
		
		
		console.log(status);

		$.ajax("/server", { BlogPost: status}, function() {
			this.setState({
				StatusUpdate: [this.state.StatusUpdate, ...status]
			});
		});
	
	}
		
	render() {
		


		return(
			<div className="BlogApp">
				<form id="blogForm" className="TextBox" onSubmit={this.onSubmit}>
					<input type="text" name="title" onChange={this.onTitleChange} />
					
					<label>
		         	 	Name:
		          		<textarea name="content"  onChange={this.onContentChange} />
		        	</label>
					<input type="submit" value ="Post" />		
					<div>
						
					
					</div>

				</form>
			   {/*
				<ul>
					{ this.state.StatusUpdate.map( (text, i)=> (
						<li key={i}>
							{text.title},<br/>
							{text.content}
						</li>
						)
					)}

				</ul>
				*/}
				
			</div>
		);
	}
}

export default BlogPost;