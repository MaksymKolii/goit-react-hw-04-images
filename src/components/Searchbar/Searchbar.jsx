import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { SearchbarHeader, Form, Button, Span, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      query: value.toLowerCase(),
    });
  };

  reset = () => {
    this.setState({ query: '' });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.info('Put something in input');
    }
    this.props.onSubmit(this.state.query);
    this.reset();
  };

  render() {
    const { loading } = this.props;
    return (
      <SearchbarHeader>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit" disabled={loading}>
            <Span>Search</Span>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.query}
            name="query"
          />
        </Form>
      </SearchbarHeader>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
