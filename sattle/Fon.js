import React from 'react';
import {View, Image} from 'react-native';

const Fon = ({fonBottom, fonLeft, screenWidth, screenHeight, image}) => {
    return (
        // <View>
        //     <Image source={image}
        //            style={{
        //                position: 'absolute',
        //                width: screenWidth,
        //                height: screenHeight,
        //                left: fonLeft,
        //                bottom: fonBottom - screenHeight,
        //            }}/>
        //     <Image source={image}
        //            style={{
        //                position: 'absolute',
        //                width: screenWidth,
        //                height: screenHeight,
        //                left: fonLeft,
        //                bottom: fonBottom - 2 * screenHeight,
        //            }}/>
        // </View>
    <View>
        <View
            style={{
                position: 'absolute',
                height: screenHeight,
                width: screenWidth,
                left: fonLeft,
                bottom: fonBottom - screenHeight,
            }}>
            <Image source={image}
                   style={{
                       flex: 1,
                       width: null,
                       height: null,
                       resizeMode:'cover'
                   }}/>
        </View>

        <View
            style={{
                position: 'absolute',
                height: screenHeight,
                width: screenWidth,
                left: fonLeft,
                bottom: fonBottom - 2*screenHeight,
            }}>
            <Image source={image}
                   style={{
                       flex: 1,
                       width: null,
                       height: null,
                       resizeMode: 'cover'
                   }}/>
        </View>
    </View>
    )
}
export default Fon;