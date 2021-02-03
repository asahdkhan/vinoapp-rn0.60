import { connect } from 'react-redux'
import BlogDetailsView from '../components/BlogDetailsView'

const mapDispatchToProps = (dispatch) => ({
 
})

const mapStateToProps = ({ data, loading, feed }) => {
    return ({
      ...feed,
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailsView)
