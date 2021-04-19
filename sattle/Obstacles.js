import React from 'react';
import {View, Image} from 'react-native';
import {ImageBackground} from "react-native-web";
const Obstacles = ({
                       obstaclesLeft,
                       obstacleWidth,
                       obstacleHeight,
                       obstaclesBottom,
                       image
                   }) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: obstaclesBottom,

            }}>
                <Image source={image}
                style={{flex:1, width:null,height:null,resizeMode:'cover'}}/>
            </View>
        </>
    )
}
export default Obstacles;