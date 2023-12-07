import React, {useEffect, useState} from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Image} from "react-native";
import {firebase} from '../firebase';
import { gStyle } from "../gStyles";


const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState([]);

    const ListingScreen = () => {
        navigation.navigate('ListingScreen')   
    };

    const progressScreen = () => {
        navigation.navigate('ProgressScreen')   
    };
    const Ballans = () => {
        navigation.navigate('Ballans')   
    };

    useEffect(() => {
        firebase.firestore().collection("user")
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data()) 
            }
        else {
            console.log('does not exist')
        }
        })
    }, [])

    return (
        <SafeAreaView style={gStyle.main}>
            <Image source={require('../assets/iconka.png')} style={{marginHorizontal:"20%"}}/>
            <Text style={{textAlign:"center"}}>
                {name.firsName}{name.lastName}
            </Text>
            <Text style={{textAlign:"center"}}>{name.email}</Text>
            <View style={{marginTop:40}}>

            </View>

            <TouchableOpacity onPress={ListingScreen}>
            <View style={gStyle.button}>
                <Text style={gStyle.textbutton1}>Листинг задач</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={progressScreen}>
                <View style={gStyle.button}>
                    <Text style={gStyle.textbutton1}>Достижения</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={Ballans}>
                <View style={gStyle.button}>
                    <Text style={gStyle.textbutton1}>Баланс</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {firebase.auth().signOut()}}
                >
                    <Text style={{marginTop: '50%', textAlign:"center", color:'#6750A4'}}>Выйти из аккаунта</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen

