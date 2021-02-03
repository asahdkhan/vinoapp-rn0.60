import React from 'react'
import _ from 'lodash'
import { View, TouchableOpacity, Text, Image, } from 'react-native'
import Config from 'react-native-config'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import { colors, } from 'theme'

import styles from './styles'

const DEFAULT_COVER = require('images/default-article-image.png')

const likeImg = require('images/dummy/new_LikeIcon.png')
const commentImg = require('images/dummy/new_CommentIcon.png')
const shareImg = require('images/dummy/new_ShareIcon.png')


const ArticleCard = ({ article, user, onPress, onLike, }) => {
  let likeIt = _.find(article.likes, (like) => { 
    return user === like.id 
  })

  let content = I18n.locale.substr(0,2) == 'en' ? 
    article.content : 
    article.content_es ? article.content_es : article.content

  return (
    <View style={styles.card} elevation={2}>
      <TouchableOpacity style={[ styles.cardBody ]} activeOpacity={0.8} onPress={ onPress }>
        <View style={{  alignItems: 'stretch' }}>
          <View style={ styles.dateContainer }>
            <Text style={ styles.date }>{ moment(article.createdAt).fromNow() }</Text>
          </View>
          <Text style={ styles.postTitle } >{ article.title }</Text>
          <Text style={ styles.text } numberOfLines={2}>{ content }</Text>
          <View style={{ height: 290, marginTop: 20 }}>
            {
              article.picture ? 
                <Image 
                  source={{ uri: `${Config.MEDIA_BASE}/articles/${article.picture}` }}
                  resizeMode="cover"
                  style={ styles.articleImage }
                /> :
                <View style={ styles.picturePlaceholder }>
                  <Image source={ DEFAULT_COVER } />
                </View>
            }
          </View>  
        </View>
      </TouchableOpacity>

      {/* <View style={ styles.actions}>
        <TouchableOpacity 
          onPress={() => {
            onLike(article.id, !likeIt)
          }} 
          style={[ styles.actionsButton, { } ]}
        >
          <Image source={ likeImg }/>
          <Text style={ styles.actionsButtonText }>{I18n.t('feed.like')}</Text>
        
           <Text style={styles.actionsButtonText }>
            {I18n.t('feed.like')} 
            {
              (article.likes && article.likes.length > 0) &&
                <Text>  ({ article.likes.length } { I18n.t('article.likes') })</Text>
            }
          </Text> 
        </TouchableOpacity> 
         <TouchableOpacity
          style={ styles.actionsButton } 
        >
          <Image source={ commentImg }/>
          <Text style={ styles.actionsButtonText }>{I18n.t('feed.comment')}</Text>
       </TouchableOpacity>
       <TouchableOpacity
          style={ styles.actionsButton } 
        >
          <Image source={ shareImg }/>
          <Text style={ styles.actionsButtonText }>{I18n.t('feed.share')}</Text>
       </TouchableOpacity> 
      </View> */}
    </View>
  )
}

export default ArticleCard
