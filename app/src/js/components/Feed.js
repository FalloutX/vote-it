/** @jsx React.DOM */
var React         = require('react');
var ShowAddButton = require('./ShowAddButton');
var FeedForm      = require('./FeedForm');
var FeedList      = require('./FeedList');
var _             = require('lodash');
var Firebase      = require('firebase');

var Feed = React.createClass({

  loadData: function() {
    var ref = new Firebase('shining-inferno-2725.firebaseio.com/firebase');
    ref.on('value', function(snap) {
      var items = [];
      var sorted = [];

      snap.forEach(function(itemSnap) {
        var item = itemSnap.val();
        item.key = itemSnap.key();
        items.push(item);
      });

      sorted = _.sortBy(items, function(item) {
        return -item.voteCount;
      });

      this.setState({
        items: sorted
      });

    }.bind(this));
  },

  componentDidMount: function(){
    this.loadData();
  },

  getInitialState: function() {
 
    return {
      items: [],
      formDisplayed: false
    }
  },

  onToggleForm: function(){
    console.log("onToggleForm");
    this.setState({
      formDisplayed: !this.state.formDisplayed
    });

  },

  onNewItem: function(newItem){

    var ref = new Firebase('shining-inferno-2725.firebaseio.com/firebase');
    ref.push(newItem);
    // var newItems = this.state.items.concat(newItem)
    // this.setState({
    //   items: newItems,
    //   formDisplayed: false,
    //   key: this.state.items.length
    // });


  },
  onVote: function(item){
    var ref = new Firebase('shining-inferno-2725.firebaseio.com/firebase').child(item.key);
    ref.update(item);
    // console.log("onVote");
    // console.log(item);

    // var items= _.uniq(this.state.items);
    // var index= _.findIndex(items, function(feedItem){
    //   return feedItem.key === item.key;
    // });

    // var oldObj = items[index];
    // var newItems = _.pull(items, oldObj);
    // newItems.push(item);
    // this.setState({
    //   items: newItems
    // });

  },

  render: function() {
    return (
      <div>

        <div className="container">
          <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm}/>
        </div>

        <FeedForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem} />

        <br />
        <br />

        <FeedList items={this.state.items} onVote={this.onVote} />

      </div>
    );
  }

});

module.exports = Feed;