import IconKilogram from "../../../assets/IconKilogram";
import { useAppDispatch } from "../../../store/hook";
import { useState, type ChangeEvent } from "react";
import { loginUser } from "../../../store/users";
import styles from "../Register/Register.module.css";
import { useForm } from "antd/es/form/Form";
import {
  CreateAuthForm,
  type CreateAuthFormType,
} from "../../../types/FormFields";
import { createAuthFormRules } from "../../../constants/rules.constants";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../../../constants/routes.constants";
import Typography from "antd/es/typography";
import notification from "antd/es/notification";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Checkbox from "antd/es/checkbox";
import Button from "antd/es/button";

const { Title, Text } = Typography;

const Login = () => {
  const [form] = useForm<CreateAuthFormType>();
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      if(response?.status === 200){
        navigate(ROUTE.HOME);
      }
    } catch (error) {
      api.error({
        message: `Log in failed: ${error}`,
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
            <IconKilogram />
            Kilogram
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
              <Checkbox className={styles.rememberMe}>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submitButton}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <Text className={styles.orText}>OR</Text>
          <Button className={styles.facebookButton}>
            Log in with Facebook
          </Button>
        </div>
        <div className={styles.signupRedirect}>
          <Text>
            Don't have an account? <Link to={ROUTE.REGISTER}>Sign up</Link>
          </Text>
        </div>
      </div>
    </>
  );
};

export default Login;
