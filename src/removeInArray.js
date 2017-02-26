function removeInArray(myArray, elementToremove){
	var index = myArray.indexOf(elementToremove);
	if(index > -1){myArray.splice(index, 1);}
    console.log(myArray);
	//return myArray;			
}
removeInArray([1,2,3,4,5], 4);






	// onDelete(index){
	// 	//let postsCopy = [...this.state.posts]
	// 	this.setState({
	// 		posts: postsCopy
	// 	});
	//   }

	// deletePosted(item){
	// 	const newState = this.state;
	// 	if(newState.indexOf(item) > -1) {
	//     	newState.splice(newState.indexOf(item), 1);
	//        	this.setState({ newState})
	//     }
	// }

	// this is my onDelete function again
