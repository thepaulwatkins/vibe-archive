/* Just a page for the policies. Very clunky and not really happy with it, but at this point it's the 
lowest priority */
import React, { Component } from 'react';
import { ScrollView, Text, Dimensions } from 'react-native';

class Policy extends Component {
    render() {
        return (
            <ScrollView style={styles.containerStyle}>
                <Text style={styles.policyTitle}>{this.props.policy.title}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p1}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p2}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p3}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p4}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p5}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p6}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p7}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p8}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p9}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p10}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p11}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p12}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p13}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p14}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p15}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p16}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p17}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p18}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p19}</Text>
                <Text style={styles.policyDescription}>{this.props.policy.p20}</Text>
            </ScrollView>
        );
    }
}

/* Stylesheet for the policies */
const styles = {
    containerStyle: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10
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

export default Policy;
