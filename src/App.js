import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    componentWillMount() {
        firebase.initializeApp( {
            apiKey: 'AIzaSyDOh-lqZW_5HP0oJQ7jx5oERBf0gGCDUPw',
            authDomain: 'authapp-ben.firebaseapp.com',
            databaseURL: 'https://authapp-ben.firebaseio.com',
            projectId: 'authapp-ben',
            storageBucket: 'authapp-ben.appspot.com',
            messagingSenderId: '785510905356'
        } );
    }

    render() {
        return (
            <View>
                <Header title='AuthApp'/>
                <LoginForm/>
            </View>

        );
    }
}

export default App;
