import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, message, Spin } from "antd";
import "./style.css";
import { addStudent, getStudent, updateStudent } from "../../apis";

const StudentModal = (props) => {
    const { id, isOpen, isEdit, onCancel, onSuccess } = props;
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const isAdding = id === "";

    useEffect(() => {
        if (isAdding) {
            form.resetFields();
        } else {
            setLoading(true);
            getStudent(id)
                .then((result) => {
                    setStudent(result.data.data);
                })
                .catch((error) => {
                    message.error("Failed to fetch student data.");
                })
                .finally(() => setLoading(false));
        }
    }, [id, form, isAdding]);

    useEffect(() => {
        if (student) {
            form.setFieldsValue(student);
        }
    }, [student, form]);

    const handleSubmit = (newData) => {
        setLoading(true);
        const apiCall = isAdding ? addStudent(newData) : updateStudent(id, newData);
        
        apiCall
            .then(() => {
                message.success(`${isAdding ? "Added" : "Updated"} student successfully!`);
                form.resetFields();
                onSuccess();
                onCancel();
            })
            .catch((err) => {
                message.error("Failed to save student data.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className={`student-detail ${isOpen ? "show" : ""}`}>
            <div className='student-title'>
                {isAdding ? "Add student" : `Detail student ${student?.name || ""}`}
            </div>
            <div className='close-button' onClick={onCancel}>
                X
            </div>
            <br />
            <Form form={form} onFinish={handleSubmit} labelAlign='left'>
                <Spin spinning={loading} size='large'>
                    <Row gutter={[24, 24]}>
                        <Col span={12}>
                            <Form.Item
                                name='name'
                                label='Name'
                                wrapperCol={16}
                                labelCol={{ span: 8 }}
                                rules={[{ required: true, message: "Please input Name" }]}
                            >
                                <Input disabled={!isEdit} placeholder='Please input Name' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='year_of_birth'
                                label='Year of birth'
                                wrapperCol={16}
                                labelCol={{ span: 8 }}
                                rules={[{ required: true, message: "Please input Year of Birth" }]}
                            >
                                <Input disabled={!isEdit} placeholder='Please input Year of Birth' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='university'
                                label='University'
                                wrapperCol={16}
                                labelCol={{ span: 8 }}
                                rules={[{ required: true, message: "Please input University" }]}
                            >
                                <Input disabled={!isEdit} placeholder='Please input University' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='gender'
                                label='Gender'
                                wrapperCol={16}
                                labelCol={{ span: 8 }}
                                rules={[{ required: true, message: "Please input Gender" }]}
                            >
                                <Input disabled={!isEdit} placeholder='Please input Gender' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='email'
                                label='Email'
                                wrapperCol={16}
                                labelCol={{ span: 8 }}
                                rules={[{ required: true, message: "Please input Email" }]}
                            >
                                <Input disabled={!isEdit} placeholder='Please input Email' />
                            </Form.Item>
                        </Col>
                    </Row>
                    {isEdit && (
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Form.Item>
                    )}
                </Spin>
            </Form>
        </div>
    );
};

export default StudentModal;
