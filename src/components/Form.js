import React from "react";
import axios from "axios";

// import "./styles.css";

import { useForm, useField, splitFormProps } from "react-form";

const recordsUrl = "http://localhost:4000/records";

const sendToFakeServer = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return values;
}

const createNewRecord = async (values) => {
    let res = await axios.post(recordsUrl, {
        date: '2020-10-23',
        time: '20:20',
        title: 'lalala',
        description: 'loooooooooooool'
    });
    console.log(res);
    };

const validateAddressStreet = (value) => {
    if (!value) {
        return "A street is required";
    }
    return false;
}

const fakeCheckValidName = async (name, instance) => {
    if (!name) {
        return "A name is required";
    }

    return instance.debounce(async () => {
        console.log("checking name");
        await new Promise(resolve => setTimeout(resolve, 1000));
        // All names are valid, so return a false error
        return false;
    }, 500);
}

const InputField = React.forwardRef((props, ref) => {
    // Let's use splitFormProps to get form-specific props
    const [field, fieldOptions, rest] = splitFormProps(props);

    // Use the useField hook with a field and field options
    // to access field state
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField(field, fieldOptions);

    // Build the field
    return (
        <>
            <input {...getInputProps({ ref, ...rest })} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    );
});

const MyForm = () => {
    // Use the useForm hook to create a form instance
    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: async (values, instance) => {
            // onSubmit (and everything else in React Form)
            // has async support out-of-the-box
            await createNewRecord(values);
            console.log("Huzzah!");
        },
        debugForm: false
    });

    return (
        <Form>
            <div>
                <label>
                    Nazov: <InputField field="name" validate={fakeCheckValidName} />
                </label>
            </div>
            <div>
                <label>
                    Popis: <InputField field="address.street" validate={validateAddressStreet} />
                </label>
            </div>
            {/* <div> */}
            {/*     <label> */}
            {/*         Cas: <InputField field="time" validate={validateAddressStreet} /> */}
            {/*     </label> */}
            {/* </div> */}

            <div>
                <button type="submit" disabled={!canSubmit}>
                    Submit
                </button>
            </div>

            <div>
                <em>{isSubmitting ? "Submitting..." : null}</em>
            </div>
        </Form>
    );
}

export default MyForm;
