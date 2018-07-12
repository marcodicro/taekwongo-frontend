/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Feeds from './components/Feeds'
import Login from './components/Login'
import Screen1 from './components/Screen1'
import Screen2 from './components/Screen2'
import SignUp from './components/SignUp'
import ItemFeed from './components/ItemFeed'
import Calendar from './components/Calendar'
import Video from './components/Video'
import Rules from './components/Rules'
import Arbitraje from './components/Arbitraje'

import {
  Platform,
  StyleSheet,
  Text,
  View,
    TextInput,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import {
    StackNavigator,
    SwitchNavigator,
    DrawerNavigator
} from 'react-navigation';

import {Router, Scene} from 'react-native-router-flux'

type Props = {};

export default class App extends Component<Props> {

    constructor() {
        super();
        this.state = { hasToken: false, isLoaded: false };
    }

    componentDidMount() {
        AsyncStorage.getItem('id_token').then((token) => {
            this.setState({ hasToken: token !== null, isLoaded: true })
        });
    }

  render() {
      return <DrawerStack/>;
  }
}
export const StackLogin = StackNavigator({
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
});

export const StackFeeds = StackNavigator({
    Feeds:{
        screen:Feeds
    },
    ItemFeed:{
        screen:ItemFeed
    }
})

export const StackCalendar = StackNavigator({
    Calendar: {
        screen: Calendar
    },
});


export const StackVideo = StackNavigator({
    Calendar: {
        screen: Video
    },
});

export const StackRules = StackNavigator({
    Calendar: {
        screen: Rules
    },
});

export const StackArbitraje = StackNavigator({
    Calendar: {
        screen: Arbitraje
    },
});

const DrawerStack = DrawerNavigator({
    Novedades: { screen: StackFeeds },
    Calendar: { screen: StackCalendar},
    Video: { screen: StackVideo},
    Reglamento: { screen: StackRules},
    Arbitraje: { screen: StackArbitraje},
    Entrenamiento: { screen: StackLogin }

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

