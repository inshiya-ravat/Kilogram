import { useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { registerUser } from "../../../store/users";
import styles from "./Register.module.css";
import IconKilogram from "../../../assets/IconKilogram";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import {
  CreateAuthForm,
  type CreateAuthFormType,
} from "../../../types/FormFields";
import { createAuthFormRules } from "../../../constants/rules.constants";
import { ROUTE } from "../../../constants/routes.constants";
import Typography from "antd/es/typography";
import notification from "antd/es/notification";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";

const { Title, Text } = Typography;

const Register = () => {
  const [form] = useForm<CreateAuthFormType>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      if(response?.status === 201){
       navigate(ROUTE.LOGIN);
      }
    } catch (error) {
      api.error({
        message: `Registration failed: ${error}`,
        placement: "topRight",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <Title level={2} className={styles.logo}>
            <IconKilogram /> Kilogram
          </Title>
          <Form onFinish={handleSubmit} className={styles.form} form={form}>
            <Form.Item
              name={CreateAuthForm.Username}
              rules={createAuthFormRules[CreateAuthForm.Username]}
            >
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
              />
            </Form.Item>
            <Form.Item
              name={CreateAuthForm.Email}
              rules={createAuthFormRules[CreateAuthForm.Email]}
            >
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </Form.Item>
            <Form.Item
              name={CreateAuthForm.Password}
              rules={createAuthFormRules[CreateAuthForm.Password]}
            >
              <Input.Password
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submitButton}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
          <Text className={styles.orText}>OR</Text>
          <Button
            loading={loading === "pending" ? true : false}
            className={styles.facebookButton}
          >
            Sign up with Facebook
          </Button>
        </div>
        <div className={styles.loginRedirect}>
          <Text>
            Have an account? <Link to={ROUTE.LOGIN}>Log in</Link>
          </Text>
        </div>
      </div>
    </>
  );
};

export default Register;
