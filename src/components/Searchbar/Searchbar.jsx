import { useState } from 'react';
import { toast } from 'react-toastify';

import { SearchbarHeader, Form, Button, Span, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit, loading }) {
  const [query, setQuery] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value.toLowerCase());
  };

  const reset = () => {
    setQuery('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      return toast.info('Put something in input');
    }
    onSubmit(query);
    reset();
  };

  // const { loading } = this.props;
  return (
    <SearchbarHeader>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" disabled={loading}>
          <Span>Search</Span>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={query}
          name="query"
        />
      </Form>
    </SearchbarHeader>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
