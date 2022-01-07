/* Main component to control navigation between scenes */
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './src/components/auth/LoginForm';
import ForgotPassword from './src/components/auth/ForgotPassword';
import SignUp from './src/components/auth/SignUp';
import WelcomePage from './src/components/auth/WelcomePage';
import CommunityRuleOne from './src/components/auth/CommunityRuleOne';
import CommunityRuleTwo from './src/components/auth/CommunityRuleTwo';
import CommunityRuleThree from './src/components/auth/CommunityRuleThree';
import SignUpPolicies from './src/components/auth/SignUpPolicies';
import HomePage from './src/components/HomePage';
import Settings from './src/components/settings/Settings';
import Policy from './src/components/settings/Policy';
import Mission from './src/components/settings/Mission';
import ResourcePage from './src/components/resources/ResourcePage';
import ResourceThread from './src/components/resources/ResourceThread';
import Explore from './src/components/explore/Explore';

import Community from './src/components/communities/Community';
import Thread from './src/components/communities/Thread';
import Support from './src/components/communities/Support';

import { FontAwesome } from '@expo/vector-icons';

const RouterComponent = () => {
    return (
        <Router 
        // navigationBarStyle={{ backgroundColor: '#4AA7B3', borderBottomColor: 'transparent' }} 
        titleStyle={{ color: '#FFFFFF', fontFamily: 'apercu-font' }} 
        barButtonIconStyle={{ tintColor: '#FFFFFF' }}
        tintColor='white'
        >
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene 
                        key="login" 
                        component={LoginForm} 
                        title="" 
                        hideNavBar 
                        initial 
                    />
                    <Scene key="password" component={ForgotPassword} title="" navTransparent />
                    <Scene 
                        key="signup" 
                        component={SignUp} 
                        title=""
                        navigationBarStyle={{ backgroundColor: '#6AB3BC', borderBottomColor: 'transparent' }} 
                        // navigationBarStyle={{ backgroundColor: '#4AA7B3', borderBottomColor: 'transparent' }} 
                    />
                    <Scene key="agree" component={SignUpPolicies} navBarButtonColor='#47525E' navigationBarStyle={{ borderBottomColor: 'transparent' }} />
                </Scene>
                <Scene key="intro">
                    <Scene 
                        key="welcome" 
                        component={WelcomePage} 
                        navigationBarStyle={{ backgroundColor: '#6AB3BC', borderBottomColor: 'transparent' }}
                    />
                    <Scene 
                        key="ruleone" 
                        component={CommunityRuleOne}
                        navigationBarStyle={{ backgroundColor: '#F09EA0', borderBottomColor: 'transparent' }}
                        navBarButtonColor='white'
                    />
                    <Scene 
                        key="ruletwo" 
                        component={CommunityRuleTwo}
                        navigationBarStyle={{ backgroundColor: '#DAB4D9', borderBottomColor: 'transparent' }}
                        navBarButtonColor='white' 
                    />
                    <Scene 
                        key="rulethree" 
                        component={CommunityRuleThree}
                        navigationBarStyle={{ backgroundColor: '#ABE382', borderBottomColor: 'transparent' }}
                        // navBarButtonColor='#47525E'
                        navBarButtonColor='white'
                    />
                </Scene>

                <Scene key="tabbar" tabs={true} tabBarPosition="bottom" showLabel={false}>
                    <Scene key="main" icon={({ focused }) => (
                        <FontAwesome
                            size={28}
                            color={focused ? '#4AA7B3' : '#47525E'}
                            name="home"
                        />
                    )}>
                        <Scene key="home" component={HomePage} title="" hideNavBar panHandlers={null} />
                        <Scene 
                            key="settings" 
                            component={Settings} 
                            title="Settings"
                            navBarButtonColor='#47525E' 
                            titleStyle={{ color: '#47525E', fontFamily: 'apercu-font' }} 
                        />
                        <Scene 
                            key="mission"
                            component={Mission}
                            title="Our Mission"
                            navBarButtonColor='#47525E'
                            titleStyle={{ color: '#47525E', fontFamily: 'apercu-font' }}
                        />
                        <Scene 
                            key="policy" 
                            component={Policy} 
                            title="Policy"
                            navBarButtonColor='#47525E'
                            titleStyle={{ color: '#47525E', fontFamily: 'apercu-font' }}
                        />
                        <Scene 
                            key="community" 
                            component={Community} 
                            navTransparent
                            hideTabBar
                        />
                        <Scene key="thread" component={Thread} navTransparent hideTabBar />
                        <Scene 
                            key ="support" 
                            component={Support} 
                            hideTabBar 
                            navigationBarStyle={{ backgroundColor: '#DAB4D9', borderBottomColor: 'transparent' }} 
                            // navigationBarStyle={{ backgroundColor: '#F09EA0', borderBottomColor: 'transparent' }} 
                        />
                    </Scene>

                    <Scene key="explore" icon={({ focused }) => (
                        <FontAwesome
                            size={24}
                            color={focused ? '#4AA7B3' : '#47525E'}
                            name="search"
                        />
                    )}>
                        <Scene key="explore" component={Explore} title="" navTransparent panHandlers={null} />
                        <Scene 
                            key="community" 
                            component={Community} 
                            navTransparent
                            hideTabBar
                        />
                        <Scene key="thread" component={Thread} navTransparent hideTabBar />
                    </Scene>

                    <Scene key="resources" icon={({ focused }) => (
                        <FontAwesome
                            size={24}
                            color={focused ? '#4AA7B3' : '#47525E'}
                            name="user"
                        />
                    )}>
                        <Scene 
                            key="resources" 
                            component={ResourcePage} 
                            title="" 
                            navTransparent
                            panHandlers={null} 
                        />
                        <Scene key="resourcethread" component={ResourceThread} navTransparent hideTabBar />
                    </Scene>

                </Scene>

            </Scene>
        </Router>
    );
};

export default RouterComponent;
