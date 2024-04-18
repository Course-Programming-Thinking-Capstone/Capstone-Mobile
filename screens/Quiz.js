import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, ImageBackground } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Import RadioButton component
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import cong from '../assets/Lesson/cong2.jpg'
import close from '../assets/welcome/close1.png'
import bgc from '../assets/Quiz/bgc1.jpg'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
const QuizScreen = ({ route, navigation }) => {
    const { QuizDetail, CourseId } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [answerModal, setAnswerModal] = useState(false);
    const [userAnswers, setUserAnswers] = useState(new Array(QuizDetail.numberOfQuestion).fill(null));
    const [selectedOptions, setSelectedOptions] = useState(new Array(QuizDetail.numberOfQuestion).fill(null)); // Lưu trữ lựa chọn của người dùng cho mỗi câu hỏi
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setShowNextBackButtons(true)
    };
    const toggleAnswerModal = () => {
        setAnswerModal(!answerModal);
        // console.log("Cong test quiz:",selectedOptions);
    };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showNextBackButtons, setShowNextBackButtons] = useState(true);

    const handleAnswer = (selectedOption) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = selectedOption;
        setUserAnswers(updatedUserAnswers);
        const correctIndex = QuizDetail.questions[currentQuestionIndex].options.findIndex(option => option.isCorrect);
        if (selectedOption === QuizDetail.questions[currentQuestionIndex].options[correctIndex].content) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < QuizDetail.numberOfQuestion) {
            setCurrentQuestionIndex(nextQuestionIndex);
            handleAnswer(selectedOptions[currentQuestionIndex]);
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

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowScore(false);
        setUserAnswers(new Array(QuizDetail.numberOfQuestion).fill(null));
        setModalVisible(false);
        setSelectedOptions([])
        setShowNextBackButtons(true);
    };

    const progress = ((currentQuestionIndex + 1) / QuizDetail.numberOfQuestion) * 100;

    const handleNextOrSubmit = () => {
        if (currentQuestionIndex < QuizDetail.numberOfQuestion - 1) {
            handleNextQuestion();
        } else {
            toggleModal();
            setShowNextBackButtons(false);
        }
    };

    const handleSubmitQuiz = () => {
        let correctAnswers = 0;
        userAnswers.forEach((answer, index) => {
            const correctIndex = QuizDetail.questions[index].options.findIndex(option => option.isCorrect);
            if (answer === QuizDetail.questions[index].options[correctIndex].content) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setShowScore(true);
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
                            <Text style={{ marginBottom: hp('1%'), fontSize: wp('5%'), fontWeight: '600' }}>{QuizDetail.createdByName}</Text>
                            <Text style={{ fontSize: wp('4.5%'), fontWeight: '700', color: 'orange' }}>Your Score: {score}đ</Text>
                            <TouchableOpacity onPress={toggleAnswerModal} style={[styles.Btn, { backgroundColor: 'orange', marginTop: hp('1%'), width: wp("40%") }]}>
                                <Text style={{ color: 'white', fontWeight: '600' }}>Show Answer</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: hp('2%') }}>
                            <TouchableOpacity onPress={restartQuiz} style={[styles.Btn, { backgroundColor: 'red', marginRight: wp('3%') }]}>
                                <Text style={{ color: 'white', fontWeight: '600' }}>Restart Quiz</Text>
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
                        <Text style={styles.questionText}>{QuizDetail.questions[currentQuestionIndex].title}</Text>
                    </View>
                    {QuizDetail.questions[currentQuestionIndex].options.map((option, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option.content });
                                handleAnswer(option.content);
                            }}
                            key={`${option.order}-${index}`}
                            style={[styles.optionContainer, selectedOptions[currentQuestionIndex] === option.content && { backgroundColor: '#40BFFF' }]}
                        >
                            <Text style={selectedOptions[currentQuestionIndex] === option.content && { color: 'white', fontSize: wp('4%'), fontWeight: '600' }}>{option.content}</Text>
                            <RadioButton
                                value={option.content}
                                status={selectedOptions[currentQuestionIndex] === option.content ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option.content });
                                    handleAnswer(option.content);
                                }}
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
        justifyContent:'center'
    },
    scoreContainer: {
        flex: 1,
        marginTop:hp('10%')
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
        height: hp('14%'),
        borderRadius: 70,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        borderWidth: 2,
        borderColor: 'blue',
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
        marginTop:hp('16%')
    },
    QuizTitle: {
        backgroundColor: 'rgba(127, 108, 212, 0.7)',
        height: hp('30%'),
        borderRadius: 10,
        width: wp('90%'),
        marginBottom: hp('3%'),
        alignItems: 'center',
        justifyContent: "center",
        marginTop:hp('10%')
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
