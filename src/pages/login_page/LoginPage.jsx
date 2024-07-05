import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useAuth } from "@/context/AuthContext";

import { request } from "@/utils/request";
import { Button, Checkbox, Form, Input } from 'antd';

const LoginPage = () => {

  const { saveToken } = useAuth();
  const navigate = useNavigate();



  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const response = await request.post("/login", values);
      const { token } = response.data;
      saveToken(token);
      notification.success({ message: "Login success!" });
      navigate("/");
    } catch (error) {
      notification.error({ message: "Đăng nhập không thành công!" });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="">
      <div

        className="form-container mx-auto mt-16 w-96 max-w-lg rounded-xl bg-white px-8 py-10 shadow-lg"
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-blue-500">
          Login
        </h2>

        <div className="w-50 mb-4 rounded-md border border-gray-300 bg-gray-100 px-8 pb-8 pt-6">

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="w-50 mb-4 flex flex-col items-center justify-between rounded-md border border-gray-300 px-8 pb-8 pt-6">
          <span>Haven't created an account yet?</span>
          <Link to="/register">
            <span className="font-semibold text-blue-500">Create an account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
