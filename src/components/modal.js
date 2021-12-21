import React, { useEffect } from 'react'
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
} from "react-bootstrap";

const validationSchema = Yup.object({
  username: Yup.string().required(" Required field")
    .min(4, 'Must be greater than 4 letters'),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g, "Must Containt 8 Characters,Maximum Containt 12 Chracters, One UpperCase, One LowerCase, One Number and one special Character")
    .required('Required...')
})

const ModalComp = () => {

  const {
    data,
    setlogout,
    modalIsOpen,
    setIsOpen,
    type,
    setType,
    togglemodal
  } = CartState();

  const initialValues = {
    username: "",
    password: "",
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const onSubmit = (values , {resetForm}) => {
    if (values.username === null || values.password === "") {
      console.log("error")
    }
    else if (values.username !== null || values.password !== "") {
      data.map((item) => {
        const { username, password, id } = item
        if ((username === values.username) && (password === values.password)) {
          localStorage.setItem('login', JSON.stringify({ id }))
          console.log("record found")
          setlogout(true)
          resetForm()      
        }else{
          setType(2)
          setIsOpen(true);
          console.log("not found")
        }
        setIsOpen(false);

      })
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={togglemodal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {
          type === 1 ? <>
            <form onSubmit={formik.handleSubmit} >
              <div className="form-group">
                <b>Name : </b>
                <input type="text" id="username"
                  style={{ width: "80%", margin: "0 10px" }}
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  placeholder="First name"
                /><br></br>{formik.touched.username && formik.errors.username ? <span style={{ color: "red" }}>{formik.errors.username}</span> : null}<br></br>
              </div>
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
              </div>
              <Button style={{ width: "50%", margin: "0 10px" }} type="submit">Login</Button><br></br><br></br>
              <Button style={{ width: "50%", margin: "0 10px" }} onClick={togglemodal} >Cancel</Button><br></br>
            </form>


            Already have an account ? <Link to="/register" onClick={togglemodal}> Register </Link>

          </> : type === 2 ?

            <h1> Login success </h1> : ""

        }
      </Modal>
    </div>
  )
}

export default ModalComp

