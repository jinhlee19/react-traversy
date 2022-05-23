import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({ auth, post: { _id, text, name, avatar, user, likes, comments, date }, addLike, removeLike }) => (
	<div className="post bg-white p-1 my-1">
		<div>
			<Link to="profile.html">
				<img className="round-img" src={avatar} alt="" />
				<h4>{name}</h4>
			</Link>
		</div>
		<div>
			{' '}
			<p className="my-1">{text}</p>
			<p className="post-date">
				Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
			</p>
			<button type="button" className="btn btn-light" onClick={e => addLike(_id)}>
				<i className="fas fa-thumbs-up"></i>
				<span>{likes.length > 0 && <span className="comment-count"> {likes.length}</span>}</span>
			</button>
			<button type="button" className="btn btn-light" onClick={e => removeLike(_id)}>
				<i className="fas fa-thumbs-down"></i>
			</button>
			<Link to="post.html" className="btn btn-primary">
				Discussion {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
			</Link>
			{!auth.loading && user === auth.user._id && (
				<button type="button" className="btn btn-danger">
					<i className="fas fa-times"></i>
				</button>
			)}
		</div>
	</div>
);

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

// Delete버튼을 유저에게만 적용하기 위해서 auth를 불러옴.
export default connect(mapStateToProps, { addLike, removeLike })(PostItem);