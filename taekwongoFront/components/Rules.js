import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Rules extends Component {
    static navigationOptions = {
        title: 'Reglamento'
    }
    render() {
        return (
            <View>
                <Text>
                    Rules component
                </Text>
            </View>
        );
    }
}