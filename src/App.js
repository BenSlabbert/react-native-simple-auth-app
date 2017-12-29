import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Card, CardSection, Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp( {
            apiKey: 'AIzaSyDOh-lqZW_5HP0oJQ7jx5oERBf0gGCDUPw',
            authDomain: 'authapp-ben.firebaseapp.com',
            databaseURL: 'https://authapp-ben.firebaseio.com',
            projectId: 'authapp-ben',
            storageBucket: 'authapp-ben.appspot.com',
            messagingSenderId: '785510905356'
        } );

        firebase.auth().onAuthStateChanged( ( user ) => {
            if ( user ) {
                this.setState( { loggedIn: true } );
            } else {
                this.setState( { loggedIn: false } );
            }
        } );
    }

    renderContent() {

        switch ( this.state.loggedIn ) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                );
            case false:
                return <LoginForm/>;
            default:
                return (
                    <Card>
                        <CardSection>
                            <Spinner size='large'/>
                        </CardSection>
                    </Card>
                );
        }
    }

    render() {
        return (
            <View>
                <Header title='AuthApp'/>
                {this.renderContent()}
            </View>

        );
    }
}

export default App;
