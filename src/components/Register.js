import React, { useEffect } from 'react'
import "./Registration.css";
import { CartState } from "../context/Context";
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
    username: Yup.string().required(" Required field")
        .min(4, 'Must be greater than 4 letters'),
    password: Yup.string()
        .matches(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g, "Must Containt 8 Characters,Maximum Containt 12 Chracters, One UpperCase, One LowerCase, One Number and one special Character")
        .required('Required...')
})

function Register() {

    const {
        setData,
        data,
    } = CartState();

    const initialValues = {
        username: "",
        password: "",
        id: new Date().getTime().toString(),
        isadmin: "true"
    }

    const onSubmit = (values, { resetForm }) => {
        let list = data.find((item) => item.username === values.username);
        console.log(list.username)
        if (list) {
            resetForm()
            return
        } else {
            setData([...data, values])
        }
    }


    useEffect(() => {
        console.log("data", data);
        localStorage.setItem('data', JSON.stringify(data))
    }, [data]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <div class="registrationfrm">
            <form onSubmit={formik.handleSubmit} >
                <h2>Register</h2><br></br>

                <div className="form-group">
                    <b> First name : </b>
                    <input type="text" id="username"
                        style={{ width: "80%", margin: "0 10px" }}
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        placeholder="First name"
                    /><br></br>{formik.touched.username && formik.errors.username ? <span style={{ color: "red" }}>{formik.errors.username}</span> : null}<br></br>

                </div><br></br>

                <div className="form-group">
                    <b>Password : </b>
                    <input type="password" id="password"
                        style={{ width: "80%", margin: "0 10px" }}
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Enter password"
                    /><br></br>{formik.touched.password && formik.errors.password ? <span style={{ color: "red" }}>{formik.errors.password}</span> : null}<br></br>



                </div><br></br>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>

            </form>

        </div>
    )
}

export default Register
