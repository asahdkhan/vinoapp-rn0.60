import { connect } from 'react-redux'
import modules from 'modules'
import ArticleView from '../components/ArticleView'

const actions = modules.actions.article

const mapDispatchToProps = (dispatch) => ({
  getArticle: (id) => dispatch(actions.getArticle({id})),
  fetchComments: (id) => dispatch(actions.fetchComments({id})),
  setLike: (id, accountId, like) => dispatch(actions.setLike({ id, accountId, like })),
  comment: (id, accountId, comment) => dispatch(actions.comment({ id, accountId, comment, })),
  likeComment: (id, accountId, like=true) => dispatch(actions.likeComment({ id, accountId, like, })),
  clearDetail: () => dispatch(actions.clearDetail()),
})

const mapStateToProps = ({ article, user, auth, }) => ({
  data: article.data,
  loading: article.loading,
  comments: article.comments,
  commentsLoading: article.commentsLoading,
  creatingComment: article.creatingComment,
  commentCreated : article.commentCreated,
  user : user.data,
  token: auth.token,
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView)
