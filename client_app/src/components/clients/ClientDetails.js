import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import classnames from 'classnames';
class ClientDetails extends Component {
  state = {
    showBalance: false,
    balanceUpdate: ''
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    const { client, firestore } = this.props;

    const { balanceUpdate } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdate)
    };
    //update in firestore
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
    // e.preventDefault();
  };
  onDelete = e => {
    const { client, firestore } = this.props;

    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(() => this.props.history.push('/'));
  };
  render() {
    const { client } = this.props;
    const { showBalance, balanceUpdate } = this.state;

    let balanceForm = '';

    if (showBalance) {
      balanceForm = (
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="balanceUpdate"
              value={this.state.balanceUpdate}
              className="form-control"
              placeholder="update balance"
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input type="submit" className="btn btn-dark mt-3" value="Submit" />
            </div>
          </div>
        </form>
      );
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <a href="/" className="btn btn-primary">
                Back to Dashboard
              </a>
            </div>
            <div className="col-md-6">
              <div className="btn btn-group float-right">
                <a href={`/client/edit/${client.id}`} className="btn btn-primary">
                  Edit Client
                </a>
                <button className="btn btn-danger ml-2" onClick={this.onDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName}, {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>Client Id: {client.id}</h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h5 className="pull-right">
                    Balance:{' '}
                    <span
                      className={classnames({
                        'text-danger': client.balance > 0,
                        'text-success': client.balance === 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                      <a
                        href="#!"
                        onClick={() => this.setState({ showBalance: !this.state.showBalance })}
                      >
                        <i className="fa fa-plus mb-2" />
                      </a>
                    </small>
                  </h5>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">Email: {client.email}</li>
                <li className="list-group-item">Phone: {client.phone}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: 'clients',
      storeAs: 'client',
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
