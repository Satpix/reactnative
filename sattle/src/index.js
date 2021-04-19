import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import {Audio} from "expo-av";
import {AdMobBanner} from "expo-ads-admob";
import {LinearGradient} from "expo-linear-gradient";
import {LinearTextGradient} from "react-native-text-gradient";
// import {Icon} from "react-native-vector-icons/FontAwesome5";
import Ship from "../Ship";
import Obstacles from "../Obstacles";
import Fon from "../Fon";
import Bonus from "../Bonus";
import fon from "../assets/bg.png";
import arLeft from "../assets/arLeft.png";
import arRight from "../assets/arRight.png";
import arDown from "../assets/arDown.png";
import arUp from "../assets/arUp.png";
import k1 from "../assets/k1.gif";
import k2 from "../assets/k2.gif";
import k3 from "../assets/a1.gif";
import k4 from "../assets/a2.gif";
import sprut from "../assets/sprut.gif";
import crystal from "../assets/crystal.gif";
import gameOverText from "../assets/gameover.gif"
import ship from '../assets/ship.gif';
import ship1 from '../assets/ship1.png';
import ship2 from '../assets/ship2.png';
import ship3 from '../assets/ship3.png';
import ship4 from '../assets/ship4.png';
import ship5 from '../assets/ship5.png';

import home from '../assets/home.png';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
export default function App() {
    const [fonBottom, setFonBottom] = useState(0);
    const [fonLeft, setFonLeft] = useState(0);
    //
    const shipWidth = 45
    const shipHeight = 75
    const [shipBottom, setShipBottom] = useState(screenHeight / 3);
    const [shipLeft, setShipLeft] = useState(screenWidth / 2 - shipWidth / 2);
    //
    const [obstaclesBottom, setObstaclesBottom] = useState(screenHeight);
    const [obstaclesBottomTwo, setObstaclesBottomTwo] = useState(screenHeight * 1.2);
    const [obstaclesBottomThree, setObstaclesBottomThree] = useState(screenHeight * 1.2);
    const [obstaclesBottomFour, setObstaclesBottomFour] = useState(screenHeight * 1.2);
    const [obstaclesBottomFive, setObstaclesBottomFive] = useState(screenHeight * 1.2);
    //
    const [obstaclesLeft, setObstaclesLeft] = useState(0);
    const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(0);
    const [obstaclesLeftThree, setObstaclesLeftThree] = useState(0);
    const [obstaclesLeftFour, setObstaclesLeftFour] = useState(0);
    const [obstaclesLeftFive, setObstaclesLeftFive] = useState(0);
    //bonus
    const [bonusBottom, setBonusBottom] = useState(screenHeight);
    const [bonusLeft, setBonusLeft] = useState(screenWidth / 2);
    let [bonusScore, setBonusScore] = useState(0);
    const bonusHeight = 30
    const bonusWidth = 30
    //счёт
    const [score, setScore] = useState(0);
    const [sound, setSound] = useState();
    //размеры препятствий
    const sizes = [
        {width: 10, height: 10},
        {width: 80, height: 80},
        {width: 50, height: 50},
        {width: 55, height: 55},
        {width: 55, height: 55},
        {width: 100, height: 100}
    ]
    //анимирование
    let gameTimerId;
    let obstaclesTimerId;
    let obstaclesTimerIdTwo;
    let obstaclesTimerIdThree;
    let obstaclesTimerIdFour;
    let obstaclesTimerIdFive;
    let fonTimerId;
    let bonusTimerId;
    //для переходов
    const [isGameOver, setIsGameOver] = useState(true);
    const [isMenu, setIsMenu] = useState(true);
    const [isHelp, setIsHelp] = useState(false);
    const [isShop, setIsShop] = useState(false);
    //для движения не нужно пок
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0)
    // Плавное лево и право
    // useEffect(() => {
    //     if (left > 0) {
    //         setLeft(left => left - 1);
    //         gameTimerId = setInterval(() => {
    //             setShipLeft(shipLeft => shipLeft - 50)
    //             clearInterval(gameTimerId)
    //         }, 10)
    //         return () => {
    //             clearInterval(gameTimerId)
    //         }
    //     } else if (right > 0) {
    //         setRight(right => right - 1);
    //         gameTimerId = setInterval(() => {
    //             setShipLeft(shipLeft => shipLeft + 50)
    //             if (right > 0) {
    //                 clearInterval(gameTimerId)
    //             }
    //         }, 10)
    //         return () => {
    //             clearInterval(gameTimerId)
    //         }
    //     }
    // }, [shipLeft])


    //Контроллер
    const jumpUp = () => {
        if (!isGameOver && (shipBottom < screenHeight * 0.82)) {
            setShipBottom(shipBottom => shipBottom + 20)
        }
    }
    const jumpDown = () => {
        if (!isGameOver && (shipBottom > 100)) {
            setShipBottom(shipBottom => shipBottom - 20)
        }
    }
    const jumpLeft = () => {
        if (!isGameOver && (shipLeft > 20)) {
            setShipLeft(shipLeft => shipLeft - 20)
            // setLeft(1);
        }
    }
    const jumpRight = () => {
        if (!isGameOver && (shipLeft < screenWidth - 20 - shipWidth)) {
            setShipLeft(shipLeft => shipLeft + 20)
            // setRight(1);
        }
    }
