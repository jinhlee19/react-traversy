import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
	const { id } = useParams();
	useEffect(() => {
		getPost(id);
	}, [getPost, id]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<div className="container">
			<Link to=""></Link>
			<PostItem post={post} showActions={false} />
		</div>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	post: state.post,
});
// post state를 꺼내오기 위해 mapStateToProps사용
export default connect(mapStateToProps, { getPost })(Post);

/* 

  useEffect(() => {
​    getPost(match.params.id);
  }, [getPost, match.params.id]);
에서

useEffect(() => {
        getPost();
    }, [getPost, id]);
useParams()를 사용해서 문제 해결됨. */
