import React, { useState } from 'react';
import './CreateResources.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateResources() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            resourceType: type
        }

        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:7001/api/resources/createResource`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            alert('Successfully added thew resouce');
            console.log("added resource", response.data);

            setName("");
            setType("");

            navigate('/ViewResources');
        } else {
            alert('Couldnt add the resource');
        }
    }

    return (
        <div className='resource-container'>
            <h1>Create Resources </h1>

            <form onSubmit={submitForm}>

                <label htmlFor='type'>Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}>

                    <option value=""> Select Type</option>
                    <option value="Lecture Hall">Lecture Hall</option>
                    <option value="Lab">Lab</option>
                </select>

                <label htmlFor='name'>Name</label>
                <input type="text" name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button type='submit'>Add Resource</button>
            </form>
        </div>
    )
}

export default CreateResources
