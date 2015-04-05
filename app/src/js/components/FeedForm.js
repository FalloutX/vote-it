/** @jsx React.DOM */
var React = require('react');

var FeedForm = React.createClass({

  handleForm : function(e){
    e.preventDefault();
    var newItem = {
      title: this.refs.title.getDOMNode().value,
      description: this.refs.des.getDOMNode().value,
      voteCount: 0
    };

    this.refs.feedForm.getDOMNode().reset();

    this.props.onNewItem(newItem);

  },

  render: function() {
    var display = this.props.displayed?  'block' : 'none';
    var styles = {
      display: display
    };
    return (
      <form ref="feedForm" style={styles} id="feedForm" className="container">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Title" ref="title"/>
          <input type="text" className="form-control" placeholder="Description" ref="des" />
          <button type="submit" className="btn btn-primary btn-block" onClick={this.handleForm} >Add</button>
        </div>
      </form>
    );
  }

});

module.exports = FeedForm;