//фон
//     for (let i = 0; i < 10; i++) {
//         setBonusBottom(bonusBottom=>bonusBottom.push(1*i*100+100))
//     }
//     console.log(bonusBottom);


    useEffect(() => {
        if (fonBottom > 0) {
            fonTimerId = setInterval(() => {
                setFonBottom(fonBottom => fonBottom - 4);
            }, 10)
            return () => {
                clearInterval(fonTimerId)
            }
        } else {
            setFonBottom(screenHeight)
        }
    }, [fonBottom]);


    useEffect(() => {
        if ((bonusBottom > 0) && (isMenu == false && isGameOver == false)) {
            bonusTimerId = setInterval(() => {
                setBonusBottom(bonusBottom => bonusBottom - 7);
            }, 10)
            return () => {
                clearInterval(bonusTimerId)
            }
        } else {
            setBonusBottom(screenHeight * 1.2)
            setBonusLeft(Math.random() * (screenWidth - bonusWidth))
        }
    }, [bonusBottom]);
    //Метеор
    useEffect(() => {
        if ((obstaclesBottom > -sizes[1].height) && (isMenu == false && isGameOver == false)) {
            obstaclesTimerId = setInterval(() => {
                setObstaclesBottom(obstaclesBottom => obstaclesBottom - 13);

                if ((score > 5) && (score < 8)) {
                    setObstaclesBottomTwo(obstaclesBottomTwo => obstaclesBottomTwo - 10);
                }
                if ((score > 10) && (score < 13)) {
                    setObstaclesBottomThree(obstaclesBottomThree => obstaclesBottomThree - 10);
                }
                if ((score > 20) && (score < 23)) {
                    setObstaclesBottomFour(obstaclesBottomFour => obstaclesBottomFour - 10);
                }
                if ((score > 30) && (score < 33)) {
                    setObstaclesBottomFive(obstaclesBottomFive => obstaclesBottomFive - 10);
                }
            }, 30)
            return () => {
                clearInterval(obstaclesTimerId)
            }
        } else {
            setObstaclesBottom(screenHeight * 1.2)
            setObstaclesLeft(Math.random() * (screenWidth - sizes[1].width))
            if (!isGameOver) {
                setScore(score => score + 1)
            }
        }
    }, [obstaclesBottom]);
    //астероид
    useEffect(() => {
        if ((obstaclesBottomTwo > -sizes[2].height) && (isMenu == false && isGameOver == false)) {
            obstaclesTimerIdTwo = setInterval(() => {
                if (score > 5) {
                    setObstaclesBottomTwo(obstaclesBottomTwo => obstaclesBottomTwo - 12);
                }
            }, 10)
            return () => {
                clearInterval(obstaclesTimerIdTwo)
            }
        } else {
            setObstaclesBottomTwo(screenHeight * 1.2)
            setObstaclesLeftTwo(Math.random() * (screenWidth - sizes[2].width))
            setScore(score => score + 1);
        }
    }, [obstaclesBottomTwo]);
