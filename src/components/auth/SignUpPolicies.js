import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import policiesList from '../../files/policiesList.json';

class SignUpPolicies extends Component {
    state ={
        policies: []
    };

    componentDidMount() {
        this.setState({ policies: policiesList });
    }

    renderHeader() {
        return (
            <Text style={styles.policyTitle}>
                This page contains both the ToS and the Privacy Policy.
            </Text>
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    ListHeaderComponent={this.renderHeader()} 
                    data={this.state.policies}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <Text style={styles.policyTitle}>{item.title}</Text>
                            <Text style={styles.policyDescription}>{item.p1}</Text>
                            <Text style={styles.policyDescription}>{item.p2}</Text>
                            <Text style={styles.policyDescription}>{item.p3}</Text>
                            <Text style={styles.policyDescription}>{item.p4}</Text>
                            <Text style={styles.policyDescription}>{item.p5}</Text>
                            <Text style={styles.policyDescription}>{item.p6}</Text>
                            <Text style={styles.policyDescription}>{item.p7}</Text>
                            <Text style={styles.policyDescription}>{item.p8}</Text>
                            <Text style={styles.policyDescription}>{item.p9}</Text>
                            <Text style={styles.policyDescription}>{item.p10}</Text>
                            <Text style={styles.policyDescription}>{item.p11}</Text>
                            <Text style={styles.policyDescription}>{item.p12}</Text>
                            <Text style={styles.policyDescription}>{item.p13}</Text>
                            <Text style={styles.policyDescription}>{item.p14}</Text>
                            <Text style={styles.policyDescription}>{item.p15}</Text>
                            <Text style={styles.policyDescription}>{item.p16}</Text>
                            <Text style={styles.policyDescription}>{item.p17}</Text>
                            <Text style={styles.policyDescription}>{item.p18}</Text>
                            <Text style={styles.policyDescription}>{item.p19}</Text>
                            <Text style={styles.policyDescription}>{item.p20}</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        marginBottom: 20
    },
    policyTitle: {
        fontFamily: 'apercu-bold',
        // fontSize: 20,
        fontSize: Dimensions.get('window').width * (20/375),
        color: '#000000',
        textAlign: 'center',
        paddingBottom: 10
    },
    policyDescription: {
        fontFamily: 'apercu-font',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        color: '#000000',
        paddingBottom: 10
    }
};

export default SignUpPolicies;
