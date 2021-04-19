import React from 'react';
import {Image, View} from 'react-native';

const Bonus = ({bonusWidth,bonusHeight,bonusLeft,bonusBottom, image}) => {
    return (
            <View style={{
                position: 'absolute',
                width: bonusWidth,
                height: bonusHeight,
                left: bonusLeft,
                bottom: bonusBottom,
            }}>
                <Image source={image}
                       style={{
                           flex: 1,
                           width: null,
                           height: null,
                           resizeMode: 'contain'
                       }}
                />
            </View>

    )
}
export default Bonus;
