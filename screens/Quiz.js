import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, ImageBackground, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Import RadioButton component
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import cong from '../assets/Profile/gamer.png'
import close from '../assets/welcome/close1.png'
import bgc from '../assets/Quiz/bgc1.jpg'
import time from '../assets/Quiz/clock.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { getUserInfo } from '../Api/Parents';
import { submitQuiz } from '../Api/Quiz';
const QuizScreen = ({ route, navigation }) => {
    const { QuizDetail, CourseId } = route.params;
    // console.log("Test Quiz:",QuizDetail);
    const [isModalVisible, setModalVisible] = useState(false);
    const [answerModal, setAnswerModal] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showNextBackButtons, setShowNextBackButtons] = useState(true);
    const [selectedOptionIds, setSelectedOptionIds] = useState([]);
    const [submittedTimeTaken, setSubmittedTimeTaken] = useState(null);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setShowNextBackButtons(true)
    };
    const toggleAnswerModal = () => {
        setAnswerModal(!answerModal);
    };
    const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
    const resetQuizState = () => {
        const questionIds = QuizDetail.questions.map(question => question.questionId);
        setSelectedQuestionIds(questionIds);
    };
    useEffect(() => {
        resetQuizState();
    }, [QuizDetail]);
    const handleAnswer = (selectedOptionId) => {
        const currentQuestion = QuizDetail.questions[currentQuestionIndex];
        const correctIndex = currentQuestion.options.findIndex(option => option.isCorrect);
        if (selectedOptionId === null || selectedOptionId === undefined) {
            selectedOptionId = 0;
        }
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = selectedOptionId;
        setUserAnswers(updatedUserAnswers);
        if (selectedOptionId === currentQuestion.options[correctIndex].optionId) {
            setScore(score + 1);
        }
        setSelectedOptionIds([...selectedOptionIds.slice(0, currentQuestionIndex), selectedOptionId, ...selectedOptionIds.slice(currentQuestionIndex + 1)]);
    };

    const handleNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < QuizDetail.numberOfQuestion) {
            setCurrentQuestionIndex(nextQuestionIndex);
            handleAnswer(selectedOptionIds[currentQuestionIndex]);
        } else {
            setShowScore(true);
        }
    }
    const handlePreviousQuestion = () => {
        const previousQuestionIndex = currentQuestionIndex - 1;
        if (previousQuestionIndex >= 0) {
            setCurrentQuestionIndex(previousQuestionIndex);
        }
    };
    const [attemptCount, setAttemptCount] = useState(0);
    const restartQuiz = () => {
        if (attemptCount >= QuizDetail.numberOfAttempt) {
            return;
        }
        setAttemptCount(attemptCount + 1);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowScore(false);
        setUserAnswers(new Array(QuizDetail.numberOfQuestion).fill(null));
        setModalVisible(false);
        setSelectedOptions([]);
        setShowNextBackButtons(true);
        setSelectedOptionIds([]);
        setSelectedQuestionIds([])
        setRemainingTime(totalSeconds);
        resetQuizState();
    };
    const handleNextOrSubmit = () => {
        if (currentQuestionIndex < QuizDetail.numberOfQuestion - 1) {
            handleNextQuestion();
        } else {
            toggleModal();
            setShowNextBackButtons(false);
        }
    };
    const [timeTaken, setTimeTaken] = useState(null);
    const handleSubmitQuiz = async () => {
        console.log("1", QuizDetail.id);
        console.log("2", selectedQuestionIds);
        console.log("3", selectedOptionIds);
        let timeElapsed = totalSeconds - remainingTime;
        if (timeElapsed < 0) {
            timeElapsed = 0;
        }
        setTimeTaken(timeElapsed);
        let correctAnswers = 0;
        userAnswers.forEach((answer, index) => {
            const correctIndex = QuizDetail.questions[index].options.findIndex(option => option.isCorrect);
            if (answer === QuizDetail.questions[index].options[correctIndex].content) {
                correctAnswers++;
            }
        });
        // setScore(correctAnswers);
        await FetchSubmitQuiz(timeElapsed);
    };
    useEffect(() => {
        fetchInfo();
    }, [])
    const [userInfo, setUserInfo] = useState([])
    const fetchInfo = async () => {
        try {
            const userData = await getUserInfo();
            if (userData) {
                setUserInfo(userData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const durationInMinutes = QuizDetail.duration;
    const totalSeconds = durationInMinutes * 60;
    const [remainingTime, setRemainingTime] = useState(totalSeconds);
    useEffect(() => {
        let intervalId;
        const updateRemainingTime = () => {
            setRemainingTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        };
        intervalId = setInterval(updateRemainingTime, 1000);
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        if (remainingTime <= 0) {
            handleSubmitQuiz();
        }
    }, [remainingTime]);
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const [quizScore, setQuizScore] = useState([]);
    const FetchSubmitQuiz = async (timeElapsed) => {
        try {
            const success = await submitQuiz(QuizDetail.id, selectedQuestionIds, selectedOptionIds, QuizDetail.duration, timeElapsed);
            if (success) {
                console.log("result:", success);
                setQuizScore(success)
                setShowScore(true);
                setSubmittedTimeTaken(timeElapsed);
            } else {
                Alert.alert('Đăng ký thất bại !!!');
            }
        } catch (error) {
            console.error("Error handling add children:", error);
        } finally {
        }
    };
    return (
        <ImageBackground source={bgc} style={styles.container}>
            {showScore ? (
                <View style={styles.scoreContainer}>
                    <View style={styles.FormScore}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ marginBottom: hp('2%'), fontSize: wp('5%'), fontWeight: '600' }}>HIGH SCORE !</Text>
                            <TouchableOpacity activeOpacity={1}>
                                <Image source={cong} style={styles.CircleMen} />
                            </TouchableOpacity>
                            {timeTaken !== null && (
                                <Text>
                                    Thời gian làm bài: {timeTaken < 60 ? `${Math.floor(timeTaken / 60)} phút ${timeTaken % 60} giây` : `${Math.floor(timeTaken / 60)} phút`}
                                </Text>
                            )}
                            <Text style={{ marginBottom: hp('1%'), fontSize: wp('5%'), fontWeight: '600' }}>{userInfo.fullName}</Text>
                            <Text style={{ fontSize: wp('4.5%'), fontWeight: '700', color: 'orange' }}>Your Score: {quizScore.quizSubmit.score} đ</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: hp('2%') }}>
                            <TouchableOpacity onPress={restartQuiz} style={[styles.Btn, { backgroundColor: 'red', marginRight: wp('3%') }]}>
                                <Text style={{ color: 'white', fontWeight: '600' }}>Restart ({attemptCount}/{QuizDetail.numberOfAttempt}) </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Btn} onPress={() => { navigation.navigate('Course', { CourseId }) }}>
                                <Text style={{ color: 'white', fontWeight: '600' }}>Main menu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal visible={answerModal} transparent={true} statusBarTranslucent={true}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                            <TouchableOpacity style={styles.closeButton} onPress={toggleAnswerModal}>
                                <Image source={close} style={styles.buttonClose} />
                            </TouchableOpacity>
                            <View style={[styles.Popup, { height: hp('55%') }]}>
                                <View showsVerticalScrollIndicator={true}>
                                    <Text style={{ fontSize: wp('6%'), textAlign: 'center', fontWeight: '700', color: '#FF8A00', marginBottom: hp('1.5%') }}>Quiz Results</Text>
                                    {QuizDetail.questions.map((question, index) => (
                                        <View key={`question-${index}`} style={{ marginVertical: hp('1%'), marginHorizontal: wp('3%') }}>
                                            <Text style={{ fontWeight: '700', textAlign: 'center', fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), }}>Q{question.order}.{question.title}</Text>
                                            {question.options.map((option, optionIndex) => (
                                                option.isCorrect ? (
                                                    <View key={`option-${index}-${optionIndex}`} style={styles.BorderAnswer}>
                                                        <Text style={{ color: 'orange', fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), fontWeight: '700', paddingRight: wp('2%') }}>Answer {option.order}: {option.content}</Text>
                                                    </View>
                                                ) : null
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) : (
                <View style={styles.quizContainer} >
                    <View style={styles.QuizTitle}>
                        <View style={{
                            flexDirection: "row", position: 'absolute', top: hp('2%'), alignItems: "center",
                        }}>
                            <Image source={time} style={{
                                width: wp('11%'), height: hp('5.5%')
                                , width: isSmallPhone || isSmallTablet ? wp('11.5%') : wp('11%'),
                            }} />
                            <Text style={{ fontSize: wp('6%'), color: 'white', marginLeft: wp('2%') }}>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</Text>
                        </View>
                        <Text style={styles.questionText}>{QuizDetail.questions[currentQuestionIndex].title}</Text>
                    </View>
                    {QuizDetail.questions[currentQuestionIndex].options.map((option, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option.content });
                                handleAnswer(option.optionId);
                            }}
                            key={`${option.order}-${index}`}
                            style={[styles.optionContainer, selectedOptions[currentQuestionIndex] === option.content && { backgroundColor: '#40BFFF' }]}
                        >
                            <Text style={[selectedOptions[currentQuestionIndex] === option.content && { color: 'white', fontSize: wp('4%'), fontWeight: '600' }, { width: wp('78%'), textAlign: 'left' }]}>{option.content}</Text>
                            <RadioButton
                                value={option.content}
                                status={selectedOptions[currentQuestionIndex] === option.content ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option.content });
                                    handleAnswer(option.optionId); // Thay đổi tại đây
                                }}
                                color={selectedOptions[currentQuestionIndex] === option.content ? 'blue' : 'black'}
                            />
                        </TouchableOpacity>

                    ))}
                    <Modal visible={isModalVisible} transparent={true} statusBarTranslucent={true}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                            <View style={styles.Popup}>
                                <Text style={{ fontSize: wp('5%'), textAlign: 'center', marginTop: hp('1%'), fontWeight: '700', color: '#FF8A00' }}>Do you want to submit ?</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('3.5%') }}>
                                    <TouchableOpacity style={[styles.Btn, { marginRight: wp('5%') }]} onPress={toggleModal}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>No</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleSubmitQuiz} style={[styles.Btn, { backgroundColor: 'red' }]}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Yes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
            {showNextBackButtons && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: hp('2%') }}>
                    <TouchableOpacity onPress={handlePreviousQuestion} disabled={currentQuestionIndex === 0} style={[styles.MoveBtn, { backgroundColor: currentQuestionIndex === 0 ? 'lightblue' : '#40BFFF' }]}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNextOrSubmit}
                        style={[
                            styles.MoveBtn,
                            { backgroundColor: currentQuestionIndex < QuizDetail.numberOfQuestion - 1 ? 'orange' : 'red' }
                        ]}
                    >
                        <Text style={styles.buttonText}>
                            {currentQuestionIndex < QuizDetail.numberOfQuestion - 1 ? 'Next' : 'Submit'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    quizContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreContainer: {
        flex: 1,
        marginTop: hp('10%')
    },
    questionText: {
        fontSize: wp('6.5%'),
        marginBottom: 20,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    progressContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    progressBar: {
        backgroundColor: '#ddd',
        width: '100%',
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        width: wp('90%'),
        marginBottom: hp('3%'),
        justifyContent: 'space-between',
        borderRadius: 10,
        height: hp('7%'),
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: 'lightblue'
    },
    MoveBtn: {
        width: wp('30%'),
        backgroundColor: 'green',
        alignItems: "center",
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        height: hp('6%'),
        justifyContent: 'center',
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: wp('4.5%'),
        fontWeight: '600'
    },
    Popup: {
        backgroundColor: '#FCEFC9',
        width: wp('90%'),
        height: hp('20%'),
        borderRadius: 10,
        justifyContent: 'center'
    },
    Btn: {
        backgroundColor: '#40BFFF',
        height: hp('5.5%'),
        width: wp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    CircleMen: {
        width: wp('28%'),
        height: hp('13%'),
        borderRadius: 70,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: hp('2%')
    },
    FormScore: {
        alignItems: "center",
        width: wp('90%'),
        marginLeft: wp('5%'),
        height: hp('50%'),
        justifyContent: 'center',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: 'white',
        marginTop: hp('16%')
    },
    QuizTitle: {
        backgroundColor: 'rgba(127, 108, 212, 0.7)',
        height: hp('30%'),
        borderRadius: 10,
        width: wp('90%'),
        marginBottom: hp('3%'),
        alignItems: 'center',
        justifyContent: "center",
        marginTop: hp('10%')
    },
    buttonClose: {
        width: wp('4%'),
        height: hp('2%'),
    },
    closeButton: {
        position: 'absolute',
        top: hp('20%'),
        right: wp('4%')
    },
    BorderAnswer: {
        alignItems: 'center',
        marginTop: hp('1%'),
        borderWidth: 1,
        paddingVertical: hp('1.5%'),
        borderRadius: 10,
        borderColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        borderColor: 'white',
        paddingLeft: wp('3%'),
        paddingRight: wp('3%'), backgroundColor: 'white'
    }
});

export default QuizScreen;