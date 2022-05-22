import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({ auth, post: { _id, text, name, avatar, user, likes, comments, date } }) => {
	return <div>PostItem</div>;
};

PostItem.propTypes = {};

const mapStateToProps = state => ({
	auth: state.auth,
});

// Delete버튼을 유저에게만 적용하기 위해서 auth를 불러옴.

export default connect(mapStateToProps, {})(PostItem);
