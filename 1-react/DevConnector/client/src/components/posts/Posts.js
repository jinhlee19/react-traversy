import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);
	return <div>Posts</div>;
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	post: state.post,
});

// Getting post state from mapStateToProps
// connect = post의 상태값 받아와서 현재 상태의 post들을 Prop에 전달 -> 그후 getPosts 부분은 action 부분
export default connect(mapStateToProps, { getPosts })(Posts);
