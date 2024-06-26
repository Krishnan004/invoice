import React, { useState, useEffect } from 'react';

const QuotationTo = ({ to, setTo, titleTo }) => {
    const [busName, setBusName] = useState(to.name || '');
    const [email, setEmail] = useState(to.email || '');
    const [mobNumber, setMobNumber] = useState(to.mobile || '');
    const [city, setCity] = useState(to.city || '');
    const [pinCode, setPinCode] = useState(to.pincode || '');
    const [state, setState] = useState(to.state || '');
    const [address, setAddress] = useState(to.address || '');

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!busName) {
            isValid = false;
            formErrors['busName'] = '*';
        }
        if (!mobNumber) {
            isValid = false;
            formErrors['mobNumber'] = '*';
        } else if (!/^[0-9]{10}$/.test(mobNumber)) {
            isValid = false;
            formErrors['mobNumber'] = '*';
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const updatedTo = {
                name: busName,
                email: email,
                mobile: mobNumber,
                address: address,
                city: city,
                pincode: pinCode,
                state: state
            };
            setTo(updatedTo);
        }
    };

    useEffect(() => {
        validateForm();
    }, [busName, email, mobNumber, city, pinCode, address, state]);

    return (
        <form className="p-8 border rounded-3xl border-gray-400 2xl:px-20" onBlur={handleSubmit}>
            <h2 className="p-6 sm:p-8 text-custom-blue sm:text-2xl font-bold 2xl:text-3xl">{titleTo}</h2>
            <div>
                <input
                    type="text"
                    name="businessName"
                    placeholder="Your Business Name"
                    value={busName}
                    onChange={(e) => setBusName(e.target.value)}
                    required
                />
                {errors.busName && <span className="text-red-500 ">{errors.busName}</span>}
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="tel"
                    name="mobilenumber"
                    placeholder="Your Phone Number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={mobNumber}
                    onChange={(e) => setMobNumber(e.target.value)}
                    required
                />
                {errors.mobNumber && <span className="text-red-500">{errors.mobNumber}</span>}
            </div>
            <div>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="city"
                    placeholder="District"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="postalcode"
                    placeholder="Postal Code"
                    pattern="\d{5,6}"
                    maxLength="6"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>
            <button type="submit" className="hidden mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>

        </form>
    );
};

export default QuotationTo;

