import IconKilogram from "../../../assets/IconKilogram";
import { useAppDispatch } from "../../../store/hook";
import { loginUser } from "../../../store/users";
import styles from "../Register/Register.module.css";
import { useForm, type FormProps } from "antd/es/form/Form";
import {
  CreateAuthForm,
  type CreateAuthFormType,
} from "../../../types/FormFields";
import { createAuthFormRules } from "../../../constants/rules.constants";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../../../constants/routes.constants";
import Typography from "antd/es/typography";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Checkbox from "antd/es/checkbox";
import Button from "antd/es/button";
import useNotification from "antd/es/notification/useNotification";
import { AUTH_ERROR } from "../../../constants/error.constants";

const { Title, Text } = Typography;

const Login = () => {
  const [form] = useForm<CreateAuthFormType>();
  const dispatch = useAppDispatch();
  const [api, contextHolder] = useNotification();
  const navigate = useNavigate();

  const handleSubmit: FormProps<
    Omit<CreateAuthFormType, "email">
  >["onFinish"] = async () => {
    try {
      await form.validateFields();
      const formValues = form.getFieldsValue();
      const formData = {
        [CreateAuthForm.Username]:
          formValues[CreateAuthForm.Username]?.trim() || "",
        [CreateAuthForm.Password]:
          formValues[CreateAuthForm.Password]?.trim() || "",
      };
      const response = await dispatch(loginUser(formData)).unwrap();
      if (response?.status === 200) {
        navigate(ROUTE.HOME);
      }
    }catch{
      api.error({
        message: AUTH_ERROR.LOGIN_FAIL,
        placement: "topRight"
      })
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
                placeholder="Username"
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
