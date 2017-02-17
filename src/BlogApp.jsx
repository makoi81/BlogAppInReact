import React, { Component } from 'react';
//const $ = require('jquery');

class BlogApp extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			posts: []
    	};
		
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onContentChange = this.onContentChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$.get("/posts", (postsFromServer) => {
			this.setState({ posts: postsFromServer });
		})
	}

	onTitleChange(event) {
		//console.log(event.target);
		const titleBox = event.target;
		this.title = titleBox.value;
	}

	onContentChange(event) {
		//console.log(event.target);
		const contentBox = event.target;
		this.content = contentBox.value;
	}
		
	handleSubmit(event) {
		event.preventDefault();

		const form = event.target;

		const newPost = {
			title: form.title.value, //this.title
			content: form.content.value //this.content
		}

		console.log(newPost);

		$.post("/posts", newPost, (data) => {
			console.log(data);

			this.setState({
				posts: [...this.state.posts, newPost]
			});
		});	
	}
		
	render() {

		return (
			<div className="BlogApp">
				<form id="blogForm" className="TextBox" onSubmit={this.handleSubmit}>
					<label for="title">Title:</label>	
					<div className="form-group col-lg-*">
						<input type="text" name="title"  className="form-control " id='title'  placeholder='title'    onChange={this.onTitleChange} />
					</div>
					<label for="content">Content:</label>
				    <div className="form-group">
		          		<textarea  name="content" className="form-control" id="content" placeholder='Type your comment here...'  onChange={this.onContentChange} />
		        	</div>
		        	<div>
					<input type="submit" value ="Post" />
					</div>			
				</form>
			   
				<ul>
					{ this.state.posts.map( (post, i)=> (
						<li key={i}>
							{post.title},<br/>
							{post.content}
						</li>
						)
					)}
				</ul>				
			</div>
		);
	}
}
export default BlogApp;