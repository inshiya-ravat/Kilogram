import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { registerUser } from "../../../store/users";
import styles from "./Register.module.css";
import IconKilogram from "../../../assets/IconKilogram";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type FormProps } from "antd/es/form/Form";
import {
  CreateAuthForm,
  type CreateAuthFormType,
} from "../../../types/FormFields";
import { createAuthFormRules } from "../../../constants/rules.constants";
import { ROUTE } from "../../../constants/routes.constants";
import Typography from "antd/es/typography";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import useNotification from "antd/es/notification/useNotification";

const { Title, Text } = Typography;

const Register = () => {
  const [form] = useForm<CreateAuthFormType>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading);
  const [api, contextHolder] = useNotification();
  const navigate = useNavigate();

  const handleSubmit: FormProps<CreateAuthFormType>["onFinish"] = async (
    value
  ) => {
    try {
      const response = await dispatch(registerUser(value)).unwrap();
      if (response?.status === 201) {
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
                placeholder="Username"
                className={styles.input}
              />
            </Form.Item>
            <Form.Item
              name={CreateAuthForm.Email}
              rules={createAuthFormRules[CreateAuthForm.Email]}
            >
              <Input
                type="email"
                placeholder="Email"
                className={styles.input}
              />
            </Form.Item>
            <Form.Item
              name={CreateAuthForm.Password}
              rules={createAuthFormRules[CreateAuthForm.Password]}
            >
              <Input.Password placeholder="Password" className={styles.input} />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={loading === "pending"}
                type="primary"
                htmlType="submit"
                className={styles.submitButton}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
          <Text className={styles.orText}>OR</Text>
          <Button className={styles.facebookButton}>
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
