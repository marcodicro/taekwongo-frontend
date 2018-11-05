import React, { Component } from 'react';

import {
    StyleSheet,
} from 'react-native';

import {
    Button,
    Container,
    Content,
    Form,
    Icon,
    Input,
    Item,
    Label,
    Text
} from 'native-base';
import {isValidEmail} from "./Commons";

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Recuperar Contraseña'
    };

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            validatingUser: false,
        };

        this.onRecoverPassword = this.onRecoverPassword.bind(this);

        this.renderUserError = this.renderUserError.bind(this);
        this.setUser = this.setUser.bind(this);
        this.userValidation = this.userValidation.bind(this);
    }

    setUser(user){
        this.setState({user, validatingUser:true})
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Form style={styles.container}>
                            <Item floatingLabel error={!this.userValidation()}>
                                <Label>Correo electrónico</Label>
                                <Input
                                    onChangeText={this.setUser}
                                    value={this.state.user}
                                    maxLength={30}
                                />
                                {this.renderUserError()}
                            </Item>
                            <Button
                                primary
                                block
                                style={styles.mbt30}
                                onPress={(this.onRecoverPassword)}
                            >
                                <Text style={styles.buttonText}>Recuperar contraseña</Text>
                            </Button>
                        </Form>
                    </Form>
                </Content>
            </Container>
        );
    }


    renderUserError(){
        return this.userValidation() ? null : <Icon name='close-circle'/>;
    }

    userValidation() {
        return !this.state.validatingUser || isValidEmail(this.state.user);
    }

    onRecoverPassword() {

        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            alert("Datos OK :)");
            //To Do: Sacar el alert y hacer el POST al backend para recuperar la contraseña
        }
        else {
            alert("Corregir campos inválidos");
        }
    }

    allFieldsCompleted(){
        return this.state.user !== undefined;
    }

    postOkFieldValidations(){
        return this.userValidation();
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#FFFFFF',
    },
    buttonText:{
        color:'white'
    },
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    }
});