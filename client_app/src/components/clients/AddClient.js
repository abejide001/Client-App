import React, { Component } from 'react';
// import { compose } from 'redux';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    const newClient = this.state;
    const { firestore } = this.props;
    if (!newClient.balance) {
      newClient.balance = 0;
    }
    firestore.add({ collection: 'clients' }, newClient).then(() => this.props.history.push('/'));
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <a href="/" className="btn btn-primary">
              Back to Dashboard
            </a>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-header mt-2">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="enter your first name"
                  onChange={this.onChange}
                  required="true"
                  className="form-control"
                  value={this.state.firstName}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="enter your last name"
                  onChange={this.onChange}
                  required="true"
                  className="form-control"
                  value={this.state.lastName}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  onChange={this.onChange}
                  required="true"
                  className="form-control"
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="enter your phone"
                  onChange={this.onChange}
                  required="true"
                  className="form-control"
                  value={this.state.phone}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="balance"
                  placeholder="enter balance"
                  onChange={this.onChange}
                  className="form-control"
                  value={this.state.balance}
                />
              </div>
              <input type="submit" value="submit" className="btn btn-success btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(AddClient);
