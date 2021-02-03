import React, { Component } from 'react'
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'

class CommentViewContainer extends Component {
  constructor(props) {
    super(props)

    this._closeCommentBox = this._closeCommentBox.bind(this)
    this._onContentSizeChange = this._onContentSizeChange.bind(this)
    this._onChangeValue = this._onChangeValue.bind(this)
    this._comment = this._comment.bind(this)

    this.state = {
      commentActive: false,
      commentHeight: 40,
      comment: '',
    }
  }

  _comment() {
    if (this.state.comment == '') {
      this._closeCommentBox()
    } else {
      this.props.onComment(this.state.comment)
    }
  }

  _closeCommentBox() {
    this.setState({ commentActive: false }, () => {
      this.props.onClose()
    })
  }

  _onChangeValue(value) {
    this.setState({ comment: value })
  }

  _onContentSizeChange(event) {
    this.setState({ commentHeight: event.nativeEvent.contentSize.height + 5 })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.setState({ commentActive: true }, () => {
        this.refs.commentBox.focus()
      })
    } else {
      if (this.refs.commentBox) {
        this.refs.commentBox.blur()
      }
      this.setState({
        commentActive: false,
        comment: '',
        commentHeight: 48
      })
    }
  }

  render() {
    const { offset } = this.props

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
        keyboardVerticalOffset={offset ? offset : 0}
      >
        <View style={styles.viewContainer}>
          {this.props.children}
        </View>

        {this.state.commentActive ?
          <View style={[styles.commentBoxContainer, { height: this.state.commentHeight, }]}>
            <TextInput
              ref="commentBox"
              style={[styles.commentBox, { height: this.state.commentHeight, fontFamily: 'Raleway-Regular' }]}
              multiline={true}
              onBlur={this._closeCommentBox}
              onContentSizeChange={this._onContentSizeChange}
              onChangeText={this._onChangeValue}
              value={this.state.comment}
              underlineColorAndroid={'rgba(0,0,0,0)'}
              returnKeyType="done"
              blurOnSubmit={true} />

            <TouchableOpacity
              style={[styles.sendBtn, { height: this.state.commentHeight }]}
              onPress={this._comment}>
              <Icon name="md-send" color={'#FFF'} size={22} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View> : null
        }
      </KeyboardAvoidingView>
    )
  }
}

export default CommentViewContainer
