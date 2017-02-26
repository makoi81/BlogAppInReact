import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
//const $ = require('jquery');

class Edit extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      title: "",
	      content: ""
	 
	    };

	    this.handleSubmit = this.handleSubmit.bind(this);
	    this._changeTitle = this._changeTitle.bind(this);
	    this._changeContent = this._changeContent.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		const form = event.target;

		const newUpdate = {
			title: form.title.value, 
			content: form.content.value 
		}
		console.log(newUpdate)

		$.post("/edit/" + this.props.params.id, newUpdate, (data) => {
			console.log(data);

			this.setState({
				posts: [...this.state, newUpdate]
			});
			location = "/";
		});

	}

	componentDidMount(){
		//this._commitAutoSave();
		console.log(" this is a post to get", this.props.params.id);
		$.get("/posts", (postsFromServer) => {
			console.log(postsFromServer)
			let id = this.props.params.id
			let findPost = function(posts) { 
    			return posts.id == id;
			}
			this.setState(postsFromServer.find(findPost))
    		tinyMCE.get('content').setContent(postsFromServer.find(findPost).content);

		})
	}

	_changeTitle(event){
		this.setState({title: event.target.value});
	}

	_changeContent(event){
		this.setState({content: event.target.value});
	}
 	render(){
    let {title, content,} = this.state;
    console.log(this.props.params.id);
    return (
    	
		<form id="blogFormUpdate" className="UpdatePost" onSubmit={this.handleSubmit} >
			<label htmlFor="title">Title:</label>
			<div className="form-group col-lg-*">
				<input type="text" name="title"  value={title} className="form-control " id="title"  placeholder="title"    onChange={this._changeTitle} />
			</div> 
			<label htmlFor="content">Content:</label>
			<div className="form-group">
				<textarea type="text" name="content" value={content}  className="form-control" id="content" placeholder="Type your comment here..."  onChange={this._changeContent}  />
				 
			</div> 
			<div>
				<input type="submit" value ="Update" />
			</div>   
		</form>
      
    );
  }
}
export default Edit;
