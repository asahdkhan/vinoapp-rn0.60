import React from 'react'
import { View, TouchableOpacity, Image, Text, } from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CommentBox from 'components/CommentBox'
//import DateUtils from '../../utils/DateUtils'

//import CommentActionCreator from '../../actions/CommentActionCreator'

import styles from './styles'

class CommentListComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  _buildComments() {
    return this.props.comments && this.props.comments.map(comment => {
      return (
        <CommentBox 
          key={comment.id}
          comment={ comment }
          currentUser={ this.props.user }
          onLike={ this._onLike } />
      )
    })
  }

  _onLike = (commentId, like) => {
    this.props.onLikeComment(commentId, like)
  }

  render() {
    return (
      <View key='comments-box' style={ styles.commentBoxContainer }>        
        { !this.props.isLoading ? 
          <View style={ styles.commentsContainer }>
            <Text style={ styles.commentsBoxTitle }>{ this.props.title }</Text>
            { this.props.comments.length > 0 ? 
                this._buildComments() : 
                <Text style={{ fontFamily: 'Raleway-Regular', margin: 5, textAlign: 'center', padding: 10, backgroundColor: '#FFF'}}>{ I18n.t('article.no_comments_yet') }</Text>
            }
            
            { 
              this.props.showButton ? 
                <TouchableOpacity style={styles.commentAction} onPress={()=> { this.props.writeComment() }}>
                  <Icon name="chat-bubble" size={24} color={ '#34404c' }/>
                  <Text style={ styles.commentActionText }>{ I18n.t('article.leave_your_comment') }</Text>
                </TouchableOpacity> : null
            }
          </View> : 
          <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 20}}>
            <Image source={ LODAING_INDICATOR } />
          </View> 
        }
      </View>
    )
  }
}

export default connect()(CommentListComponent)