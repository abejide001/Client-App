import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
class Client extends Component {
  state = {
    totalOwed: null
  };
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return {totalOwed: total}
    }
    return null;
  }

  render() {
    if (this.props.clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fa fa-users" />
                Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed=>
                <span className="text-primary">${this.state.totalOwed}</span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {this.props.clients.map(str => (
                <tr key={str.id}>
                  <td>
                    {str.firstName} {str.lastName}
                  </td>
                  <td>{str.email}</td>
                  <td>${parseFloat(str.balance).toFixed(2)}</td>
                  <td>
                    <Link to={`/client/${str.id}`} className="btn btn-primary">
                      <i className="fa fa-arrow-circle-right" />
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
Client.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Client);
