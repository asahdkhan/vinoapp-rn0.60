import React from 'react'
import { View, Text, Image, TouchableOpacity, } from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors, } from 'theme'
import RaitingBar from 'components/RaitingBar'

import styles from './styles'

class CommentBox extends React.Component {
  // static propTypes = {
  //   comment: React.PropTypes.object,
  //   currentUser: React.PropTypes.string
  // }

  _likeCount = () => {
    if (this.props.comment.likes.length > 0) {
      return <Text>({this.props.comment.likes.length} {I18n.t('article.likes')})</Text>
    }
  }

  _goToProfile = () => {
    //Actions.userProfile({ profile: this.props.comment.createdBy })
  }

  render() {
    let likeIt = _.find(this.props.comment.likes, (like) => { return this.props.currentUser === like.id })

    return (
      <View style={styles.viewContainer}>
        <TouchableOpacity style={styles.body} onPress={this._goToProfile} >
          <View style={styles.avatar}>
            {
              this.props.comment.createdBy.photo ?
                <Image
                  source={{ uri: this.props.comment.createdBy.photo }}
                  width={50}
                  height={50}
                  style={{ height: 50, width: 50 }}
                /> : null
            }
          </View>
          <View style={styles.comment}>
            <View style={styles.header}>
              <Text style={styles.user}>{this.props.comment.createdBy.name}</Text>
              <Text style={styles.date}>{moment(this.props.comment.createdAt).fromNow()}</Text>
            </View>
            <View>
              {/* {this.props.comment.rate ?
                <View style={styles.rateContainer}>
                  <RaitingBar raiting={this.props.comment.rate} size={15} active={false} small={true} />
                </View> : null
              } */}
              <Text style={styles.text}>{this.props.comment.text}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionsButton} onPress={() => { this.props.onLike(this.props.comment.id, !likeIt) }} >
            {
              likeIt ? <Icon name="heart" size={24} color={colors.primaryColor} />
                : <Icon name="heart-o" size={24} color={colors.primaryColor} />
            }

            <Text style={styles.actionsButtonText}>{I18n.t('feed.like')} {this._likeCount()}</Text>
          </TouchableOpacity>

          {/*<TouchableOpacity style={[ styles.actionsButton, { } ]}>
            <Icon name="md-chatboxes" size={18} color={ '#dadada' }/>
            <Text style={ styles.actionsButtonText }>Comments</Text>
          </TouchableOpacity>*/}
        </View>
      </View>
    )
  }
}

export default CommentBox
