import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, ActivityIndicator} from "react-native";
import { Auth, Hub } from 'aws-amplify';
import CustomButton from "../../components/CustomButton";

const Index = () => {

    const [user, setUser] = useState(undefined);
    const [userInfo, setUserInfo] = useState('');
    const signOut = () => {
        Auth.signOut();
    };
    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setUser(authUser);
            setUserInfo(authUser.attributes)
        } catch (e) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        const listener = data => {
            if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
                checkUser();
            }
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    }, []);

    if (user === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                        source={require("../../../assets/images/starry.jpg")} />
                    <Text style={styles.name}>{userInfo.name}</Text>
                    <Text style={styles.userInfo}>{userInfo.email}</Text>
                    <Text style={styles.userInfo}>{userInfo.preferred_username} </Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.item}>
                    <CustomButton onPress={signOut} text="Logout" type="PRIMARY"/>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    header: {
        //backgroundColor: "#DCDCDC",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },
    body: {
        //backgroundColor: "#778899",
        //height:500,
        alignItems: 'center',
        // marginLeft:20,
    },
    item: {
        flexDirection: 'row',
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: "#FFFFFF",
    }
});
export default Index;