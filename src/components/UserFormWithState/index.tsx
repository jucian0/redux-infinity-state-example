import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, actions, UserState, User } from "../../store/states/user";
import { AppState } from "../../store";
import { UserValidations } from "./index.validation";
import useYup from '@usereact/use-yup'
import Input from "./Input";


const UserForm = () => {

    const dispatch = useDispatch()
    const { user } = useSelector<AppState, UserState>(state => state.users)
    const setField = (data: Field) => dispatch(actions.setField(data))

    const { errors, validate } = useYup(user, UserValidations, {
        validateOnChange: true
    })

    return (
        <>
            <h3>With onChange</h3>
            <strong>Validate onChange every input</strong>
            <form>
                <div className="form-group">
                    <Input
                        name="name"
                        onChange={e => setField({ name: e.target.value })}
                        label="Name"
                        error={errors.name}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="email"
                        onChange={e => setField({ email: e.target.value })}
                        label="E-mail"
                        error={errors.email}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="password"
                        onChange={e => setField({ password: e.target.value })}
                        label="Password"
                        error={errors.password}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="age"
                        onChange={e => setField({ age: e.target.value })}
                        label="Age"
                        error={errors.age}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="phone"
                        onChange={e => setField({ phone: e.target.value })}
                        label="Name"
                        error={errors.phone}
                    />
                </div>

                <div className="form-group">
                    <button type="button" className="btn btn-primary"
                        disabled={!!Object.keys(errors).length}
                        onClick={() => dispatch(actions.submit())}
                    >Submit</button>
                </div>
            </form>
        </>
    );
}

export default UserForm;