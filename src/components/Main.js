import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import styled, { css } from 'styled-components';

import WebSocketSignalR from '../utilities/WebSocketSignalR'
import { newMessage } from '../store/actions/chatActions'

/**
 * 
 * @description region styles
 * 
 */
const { width } = Dimensions.get("window");
const displayNone = css`
  display: none;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  padding: 12px 7px 12px 7px;
  background-color: #fff;
  border: solid 1px #e3e3e3;
  align-items: center;
  display: flex;
`;

export const AnimatedContent = styled.View`
  display: flex;
  flex-direction: ${props => (props.userCreated ? 'row-reverse' : 'row')};
  align-items: flex-start;
  padding: 12px 10px 9px 0px;
`;

export const ContentImage = styled.View`
  flex-direction: ${props => (props.userCreated ? 'row-reverse' : 'row')};
  padding-left: 16px;
  margin-top: 15px;
`;

export const AuthorName = styled.Text`
display: flex;
 flex-direction: ${props => (props.userCreated ? 'row-reverse' : 'row')};
 align-self: ${props => (props.userCreated ? 'flex-end' : 'flex-start')}
 font-size: 14px;
 color: black;
 font-weight: bold;
`;

export const ChatText = styled.Text`
  color: ${props => (props.userCreated ? '#fff' : '#000')};
  flex-wrap: wrap;
  flex-direction: row;
  font-size: 14px;
`;

export const UserImage = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => (props.userCreated ? '#323232' : '#fff')};
`;

export const UserString = styled.Text`
  font-size: 14px;
  font-weight: bold;
  align-self: center;
  margin-top: 10px;
  color: ${props => (props.userCreated ? '#fff' : '#000')};

`;

export const ChatWrapper = styled.View`
  flex-direction: ${props => (props.userCreated ? 'row-reverse' : 'row')};
  background-color: ${props => (props.userCreated ? '#323232' : '#fff')};
  min-width: 150px;
  padding: 12px 12px 12px;
  margin-bottom: 9px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 8px;
`;

const ChatContainer = styled.View`
  display: flex;
  flex-direction: column;
  maxWidth: ${width - 100}px;
`;

export const ContainerInfo = styled.View`
  margin-left: ${props => (props.userCreated ? 'auto' : '0')};
  padding-left: 12px;
  padding-right: 12px;
  flex-direction: row;
  align-items: center;
`;

const Main = () => {

  // STATE
  const [chatMessage, setChatMessage] = useState('')

  // REDUX
  const dispatch = useDispatch()
  const messages = useSelector(state => state.chat.messages);


  /**
   * @event ReceiveMessage 
   * @extends WebSocketSignalR
   */
  useEffect(() => {
    WebSocketSignalR.onReceiveMessage('ReceiveMessage', async function (user, message) {
      dispatch(newMessage(user, message))
    });
  }, [])

  
  const sendLocalMessage = () => {
    dispatch(newMessage('Adilson Sanches', chatMessage, isUserCreated = true))
    setChatMessage('')
  }

  /**
   * @returns {TextInput} 
   */
  const renderTextInput = () => (
    <ContainerInput>
      <TextInput
        style={{ width: '90%', maxHeight: 95, padding: 10 }}
        placeholder={'Escreva algo...'}
        placeholderTextColor="#b5bfc3"
        onChangeText={text => setChatMessage(text)}
        value={chatMessage}
        multiline={true}
        textAlignVertical={'top'}
      />
      <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => sendLocalMessage()}>
        <Image source={require('../assets/send.png')} />
      </TouchableOpacity>
    </ContainerInput>
  )

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList style={{ flex: 1 }}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ContentImage userCreated={item.isUserCreated} >
              <UserImage userCreated={item.isUserCreated}> 
                <UserString userCreated={item.isUserCreated}>
                  {item.author.substring(0, 1)}
                </UserString>
              </UserImage>
              <AnimatedContent userCreated={item.isUserCreated}>
                <ChatContainer >
                  <ContainerInfo userCreated={item.isUserCreated}>
                    <AuthorName userCreated={item.isUserCreated}>
                      {item.author}
                    </AuthorName>
                  </ContainerInfo>
                  <ChatWrapper userCreated={item.isUserCreated}>
                    <ChatText userCreated={item.isUserCreated}>
                      {item.message}
                    </ChatText>
                  </ChatWrapper>
                </ChatContainer>
              </AnimatedContent>
            </ContentImage>
          )} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          {renderTextInput()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Main;
