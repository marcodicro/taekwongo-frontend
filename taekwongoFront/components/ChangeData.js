import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
    Button,
    Container,
    Content,
    DatePicker,
    Form,
    Icon,
    Input,
    Item,
    Label,
    Picker,
    Text
} from 'native-base';

import {NavigationActions, Hidden} from 'react-navigation'
import {checkStatus, isValidBirthDate, isValidName} from "./Commons";
import moment from "moment";

export default class ChangeData extends Component {

    static navigationOptions = {
        title: 'Editar Perfil'
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: undefined,
            lastName: undefined,
            birthDate: undefined,
            gender: undefined,
            nationality: undefined
        };

        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');

        this.onRegister = this.onRegister.bind(this);

        this.renderFirstNameError = this.renderFirstNameError.bind(this);
        this.renderLastNameError = this.renderLastNameError.bind(this);

        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setBirthDate = this.setBirthDate.bind(this);

        this.firstNameValidation = this.firstNameValidation.bind(this);
        this.lastNameValidation = this.lastNameValidation.bind(this);
        this.birthDateValidation = this.birthDateValidation.bind(this);

        this.formatDateUsing = this.formatDateUsing.bind(this);
    }


    componentWillMount(){
        var _this = this;
        fetch('http://taekwongo.herokuapp.com/users/me',
            {
                method: 'GET',
                headers: {
                    authorization: _this.session_token
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setFirstName(response.first_name);
                this.setLastName(response.last_name);
                this.setBirthDate(new Date(response.birth_date));
                this.onValueChangeGender(response.gender);
                this.onValueChangeNationality(response.country.toLowerCase());
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }

    setFirstName(firstName){
        this.setState({firstName})
    }

    setLastName(lastName){
        this.setState({lastName})
    }

    setBirthDate(birthDate) {
        console.log(birthDate);
        this.setState({birthDate});
    }

    onValueChangeGender(gender){
        this.setState({gender})
    }

    onValueChangeNationality(nationality){
        this.setState({nationality})
    }


    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item floatingLabel error={!this.firstNameValidation()}>
                            <Label style={{color: 'black'}}>Nombre</Label>
                            <Input
                                onChangeText={this.setFirstName}
                                value={this.state.firstName}
                                maxLength={30}
                            />
                            {this.renderFirstNameError()}
                        </Item>
                        <Item floatingLabel error={!this.lastNameValidation()}>
                            <Label style={{color: 'black'}}>Apellido</Label>
                            <Input
                                onChangeText={this.setLastName}
                                value={this.state.lastName}
                                maxLength={30}
                            />
                            {this.renderLastNameError()}
                        </Item>
                        <Picker
                            mode="dropdown"
                            placeholder="Nacionalidad"
                            placeholderStyle={{ color: "black" }}
                            placeholderIconColor="black"
                            selectedValue={this.state.nationality}
                            onValueChange={this.onValueChangeNationality.bind(this)}
                        >
                            <Picker.Item label="  Nacionalidad" value={undefined} />
                            <Picker.Item label="  Argentina" value="argentina" />
                            <Picker.Item label="  Brasil" value="brasil" />
                            <Picker.Item label="  Otro" value="other" />
                        </Picker>

                        <Picker
                            mode="dropdown"
                            placeholder="Género"
                            placeholderStyle={{ color: "black" }}
                            placeholderIconColor="black"
                            selectedValue={this.state.gender}
                            onValueChange={this.onValueChangeGender.bind(this)}
                        >
                            <Picker.Item label="  Género" value={undefined} />
                            <Picker.Item label="  Masculino" value="male" />
                            <Picker.Item label="  Femenino" value="female" />
                            <Picker.Item label="  Otro" value="other" />
                        </Picker>
                        <DatePicker
                            defaultDate={this.state.birthDate}
                            minimumDate={new Date(1900, 1, 1)}
                            maximumDate={new Date()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            textStyle={{ color: "black" }}
                            placeHolderText={moment.utc(this.state.birthDate).format('DD/MM/YYYY')}
                            placeHolderTextStyle={{ color: "black" }}
                            onDateChange={this.setBirthDate}
                        />
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={(this.onRegister)}
                        >
                            <Text style={styles.buttonText}>Cambiar Datos</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }

    renderFirstNameError() {
        return this.firstNameValidation() ? null :  <Icon name='close-circle' />;
    }

    firstNameValidation() {
        return isValidName(this.state.firstName);
    }

    renderLastNameError(){
        return this.lastNameValidation() ? null : <Icon name='close-circle'/>;
    }

    lastNameValidation() {
        return isValidName(this.state.lastName);
    }

    birthDateValidation() {
        return isValidBirthDate(this.state.birthDate);
    }

    onRegister() {
        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            fetch('http://taekwongo.herokuapp.com/users', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: this.session_token
                },
                body: JSON.stringify(this.creationInfo()),
            })
                .then(response => response.json())
                .then(response => checkStatus(response))
                .then(response => {
                    alert('Datos modificados correctamente');
                    this.moveToProfileScreen();
                })
                .catch(error => {
                    alert('Ha habido un error. Pruebe más tarde');
                    console.log('Error en el el fetch: ' + error.message);
                });
        }
        else {
            alert("Complete todos los campos correctamente para registrarse");
        }
    }

    allFieldsCompleted(){
        return this.state.firstName !== undefined &&  this.state.lastName !== undefined && this.state.birthDate !== undefined && this.state.gender !== undefined && this.state.nationality !== undefined
            && this.state.firstName !== "" &&  this.state.lastName !== "" && this.state.birthDate !== "" && this.state.gender !== "" && this.state.nationality !== "";
    }

    postOkFieldValidations(){
        return this.firstNameValidation() && this.lastNameValidation() && this.birthDateValidation()
    }

    creationInfo() {
        return {
            user: {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                birth_date: this.state.birthDate,
                country: this.state.nationality,
                gender: this.state.gender,
            }
        }
    }

    moveToProfileScreen() {
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Profile'})
                    ]
                }));
    }

    /*dateYear(aDate) {
        return parseInt(this.formatDateUsing(aDate,'YYYY'));
    }

    formatDateUsing(aDate,aDateMask) {
        return moment.utc(aDate).format(aDateMask);
    }

    dateMonth(aDate) {
        return parseInt(this.formatDateUsing(aDate,'MM'));
    }

    dateDay(aDate) {
        return parseInt(this.formatDateUsing(aDate,'DD'));
    }*/
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
    registerView:{
        borderTopWidth:1,
        borderColor:'#a1a4a3',
        padding:15,
        backgroundColor: '#FFFFFF'
    },
    registerText:{
        textAlign:'center'
    },
    registerPress:{
        fontWeight:'bold'
    },
    errorText:{
        color: 'red'
    },
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    },
    icon: {
        width: 24,
        height: 24,
    }
});