//кометка синяя
    useEffect(() => {
        if ((obstaclesBottomThree > -sizes[3].height) && (isMenu == false && isGameOver == false)) {
            obstaclesTimerIdThree = setInterval(() => {
                if (score > 10) {
                    setObstaclesBottomThree(obstaclesBottomThree => obstaclesBottomThree - 15);
                    setObstaclesLeftThree(obstaclesLeftThree => obstaclesLeftThree + 10);
                }
            }, 30)
            return () => {
                clearInterval(obstaclesTimerIdThree)
            }
        } else {
            setObstaclesBottomThree(screenHeight * 1.2)
            setObstaclesLeftThree(-400 + Math.random() * 200)
            setScore(score => score + 1)
        }
    }, [obstaclesBottomThree]);
//красная
    useEffect(() => {
        if ((obstaclesBottomFour > -sizes[4].height) && (isMenu == false && isGameOver == false)) {
            obstaclesTimerIdFour = setInterval(() => {
                if (score > 20) {
                    setObstaclesBottomFour(obstaclesBottomFour => obstaclesBottomFour - 15);
                    setObstaclesLeftFour(obstaclesLeftFour => obstaclesLeftFour - 10);
                }

            }, 10)
            return () => {
                clearInterval(obstaclesTimerIdFour)
            }
        } else {
            setObstaclesBottomFour(screenHeight * 1.2)
            setObstaclesLeftFour(600 - Math.random() * 200)
            setScore(score => score + 1)
        }
    }, [obstaclesBottomFour]);

    //монстр1

    useEffect(() => {
        if ((obstaclesBottomFive > -sizes[5].height) && (isMenu == false && isGameOver == false)) {
            obstaclesTimerIdFive = setInterval(() => {
                if (score > 30) {

                    setObstaclesBottomFive(obstaclesBottomFive => obstaclesBottomFive - 5);
                    if (shipLeft < obstaclesLeftFive) {
                        setObstaclesLeftFive(obstaclesLeftFive => obstaclesLeftFive - 8);
                    }
                    if (shipLeft > obstaclesLeftFive) {
                        setObstaclesLeftFive(obstaclesLeftFive => obstaclesLeftFive + 8);
                    }
                }
            }, 10)
            return () => {
                clearInterval(obstaclesTimerIdFive)
            }
        } else {
            setObstaclesBottomFive(screenHeight * 1.2)
            setObstaclesLeftFive(Math.random() * (screenWidth - sizes[5].width))
            setScore(score => score + 2)
        }
    }, [obstaclesBottomFive]);

    //препятствия
    useEffect(() => {
        if (
            (((shipBottom + shipHeight * 0.9 > obstaclesBottom) && (shipBottom < obstaclesBottom + sizes[1].height * 0.9)) &&
                ((shipLeft + shipWidth * 0.9 > obstaclesLeft) && (shipLeft < obstaclesLeft + sizes[1].width * 0.9)))
            ||
            (((shipBottom + shipHeight * 0.9 > obstaclesBottomTwo) && (shipBottom < obstaclesBottomTwo + sizes[2].height * 0.9)) &&
                ((shipLeft + shipWidth * 0.9 > obstaclesLeftTwo) && (shipLeft < obstaclesLeftTwo + sizes[2].width * 0.9)))
            ||
            (((shipBottom + shipHeight * 0.9 > obstaclesBottomThree) && (shipBottom < obstaclesBottomThree + sizes[3].height * 0.9)) &&
                ((shipLeft + shipWidth * 0.8 > obstaclesLeftThree) && (shipLeft < obstaclesLeftThree + sizes[3].width * 0.8)))
            ||
            (((shipBottom + shipHeight * 0.9 > obstaclesBottomFour) && (shipBottom < obstaclesBottomFour + sizes[4].height * 0.9)) &&
                ((shipLeft + shipWidth * 0.8 > obstaclesLeftFour) && (shipLeft < obstaclesBottomFour + sizes[4].width * 0.8)))
            ||
            (((shipBottom + shipHeight * 0.9 > obstaclesBottomFive) && (shipBottom < obstaclesBottomFive + sizes[5].height * 0.9)) &&
                ((shipLeft + shipWidth * 0.9 > obstaclesLeftFive) && (shipLeft < obstaclesLeftFive + sizes[5].width * 0.9)))
        ) {

            gameOver()
        }
        if ((((shipBottom + shipHeight * 0.9 > bonusBottom) && (shipBottom < bonusBottom + bonusHeight * 0.9)) &&
            ((shipLeft + shipWidth * 0.9 > bonusLeft) && (shipLeft < bonusLeft + bonusWidth * 0.9)))) {
            setBonusScore(bonusScore => bonusScore + 1);

            setBonusBottom(bonusBottom => bonusBottom + screenHeight);
        }
    })

    const gameOver = () => {
        setIsGameOver(true)
        clearInterval(obstaclesTimerId)
        clearInterval(obstaclesTimerIdTwo)
        clearInterval(obstaclesTimerIdThree)
        clearInterval(obstaclesTimerIdFour)
        clearInterval(obstaclesTimerIdFive)
        clearInterval(gameTimerId)
        clearInterval(fonTimerId)
        clearInterval(bonusTimerId)
    }
    const exiting = () => {
        BackHandler.exitApp()
    }
    const startGame = () => {
        setIsMenu(false);
        playSound();
        setObstaclesBottom(obstaclesBottom => obstaclesBottom - 10);
        setBonusBottom(bonusBottom => bonusBottom - 1);
        setIsGameOver(false);
        setScore(0);
    }

    const toGoScreen = () => {
        setObstaclesBottom(screenHeight * 1.2);
        setObstaclesBottomTwo(screenHeight * 1.2);
        setObstaclesBottomThree(screenHeight * 1.2);
        setObstaclesBottomFour(screenHeight * 1.2);
        setObstaclesBottomFive(screenHeight * 1.2);
        setBonusBottom(screenHeight * 1.2);
        setShipBottom(screenHeight / 3);
        setShipLeft(screenWidth / 2 - shipWidth / 2);
        setBonusLeft(Math.random() * screenWidth)

    }
    const toMenu = () => {
        setIsMenu(true);
        setFonBottom(fonBottom => fonBottom - 1);
        toGoScreen();
    }
    const toGame = () => {
        toGoScreen();
        setFonBottom(fonBottom => fonBottom - 1);
        setBonusBottom(bonusBottom => bonusBottom - 1);
        setIsGameOver(false);
        setScore(0);
        setObstaclesBottom(obstaclesBottom => obstaclesBottom - 10);
    }
    const toHelp = () => {
        setIsHelp(true);
        setIsGameOver(false);
    }
    const outHelp = () => {
        setIsHelp(false);
    }
    const toShop = () => {
        setIsShop(true);
        setIsMenu(false);
    }
    const outShop = () => {
        setIsShop(false);
        setIsMenu(true);
    }


