import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import "./App.css";
import StudentModal from "./components/modal/StudentModal";

function App() {
    // State variables
    const [students, setStudents] = useState();
    const [currentId, setCurrentId] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [reload, setReload] = useState(true);
    
    // API URL
    const url = ``http://10.0.0.10:30101/api/v1``;

    // Fetch students data on component mount or reload
    useEffect(() => {
        if (reload) {
            axios.get(`${url}/students`)
                .then((res) => {
                    setStudents(res.data.data);
                    setReload(false); // Reset reload flag after fetching data
                })
                .catch((err) => {
                    message.error("Failed to fetch students data");
                });
        }
    }, [reload]);

    // Delete student by ID
    const deleteStudent = (id, name) => {
        axios.delete(`${url}/students/${id}`)
            .then(() => {
                message.success(`Deleted ${name}`);
                setReload(true); // Set reload flag to true to refetch data
            })
            .catch((err) => {
                message.error("Failed to delete student");
            });
    };

    return (
        <div className={`App ${isOpen ? "mask" : ""}`}>
            <header className='header'>
                <div className='text-list'>
                    VDT Cloud Intern 2024 Management
                </div>
                <div className="add-icon-container">
                    <PlusCircleOutlined
                        className="add-icon"
                        onClick={() => {
                            setCurrentId("");
                            setIsEdit(true);
                            setIsOpen(true);
                        }}
                    />
                </div>
            </header>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th className='name'>Name</th>
                            <th>Birth year</th>
                            <th>Gender</th>
                            <th>University</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((student) => (
                            <tr
                                key={student.id}
                                onClick={() => {
                                    setIsOpen(true);
                                    setIsEdit(false);
                                    setCurrentId(student.id);
                                }}
                            >
                                <td>{student.name}</td>
                                <td>{student.year_of_birth}</td>
                                <td>{student.gender}</td>
                                <td>{student.university}</td>
                                <td>{student.email}</td>
                                <td className='button-row'>
                                    <button
                                        className='edit'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsOpen(true);
                                            setCurrentId(student.id);
                                            setIsEdit(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='delete'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteStudent(student.id, student.name);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className='footer'></footer>

            <StudentModal
                id={currentId}
                isOpen={isOpen}
                isEdit={isEdit}
                onCancel={() => setIsOpen(false)}
                onSuccess={() => setReload(true)}
            />
        </div>
    );
}

export default App;
