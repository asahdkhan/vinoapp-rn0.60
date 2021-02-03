import { connect } from 'react-redux'
import modules from 'modules'
import BlogView from '../components/BlogView'

const actions = modules.actions.feed

const mapDispatchToProps = (dispatch) => ({
  fetchBlogPost: (page, limit) => dispatch(actions.fetchBlogPost({ page, limit })),
  fetchCategories: () => dispatch(actions.fetchCategories()),
  fetchPostByCategory: (page, limit, category) => dispatch(actions.fetchPostByCategory({ page, limit, category }))
})

const mapStateToProps = ({ data, loading, feed }) => {
    return ({
      ...feed,
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)
