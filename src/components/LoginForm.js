import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState( { error: '', loading: true } );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( this.onLoginSuccess.bind( this ) )
            .catch( () => {
                    firebase.auth().createUserWithEmailAndPassword( email, password )
                        .then( this.onLoginSuccess.bind( this ) )
                        .catch( this.onLoginFailed.bind( this ) );
                }
            );
    }

    onLoginFailed() {
        this.setState( { error: 'Authentication Failed', loading: false } );
    }

    onLoginSuccess() {
        this.setState( {
            email: '',
            password: '',
            error: '',
            loading: false
        } );
    }

    renderButton() {
        if ( this.state.loading ) {
            return (
                <Spinner size='small'/>
            );
        }

        return (
            <Button onPress={this.onButtonPress.bind( this )}>
                Log In
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        placeholder='someone@email.com'
                        value={this.state.email}
                        onChangeText={email => this.setState( { email } )}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label='Password'
                        placeholder='password'
                        value={this.state.password}
                        onChangeText={password => this.setState( { password } )}
                    />
                </CardSection>

                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'red'
    }
};

export default LoginForm;