//Музыка
    async function playSound() {
        console.log('Loading Sound');
        const {sound} = await Audio.Sound.createAsync(
            require('../assets/rey.mp3')
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>

            {/*ГЛАВНОЕ МЕНЮ*/}

            {isMenu && !isHelp && !isShop &&
            <View>
                <Fon
                    image={fon}
                    fonBottom={fonBottom}
                    fonLeft={fonLeft}
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}
                    style={styles.over}
                />
                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 100,
                        color: '#ab1d12',
                        textAlign: 'center',
                        marginTop: 150,
                        marginBottom: 70,
                        textShadowColor: '#000000',
                        textShadowOffset: {width: 4, height: 3},
                        textShadowRadius: 1,
                    }}>Starfall</Text>
                    <TouchableOpacity
                        onPress={startGame}>
                        <LinearGradient
                            colors={['#f23f2f', '#000000']}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.textMenu}>Play</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toShop}>
                        <LinearGradient
                            colors={['#f23f2f', '#000000']}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.textMenu}>Shop</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toHelp}>
                        <LinearGradient
                            colors={['#f23f2f', '#000000']}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.textMenu}>Settings</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={exiting}>
                        <LinearGradient
                            colors={['#f23f2f', '#000000']}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.textMenu}>Quit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>}

            {/*ОКНО МАГАЗИНА*/}

            {isShop && !isHelp &&
            <View>
                <Fon
                    image={fon}
                    fonBottom={fonBottom}
                    fonLeft={fonLeft}
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}
                    style={styles.over}
                />
                <View style={{}}>
                    <LinearGradient
                        colors={['rgba(242,63,47,0.9)', 'rgba(0,0,0,0.8)']}
                        style={{
                            width: screenWidth,
                            height: screenHeight / 9,

                        }}
                    >
                        <Text style={{
                            marginTop: screenHeight / 60,
                            marginLeft: screenHeight / 100,
                            fontSize: screenHeight / 30,
                            color: 'white',
                        }}>
                            <Image source={crystal}
                                   style={{width: screenHeight / 15, height: screenHeight / 15}}/>
                            {bonusScore}
                        </Text>
                        <Text style={{
                            position: 'absolute',
                            left: screenWidth / 2.9,
                            marginTop: screenHeight / 40,
                            fontSize: screenWidth / 7,
                            color: 'white',
                        }}>Shop</Text>
                        <TouchableOpacity
                            onPress={outShop} style={{position: 'absolute', left: screenWidth / 1.25}}>
                            <Image source={home} style={{
                                marginLeft: screenHeight / 60,
                                marginTop: screenHeight / 30,
                                width: screenHeight / 15,
                                height: screenHeight / 15,
                                opacity: 1,
                            }}/>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    marginTop: screenHeight / 20,
                    flexWrap: 'wrap',
                }}>
                    <TouchableOpacity style={styles.shopItem}>
                        <Image source={ship} style={styles.imageContainer}/>
                        <Text style={[styles.textMenu, {textAlign: 'center'}]}>100
                            <Image source={crystal}
                                   style={{width: screenHeight / 30, height: screenHeight / 30}}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shopItem}>
                        <Image source={ship1} style={styles.imageContainer}/>
                        <Text style={[styles.textMenu, {textAlign: 'center'}]}>200
                            <Image source={crystal}
                                   style={{width: screenHeight / 30, height: screenHeight / 30}}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shopItem}>
                        <Image source={ship2} style={styles.imageContainer}/>
                        <Text style={[styles.textMenu, {textAlign: 'center'}]}>300
                            <Image source={crystal}
                                   style={{width: screenHeight / 30, height: screenHeight / 30}}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shopItem}>
                        <Image source={ship3} style={styles.imageContainer}/>
                        <Text style={[styles.textMenu, {textAlign: 'center'}]}>400
                            <Image source={crystal}
                                   style={{width: screenHeight / 30, height: screenHeight / 30}}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shopItem}>
                        <Image source={ship4} style={styles.imageContainer}/>
                        <Text style={[styles.textMenu, {textAlign: 'center'}]}>500
                            <Image source={crystal}
                                   style={{width: screenHeight / 30, height: screenHeight / 30}}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shopItem}>
                        <Image source={ship5} style={styles.imageContainer}/>
                        <Text style={[styles.textMenu, {textAlign: 'center'}]}>600
                            <Image source={crystal}
                                   style={{width: screenHeight / 30, height: screenHeight / 30}}/></Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity
                    onPress={outShop}>
                    <LinearGradient
                        colors={['#f23f2f', '#000000']}
                        style={[styles.menuButtons,{marginLeft:50, marginTop:500}]}
                    >
                        <Text style={styles.textMenu}>Buy</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            }
            {/*ОКНО КОНЦА ИГРЫ*/}
            {!isMenu && isGameOver && !isShop && !isHelp &&
            <ImageBackground source={fon} style={styles.fon}>
                <View style={styles.over}>
                    <View style={{
                        width: screenWidth / 1.2,
                        height: 100
                    }
                    }>
                        <Image source={gameOverText}
                               style={{
                                   flex: 1,
                                   height: null,
                                   width: null,
                                   resizeMode: 'stretch',
                               }}/>
                    </View>
                    <Text style={{
                        fontSize: 60,
                        marginBottom: 50,
                        color: '#F23F2F',
                        textShadowColor: '#000000',
                        textShadowOffset: {width: 4, height: 3},
                        textShadowRadius: 1,
                    }}>Score : {score}</Text>
                    <TouchableOpacity onPress={toGame}>
                        <LinearGradient
                            colors={['#f23f2f', '#000000']}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.textMenu}>Try Again</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toMenu}>
                        <LinearGradient
                            colors={['#f23f2f', '#000000']}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.textMenu}>Menu</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <AdMobBanner
                        style={{position: 'absolute', bottom: screenHeight / 15,}}
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-5886534776742361/5245592241" // Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds // true or false
                    />
                </View>
            </ImageBackground>}

            {/*ОКНО ПОМОЩИ*/}

            {isHelp &&
            <ImageBackground source={fon}
                             style={[styles.fon]}>
                <Text style={{fontSize: 60, color: "white", textAlign: "center", marginTop: 50}}>Controls</Text>
                <Text style={styles.arrows}>Move Left</Text>
                <Text style={styles.arrows}>Move Right</Text>
                <Text style={styles.arrows}>Move Up</Text>
                <Text style={styles.arrows}>Move Down</Text>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={[{marginTop: 80}]}
                                      onPress={outHelp}>
                        <LinearGradient
                            colors={['#f23f2f', '#000000']}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.textMenu}>Menu</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <AdMobBanner
                    style={{position: 'absolute', bottom: screenHeight / 10, width: screenWidth}}
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-5886534776742361/5245592241" // Test ID, Replace with your-admob-unit-id
                    servePersonalizedAds // true or false
                />
            </ImageBackground>
            }

            {/*ОКНО ИГРЫ*/}

            {!isMenu && !isGameOver && !isHelp && !isShop &&
            <ImageBackground source={fon}
                             style={styles.fon}>
                <Fon
                    image={fon}
                    fonBottom={fonBottom}
                    fonLeft={fonLeft}
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}
                    style={styles.over}
                />
                <Bonus
                    image={crystal}
                    bonusBottom={bonusBottom}
                    bonusHeight={bonusHeight}
                    bonusWidth={bonusWidth}
                    bonusLeft={bonusLeft}
                />
                <Ship
                    shipImage={ship}
                    shipBottom={shipBottom}
                    shipLeft={shipLeft}
                    shipHeight={shipHeight}
                    shipWidth={shipWidth}
                />
                <Obstacles
                    image={k1}
                    obstacleWidth={sizes[1].width}
                    obstacleHeight={sizes[1].height}
                    obstaclesBottom={obstaclesBottom}
                    obstaclesLeft={obstaclesLeft}
                />
                <Obstacles
                    image={k2}
                    obstacleWidth={sizes[2].width}
                    obstacleHeight={sizes[2].height}
                    obstaclesBottom={obstaclesBottomTwo}
                    obstaclesLeft={obstaclesLeftTwo}
                />
                <Obstacles
                    image={k3}
                    obstacleWidth={sizes[3].width}
                    obstacleHeight={sizes[3].height}
                    obstaclesBottom={obstaclesBottomThree}
                    obstaclesLeft={obstaclesLeftThree}
                />
                <Obstacles
                    image={k4}
                    obstacleWidth={sizes[4].width}
                    obstacleHeight={sizes[4].height}
                    obstaclesBottom={obstaclesBottomFour}
                    obstaclesLeft={obstaclesLeftFour}
                />
                <Obstacles
                    image={sprut}
                    obstacleWidth={sizes[5].width}
                    obstacleHeight={sizes[5].height}
                    obstaclesBottom={obstaclesBottomFive}
                    obstaclesLeft={obstaclesLeftFive}
                />
                <LinearGradient
                    colors={['rgba(242,63,47,0.9)', 'rgba(0,0,0,0.8)']}

                >
                    <View style={{
                        width: screenWidth,
                        height: screenHeight / 12,

                    }}>
                        <Text style={styles.textScore}>Score:{score}</Text>
                        <Text style={styles.textBonusScore}><Image source={crystal}
                                                                   style={{width: 30, height: 30}}/>{bonusScore}</Text>
                    </View>

                </LinearGradient>
                <View onTouchMove={jumpUp} style={styles.buttonUp}>
                    <TouchableOpacity style={{
                        width: 100,
                        height: 72, marginBottom: 20
                    }}>
                        <Image source={arUp}
                               style={styles.imageContainer}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonMiddle}>
                    <View onTouchMove={jumpLeft}
                    >
                        <TouchableOpacity style={{
                            width: 100,
                            height: 72,
                            marginRight: 50
                        }}>
                            <Image source={arLeft}
                                   style={styles.imageContainer}/>
                        </TouchableOpacity>
                    </View>

                    <View onTouchMove={jumpRight} style={{}}>
                        <TouchableOpacity style={{
                            width: 100,
                            height: 72
                        }}>
                            <Image source={arRight}
                                   style={styles.imageContainer}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View onTouchMove={jumpDown} style={styles.buttonDown}>
                    <TouchableOpacity style={{
                        width: 100,
                        height: 72, marginTop: 10,
                    }}>
                        <Image source={arDown}
                               style={styles.imageContainer}/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    fon: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
    },
    buttonMiddle: {
        flex: 1,
        maxHeight: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    buttonUp: {
        flex: 1,
        maxHeight: screenHeight / 1.37,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: -30,
    },
    buttonDown: {
        flex: 1,
        maxHeight: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    textScore: {
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        marginTop: screenHeight / 22,
        marginLeft: screenWidth / 20

    },
    textBonusScore: {
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        left: screenWidth / 1.2,
        marginTop: screenHeight / 30,
    },
    over: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        paddingTop: 150,
        alignItems: 'center',
    },
    menuButtons: {
        borderWidth: 2,
        padding: 15,
        width: Dimensions.get("screen").width / 1.3,
        backgroundColor: "white",
        alignItems: 'center',
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 40,
        marginBottom: 20,
    },
    input1: {
        backgroundColor: 'white',
        marginTop: 10,
        width: 280,
        textAlign: 'center',
    },
    textMenu: {
        fontSize: 25,
        color: "white",
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 3,
    },
    arrows: {
        fontSize: 40,
        color: 'white',
        marginLeft: 140,
        marginTop: 46
    }
    ,
    shopItem: {
        fontSize: 2,
        width: 100,
        height: 100,

    }

});

// const reloading = () => {
//     // setData();
//     Updates.reloadAsync();
// }
// function setData() {
//     const nname = firebase.database().ref("myscore");
//     nname.push().set({
//         name: name,
//         score: score
//     })
//     getData();
// }

// function getData() {
//     const myitems = firebase.database().ref("myscore");
//     myitems.on("value", datasnap => {
//         console.log(Object.values(datasnap.val()));
//     });
// }