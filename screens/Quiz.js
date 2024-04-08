import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Import RadioButton component
import quiz1 from '../assets/Quiz/quiz1.jpg';
import quiz2 from '../assets/Quiz/quiz2.jpg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import cong from '../assets/Lesson/cong2.jpg'


const QuizScreen = ({ route, navigation }) => {
    const { lessons1 } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [userAnswers, setUserAnswers] = useState(new Array(totalQuestions).fill(null));
    const [selectedOptions, setSelectedOptions] = useState(new Array(totalQuestions).fill(null)); // Lưu trữ lựa chọn của người dùng cho mỗi câu hỏi
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setShowNextBackButtons(true)
    };
    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            correctAnswer: 'Paris',
            picture: quiz1
        },
        {
            question: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '4',
            picture: quiz2
        },
    ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showNextBackButtons, setShowNextBackButtons] = useState(true);
    const totalQuestions = questions.length;
    const handleAnswer = (selectedOption) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = selectedOption;
        setUserAnswers(updatedUserAnswers);

        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
    };
    const handleNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < totalQuestions) {
            setCurrentQuestionIndex(nextQuestionIndex);
            // Di chuyển hàm handleAnswer vào đây để chỉ tính điểm khi người dùng nhấn Next để chuyển đến câu hỏi tiếp theo
            handleAnswer(selectedOptions[currentQuestionIndex]);
        } else {
            // Nếu là câu hỏi cuối cùng, hiển thị điểm
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
        setUserAnswers(new Array(totalQuestions).fill(null));
        setModalVisible(false);
        setSelectedOptions([])
        setShowNextBackButtons(true);
    };
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const handleNextOrSubmit = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            handleNextQuestion();
        } else {
            toggleModal();
            setShowNextBackButtons(false);
        }
    };
    const handleSubmitQuiz = () => {
        let correctAnswers = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setShowScore(true);
    };
    console.log("Score:", score);
    return (
        <View style={styles.container}>
            {showScore ? (
                <View style={styles.scoreContainer}>
                    <View style={styles.FormScore}>
                        <Text style={{ marginBottom: hp('2%'), fontSize: wp('5%'), fontWeight: '600' }}>HIGH SCORE !</Text>
                        <TouchableOpacity activeOpacity={1}>
                            <Image source={cong} style={styles.CircleMen} />
                        </TouchableOpacity>
                        <Text style={{ marginBottom: hp('2%'), fontSize: wp('5%'), fontWeight: '600' }}>Thành An</Text>
                        <Text style={{ fontSize: wp('4.5%'), fontWeight: '700', color: 'orange' }}>Your Score: {score}đ</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: hp('2%') }}>
                            <TouchableOpacity onPress={restartQuiz} style={[styles.Btn, { backgroundColor: 'red', marginRight: wp('3%') }]}>
                                <Text style={{ color: 'white', fontWeight: '600' }}>Restart Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Btn} onPress={() => { navigation.navigate('Course') }}>
                                <Text style={{ color: 'white', fontWeight: '600' }}>Main menu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.quizContainer}>
                    <View style={styles.progressContainer}>
                        <Text style={{ fontSize: wp('5%'), fontWeight: 700 }}>MULTIPLE CHOICE QUESTIONS</Text>
                        <View style={{ marginTop: hp('2%') }}>
                            <Image source={questions[currentQuestionIndex].picture} style={{ width: wp('90%'), height: hp('30%'), borderRadius: 20 }} />
                        </View>
                        <View style={styles.progressBar}>
                            <View style={{ width: `${progress}%`, backgroundColor: 'green', height: 10 }} />
                        </View>
                    </View>
                    <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <TouchableOpacity onPress={() => { setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option }), handleAnswer(option) }} key={index} style={styles.optionContainer}>
                            <Text style={{ fontSize: wp('4%') }}>{option}</Text>
                            <RadioButton
                                value={option}
                                status={selectedOptions[currentQuestionIndex] === option ? 'checked' : 'unchecked'} // Sử dụng selectedOptions để hiển thị lựa chọn của người dùng
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
                    <TouchableOpacity onPress={handlePreviousQuestion} disabled={currentQuestionIndex === 0} style={[styles.MoveBtn, { backgroundColor: currentQuestionIndex === 0 ? 'lightblue' : '#007bff' }]}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNextOrSubmit} style={styles.MoveBtn}>
                        <Text style={styles.buttonText}>{currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Submit'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
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
    },
    scoreContainer: {
        flex: 1,
    },
    questionText: {
        fontSize: wp('5%'),
        marginBottom: 20,
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
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        marginTop: hp('2%')
    }
});

export default QuizScreen;
