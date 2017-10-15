import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { createPost } from '../actions';

class PostsNew extends Component {



  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <small className="text-help">{field.meta.touched ? field.meta.error : ''}</small>
      </div>
    )
  }


  onSubmit(values) {
    
    console.log(this.props.createPost);
    this.props.createPost(values).then(()=> {
      this.props.history.push('/');
    });
    
  }
  render() {
    const { handleSubmit, submitting } = this.props;


    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />

          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />

          <Field
            label="Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  // validate inputs
  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }

  if (!values.content) {
    errors.content = "Dude...";
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate
})(
  connect(null, { createPost })(PostsNew)
  );