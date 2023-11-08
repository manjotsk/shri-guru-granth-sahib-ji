// useFormValidation.js

import { useState } from 'react';

function useFormValidation() {
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('')
    const [showPhoneError, setShowPhoneError] = useState(false);
    const [showFullNameError, setShowFullNameError] = useState(false);
    const [showAddressError, setShowAddressError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);

    const validateEmail = () => {
        if (!email) {
            setShowEmailError(true)
            return false;
        }
        setShowEmailError(false)
        return true;
    }

    const validatePhone = () => {
        if (!phone) {
            setShowPhoneError(true);
            return false;
        }
        setShowPhoneError(false);
        return true;
    };

    const validateFullName = () => {
        if (!fullName) {
            setShowFullNameError(true);
            return false;
        }
        setShowFullNameError(false);
        return true;
    };

    const validateAddress = () => {
        if (!address) {
            setShowAddressError(true);
            return false;
        }
        setShowAddressError(false);
        return true;
    };

    const validateAllFields = () => {
        const isPhoneValid = validatePhone();
        const isFullNameValid = validateFullName();
        const isAddressValid = validateAddress();
        const isEmailValid = validateEmail();

        return isPhoneValid && isFullNameValid && isAddressValid && isEmailValid;
    };

    return {
        email,
        setEmail,
        phone,
        setPhone,
        fullName,
        setFullName,
        address,
        setAddress,
        showPhoneError,
        showFullNameError,
        showAddressError,
        showEmailError,
        validatePhone,
        validateFullName,
        validateAddress,
        validateAllFields,
        validateEmail
    };
}

export default useFormValidation;
