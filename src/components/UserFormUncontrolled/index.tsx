import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, actions, UserState, User } from "../../store/states/user";
import { AppState } from "../../store";
import { UserValidations } from "./index.validation";
import Input from "./Input";
import { ValidationError } from "yup";


const UserForm = () => {

    const dispatch = useDispatch()
    const { user } = useSelector<AppState, UserState>(state => state.users)
    const [errors, setErrors] = useState<any>({})

    const submit = async () => {
        try {
            await UserValidations.validate(user, { abortEarly: false })
            dispatch(actions.submit())
            setErrors({})
        } catch (e) {
            if (e instanceof ValidationError) {
                const err: any = {}
                e.inner.forEach((key) => {
                    err[key.path] = key.message
                })
                setErrors(err)
            }
        }
    }


    return (
        <>
            <h3>With debounceTime</h3>
            <strong>Validate onSubmit form data</strong>
            <form>
                <div className="form-group">
                    <Input
                        label="Name"
                        name="name"
                        debounceChange={(e) => dispatch(actions.setField({ name: e }))}
                        error={errors.name} />
                </div>

                <div className="form-group">
                    <Input
                        label="E-mail"
                        name="email"
                        debounceChange={(e) => dispatch(actions.setField({ email: e }))}
                        error={errors.email}
                    />
                </div>
                <div className="form-group">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        debounceChange={(e) => dispatch(actions.setField({ password: e }))}
                        error={errors.password}
                    />
                </div>
                <div className="form-group">
                    <Input
                        label="Age"
                        name="age"
                        type="number"
                        debounceChange={(e) => dispatch(actions.setField({ age: e }))}
                        error={errors.age} />
                </div>
                <div className="form-group">
                    <Input
                        label="Phone"
                        name="phone"
                        debounceChange={(e) => dispatch(actions.setField({ phone: e }))}
                        error={errors.phone}
                    />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary"
                        onClick={submit}
                    >Submit</button>
                </div>
            </form>
        </>
    );
}

export default UserForm;


