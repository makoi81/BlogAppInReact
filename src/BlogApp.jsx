import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import {Link} from 'react-router';
import Edit from './Edit.jsx';
import DeletePost from './DeletePost.jsx';

class BlogApp extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			posts: []
    	};
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onContentChange = this.onContentChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}
	// load the data from the server
	componentDidMount(){
		$.get("/posts", (postsFromServer) => {
			this.setState({ posts: postsFromServer });
		})
	}

	onTitleChange(event){
		//console.log(event.target);
		const titleBox = event.target;
		this.title = titleBox.value;
	}

	onContentChange(event){
		//console.log(event.target);
		const contentBox = event.target;
		this.content = contentBox.value;
	}
		
	handleSubmit(event){
		event.preventDefault();

		const form = event.target;
		const newPost = {
			title: form.title.value, //this.title
			content: form.content.value //this.content
		}
		console.log(newPost);

		var regexp = /[A-Z]/gi;
		if (!newPost.title[0].match(regexp)) {
			this.setState({
				errorMessage: "NOT GOOD"	
			});

			return; //do not submit
		} else {
			this.setState({
				errorMessage: null
			});			
		}

		$.post("/posts", newPost, (data) => {
			console.log(data);

			this.setState({
				posts: [...this.state.posts, newPost]
			});
		});	
	}
	
	onDelete(index){
	 	let postsCopy = [...this.state.posts];
	 	console.log(index)
	 	postsCopy.splice( index, 1);
	  	this.setState({ 
	    	posts: postsCopy
		});
	}

	render(){

		function createMarkup() { return {__html: 'First &middot; Second'}; };	
		return (
			<div className="BlogApp">
				<form  className="TextBox" onSubmit={this.handleSubmit}>
					<div className="errorMessage">{this.state.errorMessage}</div>
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
			   
				<ol>
					{ this.state.posts.map( (post, i)=>(
						<li key={i}>
							<div>{post.title}</div>
							<div dangerouslySetInnerHTML={{__html:post.content}} />
							<div><Link to={"/edit/" + post.id} >edit</Link></div>	
							<DeletePost callback={this.onDelete} index={i}/>					
						</li>
						)
					)}
				</ol>					
			</div>
		);
	}
}
BlogApp.propTypes = {
	title: React.PropTypes.string,
	content: React.PropTypes.string
};
export default BlogApp;



