import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as yup from 'yup';
import {useFormik} from 'formik';

const passwordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatedPassword = (passwordLength: number) => {
    let characterList = '';
    const upperCaseCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseCharacter = 'abcdefghijklmnopqrstuvwxyz';
    const specialCharacter = '!@#$%^&*()_+';
    const digitCharacter = '0123456789';

    if (upperCase) characterList += upperCaseCharacter;
    if (lowerCase) characterList += lowerCaseCharacter;
    if (symbols) characterList += specialCharacter;
    if (number) characterList += digitCharacter;

    const passwordResult = createdPassword(characterList, passwordLength);
    console.log(passwordResult);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createdPassword = (characters: string, passwordLength: number) => {
    let results = '';

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      results += characters.charAt(characterIndex);
    }
    return results;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setUpperCase(false);
    setLowerCase(false);
    setSymbols(false);
    setNumber(false);
  };

  const onSubmit = (values: {passwordLength: string}) => {
    console.log(values.passwordLength);
    generatedPassword(Number(values.passwordLength));
  };

  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    isValid,
    handleReset,
  } = useFormik({
    initialValues: {
      passwordLength: '',
    },
    validationSchema: passwordSchema,
    onSubmit,
  });

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <View style={styles.inputWrapper}>
            <View>
              <Text style={styles.heading}>Password Length</Text>
              {touched.passwordLength && errors.passwordLength && (
                <Text style={styles.errorText}>{errors.passwordLength}</Text>
              )}
            </View>
            <View>
              <TextInput
                style={styles.inputStyle}
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                placeholder="E.g. 8"
                keyboardType="numeric"
                min={1}
                max={16}
                // inputMode='number'
              />
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View>
              <Text style={styles.heading}>Include Lowercase</Text>
            </View>
            <View>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={lowerCase}
                onPress={() => setLowerCase(!lowerCase)}
                fillColor="#29ABB7"
              />
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View>
              <Text style={styles.heading}>Include Uppercase</Text>
            </View>
            <View>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={upperCase}
                onPress={() => setUpperCase(!upperCase)}
                fillColor="#FED85D"
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <View>
              <Text style={styles.heading}>Include Numbers</Text>
            </View>
            <View>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={number}
                onPress={() => setNumber(!number)}
                fillColor="#BB2CD9"
              />
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View>
              <Text style={styles.heading}>Include Symbols</Text>
            </View>
            <View>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={symbols}
                onPress={() => setSymbols(!symbols)}
                fillColor="#FC80A5"
              />
            </View>
          </View>
          <View style={styles.formActions}>
            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleSubmit}
              disabled={!isValid}>
              <Text style={styles.buttonText}>Generate Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                handleReset();
                resetPassword();
              }}
              disabled={!isValid}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          {isPasswordGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.description}>Long Press to copy</Text>
              <Text selectable={true} style={styles.generatedPassword}>
                {password}
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  generateButton: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#c3d0df',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  card: {
    width: 360,
    height: 150,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#777E8B',
    padding: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    marginTop: 10,
  },
  cardElevated: {},
  description: {
    fontSize: 12,
    color: '#777E8B',
    fontWeight: 'bold',
    top: 25,
    left: 4,
  },
  generatedPassword: {
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center',
    bottom: -35,
  },
});
